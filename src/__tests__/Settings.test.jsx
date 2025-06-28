import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Settings from '../pages/Settings';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18nForTests';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

global.alert = jest.fn();
global.confirm = jest.fn(() => true);

describe('Settings Page', () => {
  const mockSetTheme = jest.fn();

  const renderWithProviders = () =>
    render(
      <I18nextProvider i18n={i18n}>
        <ThemeContext.Provider value={{ theme: 'light', setTheme: mockSetTheme }}>
          <BrowserRouter>
            <Settings />
          </BrowserRouter>
        </ThemeContext.Provider>
      </I18nextProvider>
    );

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders settings fields', () => {
    renderWithProviders();

    expect(screen.getByRole('heading', { name: /налаштування/i })).toBeInTheDocument();
    expect(screen.getByText(/тема/i)).toBeInTheDocument();
    expect(screen.getByText(/мова/i)).toBeInTheDocument();
    expect(screen.getByText(/сповіщення/i)).toBeInTheDocument();
    expect(screen.getByText(/автозбереження/i)).toBeInTheDocument();
  });

  test('saves settings to localStorage', () => {
    renderWithProviders();

    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[1], { target: { value: 'en' } });

    fireEvent.click(screen.getByRole('button', { name: /збережено/i }));

    expect(localStorage.getItem('language')).toBe('en');
    expect(alert).toHaveBeenCalledWith('Налаштування збережено');
  });
});
