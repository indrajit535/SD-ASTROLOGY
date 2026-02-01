/**
 * Dark Astrology / Cosmic / Premium Color Theme
 * Following strict design requirements:
 * - Background: Midnight Blue / Deep Purple
 * - Gradients: Blue → Purple → Violet
 * - Accent Glow: Soft Cyan / Neon Blue
 * - Text: White & Soft Gray
 */

export const colors = {
  // Primary Background Colors
  background: {
    primary: '#0A0E2A',      // Midnight Blue
    secondary: '#1A1F40',    // Deep Navy
    tertiary: '#2A1F5A',     // Deep Purple
    card: 'rgba(26, 31, 64, 0.7)', // Glassmorphism card background
  },

  // Gradient Colors (Blue → Purple → Violet)
  gradients: {
    primary: 'linear-gradient(135deg, #1E3A8A 0%, #7C3AED 50%, #8B5CF6 100%)',
    secondary: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
    dark: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #2E1065 100%)',
    cosmic: 'linear-gradient(135deg, #1E40AF 0%, #5B21B6 50%, #7C3AED 100%)',
    soft: 'linear-gradient(135deg, rgba(30, 58, 138, 0.8) 0%, rgba(124, 58, 237, 0.8) 100%)',
  },

  // Accent Colors (Glow Effects)
  accent: {
    cyan: '#22D3EE',         // Soft Cyan
    neonBlue: '#3B82F6',     // Neon Blue
    electricBlue: '#00E5FF', // Electric Blue
    violet: '#8B5CF6',       // Violet
    pink: '#EC4899',         // Magenta Pink
  },

  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#E5E7EB',
    tertiary: '#9CA3AF',
    muted: '#6B7280',
    inverted: '#0F172A',
  },

  // UI Element Colors
  ui: {
    border: 'rgba(59, 130, 246, 0.3)',
    borderGlow: 'rgba(59, 130, 246, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(10, 14, 42, 0.85)',
  },

  // Status Colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // Glassmorphism Effects
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.07)',
    dark: 'rgba(0, 0, 0, 0.2)',
    border: 'rgba(255, 255, 255, 0.18)',
  },

  // Specific Component Colors
  components: {
    button: {
      primary: '#3B82F6',
      hover: '#2563EB',
      active: '#1D4ED8',
      disabled: 'rgba(59, 130, 246, 0.5)',
    },
    input: {
      background: 'rgba(30, 41, 59, 0.5)',
      border: 'rgba(59, 130, 246, 0.3)',
      focus: 'rgba(59, 130, 246, 0.5)',
    },
    card: {
      background: 'rgba(26, 31, 64, 0.7)',
      border: 'rgba(59, 130, 246, 0.2)',
      glow: 'rgba(59, 130, 246, 0.1)',
    },
  },
};

// Helper function to create gradient strings
export const createGradient = (angle = 135, ...colors) => {
  return `linear-gradient(${angle}deg, ${colors.join(', ')})`;
};

// Predefined gradients for common use
export const gradientPresets = {
  cosmicPurple: createGradient(135, '#1E40AF', '#5B21B6', '#7C3AED'),
  blueViolet: createGradient(135, '#3B82F6', '#8B5CF6'),
  sunset: createGradient(135, '#3B82F6', '#8B5CF6', '#EC4899'),
  deepSpace: createGradient(135, '#0F172A', '#1E1B4B', '#2E1065'),
};

export default colors;
