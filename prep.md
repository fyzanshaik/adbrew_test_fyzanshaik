# Adbrew Interview Preparation Guide

## Project Overview

You built a full-stack todo application with React frontend, Django backend, and MongoDB database, all running in Docker containers. The application allows users to create and view todos through a simple web interface.

## Architecture & Technology Stack

### Backend (Django + MongoDB)
- **Django REST Framework**: Used APIView for clean REST endpoints
- **MongoDB with PyMongo**: Direct database operations without Django ORM
- **Docker Container**: Isolated environment running on port 8000

### Frontend (React)
- **React with Hooks**: Modern functional component approach
- **Custom Hooks**: Clean state management and API abstraction
- **Docker Container**: Development server running on port 3000

### Database
- **MongoDB**: Document-based storage in separate container
- **Direct Operations**: Using PyMongo instead of Django models

## Key Design Decisions & Rationale

### 1. Backend Implementation

#### Django Views Structure
```python
class TodoListView(APIView):
    def get(self, request):
        todoCollection = db.todos
        todos_list = list(todoCollection.find())
        for todo in todos_list:
            todo['_id'] = str(todo['_id'])
        return Response(todos_list, status=status.HTTP_200_OK)
    
    def post(self, request):
        # Implementation with validation and error handling
```

**Decision Rationale:**
- **Single endpoint for both GET/POST**: RESTful design following HTTP method conventions
- **ObjectId serialization**: Convert MongoDB's ObjectId to string for JSON compatibility
- **Input validation**: Check for required fields and data types before database operations
- **Direct response construction**: Avoid extra database calls by building response from known data

#### Error Handling Strategy
- **Input validation**: Check for empty/invalid descriptions
- **HTTP status codes**: Proper use of 200, 201, 400 for different scenarios
- **Meaningful error messages**: Clear feedback for debugging and user experience

### 2. Frontend Architecture

#### File Structure Decision
```
src/
├── api/todoApi.js          # HTTP layer
├── hooks/useTodos.js       # State management
└── components/TodoApp.js   # UI component
```

**Rationale:**
- **Separation of concerns**: API logic separate from state management separate from UI
- **Reusability**: API functions can be used by multiple components
- **Testability**: Each layer can be tested independently
- **Maintainability**: Easy to modify one layer without affecting others

#### API Layer Design
```javascript
export async function fetchTodos() {
  // Consistent response format
  return {
    success: boolean,
    data: any,
    error: string | null
  };
}
```

**Key Decisions:**
- **Consistent response format**: Same structure for all API functions
- **Error differentiation**: Network errors vs HTTP errors handled separately
- **Async/await**: Modern promise handling for cleaner code

#### Custom Hook Pattern
```javascript
export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Logic here
  return { todos, loading, error, addTodo };
}
```

**Benefits:**
- **State encapsulation**: All todo-related state in one place
- **Side effect management**: useEffect handles data fetching
- **Reusable logic**: Hook can be used in multiple components
- **Clean component**: UI component focuses only on rendering

### 3. User Experience Decisions

#### Form Handling
- **Controlled inputs**: React manages form state for predictable behavior
- **Client-side validation**: Immediate feedback for empty descriptions
- **Submit prevention**: Disable button during submission to prevent double-posting
- **Form reset**: Clear input after successful submission

#### Loading States
- **Initial loading**: Show spinner while fetching todos on mount
- **Submit feedback**: Button text changes to "Adding..." during submission
- **Error display**: Clear error messages for both form and API errors

#### Data Flow
1. **Form submission** → Custom hook → API call → Database
2. **Successful creation** → Fetch fresh todos → Update UI
3. **Error handling** → Display user-friendly messages

## Technical Implementation Details

### MongoDB Operations
```python
# GET todos
todos_list = list(todoCollection.find())

# POST new todo
result = todos.insert_one({'description': description})
```

**Choices made:**
- **Collection reference**: `db.todos` for clear collection access
- **Direct operations**: No abstraction layer for this simple use case
- **ID handling**: Convert ObjectId to string for frontend consumption

### React Hooks Usage
- **useState**: Managing component state (todos, loading, error, form input)
- **useEffect**: Side effects for data fetching on component mount
- **Custom hook**: Encapsulating todo-related logic and state

### Error Handling Strategy
- **Backend**: Validation + appropriate HTTP status codes
- **API layer**: Consistent error format for all functions
- **Frontend**: Separate form validation from API error display
- **User feedback**: Clear, actionable error messages

## Docker Understanding

### Container Architecture
- **App container**: React development server with hot reload
- **API container**: Django application with auto-restart
- **Mongo container**: Database instance with persistent volume

### Key Docker Concepts
- **Image vs Container**: Images are blueprints, containers are running instances
- **Port mapping**: Host ports mapped to container ports (3000:3000, 8000:8000)
- **Volume mounting**: Source code mounted for development workflow
- **Environment variables**: Configuration passed to containers
- **Network communication**: Containers communicate through Docker network

## Production-Ready Features Implemented

### Code Quality
- **Modular architecture**: Clear separation between layers
- **Error handling**: Comprehensive error scenarios covered
- **Input validation**: Both client and server-side validation
- **Consistent patterns**: Same coding style throughout

### Security Considerations
- **Input sanitization**: Trim and validate user input
- **HTTP headers**: Proper Content-Type for API requests
- **Error messages**: Don't expose internal system details

### Performance Optimizations
- **Efficient database queries**: Direct operations without unnecessary abstraction
- **React optimization**: Cleanup functions to prevent memory leaks
- **Minimal re-renders**: Proper state management to avoid unnecessary updates

## Common Interview Questions & Answers

### "Why did you choose this architecture?"
- **Separation of concerns**: Each layer has a single responsibility
- **Scalability**: Easy to add features like delete, edit, filters
- **Testing**: Each layer can be unit tested independently
- **Team development**: Multiple developers can work on different layers

### "How would you handle errors in production?"
- **Logging**: Add proper logging for debugging
- **User feedback**: Graceful error messages without technical details
- **Retry logic**: For network failures
- **Monitoring**: Track error rates and types

### "What would you improve if you had more time?"
- **Testing**: Unit tests for all functions and components
- **TypeScript**: Better type safety
- **Caching**: Client-side caching for better performance
- **UI/UX**: Better styling and user experience
- **Authentication**: User management and security

### "Explain the data flow when submitting a todo"
1. User types in form and clicks submit
2. Component calls `addTodo` from custom hook
3. Hook calls `createTodo` API function
4. API function makes HTTP POST to Django backend
5. Django validates input and saves to MongoDB
6. Success response triggers fresh fetch of all todos
7. UI updates with new todo list

## Debugging Approach Used

### Docker Issues
- **Container logs**: `docker logs -f api` to see server errors
- **Container access**: `docker exec -it api bash` to inspect container
- **Port conflicts**: Ensure ports 3000, 8000, 27017 are available

### Development Workflow
- **Hot reload**: Changes reflect immediately in development
- **Error messages**: Both console and UI show clear error information
- **Network tab**: Browser dev tools to inspect API calls

## Key Takeaways for Interview

1. **Requirements focus**: Stuck to specified requirements without adding unnecessary complexity
2. **Clean code**: Readable, maintainable code with clear naming
3. **Error handling**: Comprehensive error scenarios covered
4. **Modern patterns**: Used current best practices (hooks, async/await)
5. **Production mindset**: Considered real-world concerns like validation and user experience

Remember: Be confident about your choices and ready to explain the reasoning behind each decision. You built a solid, production-ready application that demonstrates strong fundamentals!