require('dotenv').config({ path: '.env.local' });
const Groq = require('groq-sdk');
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const RESUME_TOOL = {
  type: "function",
  function: {
    name: "extract_resume",
    description: "Extract structured resume data from CV text.",
    parameters: {
      type: "object",
      properties: { name: { type: "string" }, title: { type: "string" } },
      required: ["name", "title"],
    },
  },
};

(async () => {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 4096,
      tools: [RESUME_TOOL],
      tool_choice: { type: "function", function: { name: "extract_resume" } },
      messages: [{ role: "user", content: "John Doe is a Senior Engineer" }],
    });

    const message = response.choices[0]?.message;
    const toolCall = message?.tool_calls?.[0];
    console.log("TOOL_CALL:", JSON.stringify(toolCall));

    const data = JSON.parse(toolCall.function.arguments);
    console.log("DATA_PARSED_SUCCESSFULLY:", data);
  } catch (err) {
    console.error("GROQ_ERROR:", err.message);
  }
})();
