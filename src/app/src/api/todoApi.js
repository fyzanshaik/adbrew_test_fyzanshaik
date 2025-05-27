const API_BASE = 'http://localhost:8000';
export async function fetchTodos() {
  try {
    const response = await fetch(`${API_BASE}/todos`);
    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        data: null,
        error: `HTTP error: ${response.status} ${errorText}`,
      };
    }
    const data = await response.json();
    return {
      success: true,
      data,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.message || 'Network error',
    };
  }
}

export async function createTodo(description) {
  try {
    const response = await fetch(`${API_BASE}/todos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        data: null,
        error: `HTTP error: ${response.status} ${errorText}`,
      };
    }
    const data = await response.json();
    return {
      success: true,
      data,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.message || 'Network error',
    };
  }
}
