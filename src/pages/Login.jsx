import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleLogin = (e) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.email === email && user.password === password) {
    localStorage.setItem('auth', 'true'); // ← ось це додаємо
    navigate('/dashboard');
  } else {
    setError(t('login.error'));
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          {t('login.title')}
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder={t('login.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder={t('login.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {t('login.submit')}
          </button>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>
        <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
          {t('login.noAccount')}{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            {t('register.title')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
