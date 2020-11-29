export const setDarkMode = (
  darkMode: boolean,
): {
  type: string;
  darkMode: boolean;
} => ({
  type: '@options/DARK_MODE',
  darkMode,
});
