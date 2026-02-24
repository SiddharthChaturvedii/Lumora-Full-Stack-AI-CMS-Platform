# AI Creator Platform (Lumora) - Project Documentation

## 1. Project Overview
The **AI Creator Platform** (also known as Lumora) is a comprehensive, full-stack content creation and community platform designed for modern creators. It provides users with a seamless environment to draft, publish, and manage rich-text articles while leveraging powerful Artificial Intelligence tools to assist in the writing process. 

The platform allows users to build a following, track analytics on their content, engage with a community through comments and likes, and dynamically generate or improve their writing using integrated Google Gemini AI.

## 2. Key Features
- **AI-Powered Content Generation:** Integrated with Google Gemini to automatically generate full article drafts from a single title or improve/expand upon existing text blocks.
- **Rich Text Editor:** A robust, distraction-free writing interface (powered by React Quill/Editor tools) supporting formatting, lists, and embedded media.
- **Real-Time Data Sync:** Powered by Convex, ensuring that likes, comments, and follower updates reflect instantly across all clients without manual refreshing.
- **Creator Dashboard & Analytics:** A dedicated analytics hub for content creators to view daily statistics, follower growth, and post performance.
- **Secure Authentication:** Integrated Clerk handling secure sign-ups, sign-ins, and session management.
- **Media Management:** Direct integration with ImageKit to efficiently compress, store, and serve user-uploaded images and post covers.

## 3. Technology Stack
- **Frontend Framework:** Next.js 15 (App Router) & React 19
- **Backend & Database:** Convex (Serverless functions and realtime NoSQL database)
- **Authentication:** Clerk
- **AI Integration:** Google Generative AI (Gemini Flash)
- **Styling & UI:** Tailwind CSS, Shadcn UI, Framer Motion (for animations), Tailwind Merge
- **Media CDN:** ImageKit

## 4. Architecture & Data Flow
1. **Client (Browser):** The user interacts with the Next.js React frontend.
2. **Authentication:** When a user logs in via Clerk, Clerk issues a JWT token.
3. **Backend Communication:** The frontend uses Convex React hooks (`useQuery`, `useMutation`) to securely fetch or modify data. The Convex backend verifies the Clerk JWT to ensure the user is authorized.
4. **AI Generation:** When a user asks generating content, the frontend triggers a Next.js Server Action (`app/actions/gemini.js`). This server action securely calls the Gemini API, preventing API keys from being exposed to the client, and returns the generated content back to the rich text editor.
5. **Image Processing:** User uploaded images are sent securely to ImageKit, returning a high-performance URL that is then saved in the Convex database.

## 5. File & Folder Structure Explanation

### `app/` (Next.js Application Router)
Handles all the routing, pages, and server actions.
- **`(auth)/`**: Contains authentication routes like `/sign-in` and `/sign-up`. The parentheses mean this folder doesn't affect the URL path.
- **`(public)/`**: Contains public-facing pages that anyone can view, like `/feed` (the community timeline), `/[username]` (public profile), and `/[username]/[postId]` (reading a specific post).
- **`dashboard/`**: The private creator hub. Includes the user's analytics (`/dashboard`), followers list (`/dashboard/followers`), and the post creation/editing interface (`/dashboard/create`).
- **`actions/gemini.js`**: A Secure Server Action containing the logic to communicate with the Google Gemini API to generate or refine text.

### `components/` (React UI Components)
Reusable UI elements broken down for maintainability.
- **`ui/`**: Contains raw Shadcn UI components (buttons, dialogs, dropdowns, inputs, etc.) which are unopinionated, styled building blocks.
- **`header.jsx`**: The main navigation bar seen across the application.
- **`post-editor/` elements** (`post-editor.jsx`, `post-editor-content.jsx`, `post-editor-header.jsx`, `post-editor-settings.jsx`): This is where the core creation happens. Splitting the complex editor into "header" (saving/publishing), "content" (the typing area), and "settings" (cover images, tags) keeps the code readable.
- **`image-upload-modal.jsx`**: A specialized component to handle dragging-and-dropping images to ImageKit.
- **`convex-client-provider.jsx`**: Wraps the application to inject the Convex and Clerk configuration, enabling real-time hooks everywhere.

### `convex/` (Backend Logic & Database)
Everything related to serverless database operations and rules.
- **`schema.js`**: The blueprint of the database. Defines tables for `users`, `posts`, `comments`, `likes`, `follows`, and `dailyStats`. Enforces data types and creates indexes for fast searching.
- **`auth.config.js`**: Connects Convex with Clerk by validating JWT Issuer Domains.
- **`posts.js`, `users.js`, `comments.js`, `feed.js`**: These files contain the actual server functions (Queries & Mutations) that the frontend calls to read from or write to the database safely. 
- **`seed.js`**: A utility script to populate the development database with dummy data for testing purposes.

### Root Config Files
- **`next.config.mjs`**: Configures Next.js behavior, specifically whitelisting external image domains (Unsplash, Clerk, ImageKit, etc.) so Next's `<Image>` component can optimize them.
- **`.env.local`**: Stores strict, private environment variables (API keys, secrets) safely away from version control.
- **`middleware.js`**: Runs before a request finishes. In this app, it uses Clerk to check if a user is logged in before allowing them to access protected `/dashboard` routes.

---
*Note: This document is dynamic and will be updated as new frontend styling, features, or architectural changes are implemented during development.*
