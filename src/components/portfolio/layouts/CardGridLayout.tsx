"use client";

import type { PortfolioData } from "@/types";
import { getTheme } from "@/lib/themes";
import { ContactSection, SectionHeading, SkillsSection, EducationCard } from "@/components/portfolio/SharedSections";
import { Github, ExternalLink, Briefcase, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function CardGridLayout({ data }: { data: PortfolioData }) {
  const theme = getTheme(data.themeId);
  const { resume: r } = data;

  return (
    <div className="min-h-screen" style={{ background: theme.colors.background, color: theme.colors.text, fontFamily: theme.fonts.body }}>
      {/* Header */}
      <header className="py-16 px-6" style={{ background: `linear-gradient(to bottom, ${theme.colors.surface}, ${theme.colors.background})`, borderBottom: `1px solid ${theme.colors.border}` }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-black mb-2" style={{ fontFamily: theme.fonts.heading }}>{r.name}</h1>
          <p className="text-xl font-medium mb-4" style={{ color: theme.colors.primary }}>{r.title}</p>
          {r.summary && <p className="text-sm leading-relaxed mb-6 max-w-2xl" style={{ color: theme.colors.textMuted }}>{r.summary}</p>}
          <ContactSection contact={r.contact} theme={theme} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Experience grid */}
        {r.experience.length > 0 && (
          <section>
            <SectionHeading theme={theme}>Experience</SectionHeading>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {r.experience.map((exp, i) => (
                <div key={i} className="p-5 rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: theme.colors.cardBg, borderColor: theme.colors.border }}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: theme.colors.surface }}>
                      <Briefcase className="w-4 h-4" style={{ color: theme.colors.primary }} />
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: theme.colors.textMuted, background: theme.colors.surface }}>
                      {formatDate(exp.endDate)}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm mb-0.5" style={{ fontFamily: theme.fonts.heading }}>{exp.role}</h3>
                  <p className="text-xs font-medium mb-2" style={{ color: theme.colors.primary }}>{exp.company}</p>
                  {exp.location && (
                    <p className="text-xs flex items-center gap-1 mb-3" style={{ color: theme.colors.textMuted }}>
                      <MapPin className="w-3 h-3" /> {exp.location}
                    </p>
                  )}
                  <ul className="space-y-1">
                    {exp.description.slice(0, 2).map((bullet, j) => (
                      <li key={j} className="text-xs" style={{ color: theme.colors.textMuted }}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects grid */}
        {r.projects.length > 0 && (
          <section>
            <SectionHeading theme={theme}>Projects</SectionHeading>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {r.projects.map((proj, i) => (
                <div key={i} className="p-5 rounded-xl border flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: theme.colors.cardBg, borderColor: theme.colors.border }}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-sm" style={{ fontFamily: theme.fonts.heading }}>{proj.name}</h3>
                    <div className="flex gap-2 shrink-0">
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.textMuted }}>
                          <Github className="w-4 h-4 hover:opacity-80" />
                        </a>
                      )}
                      {proj.url && (
                        <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.primary }}>
                          <ExternalLink className="w-4 h-4 hover:opacity-80" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: theme.colors.textMuted }}>{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {proj.technologies.slice(0, 4).map((tech, j) => (
                      <span key={j} className="text-xs px-2 py-0.5 rounded-full border"
                        style={{ color: theme.colors.primary, borderColor: theme.colors.border, background: theme.colors.surface }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills + Education */}
        <div className="grid md:grid-cols-2 gap-12">
          {r.skills.length > 0 && (
            <section>
              <SectionHeading theme={theme}>Skills</SectionHeading>
              <SkillsSection skills={r.skills} theme={theme} />
            </section>
          )}
          {r.education.length > 0 && (
            <section>
              <SectionHeading theme={theme}>Education</SectionHeading>
              {r.education.map((edu, i) => <EducationCard key={i} edu={edu} theme={theme} />)}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
