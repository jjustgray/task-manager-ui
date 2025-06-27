import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-xl text-center">
        <img src={logo} alt={t('about.title')} className="mx-auto mb-6 w-24 h-24" />
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {t('about.title')}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {t('about.description')}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 whitespace-pre-line">
          {t('about.technologies')}
        </p>
        <p className="text-sm text-gray-500 mt-6 dark:text-gray-400">
          {t('about.author')} | {t('about.version')}
        </p>
      </div>
    </div>
  );
};

export default About;
