import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


const Settings = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);

  const [language, setLanguage] = useState(i18n.language || 'uk');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    if (window.confirm(t('settings.deleteAccountConfirm'))) {
      // Тут очистити локальні дані / токени
      localStorage.clear(); // або видалити конкретні ключі, якщо хочеш
      // Можеш додати логіку звернення до API для видалення акаунта, якщо є

      // Перехід на сторінку логіну
      navigate('/');
    }
  };

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('appSettings'));
    if (savedSettings) {
      setLanguage(savedSettings.language || 'uk');
      setNotifications(savedSettings.notifications ?? true);
      setAutoSave(savedSettings.autoSave ?? false);
      setTheme(savedSettings.theme || 'light');
    }
  }, [setTheme]);

  const handleSave = () => {
    const settings = { theme, language, notifications, autoSave };
    localStorage.setItem('appSettings', JSON.stringify(settings));
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    setMessage(t('settings.save')); // замість alert
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-100 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">{t('settings.title')}</h1>

      <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div>
          <label className="block font-semibold mb-1">{t('settings.theme')}</label>
          <select
            data-cy="select-theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full border p-2 rounded dark:text-orange-500 dark:bg-gray-700"
          >
            <option value="light">{t('settings.light')}</option>
            <option value="dark">{t('settings.dark')}</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">{t('settings.language')}</label>
          <select
            data-cy="select-language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border p-2 rounded dark:text-orange-500 dark:bg-gray-700"
          >
            <option value="uk">Українська</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            data-cy="checkbox-notifications"
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          <label>{t('settings.notifications')}</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            data-cy="checkbox-auto-save"
            type="checkbox"
            checked={autoSave}
            onChange={() => setAutoSave(!autoSave)}
          />
          <label>{t('settings.autoSave')}</label>
        </div>

        <button
          data-cy="button-save"
          onClick={handleSave}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {t('settings.save')}
        </button>

        <button
          onClick={handleDeleteAccount}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {t('settings.deleteAccount')}
        </button>
        {message && (
          <p data-cy="save-message" className="mt-4 text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Settings;
