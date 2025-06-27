// src/components/Navbar.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../contexts/LanguageContext';
import { isAuthenticated } from '../utils/auth';

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [initial, setInitial] = useState('U');
  const auth = isAuthenticated();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.name) {
      setInitial(storedUser.name.charAt(0).toUpperCase());
    }
  }, [auth]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    if (setLanguage) {
      setLanguage(lang);
    }
    localStorage.setItem('language', lang);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Лого + кнопка меню */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-blue-600 dark:text-white">Task Manager</span>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Меню (десктоп) */}
          <div className="hidden md:flex items-center space-x-6">
            {auth && (
              <>
                <Link to="/dashboard" className="text-blue-600 dark:text-blue-300 hover:underline">
                  {t('navbar.dashboard')}
                </Link>
                <Link to="/profile" className="text-blue-600 dark:text-blue-300 hover:underline">
                  {t('profile.title')}
                </Link>
                <Link to="/settings" className="text-blue-600 dark:text-blue-300 hover:underline">
                  {t('settings.title')}
                </Link>
              </>
            )}
            <Link to="/about" className="text-blue-600 dark:text-blue-300 hover:underline">
              {t('about.title')}
            </Link>

            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-white dark:bg-gray-700 dark:text-white border rounded px-2 py-1"
            >
              <option value="uk">UA</option>
              <option value="en">EN</option>
            </select>

            {auth && (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  {t('navbar.logout')}
                </button>
                <div className="ml-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white">
                  <span>{initial}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Меню (мобільна версія) */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {auth && (
            <>
              <Link to="/dashboard" className="block text-blue-600 dark:text-blue-300">
                {t('navbar.dashboard')}
              </Link>
              <Link to="/profile" className="block text-blue-600 dark:text-blue-300">
                {t('profile.title')}
              </Link>
              <Link to="/settings" className="block text-blue-600 dark:text-blue-300">
                {t('settings.title')}
              </Link>
            </>
          )}
          <Link to="/about" className="block text-blue-600 dark:text-blue-300">
            {t('about.title')}
          </Link>

          <select
            value={language}
            onChange={handleLanguageChange}
            className="w-full mt-2 bg-white dark:bg-gray-700 dark:text-white border rounded px-2 py-1"
          >
            <option value="uk">UA</option>
            <option value="en">EN</option>
          </select>

          {auth && (
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 mt-2"
            >
              {t('navbar.logout')}
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
