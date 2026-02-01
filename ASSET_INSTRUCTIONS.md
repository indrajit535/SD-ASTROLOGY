# Asset Files Required for AI Palm Reader App

## Place the following image files in this directory:

### 1. Background Images
- `splash-bg.jpg` - Full-screen splash background (1920x1080 minimum)
  - Cosmic/space theme with purple/blue gradient
  - Subtle glowing effects
  - Optimized for mobile loading

- `cosmic-bg.jpg` - Main app background (1920x1080 minimum)
  - Dark space/nebula theme
  - Deep purple/blue colors
  - Subtle star effects

### 2. Logo
- `palm-logo.svg` - App logo (500x500)
  - Palm hand symbol
  - Cosmic/glowing effects
  - Transparent background
  - Vector format for scalability

### 3. Tarot Cards (22 images)
Directory: `tarot-cards/`
- `card-01.jpg` to `card-22.jpg`
- Standard Rider-Waite tarot deck
- Each card: 400x600 pixels
- Consistent art style
- High quality, mystical aesthetic

### 4. Zodiac Icons (12 icons)
Directory: `zodiac-icons/`
- `aries.svg` to `pisces.svg`
- Each icon: 100x100 pixels
- Zodiac symbol with cosmic theme
- Vector format preferred
- Consistent color scheme

### 5. Onboarding Illustrations (3 images)
- `onboarding-1.svg` - Tarot introduction (300x300)
- `onboarding-2.svg` - Palm reading (300x300)
- `onboarding-3.svg` - AI guidance (300x300)
- Simple, clean illustrations
- Cosmic/spiritual theme
- Consistent style

## Development Notes:
1. The app includes CSS fallbacks for missing images
2. Placeholder emojis are used during development
3. All images should be optimized for mobile (WebP preferred)
4. Maintain dark theme color palette
5. Use transparency where appropriate for glassmorphism effects

## Recommended Sources:
- Unsplash for cosmic backgrounds (search: "nebula purple space")
- Freepik/Flaticon for icons (spiritual/astrology theme)
- Open source tarot card images
- Custom SVG illustrations for onboarding

## File Size Guidelines:
- Backgrounds: < 500KB
- Icons: < 50KB each
- Tarot cards: < 100KB each
- Onboarding: < 200KB each

## Color Palette:
- Primary: #3B82F6 (blue)
- Secondary: #8B5CF6 (purple)
- Accent: #EC4899 (pink)
- Background: #0A0E2A (midnight blue)

## Fallback System:
If images are missing, the app will use:
- CSS gradients for backgrounds
- Emojis for icons
- Colored divs for cards
