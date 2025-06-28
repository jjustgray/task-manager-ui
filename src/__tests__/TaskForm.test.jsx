import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

const t = (key) => {
  const dict = {
    'dashboard.taskTitle': 'Task title',
    'dashboard.updateTask': 'Update Task',
    'dashboard.addTask': 'Add Task',
    'dashboard.cancelEdit': 'Cancel Edit',
    'dashboard.noPastTasks': 'Cannot create tasks in the past',
  };
  return dict[key] || key;
};

// Мокаємо useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t }),
}));

describe('TaskForm', () => {
  const onAdd = jest.fn();
  const onUpdate = jest.fn();
  const clearEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders input fields and button', () => {
    render(<TaskForm onAdd={onAdd} onUpdate={onUpdate} editingTask={null} clearEdit={clearEdit} />);
    expect(screen.getByPlaceholderText('Task title')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument(); // title input
    expect(screen.getByLabelText(/date/i) || screen.getByDisplayValue('')).toBeTruthy(); // date input
    expect(screen.getByLabelText(/time/i) || screen.getByDisplayValue('')).toBeTruthy(); // time input
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('allows input and calls onAdd on submit', () => {
    render(<TaskForm onAdd={onAdd} onUpdate={onUpdate} editingTask={null} clearEdit={clearEdit} />);
    const titleInput = screen.getByPlaceholderText('Task title');
    const dateInput = screen.getByLabelText('date');
    const timeInput = screen.getByLabelText('time');

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2099-12-31' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '12:00' } });

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Test Task',
      date: '2099-12-31',
      time: '12:00',
    }));
  });

  test('does not submit task in the past and shows alert', () => {
    window.alert = jest.fn();
    render(<TaskForm onAdd={onAdd} onUpdate={onUpdate} editingTask={null} clearEdit={clearEdit} />);

    fireEvent.change(screen.getByPlaceholderText('Task title'), { target: { value: 'Past Task' } });
    const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString().slice(0, 10);
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: pastDate } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '12:00' } });

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(window.alert).toHaveBeenCalledWith('Cannot create tasks in the past');
    expect(onAdd).not.toHaveBeenCalled();
  });

  test('fills form with editingTask data and calls onUpdate on submit', () => {
    const editingTask = { id: 123, title: 'Edit Me', date: '2099-01-01', time: '10:00' };

    render(<TaskForm onAdd={onAdd} onUpdate={onUpdate} editingTask={editingTask} clearEdit={clearEdit} />);

    expect(screen.getByDisplayValue('Edit Me')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2099-01-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10:00')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Task title'), { target: { value: 'Edited Title' } });

    fireEvent.click(screen.getByRole('button', { name: /update task/i }));

    expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
      id: 123,
      title: 'Edited Title',
      date: '2099-01-01',
      time: '10:00',
    }));
  });

  test('shows cancel button when editingTask exists and calls clearEdit', () => {
    const editingTask = { id: 1, title: 'Edit' };

    render(<TaskForm onAdd={onAdd} onUpdate={onUpdate} editingTask={editingTask} clearEdit={clearEdit} />);

    const cancelButton = screen.getByRole('button', { name: /cancel edit/i });
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(clearEdit).toHaveBeenCalled();
  });

  test('autoSave mode calls onAdd automatically when fields change', () => {
    localStorage.setItem('appSettings', JSON.stringify({ autoSave: true }));

    render(<TaskForm onAdd={onAdd} onUpdate={onUpdate} editingTask={null} clearEdit={clearEdit} />);

    fireEvent.change(screen.getByPlaceholderText('Task title'), { target: { value: 'Auto Task' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2099-12-31' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '12:00' } });

    // onAdd має викликатися автоматично (може бути 1+ разів, залежно від ререндерів)
    expect(onAdd).toHaveBeenCalled();

    // Після додавання поля мають очиститися
    expect(screen.getByPlaceholderText('Task title').value).toBe('');
  });
});
