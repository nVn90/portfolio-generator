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

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // base delay, doubles each retry

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function parseResumeWithAI(resumeText: string): Promise<ResumeData> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not configured. Please add it to your .env.local file."
    );
  }

  const client = new Groq({ apiKey });

  let lastError: Error = new Error("Unknown error during CV parsing.");

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[resume-parser] Attempt ${attempt}/${MAX_RETRIES} — calling Groq API...`);

      const response = await client.chat.completions.create({
        model: "qwen/qwen3.8-27b",
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
        throw new Error("AI returned no structured data for the CV.");
      }

      let args = toolCall.function.arguments;
      // Strip markdown codeblocks if Llama wrapped it
      if (args.startsWith('```')) {
        args = args.replace(/^```json\n?/, '').replace(/\n?```$/, '');
      }

      let data: ResumeData;
      try {
        data = JSON.parse(args.trim()) as ResumeData;
      } catch (parseErr) {
        console.error(`[resume-parser] Attempt ${attempt} — JSON parse failed:`, args);
        throw new Error("AI response could not be parsed as valid JSON.");
      }

      // Success — return normalised data
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
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(`[resume-parser] Attempt ${attempt} failed:`, lastError.message);

      if (attempt < MAX_RETRIES) {
        const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1); // 1s, 2s, 4s
        console.log(`[resume-parser] Retrying in ${delay}ms...`);
        await sleep(delay);
      }
    }
  }

  // All retries exhausted
  console.error(`[resume-parser] All ${MAX_RETRIES} attempts failed. Last error:`, lastError.message);
  throw new Error(
    `We were unable to parse your CV after ${MAX_RETRIES} attempts. ` +
    `Please check your file and try again, or use a different format (PDF, DOCX, or TXT). ` +
    `If the issue persists, our AI service may be temporarily unavailable.`
  );
}
