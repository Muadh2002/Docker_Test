# 🎯 Cypress E2E Testing - Quick Start

## Step 1: Install Dependencies

\`\`\`bash
cd frontend
npm install
\`\`\`

This installs Cypress and all necessary dependencies.

---

## Step 2: Start Your Application

Before running Cypress tests, your application must be running:

### Option A: Using Docker Compose (Recommended)
\`\`\`bash
# From project root
docker-compose up
\`\`\`

Your app will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

### Option B: Running Locally

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
php -S localhost:8000
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm start
\`\`\`

---

## Step 3: Run Cypress Tests

### Interactive Mode (Recommended for First Time)

\`\`\`bash
npm run cypress:open
\`\`\`

**What you'll see:**
1. Cypress Test Runner window opens
2. Click "E2E Testing"
3. Choose a browser (Chrome recommended)
4. Select a test file to run
5. Watch tests execute in real-time

### Headless Mode (Command Line)

\`\`\`bash
npm run cypress:run
\`\`\`

Runs all tests without GUI and generates:
- ✅ Test results in terminal
- 🎬 Videos in `cypress/videos/`
- 📸 Screenshots in `cypress/screenshots/` (on failure)

---

## Step 4: Understanding Test Results

### ✅ Successful Test
\`\`\`
✓ should load the application successfully (523ms)
✓ should add a new user successfully (1245ms)
\`\`\`

### ❌ Failed Test
\`\`\`
✗ should display user list (892ms)
  AssertionError: expected '<div>' to be 'visible'
\`\`\`

**Check:**
- Screenshot in `cypress/screenshots/`
- Video in `cypress/videos/`
- Error message in terminal

---

## 📁 Test Files Overview

### 1. **user-management.cy.js** - Main functionality tests
- Loading application
- Adding users
- Form validation
- Refresh functionality
- Error handling

### 2. **navigation.cy.js** - UI/UX tests
- Page structure
- Responsive design
- Accessibility
- Keyboard navigation

### 3. **api-integration.cy.js** - Backend integration
- API requests
- Network errors
- Mock responses
- Request validation

---

## 🎬 Watching Tests in Action

When you run `npm run cypress:open`:

1. **Left Panel** - List of test files
2. **Main Window** - Your application running
3. **Command Log** - Each step executed
4. **Time Travel** - Hover over steps to see snapshots

---

## 🛠️ Troubleshooting

### Tests Fail with "Cannot GET /"
**Solution:** Make sure your app is running on http://localhost:3000

\`\`\`bash
# Check if app is running
curl http://localhost:3000
\`\`\`

### API Tests Fail
**Solution:** Backend must be running on http://localhost:8000

\`\`\`bash
# Check if backend is running
curl http://localhost:8000/api/users.php
\`\`\`

### "Port already in use"
**Solution:** Kill processes on ports 3000 or 8000

\`\`\`powershell
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process
\`\`\`

---

## 🎓 Learning Exercises

### Exercise 1: Modify a Test
1. Open `cypress/e2e/user-management.cy.js`
2. Change the test user name
3. Run the test and see it pass

### Exercise 2: Write a New Test
1. Create a new test that checks for a specific error message
2. Run it in Cypress Test Runner
3. Debug if it fails

### Exercise 3: Mock an API Response
1. Look at `api-integration.cy.js`
2. Find the `cy.intercept()` examples
3. Modify the mock data
4. See how your app responds

---

## 📊 CI/CD Integration

Tests automatically run on GitHub when you push code:

1. Push code to GitHub
2. GitHub Actions triggers
3. Tests run automatically
4. See results in "Actions" tab
5. Download videos/screenshots if tests fail

---

## ✅ What You've Learned

- ✅ How to install Cypress
- ✅ Run tests interactively
- ✅ Run tests in headless mode
- ✅ Understand test results
- ✅ Debug failed tests
- ✅ Write E2E tests
- ✅ Mock API responses
- ✅ CI/CD integration

---

## 🚀 Next Steps

1. **Run all tests** - See them pass
2. **Break something** - Change code and watch tests fail
3. **Fix it** - Use Cypress to debug
4. **Write new tests** - Test new features
5. **Push to GitHub** - See CI/CD in action

**Full documentation:** See [CYPRESS-TESTING.md](./CYPRESS-TESTING.md)

Happy Testing! 🎉
