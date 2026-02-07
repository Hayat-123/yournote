# YourNote ✍️

YourNote is a premium, modern note-taking application designed for focus and ease of use. Built with Next.js 15, Firebase, and Tailwind CSS, it offers a fast and beautiful experience across all your devices.

## ✨ Features

- **Premium Note Editor**: Rich text editor with support for headings, lists, bold, italic, underline, code blocks, and more.
- **Collapsible Sidebar**: Optimize your workspace with a smooth, collapsible navigation sidebar with hover tooltips.
- **Full-Page Editing**: A dedicated, distraction-free environment for your notes.
- **Responsive Design**: Fully functional mobile menu with theme toggling and quick-access auth buttons.
- **Smart Auth**: Integrated Firebase Authentication with auto-switching between login and signup modes.
- **Instant Feedback**: Beautiful toast notifications for every action (Save, Delete, Create, Login).
- **Dark Mode**: Complete theme support with optimized readability for long-form content.

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database/Auth**: [Firebase](https://firebase.google.com/)
- **Editor**: [Tiptap](https://tiptap.dev/)
- **Animations**: [Motion](https://motion.dev/) / [Lucide Icons](https://lucide.dev/)

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Hayat-123/yournote.git
cd yournote
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your Firebase credentials (see `.env.example` for reference):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Deployment

The project is production-ready and optimized for **Vercel**. Check [vercel-deployment.md](./vercel-deployment.md) for detailed instructions.

## 📄 License

This project is licensed under the MIT License.
