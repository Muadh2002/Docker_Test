# React + PHP Tutorial

## 🎯 Learning Objectives

By working through this project, you'll learn:

1. **React Fundamentals**
   - Components and JSX
   - State management with `useState`
   - Side effects with `useEffect`
   - Event handling
   - Conditional rendering

2. **PHP Backend**
   - REST API structure
   - HTTP methods (GET, POST, DELETE)
   - JSON handling
   - CORS configuration
   - File-based data storage

3. **Frontend-Backend Integration**
   - Fetch API
   - Async/await
   - Error handling
   - Loading states

## 📚 Code Walkthrough

### React Component Structure

```javascript
// State management
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
```

- `useState`: Creates a state variable and setter function
- State updates trigger re-renders

### useEffect Hook

```javascript
useEffect(() => {
  fetchUsers();
}, []);
```

- Runs when component mounts (empty dependency array `[]`)
- Perfect for initial data loading

### Fetch API

```javascript
const response = await fetch(`${API_URL}/users.php`);
const data = await response.json();
```

- `fetch`: Makes HTTP requests
- `await`: Waits for promise to resolve
- `.json()`: Parses JSON response

### PHP REST API

```php
switch ($method) {
  case 'GET':
    // Return all users
  case 'POST':
    // Create new user
  case 'DELETE':
    // Delete user
}
```

- Routes different HTTP methods
- Returns JSON responses
- Validates input data

## 🚀 Getting Started

### Step 1: Install Frontend Dependencies

```bash
cd frontend
npm install
```

This installs React and all necessary packages.

### Step 2: Start PHP Server

```bash
cd backend
php -S localhost:8000
```

Starts PHP built-in server on port 8000.

### Step 3: Start React App

```bash
cd frontend
npm start
```

Starts React development server on port 3000.

### Step 4: Test the Application

1. Open browser to `http://localhost:3000`
2. You should see the user management interface
3. Try adding, viewing, and deleting users

## 🔧 How It Works

### Adding a User

1. **Frontend**: User fills form and clicks "Add User"
2. **React**: `addUser()` function is called
3. **Fetch**: POST request sent to PHP API with user data
4. **PHP**: Validates data, generates ID, saves to JSON file
5. **Response**: PHP sends success response back
6. **React**: Updates state and refreshes user list

### Deleting a User

1. **Frontend**: User clicks "Delete" button
2. **React**: Confirmation dialog appears
3. **Fetch**: DELETE request sent with user ID
4. **PHP**: Finds user, removes from array, saves file
5. **Response**: Success message returned
6. **React**: Refreshes user list

### Loading Users

1. **React**: Component mounts
2. **useEffect**: Triggers `fetchUsers()`
3. **Fetch**: GET request to PHP API
4. **PHP**: Reads JSON file, returns user array
5. **React**: Updates state with users
6. **Render**: Users displayed in grid

## 💡 Key Concepts

### CORS (Cross-Origin Resource Sharing)

```php
header('Access-Control-Allow-Origin: *');
```

Allows React (port 3000) to communicate with PHP (port 8000).

### State Management

```javascript
setUsers(data.users);
```

Updates component state, triggering re-render with new data.

### Async/Await

```javascript
const response = await fetch(url);
```

Modern way to handle asynchronous operations.

### Error Handling

```javascript
try {
  // Make request
} catch (err) {
  // Handle error
}
```

Prevents app crashes from network errors.

## 🎓 Learning Exercises

### Beginner
1. Add a "Created At" timestamp to users
2. Change the color scheme
3. Add more sample users

### Intermediate
1. Implement edit/update functionality
2. Add search/filter feature
3. Add user avatar support
4. Implement pagination

### Advanced
1. Add MySQL database instead of JSON file
2. Implement user authentication
3. Add form validation
4. Create multiple pages with routing

## 📖 Resources

- [React Documentation](https://react.dev)
- [PHP Manual](https://www.php.net/manual/)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [REST API Tutorial](https://restfulapi.net/)

## 🐛 Common Issues

### "Failed to connect to server"
- Make sure PHP server is running on port 8000
- Check console for specific error messages

### "CORS Error"
- Verify CORS headers in PHP file
- Ensure both servers are running

### Port already in use
- Change port in PHP: `php -S localhost:8001`
- Update API_URL in React: `http://localhost:8001/api`

## 🎉 Next Steps

Once comfortable with this project:
1. Learn about React Router for multi-page apps
2. Explore state management libraries (Redux, Zustand)
3. Study MySQL/PostgreSQL for real databases
4. Learn about authentication and security
5. Deploy to production (Vercel, Heroku, etc.)

Happy Learning! 🚀
