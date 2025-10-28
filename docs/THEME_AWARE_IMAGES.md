# Theme-Aware Images

The `ThemeAwareProfilePicture` component automatically switches between light and dark images based on the current theme.

## Setup

### 1. Add Your Images

Place your two profile pictures in the `public/` folder:
- `public/profile-light.png` - Image for light themes (black transparent)
- `public/profile-dark.png` - Image for dark themes (white transparent)

### 2. Usage

The component is already integrated in the home page:

```tsx
<ThemeAwareProfilePicture
  lightImage="/profile-light.png"
  darkImage="/profile-dark.png"
  alt="Profile Picture"
/>
```

## How It Works

The component:
1. Accesses the current theme's palette via `useTheme()` hook
2. Calculates the luminance of `shade_1` (background color)
3. If luminance > 0.5, it's considered a light theme → shows `lightImage`
4. If luminance ≤ 0.5, it's considered a dark theme → shows `darkImage`

## Props

```typescript
interface ThemeAwareProfilePictureProps {
  lightImage: string;   // Path to light theme image
  darkImage: string;    // Path to dark theme image
  alt?: string;         // Alt text (default: "Profile Picture")
  className?: string;   // Additional CSS classes
  size?: number;        // Image dimensions (default: 128)
}
```

## Example Use Cases

### Custom Styling
```tsx
<ThemeAwareProfilePicture
  lightImage="/profile-light.png"
  darkImage="/profile-dark.png"
  className="rounded-full border-2"
  size={256}
/>
```

### Use in Other Components

You can use this component anywhere in your app:

```tsx
import ThemeAwareProfilePicture from "@/components/ThemeAwareProfilePicture";

export default function About() {
  return (
    <div>
      <ThemeAwareProfilePicture
        lightImage="/about-light.png"
        darkImage="/about-dark.png"
      />
    </div>
  );
}
```

## Technical Details

### Luminance Calculation

The component uses the relative luminance formula:
```
L = (0.299 × R + 0.587 × G + 0.114 × B) / 255
```

This follows the Rec. 709 standard for perceived brightness.

### Image Loading

- Uses Next.js `Image` component for optimization
- `priority` flag ensures fast loading on home page
- Supports all image formats (PNG, JPG, WEBP, etc.)

## File Format Recommendations

- **PNG with transparency**: Best for logos with transparent backgrounds
- **WEBP**: Best compression, modern browsers
- **SVG**: Perfect for icons, scalable

For transparent images, PNG or WEBP are recommended.
