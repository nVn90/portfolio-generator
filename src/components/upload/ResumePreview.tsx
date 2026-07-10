"use client";

import type { ResumeData } from "@/types";
import Badge from "@/components/ui/Badge";
import { Briefcase, GraduationCap, Code, Wrench, MapPin, Mail, Phone, Globe } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-xl font-bold text-white">{data.name}</h2>
        <p className="text-indigo-400 font-medium mt-0.5">{data.title}</p>
        {data.summary && (
          <p className="text-white/50 text-xs mt-2 leading-relaxed line-clamp-3">{data.summary}</p>
        )}
        <div className="flex flex-wrap gap-3 mt-3">
          {data.contact.email && (
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <Mail className="w-3 h-3" /> {data.contact.email}
            </span>
          )}
          {data.contact.phone && (
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <Phone className="w-3 h-3" /> {data.contact.phone}
            </span>
          )}
          {data.contact.location && (
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <MapPin className="w-3 h-3" /> {data.contact.location}
            </span>
          )}
          {data.contact.website && (
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <Globe className="w-3 h-3" /> {data.contact.website}
            </span>
          )}
        </div>
      </div>

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" /> Experience ({data.experience.length})
          </h3>
          <div className="space-y-2">
            {data.experience.slice(0, 3).map((exp, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="w-1 h-full min-h-[2.5rem] rounded-full bg-indigo-500/50 shrink-0 self-stretch" />
                <div>
                  <p className="font-semibold text-white">{exp.role}</p>
                  <p className="text-white/50 text-xs">{exp.company} · {exp.startDate} – {exp.endDate}</p>
                </div>
              </div>
            ))}
            {data.experience.length > 3 && (
              <p className="text-xs text-white/30 pl-3">+{data.experience.length - 3} more roles</p>
            )}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" /> Education ({data.education.length})
          </h3>
          <div className="space-y-2">
            {data.education.map((edu, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="font-semibold text-white">{edu.degree} in {edu.field}</p>
                <p className="text-white/50 text-xs">{edu.institution} · {edu.endDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
            <Code className="w-3.5 h-3.5" /> Projects ({data.projects.length})
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {data.projects.slice(0, 4).map((proj, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="font-semibold text-white text-xs truncate">{proj.name}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {proj.technologies.slice(0, 2).map((tech, j) => (
                    <Badge key={j} variant="primary" className="text-[9px] px-1.5 py-0">{tech}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5" /> Skills
          </h3>
          <div className="space-y-2">
            {data.skills.slice(0, 3).map((skillGroup, i) => (
              <div key={i}>
                <p className="text-white/40 text-xs mb-1.5">{skillGroup.category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.slice(0, 6).map((skill, j) => (
                    <Badge key={j} className="text-xs">{skill}</Badge>
                  ))}
                  {skillGroup.items.length > 6 && (
                    <Badge className="text-xs">+{skillGroup.items.length - 6}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
