import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TaskForm = ({ onAdd, onUpdate, editingTask, clearEdit }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDate(editingTask.date);
      setTime(editingTask.time);
    } else {
      setTitle('');
      setDate('');
      setTime('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    const task = {
      id: editingTask ? editingTask.id : Date.now(),
      title,
      date,
      time,
    };

    if (editingTask) {
      onUpdate(task);
    } else {
      onAdd(task);
    }

    setTitle('');
    setDate('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-4 dark:bg-gray-800 dark:text-white"
    >
      <input
        type="text"
        placeholder={t('dashboard.taskTitle')}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded dark:text-orange-500 dark:bg-gray-800"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded 
        dark:text-orange-500 dark:bg-gray-800 dark:[color-scheme:dark]"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full p-2 border rounded 
        dark:text-orange-500 dark:bg-gray-800 dark:[color-scheme:dark]"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {editingTask ? t('dashboard.updateTask') : t('dashboard.addTask')}
      </button>
      {editingTask && (
        <button
          type="button"
          onClick={clearEdit}
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          {t('dashboard.cancelEdit')}
        </button>
      )}
    </form>
  );
};

export default TaskForm;
