import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const saveTasks = (updated) => {
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  const addTask = (newTask) => {
    saveTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    const updated = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(updated);
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    saveTasks(updated);
  };

  // Повідомлення при настанні задачі
  useEffect(() => {
    const interval = setInterval(() => {
      const settings = JSON.parse(localStorage.getItem('appSettings')) || {};
      if (!settings.notifications) return;

      const now = new Date();
      const nowDate = now.toISOString().split('T')[0];
      const nowTime = now.toTimeString().slice(0, 5); // формат HH:MM

      tasks.forEach((task) => {
        if (task.date === nowDate && task.time === nowTime) {
          // Показати повідомлення один раз
          const notifiedTasks = JSON.parse(localStorage.getItem('notifiedTasks')) || [];
          if (!notifiedTasks.includes(task.id)) {
            alert(`🔔 ${task.title} — ${t('dashboard.title')}`);
            localStorage.setItem(
              'notifiedTasks',
              JSON.stringify([...notifiedTasks, task.id])
            );
          }
        }
      });
    }, 60000); // перевірка кожну хвилину

    return () => clearInterval(interval);
  }, [tasks, t]);

  return (
    <div className="p-6 max-w-2xl mx-auto dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{t('dashboard.title')}</h1>
      <TaskForm
        onAdd={addTask}
        onUpdate={updateTask}
        editingTask={editingTask}
        clearEdit={() => setEditingTask(null)}
      />
      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default Dashboard;
