<p align="center">
  <img src="public/creatr-logo.png" alt="Lumora Logo" width="280"/>
</p>

<h1 align="center">✨ Lumora — Full-Stack AI Content Management System ✨</h1>

<p align="center">
  <em>Where AI meets creativity. Write smarter, grow faster, create without limits.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Convex-Realtime-FF6F00?style=for-the-badge&logo=convex&logoColor=white" alt="Convex"/>
  <img src="https://img.shields.io/badge/Gemini_AI-Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini"/>
  <img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
</p>

<p align="center">
  <a href="https://lumora-full-stack-ai-cms-platform.vercel.app">🌐 Live Demo</a> •
  <a href="#-features">✨ Features</a> •
  <a href="#%EF%B8%8F-tech-stack">⚙️ Tech Stack</a> •
  <a href="#-getting-started">🚀 Getting Started</a> •
  <a href="#-architecture">🏗️ Architecture</a>
</p>

<br/>

---

<br/>

## 🎯 What is Lumora?

**Lumora** is a production-grade, AI-powered content management platform built for modern creators. It's not just a blog — it's a **complete ecosystem** where you can write with AI assistance, build a community, track your growth, and publish stunning content — all in real-time.

> 💡 *Think Medium meets Notion meets ChatGPT — but built from scratch with cutting-edge tech.*

<br/>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🧠 AI-Powered Writing
- Generate full article drafts from just a **title**
- **Expand**, **simplify**, or **enhance** existing content
- Powered by **Google Gemini Flash**
- Secure server-side API calls (keys never exposed)

</td>
<td width="50%">

### ✍️ Rich Text Editor
- Full-featured **WYSIWYG editor** (React Quill)
- Formatting, lists, code blocks, embedded media
- **Auto-save** drafts every 30 seconds
- Distraction-free writing experience

</td>
</tr>
<tr>
<td width="50%">

### 📊 Analytics Dashboard
- **Daily view charts** with Chart.js
- Track views, likes, comments, followers
- Post performance metrics
- Recent activity feed

</td>
<td width="50%">

### 🌐 Community Feed
- **"For You"** and **"Trending"** tabs
- Engagement-based algorithm ranking
- Like, comment, and follow system
- Suggested users discovery

</td>
</tr>
<tr>
<td width="50%">

### 🖼️ Image Management
- **ImageKit** CDN integration
- Drag-and-drop uploads
- Background removal & smart crop
- Text overlay transformations

</td>
<td width="50%">

### ⚡ Real-Time Everything
- **Convex** real-time database
- Instant likes, comments, follows
- No refresh needed — ever
- Reactive UI updates across all clients

</td>
</tr>
<tr>
<td width="50%">

### 🔐 Secure Authentication
- **Clerk** integration with JWT
- Protected dashboard routes via middleware
- Sign in / Sign up flows
- Persistent sessions

</td>
<td width="50%">

### 🎨 Premium Landing Page
- 80-frame scroll-triggered hero animation
- WebGL ghost cursor effects
- 3D tilted cards & electric borders
- Sticky scroll section transitions

</td>
</tr>
</table>

<br/>

## ⚙️ Tech Stack

<table>
<tr>
<th align="left">Layer</th>
<th align="left">Technology</th>
</tr>
<tr><td>🖥️ Frontend</td><td><strong>Next.js 15</strong> (App Router) + <strong>React 19</strong></td></tr>
<tr><td>🗄️ Backend & DB</td><td><strong>Convex</strong> (Serverless functions + Realtime NoSQL)</td></tr>
<tr><td>🔐 Auth</td><td><strong>Clerk</strong> (JWT-based, middleware-protected)</td></tr>
<tr><td>🤖 AI</td><td><strong>Google Generative AI</strong> (Gemini Flash)</td></tr>
<tr><td>🎨 Styling</td><td><strong>Tailwind CSS 4</strong> + <strong>Shadcn UI</strong></td></tr>
<tr><td>🎬 Animations</td><td><strong>Framer Motion</strong> + Custom WebGL shaders</td></tr>
<tr><td>📝 Editor</td><td><strong>React Quill New</strong></td></tr>
<tr><td>📈 Charts</td><td><strong>Chart.js</strong> + react-chartjs-2</td></tr>
<tr><td>🖼️ Media CDN</td><td><strong>ImageKit</strong></td></tr>
<tr><td>📋 Forms</td><td><strong>React Hook Form</strong> + <strong>Zod</strong> validation</td></tr>
<tr><td>🚀 Deployment</td><td><strong>Vercel</strong> (Frontend) + <strong>Convex Cloud</strong> (Backend)</td></tr>
</table>

<br/>

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                       │
│                     Next.js 15 + React 19                     │
│                                                               │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐  │
│  │  Landing     │  │  Dashboard   │  │  Community Feed     │  │
│  │  Page        │  │  + Analytics │  │  + Profiles          │  │
│  └─────────────┘  └──────────────┘  └─────────────────────┘  │
└────────────┬──────────────┬──────────────────┬────────────────┘
             │              │                  │
    ┌────────▼────────┐  ┌──▼──────────┐  ┌───▼────────────┐
    │  Clerk Auth     │  │  Convex     │  │  Server Actions │
    │  (JWT + SSO)    │  │  (Realtime) │  │  (Gemini AI)    │
    └─────────────────┘  └──────┬──────┘  └───┬────────────┘
                                │              │
                         ┌──────▼──────┐  ┌───▼────────────┐
                         │  Convex DB  │  │  Google Gemini  │
                         │  (NoSQL)    │  │  API            │
                         └─────────────┘  └────────────────┘
```

<br/>

## 📁 Project Structure

```
ai-creator-platform/
├── 📂 app/                          # Next.js App Router
│   ├── 📂 (auth)/                   # Auth routes (sign-in, sign-up)
│   ├── 📂 (public)/                 # Public pages (feed, profiles, posts)
│   ├── 📂 dashboard/                # Protected creator hub
│   │   ├── 📄 page.jsx              # Analytics dashboard
│   │   ├── 📂 create/               # Post editor
│   │   ├── 📂 posts/                # Post management + editing
│   │   ├── 📂 followers/            # Follower/following lists
│   │   └── 📂 settings/             # User settings
│   ├── 📂 actions/                  # Server actions
│   │   └── 📄 gemini.js             # AI content generation
│   └── 📂 api/imagekit/             # Image upload endpoint
│
├── 📂 components/                   # React components
│   ├── 📂 ui/                       # Shadcn UI + custom components
│   ├── 📄 header.jsx                # Glass-morphism navbar
│   ├── 📄 hero-section.jsx          # Animated hero (80-frame canvas)
│   ├── 📄 post-editor.jsx           # Main editor orchestrator
│   ├── 📄 post-editor-content.jsx   # Rich text editing area
│   ├── 📄 post-editor-header.jsx    # Editor toolbar
│   ├── 📄 post-editor-settings.jsx  # Tags, category, scheduling
│   └── 📄 image-upload-modal.jsx    # ImageKit drag-and-drop uploader
│
├── 📂 convex/                       # Convex backend
│   ├── 📄 schema.js                 # Database schema (6 tables)
│   ├── 📄 posts.js                  # CRUD + cascading delete
│   ├── 📄 users.js                  # User management
│   ├── 📄 feed.js                   # Feed + trending algorithms
│   ├── 📄 dashboard.js              # Analytics aggregation
│   ├── 📄 comments.js               # Comment system
│   ├── 📄 likes.js                  # Like/unlike toggle
│   ├── 📄 follows.js                # Follow system
│   └── 📄 seed.js                   # Database seeder
│
├── 📂 hooks/                        # Custom React hooks
├── 📂 lib/                          # Utilities + data constants
└── 📂 public/                       # Static assets + hero frames
```

<br/>

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A [Convex](https://convex.dev) account
- A [Clerk](https://clerk.com) account
- A [Google AI Studio](https://aistudio.google.com) API key
- An [ImageKit](https://imagekit.io) account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SiddharthChaturvedii/Lumora-Full-Stack-AI-CMS-Platform.git
cd Lumora-Full-Stack-AI-CMS-Platform

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your API keys (see below)

# 4. Initialize Convex
npx convex dev

# 5. Start the development server (in a new terminal)
npm run dev

# 6. (Optional) Seed the database with dummy data
npx convex run seed:generateSeedData
```

### Environment Variables

Create a `.env.local` file with the following:

```env
# Convex
CONVEX_DEPLOYMENT=your_convex_deployment
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Google Gemini AI
GEMINI_API_KEY=your_gemini_key

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
```

<br/>

## 🛡️ Production Hardening

This isn't a toy project. The backend is **bulletproofed** against real production issues:

| Issue | Solution |
|-------|----------|
| `NaN` poisoning in like/view counters | All counters use `\|\| 0` fallback guards |
| Orphaned data on post deletion | Cascading delete cleans up likes, comments, and stats |
| Empty query crashes | `q.or()` guarded against zero-argument calls |
| API key exposure | AI calls routed through secure Next.js Server Actions |
| JWT verification | Every mutation validates Clerk identity tokens |

<br/>

## 📱 Responsive Design

Lumora is fully responsive from **375px mobile** to **4K desktop**:

- 📱 Adaptive glass-morphism navbar with responsive button text
- 📊 Dashboard charts reflow for mobile layouts
- ✍️ Editor collapses gracefully on smaller screens
- 🃏 Feature cards stack in a single column on mobile

<br/>

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/SiddharthChaturvedii/Lumora-Full-Stack-AI-CMS-Platform/issues).

<br/>

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

<br/>

---

<p align="center">
  Made with ❤️ by <strong>Siddharth Chaturvedi</strong>
</p>

<p align="center">
  <a href="https://github.com/SiddharthChaturvedii">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
  <a href="https://linkedin.com/in/siddharthchaturvedii">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
</p>

<p align="center">
  <sub>⭐ Star this repo if you found it useful!</sub>
</p>
