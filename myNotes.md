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

- [ ] `fetchTodos()` function - GET request to `/todos`
- [ ] `createTodo(description)` function - POST request to `/todos`
- [ ] Proper error handling for network failures
- [ ] Return consistent response format

### Custom Hook (useTodos.js)

- [ ] Use `useState` for todos array
- [ ] Use `useState` for loading states
- [ ] Use `useState` for error states
- [ ] `useEffect` to fetch todos on mount
- [ ] `addTodo(description)` function that:
  - Calls API to create todo
  - Fetches fresh todo list on success
  - Handles errors appropriately
- [ ] Return: `{ todos, loading, error, addTodo }`

### Main Component (TodoApp.js)

- [ ] Form with single description input
- [ ] Form submission handler (onSubmit)
- [ ] Display todo list from hook
- [ ] Display loading states
- [ ] Display error messages
- [ ] **Use React Hooks only** (no class components)

### Form Requirements

- [ ] Single text input for todo description
- [ ] Submit button
- [ ] Form validation (non-empty description)
- [ ] Clear form after successful submission
- [ ] Prevent multiple submissions while processing

### Todo List Display

- [ ] Replace hardcoded todos with data from backend
- [ ] Show loading state while fetching
- [ ] Handle empty state (no todos)
- [ ] Display todos with their descriptions

## Data Flow

- [ ] Form submission → Custom hook → API call → Database
- [ ] Successful creation → Fetch fresh todos → Update UI
- [ ] Error handling at each step with user feedback

## Code Quality Requirements

### Production-Ready Standards

- [ ] Proper error handling at all levels
- [ ] Clean, readable code with meaningful variable names
- [ ] Separation of concerns (API, state, UI)
- [ ] No hardcoded values (use environment variables where needed)
- [ ] Consistent code formatting

### Modular Architecture

- [ ] Single responsibility for each function/component
- [ ] Reusable API functions
- [ ] Custom hook for state management
- [ ] Easy to extend (add delete functionality later)

### Error Scenarios to Handle

- [ ] Network failures
- [ ] Database connection issues
- [ ] Invalid form data
- [ ] Empty responses
- [ ] Loading states

## Key Constraints to Remember

- [ ] **No Django models/serializers** - direct MongoDB only
- [ ] **React Hooks only** - no class components or lifecycle methods
- [ ] **No localStorage** - fetch fresh data from database
- [ ] **Simple requirements** - just description field, no isCompleted
- [ ] **Fetch after POST** - don't use optimistic updates

## Testing Checklist

- [ ] Form submission creates new todo in database
- [ ] Todo list updates after successful creation
- [ ] Error messages display for failed requests
- [ ] Loading states work correctly
- [ ] Form validation prevents empty submissions
- [ ] Page refresh shows persisted todos from database

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

- [ ] Code works end-to-end
- [ ] Docker setup intact and working
- [ ] Clean, commented code
- [ ] README updated if needed
- [ ] Create private repository (don't fork)
- [ ] Test entire flow one final time

## Interview Preparation

- [ ] Understand Docker setup and be able to explain it
- [ ] Know why you made specific design choices
- [ ] Be ready to discuss error handling approach
- [ ] Understand the difference between hooks and class components
- [ ] Be able to explain MongoDB operations used

---
