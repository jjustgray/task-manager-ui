import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18nForTests';

describe('About Page', () => {
  test('renders content correctly with translations', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <About />
      </I18nextProvider>
    );

    expect(screen.getByRole('heading', { name: /про додаток/i })).toBeInTheDocument();
    expect(screen.getByText(/керувати задачами/i)).toBeInTheDocument();
    expect(screen.getByText(/react, tailwindcss, i18next/i)).toBeInTheDocument();
    expect(screen.getByText(/автор/i)).toBeInTheDocument();
    expect(screen.getByText(/версія/i)).toBeInTheDocument();

    // також можна перевірити наявність зображення
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining('logo'));
    expect(img).toHaveAttribute('alt', 'Про додаток');
  });
});
