import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';

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
    if (deletingId) return;
    await removeTodo(todoId);
  };

  const handleToggleCompleted = async (todo) => {
    if (updatingId) return;
    await toggleTodoCompleted(todo._id, !todo.completed);
  };

  const handleRefresh = async () => {
    if (loading || adding || updatingId || deletingId) return;
    await refreshTodos();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f9f9f9',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'white',
          padding: '2rem 1.5rem',
          border: '1px solid #ccc',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Todo App</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            marginBottom: '1rem',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter todo description"
            disabled={adding}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: 4,
              border: '1px solid #ccc',
            }}
          />
          <button
            type="submit"
            disabled={adding || !description.trim()}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 4,
              border: 'none',
              background: '#3498db',
              color: 'white',
              fontWeight: 'bold',
              cursor: adding ? 'not-allowed' : 'pointer',
            }}
          >
            {adding ? 'Adding...' : 'Add'}
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading || adding || updatingId || deletingId}
            title="Refresh todos"
            style={{
              padding: '0.5rem',
              borderRadius: 4,
              border: 'none',
              background: '#27ae60',
              color: 'white',
              fontWeight: 'bold',
              cursor: loading || adding || updatingId || deletingId ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
            }}
          >
            <span role="img" aria-label="refresh">
              🔄
            </span>
          </button>
        </form>
        {formError && (
          <div style={{ color: 'red', marginBottom: '0.5rem' }}>{formError}</div>
        )}
        {error && (
          <div style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</div>
        )}
        {loading ? (
          <div>Loading todos...</div>
        ) : (
          <>
            {todos.length === 0 ? (
              <div>No todos yet. Add your first one!</div>
            ) : (
              <ul style={{ paddingLeft: 0, width: '100%' }}>
                {todos.map(todo => (
                  <li
                    key={todo._id}
                    style={{
                      listStyle: 'none',
                      padding: '0.5rem 0',
                      borderBottom: '1px solid #eee',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={!!todo.completed}
                      onChange={() => handleToggleCompleted(todo)}
                      disabled={updatingId === todo._id}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <span
                      style={{
                        flex: 1,
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? '#888' : '#222',
                      }}
                    >
                      {todo.description}
                    </span>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      disabled={deletingId === todo._id}
                      style={{
                        marginLeft: '0.5rem',
                        color: 'white',
                        background: '#e74c3c',
                        border: 'none',
                        borderRadius: 4,
                        padding: '0.25rem 0.5rem',
                        cursor: deletingId === todo._id ? 'not-allowed' : 'pointer',
                      }}
                    >
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
