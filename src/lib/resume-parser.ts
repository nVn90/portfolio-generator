/**
 * Resume → structured data via Groq AI.
 * Uses tool/function calling to guarantee JSON output shape.
 */

import Groq from "groq-sdk";
import type { ResumeData } from "@/types";

const RESUME_TOOL: Groq.Chat.ChatCompletionTool = {
  type: "function",
  function: {
    name: "extract_resume",
    description:
      "Extract structured resume data from CV text. Include ALL information found. Use empty arrays [] for missing sections.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "Full name" },
        title: { type: "string", description: "Professional title or role" },
        summary: { type: "string", description: "Professional summary / about section" },
        contact: {
          type: "object",
          properties: {
            email: { type: "string" },
            phone: { type: "string" },
            linkedin: { type: "string" },
            github: { type: "string" },
            website: { type: "string" },
            location: { type: "string" },
          },
        },
        experience: {
          type: "array",
          items: {
            type: "object",
            properties: {
              company: { type: "string" },
              role: { type: "string" },
              startDate: { type: "string" },
              endDate: { type: "string", description: "Use 'Present' if current role" },
              location: { type: "string" },
              description: { type: "array", items: { type: "string" } },
              technologies: { type: "array", items: { type: "string" } },
            },
            required: ["company", "role", "startDate", "endDate", "description"],
          },
        },
        education: {
          type: "array",
          items: {
            type: "object",
            properties: {
              institution: { type: "string" },
              degree: { type: "string" },
              field: { type: "string" },
              startDate: { type: "string" },
              endDate: { type: "string" },
              gpa: { type: "string" },
              achievements: { type: "array", items: { type: "string" } },
            },
            required: ["institution", "degree", "field", "startDate", "endDate"],
          },
        },
        projects: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              technologies: { type: "array", items: { type: "string" } },
              url: { type: "string" },
              github: { type: "string" },
              highlights: { type: "array", items: { type: "string" } },
            },
            required: ["name", "description", "technologies"],
          },
        },
        skills: {
          type: "array",
          items: {
            type: "object",
            properties: {
              category: { type: "string" },
              items: { type: "array", items: { type: "string" } },
            },
            required: ["category", "items"],
          },
        },
        certifications: { type: "array", items: { type: "string" } },
        languages: { type: "array", items: { type: "string" } },
        awards: { type: "array", items: { type: "string" } },
      },
      required: ["name", "title", "summary", "contact", "experience", "education", "projects", "skills"],
    },
  },
};

export async function parseResumeWithAI(resumeText: string): Promise<ResumeData> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not configured. Please add it to your .env.local file."
    );
  }

  const client = new Groq({ apiKey });

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 4096,
    tools: [RESUME_TOOL],
    tool_choice: { type: "function", function: { name: "extract_resume" } },
    messages: [
      {
        role: "user",
        content: `Extract all resume information from the following CV text. Be thorough and include every piece of information. If something is not present, use an empty string or empty array.\n\n<resume_text>\n${resumeText}\n</resume_text>`,
      },
    ],
  });

  const message = response.choices[0]?.message;
  const toolCall = message?.tool_calls?.[0];

  if (!toolCall || toolCall.function.name !== "extract_resume") {
    throw new Error("AI parsing returned no structured data. Please try again.");
  }

  let data: ResumeData;
  try {
    let args = toolCall.function.arguments;
    // Strip markdown codeblocks if Llama wrapped it
    if (args.startsWith('\`\`\`')) {
      args = args.replace(/^\`\`\`json\n?/, '').replace(/\n?\`\`\`$/, '');
    }
    data = JSON.parse(args.trim()) as ResumeData;
  } catch (e) {
    console.error("Failed to parse", toolCall.function.arguments);
    throw new Error("Failed to parse AI response. Please try again.");
  }

  // Ensure required arrays exist
  return {
    name: data.name || "Unknown",
    title: data.title || "Professional",
    summary: data.summary || "",
    contact: data.contact || {},
    experience: data.experience || [],
    education: data.education || [],
    projects: data.projects || [],
    skills: data.skills || [],
    certifications: data.certifications || [],
    languages: data.languages || [],
    awards: data.awards || [],
  };
}
