# Deployment Instructions for NASA CosmoScope

## 📋 Prerequisites

1. Make sure you have a GitHub account
2. The repository https://github.com/Romio1310/NASA-CosmoScope.git should exist on GitHub
3. You have Node.js installed locally (for testing)

## 🚀 Deploy to GitHub

### Step 1: Push to GitHub

```bash
# Navigate to your project directory
cd /Users/codname_gd/Downloads/project

# Push to GitHub (first time)
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/Romio1310/NASA-CosmoScope
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The deployment will happen automatically when you push to main branch

### Step 3: Manual Deployment (Alternative)

If you prefer manual deployment using gh-pages:

```bash
# Install gh-pages globally (if not already installed)
npm install -g gh-pages

# Deploy manually
npm run deploy
```

## 🌐 Access Your Site

After deployment, your site will be available at:
**https://romio1310.github.io/NASA-CosmoScope/**

## 🔄 Automatic Deployment

The project is configured with GitHub Actions for automatic deployment:
- Every push to the `main` branch will trigger a new deployment
- The workflow builds the project and deploys it to GitHub Pages
- No manual intervention required after initial setup

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Notes

- The project is configured for GitHub Pages with the correct base path
- All Bolt-specific dependencies have been removed
- Supabase has been removed as it wasn't being used
- The build is optimized for production deployment