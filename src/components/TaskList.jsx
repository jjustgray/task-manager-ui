import React from 'react';
import { useTranslation } from 'react-i18next';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.date]) acc[task.date] = [];
    acc[task.date].push(task);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedTasks).sort();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date();
    const yesterday = new Date();

    tomorrow.setDate(today.getDate() + 1);
    yesterday.setDate(today.getDate() - 1);

    const sameDate = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    if (sameDate(date, today)) return t('dashboard.today');
    if (sameDate(date, tomorrow)) return t('dashboard.tomorrow');
    if (sameDate(date, yesterday)) return t('dashboard.yesterday');
    
    return date.toLocaleDateString();
  };


  return (
    <div className="mt-6 space-y-6 bg-gray-100 dark:bg-gray-600 p-4 rounded shadow">
      {sortedDates.map((date) => (
        <div key={date} className="bg-white p-4 rounded shadow dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            {formatDate(date)}
          </h2>
          <ul className="list-disc pl-5 space-y-2 dark:text-red-400">
            {groupedTasks[date]
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((task) => (
                <li data-cy="task-item" key={task.id} className="flex justify-between items-center">
                  <span>
                    <strong>[{task.time}]</strong> {task.title}
                  </span>
                  <div className="space-x-2">
                    <button
                      data-cy="edit-task"
                      onClick={() => onEdit(task)}
                      className="text-blue-600 hover:underline"
                    >
                      {t('dashboard.edit')}
                    </button>
                    <button
                      data-cy="delete-task"
                      onClick={() => onDelete(task.id)}
                      className="text-red-600 hover:underline"
                    >
                      {t('dashboard.delete')}
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
