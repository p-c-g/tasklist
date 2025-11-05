# 🚀 Deployment Guide

This guide will help you deploy your Todo List App to Vercel and set up version control with Git.

## 📋 Prerequisites

- Node.js 18.0 or later installed
- A GitHub account
- A Vercel account (free tier available)

## 🔧 Step 1: Install Dependencies

First, make sure all dependencies are installed:

```bash
npm install
```

Test the app locally:

```bash
npm run dev
```

Visit `http://localhost:3000` to ensure everything works.

## 📦 Step 2: Set Up Git Repository

### Initialize Git

```bash
git init
```

### Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., "todo-list-app")
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### Connect and Push to GitHub

Replace `<your-username>` and `<your-repo-name>` with your actual values:

```bash
git add .
git commit -m "Initial commit: Todo List App"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

## 🌐 Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in (use your GitHub account)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will automatically detect Next.js settings:
   - Framework Preset: **Next.js**
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`
5. Click "Deploy"
6. Wait for deployment (usually takes 1-2 minutes)
7. Your app is now live! 🎉

### Option B: Deploy via Vercel CLI

Install Vercel CLI:

```bash
npm install -g vercel
```

Deploy:

```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? (default or custom name)
- In which directory is your code located? `./`
- Vercel will auto-detect Next.js settings
- Deploy? **Y**

For production deployment:

```bash
vercel --prod
```

## 🔄 Step 4: Continuous Deployment

Once connected to GitHub, Vercel automatically:
- ✅ Deploys every push to `main` branch
- ✅ Creates preview deployments for pull requests
- ✅ Provides unique URLs for each deployment

### Future Updates

Just push to GitHub:

```bash
git add .
git commit -m "Add new feature"
git push
```

Vercel will automatically deploy your changes! 🚀

## 🔧 Environment Variables (For Future Backend Integration)

When you add Supabase later:

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Environment Variables"
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy for changes to take effect

## 📊 Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Vercel provides free SSL certificates automatically!

## 🐛 Troubleshooting

### Build Fails

Check build logs in Vercel Dashboard:
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Environment Variables Not Working

- Prefix browser-side variables with `NEXT_PUBLIC_`
- Redeploy after adding new variables

### Module Not Found Errors

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📈 Performance Optimization

Your app is already optimized with:
- ✅ Static generation (SSG)
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Edge network CDN

## 🔒 Security Best Practices

- Never commit `.env.local` files
- Use Vercel's environment variables for secrets
- Keep dependencies updated: `npm update`

## 📱 Testing Your Deployment

After deployment, test:
- ✅ Add, edit, delete tasks
- ✅ Filter functionality
- ✅ Local storage persistence
- ✅ Mobile responsiveness
- ✅ Page load speed

## 🎯 Next Steps

Your app is now live! To add backend functionality:

1. Create a Supabase account
2. Set up a database
3. Add authentication
4. Update the app to use Supabase SDK
5. Add environment variables to Vercel

## 📚 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Guides](https://guides.github.com)
- [Supabase Documentation](https://supabase.com/docs)

---

Need help? Check the [main README](./README.md) or create an issue on GitHub!

