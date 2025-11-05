# 📝 Todo List App

A beautiful, lightweight, and modern todo list application built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components.

![Todo List App](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Features

- ✅ **Add, Edit, and Delete Tasks** - Full CRUD operations for managing your todos
- 🎯 **Filter Tasks** - View all tasks, only active, or only completed
- 💾 **Local Storage** - Your tasks persist across browser sessions
- 🎨 **Beautiful UI** - Modern design with smooth animations and transitions
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Lightning Fast** - Built with Next.js for optimal performance
- ♿ **Accessible** - Keyboard navigation and screen reader friendly

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd "Task list app"
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app!

## 🛠️ Tech Stack

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[class-variance-authority](https://cva.style/)** - CSS variant management

## 📁 Project Structure

```
Task list app/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page
├── components/
│   ├── ui/
│   │   ├── button.tsx       # Button component
│   │   ├── input.tsx        # Input component
│   │   └── checkbox.tsx     # Checkbox component
│   ├── todo-input.tsx       # Todo input form
│   ├── todo-item.tsx        # Individual todo item
│   └── todo-list.tsx        # Main todo list component
├── lib/
│   └── utils.ts             # Utility functions
├── types/
│   └── todo.ts              # TypeScript types
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Key Features Explained

### Local Storage Persistence
Tasks are automatically saved to browser's local storage, so they persist even after closing the browser.

### Filter System
- **All** - Shows all tasks
- **Active** - Shows only incomplete tasks
- **Completed** - Shows only completed tasks

### Inline Editing
Click the edit icon on any task to edit it inline with a smooth transition.

### Keyboard Shortcuts
- `Enter` - Save edited task
- `Escape` - Cancel editing

## 🚢 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy this app is using [Vercel](https://vercel.com):

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "New Project" and import your repository

4. Vercel will automatically detect Next.js and configure the build settings

5. Click "Deploy" and your app will be live in minutes!

### Build for Production

To create an optimized production build:

```bash
npm run build
npm run start
```

## 🔮 Future Enhancements

This is a lightweight frontend-only version. Planned features for future releases:

- 🔐 **User Authentication** - Using Supabase Auth
- ☁️ **Cloud Sync** - Store todos in Supabase database
- 🏷️ **Tags & Categories** - Organize tasks with tags
- 📅 **Due Dates** - Add deadlines to tasks
- 🔔 **Reminders** - Get notified about upcoming tasks
- 🌙 **Dark Mode** - Theme toggle
- 📊 **Analytics** - Task completion statistics
- 🔍 **Search** - Find tasks quickly
- 🎨 **Custom Themes** - Personalize the appearance

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Tips

- The app works completely offline after the initial load
- No backend required - perfect for quick deployments
- Easy to extend with additional features
- Clean, maintainable codebase following best practices

---

Built with ❤️ using Next.js and Tailwind CSS

