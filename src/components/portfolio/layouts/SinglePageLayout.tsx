"use client";

import type { PortfolioData } from "@/types";
import { getTheme } from "@/lib/themes";
import { ContactSection, SectionHeading, ExperienceCard, EducationCard, ProjectCard, SkillsSection } from "@/components/portfolio/SharedSections";

export default function SinglePageLayout({ data }: { data: PortfolioData }) {
  const theme = getTheme(data.themeId);
  const { resume: r } = data;

  return (
    <div className="min-h-screen" style={{ background: theme.colors.background, color: theme.colors.text, fontFamily: theme.fonts.body }}>
      {/* Hero */}
      <header className="py-20 px-6" style={{ background: `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.background})`, borderBottom: `1px solid ${theme.colors.border}` }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-3" style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}>
            {r.name}
          </h1>
          <p className="text-xl font-medium mb-6" style={{ color: theme.colors.primary }}>{r.title}</p>
          {r.summary && (
            <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: theme.colors.textMuted }}>{r.summary}</p>
          )}
          <ContactSection contact={r.contact} theme={theme} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        {r.experience.length > 0 && (
          <section>
            <SectionHeading theme={theme}>Experience</SectionHeading>
            {r.experience.map((exp, i) => <ExperienceCard key={i} exp={exp} theme={theme} />)}
          </section>
        )}

        {r.education.length > 0 && (
          <section>
            <SectionHeading theme={theme}>Education</SectionHeading>
            {r.education.map((edu, i) => <EducationCard key={i} edu={edu} theme={theme} />)}
          </section>
        )}

        {r.projects.length > 0 && (
          <section>
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

        {(r.certifications?.length ?? 0) > 0 && (
          <section>
            <SectionHeading theme={theme}>Certifications</SectionHeading>
            <ul className="space-y-2">
              {r.certifications!.map((cert, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: theme.colors.textMuted }}>
                  <span style={{ color: theme.colors.primary }}>▸</span> {cert}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
