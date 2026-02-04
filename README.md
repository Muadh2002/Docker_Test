# React + PHP Basic Project

A simple project to learn how React frontend communicates with a PHP backend.

## Project Structure

```
├── frontend/          # React application
│   ├── public/
│   └── src/
├── backend/           # PHP API
│   └── api/
└── README.md
```

## Prerequisites

- Node.js and npm (for React)
- PHP 7.4+ (with built-in server)
- A web browser

## Setup Instructions

### 1. Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

The React app will run on `http://localhost:3000`

### 2. Backend Setup (PHP)

```bash
cd backend
php -S localhost:8000
```

The PHP API will run on `http://localhost:8000`

## What You'll Learn

1. **React Basics**: Components, State, Effects, Event Handling
2. **PHP API**: Creating REST endpoints, CORS handling, JSON responses
3. **Frontend-Backend Communication**: Fetch API, async/await
4. **CRUD Operations**: Create, Read, Update, Delete

## Features

- User list display
- Add new users
- Delete users
- Simple REST API with JSON responses
