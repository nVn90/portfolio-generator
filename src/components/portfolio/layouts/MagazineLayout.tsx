"use client";

import type { PortfolioData } from "@/types";
import { getTheme } from "@/lib/themes";
import { ContactSection, ExperienceCard, EducationCard, ProjectCard, SkillsSection, SectionHeading } from "@/components/portfolio/SharedSections";

export default function MagazineLayout({ data }: { data: PortfolioData }) {
  const theme = getTheme(data.themeId);
  const { resume: r } = data;

  return (
    <div className="min-h-screen" style={{ background: theme.colors.background, color: theme.colors.text, fontFamily: theme.fonts.body }}>
      {/* Magazine Header */}
      <header className="px-8 py-12" style={{ borderBottom: `3px solid ${theme.colors.primary}` }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-end">
          <div className="md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: theme.colors.primary }}>
              Portfolio — {new Date().getFullYear()}
            </p>
            <h1
              className="text-6xl md:text-7xl font-black leading-none mb-4"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              {r.name}
            </h1>
            <p className="text-xl font-light" style={{ color: theme.colors.primary }}>{r.title}</p>
          </div>
          <div className="space-y-4">
            {r.summary && (
              <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted, fontStyle: "italic" }}>
                &ldquo;{r.summary}&rdquo;
              </p>
            )}
            <ContactSection contact={r.contact} theme={theme} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Top row: Experience full-width */}
        {r.experience.length > 0 && (
          <section className="mb-12">
            <SectionHeading theme={theme}>Experience</SectionHeading>
            <div className="grid md:grid-cols-2 gap-8">
              {r.experience.map((exp, i) => <ExperienceCard key={i} exp={exp} theme={theme} />)}
            </div>
          </section>
        )}

        {/* Two-column: Projects + sidebar */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            {r.projects.length > 0 && (
              <section>
                <SectionHeading theme={theme}>Projects</SectionHeading>
                {r.projects.map((proj, i) => <ProjectCard key={i} project={proj} theme={theme} />)}
              </section>
            )}
          </div>
          <div className="space-y-12">
            {r.education.length > 0 && (
              <section>
                <SectionHeading theme={theme}>Education</SectionHeading>
                {r.education.map((edu, i) => <EducationCard key={i} edu={edu} theme={theme} />)}
              </section>
            )}
            {r.skills.length > 0 && (
              <section>
                <SectionHeading theme={theme}>Skills</SectionHeading>
                <SkillsSection skills={r.skills} theme={theme} />
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
