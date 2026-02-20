# Customization Guide: AI Creator Platform (Lumora)

## 1. Overview of the Project
**Project Name:** AI Creator Platform (Lumora)

**Description of Functionality:**
This is a robust **Full Stack AI Content Platform** designed to help users generate and manage creative content. It leverages the power of **Google Gemini AI** for content generation and **ImageKit** for media management. The application is built on **Next.js** for a fast, SEO-friendly frontend, uses **Convex** for a scalable real-time backend and database, and secures user access with **Clerk Authentication**. The user interface is polished with **Tailwind CSS** and **Shadcn UI** components, providing a modern and responsive experience.

**Key Features:**
*   **AI Content Generation**: Integrated with Google Gemini.
*   **Authentication**: Secure user sign-up and sign-in streams via Clerk.
*   **Real-time Backend**: Powered by Convex for instant data syncing.
*   **Media Management**: Efficient image uploading and serving with ImageKit.
*   **Modern UI**: Sleek, accessible components using Shadcn UI and Tailwind.

---

## 2. Step-by-Step Customization Guide

### Link Technology and Accounts
To get the application running with your own data and branding, you need to set up accounts for the third-party services used.

1.  **Create a `.env` file**:
    *   In the root directory of your project, create a file named `.env.local` (or simply `.env`).
    *   Copy the structure provided in the `README.md` file.

2.  **Set up Clerk (Authentication)**:
    *   Go to [Clerk.com](https://clerk.com/) and create a new application.
    *   Copy your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` into your `.env` file.
    *   Set the sign-in/sign-up URLs in your `.env` file. Add these lines:
        ```env
        NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
        NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
        ```

3.  **Set up Convex (Backend)**:
    *   Run `npx convex dev` in your terminal. This will prompt you to log in and create a new project in your Convex dashboard.
    *   This command automatically configures your `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` in your `.env.local` file.
    *   Check `convex/schema.ts` if you need to modify the data structure.

4.  **Set up ImageKit (Media)**:
    *   Sign up at [ImageKit.io](https://imagekit.io/).
    *   Retrieve your `Public Key`, `Private Key`, and `URL Endpoint` from the dashboard.
    *   Add these to your `.env` file under the respective ImageKit variables.

5.  **Set up Google Gemini (AI)**:
    *   Get an API key from [Google AI Studio](https://aistudio.google.com/).
    *   Add it to `GEMINI_API_KEY` in your `.env` file.

6.  **Set up Unsplash (Optional)**:
    *   If you plan to use stock photos, get an Access Key from the [Unsplash Developers](https://unsplash.com/developers) portal and add it to `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY`.

### Install Dependencies
Once your environment variables are set, install the necessary code libraries.

1.  Open your terminal in the project directory.
2.  Run the following command:
    ```bash
    npm install --legacy-peer-deps
    ```
    *(This downloads all packages, handling potential React 19 conflicts)*

### Modify the Appearance
Personalize the look and feel to match your brand.

1.  **Global Styles & Colors**:
    *   Navigate to **`app/globals.css`**. Here you can change the base color variables (primary, secondary, accent colors) which control the theme of the entire site.
    *   Update the `body` style to change the default font or background color.

2.  **Branding & Metadata**:
    *   Open **`app/layout.js`**. Update the `title` and `description` in the `metadata` object to reflect your own application's name and purpose.
    *   Replace the `favicon.ico` in the **`app/`** or **`public/`** folder with your own logo.

3.  **UI Components**:
    *   The project uses **Shadcn UI** components located in **`components/ui`**. You can modify these files directly if you want to change the border radius, padding, or specific behavior of buttons, inputs, and cards.

4.  **Landing Page Content**:
    *   Edit **`app/page.js`** to update the hero section, text, and main images that users see when they first arrive.

---

## 3. Best Practices for Fast Customization

*   **Tip 1: Use the "Find" Feature**: fast-track text changes by searching for specific strings (e.g., "Lumora" or "Creator") across the entire project using your editor's search function (Ctrl+Shift+F in VS Code) and replacing them with your brand name.
*   **Tip 2: Test Locally First**: Always run `npm run dev` to see your changes in real-time at `http://localhost:3000` before committing them. This ensures you catch visual bugs early.
*   **Tip 3: Version Control**: After every major step (like linking accounts or finishing the design changes), commit your changes to Git.
    *   `git add .`
    *   `git commit -m "Linked Clerk and Convex accounts"`
    *   This gives you safe "save points" to return to if something breaks.
*   **Tip 4: Clean the Database**: Since you are starting fresh, use the Convex dashboard to clear any sample data in your database tables so your users don't see placeholder content.
