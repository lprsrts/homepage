# Content Management

## Pages

Edit sample data in page files:
- `app/blog/page.tsx` - Blog posts
- `app/meditations/page.tsx` - Meditations
- `app/projects/page.tsx` - Projects
- `app/updates/page.tsx` - Updates
- `app/media/page.tsx` - Media
- `app/shop/page.tsx` - Shop

## Admin Panel Method

Use `/admin/login` to manage:
- Blog posts (create/edit/delete)
- Media files
- Meditation posts
- Page visibility

## Markdown Files

Blog posts and meditations support markdown files in `data/`:
- `data/blog/*.md`
- `data/meditations/*.md`

Frontmatter format:
```markdown
---
title: Post Title
date: 2025-01-01
excerpt: Brief description
---

Content here
```

## Images

Add images to `public/` directory. Reference as `/image.jpg` in content.

## Profile Pictures

Theme-aware images:
- `public/profile-light.png` - Light themes
- `public/profile-dark.png` - Dark themes

Usage in `app/page.tsx`:
```tsx
<ThemeAwareProfilePicture
  lightImage="/profile-light.png"
  darkImage="/profile-dark.png"
/>
```
