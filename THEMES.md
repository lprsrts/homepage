# Theme System

The website includes a flexible theme switching system with 8 pre-built themes. Users can switch themes using the dropdown menu in the bottom-right corner.

## Available Themes

1. **Default (Black & White)** - Classic monochromatic design
2. **Dark** - Inverted black background with white text
3. **Sepia** - Warm, vintage paper tones
4. **Forest** - Natural green tones
5. **Ocean** - Cool blue tones
6. **Sunset** - Warm orange and brown tones
7. **Midnight** - Deep blue with purple accents
8. **Minimal Gray** - Subtle gray variations

## Theme Configuration

Themes are defined in `config/themes.ts`. Each theme includes 5 color properties:

```typescript
{
  background: string;  // Main background color
  foreground: string;  // Main text color
  border: string;      // Border and accent lines
  accent: string;      // Interactive elements
  muted: string;       // Secondary text and subtle elements
}
```

## Adding Custom Themes

To add a new theme, edit `config/themes.ts`:

```typescript
export const themes: Record<string, Theme> = {
  // ... existing themes
  custom: {
    name: "My Custom Theme",
    colors: {
      background: "#ffffff",
      foreground: "#000000",
      border: "#333333",
      accent: "#666666",
      muted: "#999999",
    },
  },
};
```

The new theme will automatically appear in the theme switcher dropdown.

## CSS Variables

The theme system uses CSS custom properties:

- `--color-background`: Main background color
- `--color-foreground`: Main text color
- `--color-border`: Border color
- `--color-accent`: Accent color for interactive elements
- `--color-muted`: Muted text color

These variables are set dynamically when the user switches themes and persist in localStorage.

## Implementation Details

### Components

- **ThemeProvider** (`components/ThemeProvider.tsx`): Context provider that manages theme state
- **ThemeSwitcher** (`components/ThemeSwitcher.tsx`): Dropdown UI component
- **themes.ts** (`config/themes.ts`): Theme definitions

### Usage in Components

Use CSS variables in your components:

```tsx
<div style={{ 
  backgroundColor: "var(--color-background)",
  color: "var(--color-foreground)",
  borderColor: "var(--color-border)"
}}>
  Content
</div>
```

Or in CSS:

```css
.my-element {
  background-color: var(--color-background);
  color: var(--color-foreground);
  border-color: var(--color-border);
}
```

## User Experience

- Theme selection persists across page reloads (stored in localStorage)
- Smooth color transitions (0.3s ease)
- No flash of unstyled content on page load
- Theme switcher is fixed in bottom-right corner
- Selected theme is marked with a checkmark

## Accessibility

- Theme switcher has proper ARIA labels
- All themes maintain sufficient color contrast
- Keyboard accessible dropdown
- Click-outside to close dropdown
