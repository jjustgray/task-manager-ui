import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, gender, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('auth', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
          {t('register.title')}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t('register.name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="" disabled>{t('register.gender')}</option>
            <option value="Чоловіча">{t('register.male')}</option>
            <option value="Жіноча">{t('register.female')}</option>
          </select>
          <input
            type="email"
            placeholder={t('register.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder={t('register.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {t('register.submit')}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
          {t('register.haveAccount')}{' '}
          <Link to="/" className="text-blue-600 hover:underline">
            {t('login.title')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
