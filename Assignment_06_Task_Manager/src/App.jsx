import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTask';
import TaskDetails from './pages/TaskDetails';
import CompletedTasks from './pages/CompletedTasks';
import { initialTasks } from './data/initialTasks';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskManager_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('taskManager_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleCompleteTask = (taskId) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, status: 'Closed' } : t))
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />

        <main className="container">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard tasks={tasks} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks
                    tasks={tasks}
                    onCompleteTask={handleCompleteTask}
                    onDeleteTask={handleDeleteTask}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-task"
              element={
                <ProtectedRoute>
                  <AddTask onAddTask={handleAddTask} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks/:id"
              element={
                <ProtectedRoute>
                  <TaskDetails
                    tasks={tasks}
                    onCompleteTask={handleCompleteTask}
                    onDeleteTask={handleDeleteTask}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/completed"
              element={
                <ProtectedRoute>
                  <CompletedTasks
                    tasks={tasks}
                    onDeleteTask={handleDeleteTask}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
