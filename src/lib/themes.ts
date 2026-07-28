/**
 * Central list of package themes — the single source of truth.
 *
 * Used by:
 *  - the package CMS ThemeSelector (which themes a package can belong to)
 *  - the theme hub CMS (which theme a hub page represents)
 *
 * Add or remove a theme here and it updates everywhere. Values are matched
 * case-sensitively between Package.themes and ThemeHub.themeName, so keep the
 * casing here exactly as it should appear.
 */
export const THEMES: string[] = [
  'Family',
  'Honeymoon',
  'Budget',
  'Luxury',
  'Adventure',
  'Group',
  'Solo',
  'Pilgrimage',
  'Wildlife',
  'Winter',
  'Weekend',
];
