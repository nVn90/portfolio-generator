import { NextRequest, NextResponse } from "next/server";
import { extractTextFromFile, ACCEPTED_TYPES, MAX_FILE_SIZE_BYTES } from "@/lib/file-parser";
import { parseResumeWithAI } from "@/lib/resume-parser";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Maximum size is 10 MB. Your file is ${(file.size / 1024 / 1024).toFixed(1)} MB.` },
        { status: 413 }
      );
    }

    // Validate file type
    const mimeType = file.type;
    const fileName = file.name;
    const ext = fileName.split(".").pop()?.toLowerCase() ?? "";

    const isValidMime = ACCEPTED_TYPES.includes(mimeType);
    const isValidExt = ["pdf", "docx", "doc", "txt"].includes(ext);

    if (!isValidMime && !isValidExt) {
      return NextResponse.json(
        { error: `Unsupported file type. Please upload a PDF, DOCX, DOC, or TXT file.` },
        { status: 415 }
      );
    }

    // Extract text from file
    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await extractTextFromFile(buffer, mimeType, fileName);

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from the file. Please try a different format." },
        { status: 422 }
      );
    }

    // Parse with AI
    const resumeData = await parseResumeWithAI(text);

    return NextResponse.json({ resumeData, rawText: text.slice(0, 500) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("[parse-resume]", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
