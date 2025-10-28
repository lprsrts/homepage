# Getting Started Checklist

## ✅ What's Done

Your website is set up and ready! The build passes successfully.

## 🎨 Customize Your Site

### 1. Personal Information (Required)

**File: `app/page.tsx`**
- [ ] Change "Alper Saritas" to your name (line 24)
- [ ] Update "Developer & Creator" subtitle (line 25)
- [ ] Update GitHub URL (line 52)
- [ ] Update Twitter/X URL (line 61)
- [ ] Update email address (line 70)

### 2. Add Profile Picture (Optional but Recommended)

- [ ] Add your photo as `public/profile.jpg`
- [ ] If you want to use the image, update `app/page.tsx` lines 9-10 to:
```tsx
<div className="w-32 h-32 mx-auto rounded-full border-2 border-black bg-gray-200 overflow-hidden">
  <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
</div>
```

### 3. Update Content

Replace sample data in these files:

- [ ] **Blog** (`app/blog/page.tsx` line 5-18)
- [ ] **Meditations** (`app/meditations/page.tsx` line 4-20)
- [ ] **Projects** (`app/projects/page.tsx` line 4-19)
- [ ] **Updates** (`app/updates/page.tsx` line 4-20)
- [ ] **Media** (`app/media/page.tsx` line 4-35)
- [ ] **Shop** (`app/shop/page.tsx` line 4-26)

### 4. Update Site Metadata (Optional)

**File: `app/layout.tsx`**
- [ ] Change site title (line 5)
- [ ] Change site description (line 6)

## 🚀 Test Locally

```bash
# Start development server
npm run dev

# Visit http://localhost:3000
```

## 📦 Deploy

Once you're happy with your changes:

```bash
# Build for production
npm run build

# Deploy (choose one method from DEPLOY.md)
```

## 🔄 Version Control

Initialize git and push to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: Personal website"
git branch -M main
git remote add origin https://github.com/yourusername/homepage.git
git push -u origin main
```

Then deploy via Vercel/Netlify by connecting your GitHub repo.

## 📚 Next Steps

- Read `README.md` for full documentation
- Read `DEPLOY.md` for deployment options
- Add real images to `public/` folder
- Consider adding a CMS for easier content management

## 🆘 Need Help?

- Build failing? Run `npm run build` and check errors
- Styling issues? Check `app/globals.css` and Tailwind classes
- Deploy issues? See `DEPLOY.md` for platform-specific guides

---

**Tech Stack**: Next.js 14, React, TypeScript, Tailwind CSS
