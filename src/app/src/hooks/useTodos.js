import { useState, useEffect } from 'react';
import { fetchTodos, createTodo } from '../api/todoApi';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const updateTodosFromFetch = async (fetchResult) => {
    if (fetchResult.success) {
      setTodos(fetchResult.data);
      setError(null);
    } else {
      setTodos([]);
      setError(fetchResult.error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function loadTodos() {
      setLoading(true);
      setError(null);
      const result = await fetchTodos();
      if (!isMounted) return;
      await updateTodosFromFetch(result);
      setLoading(false);
    }
    loadTodos();
    return () => { isMounted = false; };
  }, []);

  async function addTodo(description) {
    setSubmitting(true);
    setError(null);
    const result = await createTodo(description);
    if (result.success) {
      const fetchResult = await fetchTodos();
      await updateTodosFromFetch(fetchResult);
    } else {
      setError(result.error);
    }
    setSubmitting(false);
  }

  return { todos, loading, submitting, error, addTodo };
}
