import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';

export default function TodoApp() {
  const { todos, loading, submitting, error, addTodo } = useTodos();
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!description.trim()) {
      setFormError('Description cannot be empty.');
      return;
    }

    if (submitting) return;

    await addTodo(description.trim());
    setDescription('');
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Todo App</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter todo description"
          disabled={submitting}
          style={{ width: '70%', padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button
          type="submit"
          disabled={submitting || !description.trim()}
          style={{ padding: '0.5rem 1rem' }}
        >
          {submitting ? 'Adding...' : 'Add'}
        </button>
      </form>
      {formError && <div style={{ color: 'red', marginBottom: '0.5rem' }}>{formError}</div>}

      {error && <div style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</div>}

      {loading ? (
        <div>Loading todos...</div>
      ) : (
        <>
          {todos.length === 0 ? (
            <div>No todos yet. Add your first one!</div>
          ) : (
            <ul style={{ paddingLeft: 0 }}>
              {todos.map(todo => (
                <li key={todo._id} style={{ listStyle: 'none', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                  {todo.description}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
