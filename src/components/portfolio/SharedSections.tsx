"use client";

import type { ThemeConfig, WorkExperience, Education, Project, Skill, ContactInfo } from "@/types";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, Linkedin, Github, Globe, MapPin, ExternalLink } from "lucide-react";

// ── Contact Section ───────────────────────────────────────────────────────────
export function ContactSection({ contact, theme }: { contact: ContactInfo; theme: ThemeConfig }) {
  const links = [
    { icon: Mail, value: contact.email, href: `mailto:${contact.email}`, label: contact.email },
    { icon: Phone, value: contact.phone, href: `tel:${contact.phone}`, label: contact.phone },
    { icon: Linkedin, value: contact.linkedin, href: contact.linkedin?.startsWith("http") ? contact.linkedin : `https://linkedin.com/in/${contact.linkedin}`, label: contact.linkedin },
    { icon: Github, value: contact.github, href: contact.github?.startsWith("http") ? contact.github : `https://github.com/${contact.github}`, label: contact.github },
    { icon: Globe, value: contact.website, href: contact.website, label: contact.website },
    { icon: MapPin, value: contact.location, href: undefined, label: contact.location },
  ].filter((l) => l.value);

  return (
    <div className="flex flex-wrap gap-3">
      {links.map(({ icon: Icon, href, label }, i) =>
        href ? (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity"
            style={{ color: theme.colors.primary }}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span>{label}</span>
          </a>
        ) : (
          <span key={i} className="flex items-center gap-1.5 text-sm" style={{ color: theme.colors.textMuted }}>
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span>{label}</span>
          </span>
        )
      )}
    </div>
  );
}

// ── Section Heading ───────────────────────────────────────────────────────────
export function SectionHeading({ children, theme }: { children: React.ReactNode; theme: ThemeConfig }) {
  return (
    <div className="mb-6">
      <h2
        className="text-xs font-bold tracking-widest uppercase mb-2"
        style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
      >
        {children}
      </h2>
      <div className="h-px w-full" style={{ background: theme.colors.border }} />
    </div>
  );
}

// ── Experience Card ───────────────────────────────────────────────────────────
export function ExperienceCard({ exp, theme }: { exp: WorkExperience; theme: ThemeConfig }) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
        <div>
          <h3 className="text-base font-bold" style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}>
            {exp.role}
          </h3>
          <p className="text-sm font-medium" style={{ color: theme.colors.primary }}>
            {exp.company}
            {exp.location ? ` · ${exp.location}` : ""}
          </p>
        </div>
        <span className="text-xs shrink-0 mt-0.5 px-2 py-1 rounded-md" style={{ color: theme.colors.textMuted, background: theme.colors.surface }}>
          {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
        </span>
      </div>
      <ul className="space-y-1.5 mb-3">
        {exp.description.map((bullet, i) => (
          <li key={i} className="flex gap-2 text-sm" style={{ color: theme.colors.textMuted }}>
            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: theme.colors.primary }} />
            {bullet}
          </li>
        ))}
      </ul>
      {exp.technologies && exp.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {exp.technologies.map((tech, i) => (
            <span
              key={i}
              className="text-xs px-2 py-0.5 rounded-full border"
              style={{ color: theme.colors.primary, borderColor: theme.colors.border, background: theme.colors.surface }}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Education Card ────────────────────────────────────────────────────────────
export function EducationCard({ edu, theme }: { edu: Education; theme: ThemeConfig }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
        <div>
          <h3 className="text-base font-bold" style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}>
            {edu.degree} in {edu.field}
          </h3>
          <p className="text-sm" style={{ color: theme.colors.primary }}>{edu.institution}</p>
        </div>
        <span className="text-xs shrink-0 mt-0.5 px-2 py-1 rounded-md" style={{ color: theme.colors.textMuted, background: theme.colors.surface }}>
          {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
        </span>
      </div>
      {edu.gpa && <p className="text-xs" style={{ color: theme.colors.textMuted }}>GPA: {edu.gpa}</p>}
      {edu.achievements && edu.achievements.length > 0 && (
        <ul className="mt-2 space-y-1">
          {edu.achievements.map((ach, i) => (
            <li key={i} className="text-xs flex gap-2" style={{ color: theme.colors.textMuted }}>
              <span>·</span>{ach}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
export function ProjectCard({ project, theme }: { project: Project; theme: ThemeConfig }) {
  return (
    <div
      className="p-5 rounded-xl border mb-4 last:mb-0 transition-all hover:shadow-lg"
      style={{ background: theme.colors.cardBg, borderColor: theme.colors.border }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-base font-bold" style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}>
          {project.name}
        </h3>
        <div className="flex gap-2 shrink-0">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.textMuted }}>
              <Github className="w-4 h-4 hover:opacity-80" />
            </a>
          )}
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.primary }}>
              <ExternalLink className="w-4 h-4 hover:opacity-80" />
            </a>
          )}
        </div>
      </div>
      <p className="text-sm mb-3" style={{ color: theme.colors.textMuted }}>{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((tech, i) => (
          <span
            key={i}
            className="text-xs px-2 py-0.5 rounded-full border"
            style={{ color: theme.colors.primary, borderColor: theme.colors.border, background: theme.colors.surface }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Skills Section ────────────────────────────────────────────────────────────
export function SkillsSection({ skills, theme }: { skills: Skill[]; theme: ThemeConfig }) {
  return (
    <div className="space-y-5">
      {skills.map((group, i) => (
        <div key={i}>
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: theme.colors.primary }}>
            {group.category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {group.items.map((skill, j) => (
              <span
                key={j}
                className="text-xs px-3 py-1.5 rounded-full border"
                style={{
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                  background: theme.colors.surface,
                  fontFamily: theme.fonts.body,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
