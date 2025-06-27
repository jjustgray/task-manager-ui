import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({ name: '', gender: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(user));
    setMessage(t('profile.saved'));
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-100 dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">{t('profile.title')}</h2>
      
      <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <label className="block mb-2">{t('profile.name')}</label>
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:text-orange-400"
        />

        <label className="block mb-2">{t('profile.gender')}</label>
        <select
          name="gender"
          value={user.gender}
          disabled
          className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:text-orange-400"
        >
          <option value="Чоловіча">{t('register.male')}</option>
          <option value="Жіноча">{t('register.female')}</option>
        </select>

        <label className="block mb-2">{t('profile.email')}</label>
        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:text-orange-400"
        />

        <div className="relative">
          <label className="block font-semibold">Пароль</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-8 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {t('profile.save')}
        </button>

        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>

    </div>
  );
};

export default Profile;
