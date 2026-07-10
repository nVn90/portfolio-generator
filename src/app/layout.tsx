import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PortfolioAI — Resume to Portfolio Generator",
  description:
    "Transform your CV or resume into a stunning, customisable portfolio website in seconds — powered by AI.",
  keywords: ["portfolio", "resume", "CV", "AI", "generator", "career"],
  openGraph: {
    title: "PortfolioAI — Resume to Portfolio Generator",
    description: "Transform your CV into a stunning portfolio in seconds using AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

