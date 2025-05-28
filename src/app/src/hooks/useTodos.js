import { useState, useEffect, useCallback } from 'react';
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodoCompleted,
} from '../api/todoApi';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
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

  const addTodo = useCallback(async (description) => {
    setAdding(true);
    setError(null);
    const result = await createTodo(description);
    if (result.success) {
      const fetchResult = await fetchTodos();
      await updateTodosFromFetch(fetchResult);
    } else {
      setError(result.error);
    }
    setAdding(false);
  }, []);

  const removeTodo = useCallback(async (todoId) => {
    setDeletingId(todoId);
    setError(null);
    const result = await deleteTodo(todoId);
    if (result.success) {
      const fetchResult = await fetchTodos();
      await updateTodosFromFetch(fetchResult);
    } else {
      setError(result.error);
    }
    setDeletingId(null);
  }, []);

  const toggleTodoCompleted = useCallback(async (todoId, completed) => {
    setUpdatingId(todoId);
    setError(null);
    const result = await updateTodoCompleted(todoId, completed);
    if (result.success) {
      const fetchResult = await fetchTodos();
      await updateTodosFromFetch(fetchResult);
    } else {
      setError(result.error);
    }
    setUpdatingId(null);
  }, []);

  const refreshTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchTodos();
    await updateTodosFromFetch(result);
    setLoading(false);
  }, []);

  return {
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
  };
}
