import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
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
    Link: ({ to, children }) => <a href={to}>{children}</a>,
  };
});

describe('Login Page', () => {
  const setup = () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </I18nextProvider>
    );
  };

  test('renders login form fields', () => {
    setup();

    expect(screen.getByPlaceholderText(/електронна пошта/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /увійти/i })).toBeInTheDocument();
  });

  test('shows error with invalid credentials', () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText(/електронна пошта/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/пароль/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /увійти/i }));

    expect(screen.getByText(/невірна електронна пошта/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('logs in with correct credentials and navigates', () => {
    // підготувати localStorage
    localStorage.setItem('user', JSON.stringify({
      email: 'test@example.com',
      password: '123456',
    }));

    setup();

    fireEvent.change(screen.getByPlaceholderText(/електронна пошта/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/пароль/i), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: /увійти/i }));

    expect(localStorage.getItem('auth')).toBe('true');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
