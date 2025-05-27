# Adbrew Test Implementation Checklist

## Pre-Development Setup

- [x] Clone repository (DO NOT FORK)
- [x] Set environment variable: `export ADBREW_CODEBASE_PATH="{path_to_repository}/"`
- [x] Build containers: `docker-compose build`
- [x] Start containers: `docker-compose up -d`
- [x] Verify setup: Check `docker ps` shows all 3 containers running
- [x] Test access: http://localhost:3000 and http://localhost:8000/todos

## Backend Implementation (Django)

### TodoListView GET Method

- [x] Add collection reference: `todos = db.todos` or `db['todos']`
- [x] Implement: `list(todos.find())`
- [x] Handle MongoDB's ObjectId serialization (convert to string)
- [x] Return proper JSON response with status 200
- [x] Add error handling for database connection issues

### TodoListView POST Method

- [x] Extract todo description from `request.data`
- [x] Create new todo dict: `{"description": description}`
- [x] Insert using: `todos.insert_one(new_todo)`
- [x] Return created todo with generated ID
- [x] Add error handling for invalid data/database issues
- [x] Return proper status code (201 for created)

### Error Handling

- [ ] Handle MongoDB connection errors
- [x] Handle invalid request data
- [x] Return appropriate HTTP status codes
- [x] Provide meaningful error messages

## Frontend Implementation (React)

### File Structure

```
src/
├── api/
│   └── todoApi.js          # HTTP calls to backend
├── hooks/
│   └── useTodos.js         # State management hook
└── components/
    └── TodoApp.js          # Main component
```

### API Layer (todoApi.js)

- [x] `fetchTodos()` function - GET request to `/todos`
- [x] `createTodo(description)` function - POST request to `/todos`
- [x] Proper error handling for network failures
- [x] Return consistent response format

### Custom Hook (useTodos.js)

- [x] Use `useState` for todos array
- [x] Use `useState` for loading states
- [x] Use `useState` for error states
- [x] `useEffect` to fetch todos on mount
- [x] `addTodo(description)` function that:
  - Calls API to create todo
  - Fetches fresh todo list on success
  - Handles errors appropriately
- [x] Return: `{ todos, loading, error, addTodo }`

### Main Component (TodoApp.js)

- [x] Form with single description input
- [x] Form submission handler (onSubmit)
- [x] Display todo list from hook
- [x] Display loading states
- [x] Display error messages
- [x] **Use React Hooks only** (no class components)

### Form Requirements

- [x] Single text input for todo description
- [x] Submit button
- [x] Form validation (non-empty description)
- [x] Clear form after successful submission
- [x] Prevent multiple submissions while processing

### Todo List Display

- [x] Replace hardcoded todos with data from backend
- [x] Show loading state while fetching
- [x] Handle empty state (no todos)
- [x] Display todos with their descriptions

## Data Flow

- [x] Form submission → Custom hook → API call → Database
- [x] Successful creation → Fetch fresh todos → Update UI
- [x] Error handling at each step with user feedback

## Code Quality Requirements

### Production-Ready Standards

- [x] Proper error handling at all levels
- [x] Clean, readable code with meaningful variable names
- [x] Separation of concerns (API, state, UI)
- [x] No hardcoded values (use environment variables where needed)
- [x] Consistent code formatting

### Modular Architecture

- [x] Single responsibility for each function/component
- [x] Reusable API functions
- [x] Custom hook for state management
- [x] Easy to extend (add delete functionality later)

### Error Scenarios to Handle

- [x] Network failures
- [x] Database connection issues
- [x] Invalid form data
- [x] Empty responses
- [x] Loading states

## Key Constraints to Remember

- [x] **No Django models/serializers** - direct MongoDB only
- [x] **React Hooks only** - no class components or lifecycle methods
- [x] **No localStorage** - fetch fresh data from database
- [x] **Simple requirements** - just description field, no isCompleted
- [x] **Fetch after POST** - don't use optimistic updates

## Testing Checklist

- [x] Form submission creates new todo in database
- [x] Todo list updates after successful creation
- [x] Error messages display for failed requests
- [x] Loading states work correctly
- [x] Form validation prevents empty submissions
- [x] Page refresh shows persisted todos from database

## Docker Debugging Commands

```bash
# View logs
docker logs -f --tail=100 app
docker logs -f --tail=100 api

# Enter container
docker exec -it app bash
docker exec -it api bash

# Restart container
docker restart app
docker restart api

# Stop all containers
docker-compose down
```

## Final Submission

- [x] Code works end-to-end
- [x] Docker setup intact and working
- [x] Clean, commented code
- [x] README updated if needed
- [x] Create private repository (don't fork)
- [x] Test entire flow one final time

---
