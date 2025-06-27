import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Визначаємо переклади
const resources = {
  uk: {
    translation: {
      // Загальні
      'login.title': 'Вхід',
      'login.email': 'Електронна пошта',
      'login.password': 'Пароль',
      'login.submit': 'Увійти',
      'login.noAccount': 'Немає акаунту? Зареєструватися',
      'login.error': 'Невірний email або пароль',

      'register.title': 'Реєстрація',
      'register.name': 'Ім’я',
      'register.gender': 'Стать',
      'register.male': 'Чоловіча',
      'register.female': 'Жіноча',
      'register.submit': 'Зареєструватися',
      'register.haveAccount': 'Маєш акаунт? Увійти',

      'profile.title': 'Профіль користувача',
      'profile.save': 'Зберегти',
      'profile.saved': 'Зміни збережено успішно',
      'profile.gender': 'Стать',
      'profile.name': 'Ім’я',
      'profile.email': 'Email',
      'profile.password': 'Пароль',

      'settings.title': 'Налаштування',
      'settings.theme': 'Тема',
      'settings.dark': 'Темна тема',
      'settings.light': 'Системна тема',
      'settings.language': 'Мова',
      'settings.notifications': 'Увімкнути повідомлення',
      'settings.autoSave': 'Автоматичне збереження завдань',
      'settings.save': 'Зберегти',
      'settings.deleteAccount': 'Видалити мій акаунт',
      'settings.deleteAccountConfirm': 'Ви впевнені, що хочете видалити акаунт? Це незворотньо!',


      'about.title': 'Про додаток',
      'about.description': 
          `Цей веб-додаток дозволяє зручно планувати, 
          переглядати та керувати задачами. Зберігайте 
          важливі дати, створюйте події та слідкуйте 
          за своїм розкладом!`,
      'about.technologies': 
         `Цей додаток створено з використанням React, 
          React Router та Local Storage для збереження даних.
          Інтерфейс зроблений за допомогою Tailwind CSS,
          що робить його привабливим та адаптований для 
          зручності користувачів.`,
      'about.author': 'Автор: Сергій Пшеничний КВ-42мп',
      'about.version': 'Version: 1.0.0',

      "dashboard": {
        "title": "Панель задач",
        "taskTitle": "Назва задачі",
        "addTask": "Додати задачу",
        "updateTask": "Оновити задачу",
        "cancelEdit": "Скасувати редагування",
        "edit": "Редагувати",
        "delete": "Видалити",
        "noPastTasks": "Не можна створювати задачі в минулому",
        "today": "Сьогодні",
        "tomorrow": "Завтра",
        "yesterday": "Вчора"
      },

      'navbar.dashboard': 'Панель задач',
      'navbar.logout': 'Вийти',
      'navbar.about': 'Про додаток',
      'navbar.profile': 'Профіль',
      'navbar.settings': 'Налаштування',
    },
  },
  en: {
    translation: {
      'login.title': 'Login',
      'login.email': 'Email',
      'login.password': 'Password',
      'login.submit': 'Login',
      'login.noAccount': "Don't have an account? Register",
      'login.error': 'Incorrect email or password',

      'register.title': 'Register',
      'register.name': 'Name',
      'register.gender': 'Gender',
      'register.male': 'Male',
      'register.female': 'Female',
      'register.submit': 'Register',
      'register.haveAccount': 'Already have an account? Login',

      'profile.title': 'User Profile',
      'profile.save': 'Save',
      'profile.saved': 'Changes saved successfully',
      'profile.gender': 'Gender',
      'profile.name': 'Name',
      'profile.email': 'Email',
      'profile.password': 'Password',

      'settings.title': 'Settings',
      'settings.theme': 'Theme',
      'settings.dark': 'Dark Theme',
      'settings.light': 'System Theme',
      'settings.language': 'Language',
      'settings.notifications': 'Enable notifications',
      'settings.autoSave': 'Auto-save tasks',
      'settings.save': 'Save',
      'settings.deleteAccount': 'Delete my account',
      'settings.deleteAccountConfirm': 
          'Are you sure you want to delete your account? This action is irreversible!',

      'about.title': 'About the App',
      'about.description': 
          `This web application helps you easily plan, 
          view, and manage tasks. Save important dates, 
          create events, and stay on track!`,
      'about.technologies': 
         `This app is built using React, 
          React Router, and Local Storage for saving data.
          The interface is designed with Tailwind CSS,
          making it attractive and user-friendly.
          It is responsive and works well on both desktop
          and mobile devices.`,
      'about.author': 'Author: Serhii Pshenychnyi KV-42mp',
      'about.version': 'Version: 1.0.0',

      "dashboard": {
        "title": "Task Dashboard",
        "taskTitle": "Task Title",
        "addTask": "Add Task",
        "updateTask": "Update Task",
        "cancelEdit": "Cancel Edit",
        "edit": "Edit",
        "delete": "Delete",
        "noPastTasks": "Cannot create tasks in the past",
        "today": "Today",
        "tomorrow": "Tomorrow",
        "yesterday": "Yesterday"
      },

      'navbar.dashboard': 'Task Panel',
      'navbar.logout': 'Log out',
      'navbar.about': 'About the App',
      'navbar.profile': 'Profile',
      'navbar.settings': 'Settings',
    },
  },
};

// Ініціалізація i18next
i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'uk', // мова за замовчуванням
  fallbackLng: 'uk',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
