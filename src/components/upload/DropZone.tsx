"use client";

import { useCallback, useState } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCEPTED_EXTENSIONS, MAX_FILE_SIZE_MB } from "@/lib/constants";

interface DropZoneProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export default function DropZone({ onFileSelected, disabled }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndSelect = useCallback(
    (file: File) => {
      setError(null);
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      if (!ACCEPTED_EXTENSIONS.includes(ext)) {
        setError(`Unsupported file type. Please upload a PDF, DOCX, or DOC file.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`File too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`);
        return;
      }
      onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) validateAndSelect(file);
    },
    [disabled, validateAndSelect]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSelect(file);
    e.target.value = "";
  };

  return (
    <div className="w-full">
      <label
        htmlFor="cv-file-input"
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center w-full min-h-[260px] rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer group",
          isDragging
            ? "border-indigo-400 bg-indigo-500/10 scale-[1.01]"
            : "border-white/20 bg-white/5 hover:border-indigo-400/60 hover:bg-white/8",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* Animated orb */}
        <div className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
          isDragging ? "opacity-100" : "group-hover:opacity-50",
          "bg-gradient-radial from-indigo-500/10 via-purple-500/5 to-transparent"
        )} />

        <div className="relative z-10 flex flex-col items-center gap-4 p-8 text-center">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
            isDragging
              ? "bg-indigo-500/30 scale-110"
              : "bg-white/10 group-hover:bg-indigo-500/20 group-hover:scale-105"
          )}>
            {isDragging ? (
              <FileText className="w-8 h-8 text-indigo-400" />
            ) : (
              <Upload className="w-8 h-8 text-white/60 group-hover:text-indigo-400 transition-colors" />
            )}
          </div>

          <div>
            <p className="text-lg font-semibold text-white mb-1">
              {isDragging ? "Drop your CV here" : "Drop your CV or click to browse"}
            </p>
            <p className="text-sm text-white/50">
              Supports PDF, DOCX, DOC · Max {MAX_FILE_SIZE_MB} MB
            </p>
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {["PDF", "DOCX", "DOC"].map((fmt) => (
              <span key={fmt} className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-medium border border-white/10">
                {fmt}
              </span>
            ))}
          </div>
        </div>

        <input
          id="cv-file-input"
          type="file"
          accept=".pdf,.docx,.doc,.txt"
          className="hidden"
          onChange={handleFileInput}
          disabled={disabled}
        />
      </label>

      {error && (
        <div className="mt-3 flex items-start gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
