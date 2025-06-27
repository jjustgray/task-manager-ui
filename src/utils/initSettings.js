export const initSettings = () => {
  const defaultSettings = {
    theme: 'light',
    language: 'uk',
    notifications: true,
    autoSave: false,
  };

  const stored = localStorage.getItem('appSettings');
  if (!stored) {
    localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
    localStorage.setItem('language', defaultSettings.language);
  }
};
