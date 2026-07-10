"use client";

import type { PortfolioData } from "@/types";
import { getTheme } from "@/lib/themes";
import { ContactSection, EducationCard, ProjectCard, SkillsSection, SectionHeading } from "@/components/portfolio/SharedSections";
import { formatDate } from "@/lib/utils";

export default function TimelineLayout({ data }: { data: PortfolioData }) {
  const theme = getTheme(data.themeId);
  const { resume: r } = data;

  return (
    <div className="min-h-screen" style={{ background: theme.colors.background, color: theme.colors.text, fontFamily: theme.fonts.body }}>
      {/* Hero */}
      <header className="py-16 px-6 text-center" style={{ background: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}` }}>
        <h1 className="text-5xl font-black mb-2" style={{ fontFamily: theme.fonts.heading }}>{r.name}</h1>
        <p className="text-lg font-medium mb-4" style={{ color: theme.colors.primary }}>{r.title}</p>
        {r.summary && <p className="text-sm max-w-xl mx-auto mb-6 leading-relaxed" style={{ color: theme.colors.textMuted }}>{r.summary}</p>}
        <div className="flex justify-center">
          <ContactSection contact={r.contact} theme={theme} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Timeline: Experience */}
        {r.experience.length > 0 && (
          <section className="mb-16">
            <SectionHeading theme={theme}>Career Timeline</SectionHeading>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ background: theme.colors.border }} />

              {r.experience.map((exp, i) => (
                <div key={i} className="relative flex gap-8 mb-10 last:mb-0">
                  {/* Dot */}
                  <div className="relative z-10 mt-1.5 w-8 h-8 rounded-full shrink-0 flex items-center justify-center border-2"
                    style={{ background: theme.colors.surface, borderColor: theme.colors.primary }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: theme.colors.primary }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="text-base font-bold" style={{ fontFamily: theme.fonts.heading }}>{exp.role}</h3>
                        <p className="text-sm" style={{ color: theme.colors.primary }}>{exp.company}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-md shrink-0" style={{ color: theme.colors.textMuted, background: theme.colors.surface }}>
                        {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                      </span>
                    </div>
                    <ul className="space-y-1 mt-2">
                      {exp.description.map((bullet, j) => (
                        <li key={j} className="text-sm flex gap-2" style={{ color: theme.colors.textMuted }}>
                          <span style={{ color: theme.colors.primary }}>›</span> {bullet}
                        </li>
                      ))}
                    </ul>
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {exp.technologies.map((tech, j) => (
                          <span key={j} className="text-xs px-2 py-0.5 rounded-full border"
                            style={{ color: theme.colors.primary, borderColor: theme.colors.border, background: theme.colors.surface }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {r.education.length > 0 && (
          <section className="mb-16">
            <SectionHeading theme={theme}>Education</SectionHeading>
            {r.education.map((edu, i) => <EducationCard key={i} edu={edu} theme={theme} />)}
          </section>
        )}

        {r.projects.length > 0 && (
          <section className="mb-16">
            <SectionHeading theme={theme}>Projects</SectionHeading>
            {r.projects.map((proj, i) => <ProjectCard key={i} project={proj} theme={theme} />)}
          </section>
        )}

        {r.skills.length > 0 && (
          <section>
            <SectionHeading theme={theme}>Skills</SectionHeading>
            <SkillsSection skills={r.skills} theme={theme} />
          </section>
        )}
      </main>
    </div>
  );
}
