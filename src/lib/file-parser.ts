/**
 * Server-side file text extraction.
 * Supports: PDF (text-based), DOCX, DOC, TXT.
 * NOTE: This module must only be imported in server components / API routes.
 */

export async function extractTextFromFile(
  buffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<string> {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";

  // ── PDF ──────────────────────────────────────────────
  if (mimeType === "application/pdf" || ext === "pdf") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require("pdf-parse");
    const data = await pdfParse(buffer);
    if (!data.text?.trim()) {
      throw new Error(
        "Could not extract text from this PDF. It may be a scanned/image PDF. Please try a text-based PDF or DOCX version."
      );
    }
    return data.text;
  }

  // ── DOCX ─────────────────────────────────────────────
  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    ext === "docx"
  ) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mammoth = require("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    if (!result.value?.trim()) {
      throw new Error("Could not extract text from this DOCX file.");
    }
    return result.value;
  }

  // ── DOC (legacy) ─────────────────────────────────────
  if (mimeType === "application/msword" || ext === "doc") {
    // Basic fallback: try reading as UTF-8 text
    const text = buffer.toString("utf-8").replace(/[^\x20-\x7E\n\r\t]/g, " ").trim();
    if (!text) {
      throw new Error(
        "Could not extract text from this DOC file. Please convert it to DOCX or PDF."
      );
    }
    return text;
  }

  // ── TXT ──────────────────────────────────────────────
  if (mimeType === "text/plain" || ext === "txt") {
    return buffer.toString("utf-8");
  }

  throw new Error(
    `Unsupported file type: ${mimeType || ext}. Please upload a PDF, DOCX, DOC, or TXT file.`
  );
}

export const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
];

export const ACCEPTED_EXTENSIONS = [".pdf", ".docx", ".doc", ".txt"];
export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
