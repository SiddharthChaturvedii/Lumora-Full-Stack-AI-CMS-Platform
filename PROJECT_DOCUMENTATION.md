# AI Creator Platform (Lumora / Creatr) - Project Documentation

## 1. Project Overview
The **AI Creator Platform** (branded as **Creatr**) is a comprehensive, full-stack content creation and community platform designed for modern creators. It provides users with a seamless environment to draft, publish, and manage rich-text articles while leveraging powerful Artificial Intelligence tools to assist in the writing process.

The platform allows users to build a following, track analytics on their content, engage with a community through comments and likes, and dynamically generate or improve their writing using integrated Google Gemini AI.

## 2. Key Features
- **AI-Powered Content Generation:** Integrated with Google Gemini to automatically generate full article drafts from a single title or improve/expand/simplify existing text blocks.
- **Rich Text Editor:** A robust, distraction-free writing interface (powered by React Quill) supporting formatting, lists, and embedded media with auto-save for drafts.
- **Real-Time Data Sync:** Powered by Convex, ensuring that likes, comments, and follower updates reflect instantly across all clients without manual refreshing.
- **Creator Dashboard & Analytics:** A dedicated analytics hub with daily view charts (Chart.js), follower growth tracking, recent activity feeds, and post performance metrics.
- **Secure Authentication:** Integrated Clerk handling secure sign-ups, sign-ins, and session management with JWT-based authorization.
- **Media Management:** Direct integration with ImageKit to efficiently compress, store, and serve user-uploaded images with background removal, smart crop, and text overlay capabilities.
- **Community Feed:** A social-media-style feed with "For You" and "Trending" tabs, suggested users, quick post creation, and engagement tools.
- **Follow System:** Full follow/unfollow system with mutual follow detection, follower/following lists, and follower-based content prioritization.
- **Interactive Landing Page:** Premium landing page with scroll-triggered hero animations (80-frame canvas sequence), sticky scroll transitions, ghost cursor WebGL effects, tilted 3D card interactions, and electric border animations.
- **Clickable Feature Cards:** Landing page feature cards route users directly to relevant app sections with URL query parameter-based automatic modal opening (e.g., `?feature=image` auto-opens the image upload modal).
- **Content Scheduling:** Posts can be scheduled for future publishing with date picker integration.
- **Responsive Mobile Design:** Fully responsive from 375px mobile to desktop, with adaptive navigation, touch-friendly interactions, and a glass-morphism navbar.

## 3. Technology Stack
| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | Next.js 15 (App Router) & React 19 |
| **Backend & Database** | Convex (Serverless functions + Realtime NoSQL) |
| **Authentication** | Clerk (JWT-based, middleware-protected routes) |
| **AI Integration** | Google Generative AI (Gemini Flash) |
| **Styling & UI** | Tailwind CSS 4, Shadcn UI, Framer Motion |
| **Rich Text Editor** | React Quill New |
| **Charts** | Chart.js + react-chartjs-2 |
| **Media CDN** | ImageKit |
| **Form Handling** | React Hook Form + Zod validation |
| **Deployment** | Vercel (Frontend) + Convex Cloud (Backend) |

## 4. Architecture & Data Flow
1. **Client (Browser):** The user interacts with the Next.js React frontend.
2. **Authentication:** When a user logs in via Clerk, Clerk issues a JWT token.
3. **Backend Communication:** The frontend uses Convex React hooks (`useQuery`, `useMutation`) to securely fetch or modify data. The Convex backend verifies the Clerk JWT to ensure the user is authorized.
4. **AI Generation:** When a user requests content generation, the frontend triggers a Next.js Server Action (`app/actions/gemini.js`). This server action securely calls the Gemini API, preventing API keys from being exposed to the client, and returns the generated content back to the rich text editor.
5. **Image Processing:** User uploaded images are sent securely to ImageKit via a signed upload endpoint (`/api/imagekit/upload`), returning a high-performance CDN URL that is then saved in the Convex database.
6. **Cascading Data Integrity:** Post deletion automatically cleans up all related likes, comments, and daily analytics records to prevent orphaned data.

## 5. File & Folder Structure Explanation

### `app/` (Next.js Application Router)
Handles all the routing, pages, and server actions.
- **`(auth)/`**: Contains authentication routes like `/sign-in` and `/sign-up`. The parentheses mean this folder doesn't affect the URL path.
- **`(public)/`**: Contains public-facing pages that anyone can view, like `/feed` (the community timeline), `/[username]` (public profile), and `/[username]/[postId]` (reading a specific post).
- **`dashboard/`**: The private creator hub. Includes the user's analytics (`/dashboard`), followers list (`/dashboard/followers`), post management (`/dashboard/posts`), settings (`/dashboard/settings`), and the post creation/editing interface (`/dashboard/create`).
- **`actions/gemini.js`**: A Secure Server Action containing the logic to communicate with the Google Gemini API to generate or refine text.
- **`api/imagekit/`**: API route for generating secure ImageKit upload tokens.
- **`playground/`**: A testing/playground page for trying out UI components.

### `components/` (React UI Components)
Reusable UI elements broken down for maintainability.
- **`ui/`**: Contains raw Shadcn UI components (buttons, dialogs, dropdowns, inputs, etc.) plus custom components like `ghost-cursor.jsx` (WebGL cursor effect), `electric-border.jsx` (animated borders), and `tilted-card.jsx` (3D perspective cards).
- **`header.jsx`**: The main glass-morphism navigation bar with responsive mobile layout.
- **`hero-section.jsx`**: The scroll-triggered hero with 80-frame canvas animation sequence.
- **`post-editor/` elements** (`post-editor.jsx`, `post-editor-content.jsx`, `post-editor-header.jsx`, `post-editor-settings.jsx`): The core creation interface. Split into "header" (saving/publishing), "content" (rich text editing + AI tools), and "settings" (cover images, tags, scheduling). Automatically opens relevant modals via URL query parameters.
- **`image-upload-modal.jsx`**: Image upload with drag-and-drop, ImageKit integration, and AI transformation options.
- **`convex-client-provider.jsx`**: Wraps the application to inject the Convex and Clerk configuration, enabling real-time hooks everywhere.

### `convex/` (Backend Logic & Database)
Everything related to serverless database operations and rules.
- **`schema.js`**: The blueprint of the database. Defines tables for `users`, `posts`, `comments`, `likes`, `follows`, and `dailyStats` with full indexing for performance.
- **`auth.config.js`**: Connects Convex with Clerk by validating JWT Issuer Domains.
- **`posts.js`**: CRUD operations for posts with draft management, publish flow, and cascading delete (cleans up likes, comments, and stats).
- **`users.js`**: User registration, profile management, and username validation.
- **`comments.js`**: Comment creation with content validation, author-enriched retrieval, and dual-authorization deletion (comment author or post owner).
- **`likes.js`**: Like/unlike toggle with NaN-safe counter management.
- **`follows.js`**: Follow/unfollow system with mutual-follow detection and enriched follower/following lists.
- **`feed.js`**: Feed generation with "For You" and "Trending" algorithms based on engagement scoring.
- **`dashboard.js`**: Analytics aggregation, recent activity feeds, and daily view chart data with edge-case handling.
- **`public.js`**: Public post retrieval, view count incrementing with daily stats tracking.
- **`seed.js`**: Utility script to populate the database with dummy data for testing.

### Root Config Files
- **`next.config.mjs`**: Configures Next.js behavior, specifically whitelisting external image domains (Unsplash, Clerk, ImageKit, Pravatar, Picsum) so Next's `<Image>` component can optimize them.
- **`.env.local`**: Stores private environment variables (API keys, secrets) safely away from version control.
- **`middleware.js`**: Uses Clerk to check if a user is logged in before allowing them to access protected `/dashboard` routes.

## 6. Recent Updates
- **Bulletproof Backend:** All Convex functions hardened against NaN corruption, empty query crashes, and orphaned data on deletion.
- **Clickable Feature Cards:** Landing page cards now link to specific app sections with smart URL-parameter-based modal auto-opening.
- **Sticky Scroll Transitions:** "How it works" section pins to viewport while "Loved by creators" slides over it.
- **Mobile Responsive Navbar:** Fixed overflow on small screens with adaptive button text and tighter spacing.
- **Gemini AI Model Fix:** Migrated from deprecated `gemini-1.5-flash` to working `gemini-flash-latest`.

---
*Last updated: February 26, 2026*
