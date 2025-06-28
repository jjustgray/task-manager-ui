import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../pages/Register';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18nForTests';

// mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Register Page', () => {
  const setup = () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </I18nextProvider>
    );
  };

  test('renders all form fields and submit button', () => {
    setup();

    expect(screen.getByPlaceholderText(/Ім'?я/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/електронна пошта/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /зареєструватися/i })).toBeInTheDocument();
  });

  test('submits form and navigates to dashboard', () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText(/Ім'?я/i), {
      target: { value: 'Сергій' },
    });
    fireEvent.change(screen.getByPlaceholderText(/електронна пошта/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/пароль/i), {
      target: { value: '123456' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Чоловіча' },
    });

    fireEvent.click(screen.getByRole('button', { name: /зареєструватися/i }));

    // перевірка localStorage
    const stored = JSON.parse(localStorage.getItem('user'));
    expect(stored).toMatchObject({
      name: 'Сергій',
      gender: 'Чоловіча',
      email: 'test@example.com',
      password: '123456',
    });

    expect(localStorage.getItem('auth')).toBe('true');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
