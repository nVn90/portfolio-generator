"use client";

import type { PortfolioData } from "@/types";
import { getTheme } from "@/lib/themes";
import { ContactSection, ExperienceCard, EducationCard, ProjectCard, SkillsSection, SectionHeading } from "@/components/portfolio/SharedSections";

const NAV_ITEMS = ["Experience", "Education", "Projects", "Skills"];

export default function SidebarLayout({ data }: { data: PortfolioData }) {
  const theme = getTheme(data.themeId);
  const { resume: r } = data;

  return (
    <div className="min-h-screen flex" style={{ background: theme.colors.background, color: theme.colors.text, fontFamily: theme.fonts.body }}>
      {/* Sidebar */}
      <aside
        className="w-64 shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto flex flex-col p-8"
        style={{ background: theme.colors.surface, borderRight: `1px solid ${theme.colors.border}` }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-1" style={{ fontFamily: theme.fonts.heading }}>{r.name}</h1>
          <p className="text-sm font-medium" style={{ color: theme.colors.primary }}>{r.title}</p>
        </div>

        {r.summary && (
          <p className="text-xs leading-relaxed mb-8" style={{ color: theme.colors.textMuted }}>{r.summary}</p>
        )}

        <nav className="mb-8 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all hover:pl-5"
              style={{ color: theme.colors.textMuted }}
              onMouseEnter={e => (e.currentTarget.style.color = theme.colors.primary)}
              onMouseLeave={e => (e.currentTarget.style.color = theme.colors.textMuted)}
            >
              <span style={{ color: theme.colors.primary }}>›</span> {item}
            </a>
          ))}
        </nav>

        <div className="mt-auto">
          <ContactSection contact={r.contact} theme={theme} />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-12 py-16 space-y-16 overflow-y-auto">
        {r.experience.length > 0 && (
          <section id="experience">
            <SectionHeading theme={theme}>Experience</SectionHeading>
            {r.experience.map((exp, i) => <ExperienceCard key={i} exp={exp} theme={theme} />)}
          </section>
        )}
        {r.education.length > 0 && (
          <section id="education">
            <SectionHeading theme={theme}>Education</SectionHeading>
            {r.education.map((edu, i) => <EducationCard key={i} edu={edu} theme={theme} />)}
          </section>
        )}
        {r.projects.length > 0 && (
          <section id="projects">
            <SectionHeading theme={theme}>Projects</SectionHeading>
            {r.projects.map((proj, i) => <ProjectCard key={i} project={proj} theme={theme} />)}
          </section>
        )}
        {r.skills.length > 0 && (
          <section id="skills">
            <SectionHeading theme={theme}>Skills</SectionHeading>
            <SkillsSection skills={r.skills} theme={theme} />
          </section>
        )}
      </main>
    </div>
  );
}
