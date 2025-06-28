import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../components/TaskList';

const t = (key) => {
  const dict = {
    'dashboard.today': 'Сьогодні',
    'dashboard.tomorrow': 'Завтра',
    'dashboard.yesterday': 'Вчора',
    'dashboard.edit': 'Редагувати',
    'dashboard.delete': 'Видалити',
  };
  return dict[key] || key;
};

// Мокаємо useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t }),
}));

describe('TaskList', () => {
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

 test('renders grouped tasks with formatted dates', () => {
  const todayStr = new Date().toISOString().slice(0, 10);
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().slice(0, 10);
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = tomorrowDate.toISOString().slice(0, 10);

  const tasks = [
    { id: 1, title: 'Task Today', date: todayStr, time: '10:00' },
    { id: 2, title: 'Task Yesterday', date: yesterdayStr, time: '12:00' },
    { id: 3, title: 'Task Tomorrow', date: tomorrowStr, time: '09:00' },
    { id: 4, title: 'Task Other', date: '2099-12-31', time: '15:00' },
  ];

  render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);

  expect(screen.getByText('Сьогодні')).toBeInTheDocument();
  expect(screen.getByText('Вчора')).toBeInTheDocument();
  expect(screen.getByText('Завтра')).toBeInTheDocument();
  expect(screen.getByText((content) => content.includes('2099'))).toBeInTheDocument();

  expect(screen.getByText((content) => content.includes('Task Today'))).toBeInTheDocument();
  expect(screen.getByText((content) => content.includes('Task Yesterday'))).toBeInTheDocument();
  expect(screen.getByText((content) => content.includes('Task Tomorrow'))).toBeInTheDocument();
  expect(screen.getByText((content) => content.includes('Task Other'))).toBeInTheDocument();
});


  test('calls onEdit and onDelete when buttons clicked', () => {
    const tasks = [
      { id: 1, title: 'Task 1', date: '2099-01-01', time: '10:00' },
    ];

    render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);

    const editButton = screen.getByText('Редагувати');
    const deleteButton = screen.getByText('Видалити');

    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(tasks[0]);

    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(tasks[0].id);
  });

  test('renders nothing when tasks is empty array', () => {
    render(<TaskList tasks={[]} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });
});
