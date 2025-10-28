# Cache Troubleshooting

## Why Images Don't Update After Replacement

When you replace images in the `public/` folder with new files using the same filename, browsers and Next.js cache the old images. Here's how to fix it:

## Solutions

### 1. Quick Fix: Clear Cache and Restart Dev Server

```bash
# Delete cache directories
rm -rf .next out

# Restart development server
npm run dev
```

Then hard refresh your browser:
- **Chrome/Firefox/Edge**: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
- **Safari**: `Cmd + Option + R`

### 2. Permanent Solution: Update Version Number

The `ThemeAwareProfilePicture` component has a `version` prop for cache-busting:

```tsx
<ThemeAwareProfilePicture
  lightImage="/profile-light.png"
  darkImage="/profile-dark.png"
  version="2"  // ← Increment this when you replace images
/>
```

**Every time you replace your profile pictures, increment the version:**
- First upload: `version="1"` (or omit, defaults to "1")
- After replacing images: `version="2"`
- After replacing again: `version="3"`
- And so on...

This adds `?v=2` to the image URL, forcing browsers to fetch the new image.

### 3. Alternative: Rename Files

Instead of replacing `profile-light.png`, use a new filename:
- Old: `profile-light.png`, `profile-dark.png`
- New: `profile-light-v2.png`, `profile-dark-v2.png`

Then update your component:
```tsx
<ThemeAwareProfilePicture
  lightImage="/profile-light-v2.png"
  darkImage="/profile-dark-v2.png"
/>
```

### 4. Browser Developer Tools

If issues persist, clear browser cache manually:

**Chrome:**
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

**Firefox:**
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

**Safari:**
1. Enable Develop menu: Preferences → Advanced → Show Develop menu
2. Develop → Empty Caches
3. Then `Cmd + Shift + R`

## Production Builds

For production builds:

```bash
# Clear everything
rm -rf .next out

# Rebuild
npm run build
```

## Understanding Next.js Image Caching

Next.js optimizes images automatically:
- Images are cached in `.next/cache/images`
- During development, use `unoptimized` prop (already set in component)
- The `?v=` query parameter bypasses all caching layers

## Best Practices

1. **Use version numbers** for profile pictures
2. **Clear cache** when switching between development branches
3. **Use unique filenames** for different versions in production
4. **Test in incognito/private mode** to verify cache-free behavior

## Still Not Working?

Check these:
1. File permissions: `ls -la public/` (should be readable)
2. File actually replaced: `ls -lt public/` (check timestamps)
3. Correct file path: files in `public/` are served from `/`
4. Build is running: check terminal for compilation messages
