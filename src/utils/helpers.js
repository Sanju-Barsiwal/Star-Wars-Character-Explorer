/**
 * Utility functions for the application
 */

/**
 * Format date string to dd-MM-yyyy format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * Get gradient color based on species URL
 * @param {Array} speciesUrl - Array of species URLs
 * @returns {string} Gradient color value
 */
export const getSpeciesColor = (speciesUrl) => {
  const colors = {
    1: { from: '#3b82f6', to: '#06b6d4' }, // Blue to Cyan
    2: { from: '#eab308', to: '#f97316' }, // Yellow to Orange
    3: { from: '#22c55e', to: '#10b981' }, // Green to Emerald
    4: { from: '#a855f7', to: '#ec4899' }, // Purple to Pink
    5: { from: '#ef4444', to: '#f43f5e' }, // Red to Rose
    6: { from: '#6366f1', to: '#8b5cf6' }, // Indigo to Violet
    7: { from: '#f97316', to: '#ef4444' }, // Orange to Red
  };
  
  if (!speciesUrl || speciesUrl.length === 0) {
    return { from: '#6b7280', to: '#4b5563' }; // Gray
  }
  
  const match = speciesUrl[0].match(/\/(\d+)\//);
  const speciesId = match ? match[1] : null;
  
  return colors[speciesId] || { from: '#6b7280', to: '#4b5563' };
};

/**
 * Generate random image URL from Picsum
 * @param {string} seed - Seed for consistent image generation
 * @returns {string} Image URL
 */
export const getRandomImage = (seed) => {
  return `https://picsum.photos/seed/${seed}/400/300`;
};

/**
 * Extract character ID from SWAPI URL
 * @param {string} url - SWAPI character URL
 * @returns {string|null} Character ID
 */
export const getCharacterId = (url) => {
  const match = url.match(/\/people\/(\d+)\//);
  return match ? match[1] : null;
};

/**
 * Format large numbers with commas
 * @param {string|number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (num === 'unknown' || !num) return 'Unknown';
  const parsed = parseInt(num);
  return isNaN(parsed) ? num : parsed.toLocaleString();
};