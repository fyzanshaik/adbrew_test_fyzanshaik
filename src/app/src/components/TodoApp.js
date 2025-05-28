import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import '../todoApp.css'
export default function TodoApp() {
  const {
    todos,
    loading,
    adding,
    updatingId,
    deletingId,
    error,
    addTodo,
    removeTodo,
    toggleTodoCompleted,
    refreshTodos,
  } = useTodos();

  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!description.trim()) {
      setFormError('Description cannot be empty.');
      return;
    }
    if (adding) return;
    await addTodo(description.trim());
    setDescription('');
  };

  const handleDelete = async (todoId) => {
    if (deletingId === todoId) return;
    await removeTodo(todoId);
  };

  const handleToggleCompleted = async (todo) => {
    if (updatingId === todo._id) return;

    await toggleTodoCompleted(todo._id, !todo.completed);
  };

  const handleRefresh = async () => {
    if (loading || adding || updatingId || deletingId) return;
    await refreshTodos();
  };

  return (
    <div className="todoapp-root">
      <div className="todoapp-card">
        <h2 className="todoapp-title">Todo App</h2>
        <form onSubmit={handleSubmit} className="todoapp-form">
          <input
            type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter todo description" disabled={adding} className="todoapp-input"/>
          <button type="submit" disabled={adding || !description.trim()} className="todoapp-add-btn">
            {adding ? 'Adding...' : 'Add'}
          </button>
          <button type="button" onClick={handleRefresh} disabled={loading || adding || updatingId || deletingId} title="Refresh todos" className="todoapp-refresh-btn">
            <span role="img" aria-label="refresh">
              🔄
            </span>
          </button>
        </form>
        {formError && (
          <div className="todoapp-error">{formError}</div>
        )}
        {error && (
          <div className="todoapp-error">{error}</div>
        )}
        {loading ? (
          <div>Loading todos...</div>
        ) : (
          <>
            {todos.length === 0 ? (
              <div>No todos yet. Add your first one!</div>
            ) : (
              <ul className="todoapp-list">
                {todos.map(todo => (
                  <li key={todo._id} className="todoapp-list-item">
                    <input type="checkbox" checked={!!todo.completed} onChange={() => handleToggleCompleted(todo)} disabled={updatingId === todo._id} className="todoapp-checkbox"/>
                    <span
                      className={
                        'todoapp-desc' +
                        (todo.completed ? ' completed' : '')
                      }
                    >
                      {todo.description}
                    </span>
                    <button onClick={() => handleDelete(todo._id)}disabled={deletingId === todo._id}className="todoapp-delete-btn">
                      {deletingId === todo._id ? '...' : 'Delete'}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
