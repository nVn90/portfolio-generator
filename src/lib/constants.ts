/**
 * Client-safe constants for file validation.
 * No server-side imports — safe to use in any component.
 */
export const ACCEPTED_EXTENSIONS = [".pdf", ".docx", ".doc", ".txt"];
export const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
];
export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
