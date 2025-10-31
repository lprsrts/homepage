# Theme System

The website includes a flexible theme switching system with 8 pre-built themes. Users can switch themes using the dropdown menu in the bottom-right corner.

## Available Themes

1. **Default Light** - Classic light monochromatic design
2. **Default Dark** - Inverted dark monochromatic design
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
  light_shade: string;   // Lightest background color
  light_accent: string;  // Light accent/hover color
  main: string;          // Main text/foreground color
  dark_accent: string;   // Dark accent/border color
  dark_shade: string;    // Muted/secondary text color
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

### Theme Colors
- `--color-light-shade`: Lightest background color
- `--color-light-accent`: Light accent/hover color  
- `--color-main`: Main text/foreground color
- `--color-dark-accent`: Dark accent/border color
- `--color-dark-shade`: Muted/secondary text color

### Semantic Colors
- `--color-primary`: Primary action color (maps to `--color-main`)
- `--color-info`: Informational color (maps to `--color-dark-accent`)
- `--color-success`: Success state color (#22c55e green)
- `--color-warning`: Warning state color (#f59e0b amber)
- `--color-danger`: Danger/error state color (#ef4444 red)

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
  backgroundColor: "var(--color-light-shade)",
  color: "var(--color-main)",
  borderColor: "var(--color-dark-accent)"
}}>
  Content
</div>
```

Or in CSS:

```css
.my-element {
  background-color: var(--color-light-shade);
  color: var(--color-main);
  border-color: var(--color-dark-accent);
}
```

### Semantic Color Classes

Pre-built utility classes for common UI patterns:

**Button Classes:**
```tsx
<button className="btn-primary">Primary Action</button>
<button className="btn-success">Success</button>
<button className="btn-warning">Warning</button>
<button className="btn-danger">Danger</button>
<button className="btn-info">Info</button>
```

**Text Classes:**
```tsx
<p className="text-primary">Primary text</p>
<p className="text-success">Success message</p>
<p className="text-warning">Warning message</p>
<p className="text-danger">Error message</p>
<p className="text-info">Info message</p>
<p className="text-muted">Muted text</p>
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
