/**
 * Asset utilities with fallback data for development
 */

// Fallback SVG for palm logo (base64 encoded)
export const getPalmLogoSVG = () => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#8B5CF6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="250" cy="250" r="200" fill="url(#gradient)" opacity="0.8"/>
      <path d="M250,150 C300,180 320,250 280,320 C240,390 160,390 120,320 C80,250 100,180 150,150" 
            fill="none" stroke="white" stroke-width="15" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M200,220 C220,240 240,260 250,280 C260,260 280,240 300,220" 
            fill="none" stroke="white" stroke-width="10" stroke-linecap="round" filter="url(#glow)"/>
      <circle cx="250" cy="250" r="60" fill="none" stroke="white" stroke-width="8" opacity="0.7"/>
    </svg>
  `)}`;
};

// Fallback colors for tarot cards (when images not available)
export const getTarotCardColor = (cardNumber) => {
  const colors = [
    '#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B',
    '#EF4444', '#6366F1', '#8B5CF6', '#EC4899', '#3B82F6',
    '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#8B5CF6',
    '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
    '#6366F1', '#8B5CF6'
  ];
  return colors[cardNumber - 1] || '#3B82F6';
};

// Zodiac sign colors
export const zodiacColors = {
  aries: '#EF4444',
  taurus: '#10B981',
  gemini: '#F59E0B',
  cancer: '#3B82F6',
  leo: '#F59E0B',
  virgo: '#10B981',
  libra: '#8B5CF6',
  scorpio: '#EF4444',
  sagittarius: '#F59E0B',
  capricorn: '#6B7280',
  aquarius: '#3B82F6',
  pisces: '#8B5CF6'
};

// Simple SVG for zodiac signs (fallback)
export const getZodiacSVG = (sign) => {
  const symbols = {
    aries: '♈',
    taurus: '♉',
    gemini: '♊',
    cancer: '♋',
    leo: '♌',
    virgo: '♍',
    libra: '♎',
    scorpio: '♏',
    sagittarius: '♐',
    capricorn: '♑',
    aquarius: '♒',
    pisces: '♓'
  };
  
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="${zodiacColors[sign] || '#3B82F6'}" opacity="0.8"/>
      <text x="50" y="60" text-anchor="middle" font-family="Arial" font-size="40" fill="white">${symbols[sign] || '?'}</text>
    </svg>
  `)}`;
};

// Check if asset exists
export const assetExists = async (path) => {
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Get asset URL with fallback
export const getAssetUrl = async (path, fallback) => {
  const exists = await assetExists(path);
  if (exists) {
    return path;
  }
  
  // Return fallback if asset doesn't exist
  if (typeof fallback === 'function') {
    return fallback();
  }
  return fallback;
};

export default {
  getPalmLogoSVG,
  getTarotCardColor,
  zodiacColors,
  getZodiacSVG,
  assetExists,
  getAssetUrl
};
