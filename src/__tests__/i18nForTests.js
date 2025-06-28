// src/__tests__/i18nForTests.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'uk',
  fallbackLng: 'uk',
  resources: {
    uk: {
      translation: {
        'register.title': 'Реєстрація',
        'register.name': "Ім'я",
        'register.gender': 'Стать',
        'register.male': 'Чоловіча',
        'register.female': 'Жіноча',
        'register.email': 'Електронна пошта',
        'register.password': 'Пароль',
        'register.submit': 'Зареєструватися',
        'register.haveAccount': 'Вже маєте акаунт?',
        
        'about.title': 'Про додаток',
        'about.description': 'Цей веб-додаток дозволяє керувати задачами.',
        'about.technologies': 'Використані технології: React, TailwindCSS, i18next.',
        'about.author': 'Автор: Сергій ПшХ',
        'about.version': 'Версія: 1.0',

        'login.title': 'Увійти',
        'login.email': 'Електронна пошта',
        'login.password': 'Пароль',
        'login.submit': 'Увійти',
        'login.error': 'Невірна електронна пошта або пароль',
        'login.noAccount': 'Не маєте акаунту?',

        'settings.title': 'Налаштування',
        'settings.theme': 'Тема',
        'settings.language': 'Мова',
        'settings.notifications': 'Сповіщення',
        'settings.autoSave': 'Автозбереження',
        'settings.light': 'Світла',
        'settings.dark': 'Темна',
        'settings.save': 'Налаштування збережено',
        'settings.deleteAccount': 'Видалити акаунт',
        'settings.deleteAccountConfirm': 'Ви впевнені, що хочете видалити акаунт?',
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
