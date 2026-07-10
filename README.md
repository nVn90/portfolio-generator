# PortfolioAI — Resume to Portfolio Generator

Transform any CV or resume (PDF, DOCX, DOC, TXT) into a stunning, customisable portfolio website in seconds — powered by AI.

---

## ✨ Features

- **AI-Powered Parsing** — AI extracts structured data from any resume format
- **6 Unique Themes** — Midnight Architect, Aurora Borealis, Paper Editorial, Terminal Hacker, Luxe Minimal, Brutalist Bold
- **5 Layout Styles** — Single Page, Sidebar, Magazine, Timeline, Card Grid
- **Real-time Customisation** — Swap themes and layouts without re-uploading
- **Shareable URLs** — Each portfolio gets a unique link
- **Print-Ready** — Clean print stylesheet included
- **TypeScript Strict** — 100% type-safe codebase
- **Production-Grade** — Error handling, validation, file size limits

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <repo>
cd portfolio-generator
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Add your Anthropic API key
```

### 3. Run Development Server
```bash
npm run dev
# Open http://localhost:3000
```

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── parse-resume/route.ts     # File upload + AI parsing
│   │   └── generate-portfolio/route.ts  # Portfolio save/fetch
│   ├── portfolio/[id]/page.tsx       # Portfolio viewer
│   ├── page.tsx                      # Landing / upload page
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── portfolio/
│   │   ├── PortfolioRenderer.tsx     # Theme + layout dispatcher
│   │   ├── PortfolioToolbar.tsx      # Floating customisation bar
│   │   ├── SharedSections.tsx        # Reusable section components
│   │   └── layouts/
│   │       ├── SinglePageLayout.tsx
│   │       ├── SidebarLayout.tsx
│   │       ├── MagazineLayout.tsx
│   │       ├── TimelineLayout.tsx
│   │       └── CardGridLayout.tsx
│   ├── upload/
│   │   ├── DropZone.tsx              # Drag-and-drop file uploader
│   │   ├── ParseProgress.tsx         # AI parsing progress UI
│   │   ├── StepIndicator.tsx         # 3-step progress bar
│   │   ├── ThemeSelector.tsx         # Theme picker with colour swatches
│   │   ├── LayoutSelector.tsx        # Layout picker with previews
│   │   └── ResumePreview.tsx         # Extracted data preview
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       └── ProgressBar.tsx
├── hooks/
│   └── usePortfolioBuilder.ts        # Central state + async actions
├── lib/
│   ├── themes.ts                     # 6 theme configs
│   ├── layouts.ts                    # 5 layout configs
│   ├── resume-parser.ts              # AI integration
│   ├── file-parser.ts                # PDF/DOCX/TXT extraction
│   ├── storage.ts                    # In-memory store (swap for Redis/DB)
│   └── utils.ts                      # Helpers
└── types/
    └── index.ts                      # All TypeScript interfaces
```

---

## 🔧 Configuration

### Environment Variables
| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ | Your AI API key |
| `NEXT_PUBLIC_APP_URL` | ❌ | Public URL (for share links) |

### Upgrading Storage
The default storage is in-memory (resets on server restart). To persist portfolios, replace `src/lib/storage.ts` with:

**Redis (recommended for production):**
```typescript
import { Redis } from '@upstash/redis'
const redis = new Redis({ url: process.env.REDIS_URL!, token: process.env.REDIS_TOKEN! })

export async function savePortfolio(data: PortfolioData) {
  await redis.set(`portfolio:${data.id}`, data, { ex: 60 * 60 * 24 * 7 }) // 7 days TTL
}
export async function getPortfolio(id: string) {
  return redis.get<PortfolioData>(`portfolio:${id}`)
}
```

**Postgres / Prisma:**
```typescript
// Add a Portfolio model to your schema.prisma and use prisma.portfolio.upsert(...)
```

---

## 📦 Supported File Formats
| Format | Library | Notes |
|---|---|---|
| PDF | `pdf-parse` | Text-based PDFs only (not scanned images) |
| DOCX | `mammoth` | Full support |
| DOC | Buffer → UTF-8 | Limited; DOCX preferred |
| TXT | Native | Direct text extraction |

---

## 🎨 Themes

| Theme | Style | Best For |
|---|---|---|
| Midnight Architect | Dark, indigo/purple | Tech & Engineering |
| Aurora Borealis | Dark, vibrant green/blue | Creative Tech |
| Paper Editorial | Light, serif typography | Writing & Academia |
| Terminal Hacker | Dark green monospace | Developers |
| Luxe Minimal | Light, gold accents | Design & Business |
| Brutalist Bold | High contrast, red/black | Bold Creatives |

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel --prod
# Set ANTHROPIC_API_KEY in Vercel environment variables
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📄 License
MIT
