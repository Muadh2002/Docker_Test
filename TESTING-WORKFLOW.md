# 🎯 Cypress Testing - Visual Workflow Guide

## 🔄 Testing Workflow

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    CYPRESS E2E TESTING WORKFLOW                  │
└─────────────────────────────────────────────────────────────────┘

📝 STEP 1: WRITE TESTS
├── Create test file in cypress/e2e/
├── Define test scenarios
├── Add assertions
└── Use custom commands
    │
    ├── Example:
    │   it('should add user', () => {
    │     cy.visit('/')
    │     cy.get('input[name]').type('John')
    │     cy.get('button').click()
    │     cy.contains('John').should('be.visible')
    │   })
    │
    ▼

🚀 STEP 2: RUN TESTS LOCALLY

Option A: Interactive Mode              Option B: Headless Mode
├── npm run cypress:open               ├── npm run cypress:run
├── Opens GUI                          ├── Runs in terminal
├── Select test file                   ├── Generates videos
├── Watch execution                    ├── Captures screenshots
└── Debug in real-time                 └── Fast execution
    │                                      │
    ├─────────────────┬──────────────────┘
    │                 │
    ▼                 ▼

✅ STEP 3: VIEW RESULTS

Success                                 Failure
├── ✓ All tests pass                  ├── ✗ Test failed
├── Terminal shows green              ├── Error message shown
├── Video recorded                    ├── Screenshot captured
└── Ready to commit                   └── Video shows failure
    │                                     │
    │                                     ├── Check screenshot
    │                                     ├── Watch video
    │                                     ├── Fix issue
    │                                     └── Re-run test
    │
    ▼

🔄 STEP 4: PUSH TO GITHUB
├── git add .
├── git commit -m "feat: add feature"
├── git push origin main
└── GitHub Actions triggered
    │
    ▼

🤖 STEP 5: CI/CD PIPELINE

GitHub Actions Workflow:
├── Checkout code
├── Install dependencies
├── Build application
├── Start server (localhost:3000)
├── Run Cypress tests
│   ├── Chrome browser
│   ├── All test files
│   └── Headless mode
├── Generate artifacts
│   ├── Videos (always)
│   └── Screenshots (on failure)
└── Report results
    │
    ├── On Success:
    │   ├── ✅ All tests passed
    │   ├── Build succeeds
    │   └── Ready to deploy
    │
    └── On Failure:
        ├── ❌ Tests failed
        ├── Download artifacts
        ├── Review failures
        └── Fix and push again

\`\`\`

---

## 🎬 Test Execution Flow

\`\`\`
┌──────────────────────────────────────────────────────────────┐
│                    WHAT HAPPENS DURING A TEST                 │
└──────────────────────────────────────────────────────────────┘

1. TEST STARTS
   │
   ├─➤ cy.visit('/')
   │   └── Opens http://localhost:3000
   │       └── Waits for page load
   │
   ▼

2. INTERACT WITH PAGE
   │
   ├─➤ cy.get('input[placeholder="Enter name"]')
   │   └── Finds input field
   │       └── Retries if not found (4 seconds)
   │
   ├─➤ .type('John Doe')
   │   └── Types text character by character
   │       └── Fires keyboard events
   │
   ├─➤ cy.get('button').click()
   │   └── Clicks button
   │       └── Triggers form submission
   │
   ▼

3. VERIFY RESULTS
   │
   ├─➤ cy.contains('John Doe')
   │   └── Searches for text in DOM
   │       └── Retries if not found
   │
   ├─➤ .should('be.visible')
   │   └── Asserts element is visible
   │       ├── PASS ✅ → Continue
   │       └── FAIL ❌ → Test fails, screenshot captured
   │
   ▼

4. TEST COMPLETES
   │
   ├── Success ✅
   │   ├── Mark test as passed
   │   ├── Record video
   │   └── Continue to next test
   │
   └── Failure ❌
       ├── Mark test as failed
       ├── Capture screenshot
       ├── Record video
       └── Show error message

\`\`\`

---

## 🔍 Test File Structure

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              ANATOMY OF A CYPRESS TEST FILE                  │
└─────────────────────────────────────────────────────────────┘

describe('Feature Name', () => {          ◄── Test Suite
  │
  ├── beforeEach(() => {                  ◄── Setup (runs before each test)
  │     cy.visit('/')
  │     cy.clearLocalStorage()
  │   })
  │
  ├── it('should do action A', () => {    ◄── Test Case 1
  │     // Arrange: Setup
  │     cy.get('input').type('data')
  │     
  │     // Act: Perform action
  │     cy.get('button').click()
  │     
  │     // Assert: Verify result
  │     cy.contains('Success').should('be.visible')
  │   })
  │
  ├── it('should do action B', () => {    ◄── Test Case 2
  │     cy.addUser('John', 'john@test.com')  ◄── Custom command
  │     cy.verifyUserInList('John', 'john@test.com')
  │   })
  │
  └── afterEach(() => {                   ◄── Cleanup (runs after each test)
        // Clean up test data
      })
})

\`\`\`

---

## 🎯 Testing Pyramid

\`\`\`
        ┌───────────────┐
       │   E2E Tests   │  ◄── Cypress (Slow, High confidence)
      │   (Few tests)  │
     └─────────────────┘
            ▲
           ▲ ▲
          ▲   ▲
         ▲     ▲
        ┌─────────────────┐
       │ Integration Tests│  ◄── API Testing (Medium speed)
      │   (More tests)    │
     └───────────────────┘
            ▲
           ▲ ▲
          ▲   ▲
         ▲     ▲
        ▲       ▲
       ┌───────────────────┐
      │    Unit Tests       │  ◄── Jest (Fast, Many tests)
     │   (Lots of tests)    │
    └─────────────────────┘

Your Project Coverage:
├── E2E Tests (Cypress)      ✅ 20+ tests
├── Unit Tests (Jest)        ✅ Configured
└── API Tests (PHPUnit)      🔄 To be added

\`\`\`

---

## 🗂️ File Organization

\`\`\`
frontend/
│
├── cypress/
│   │
│   ├── e2e/                              ◄── TEST FILES
│   │   ├── user-management.cy.js         │  User CRUD operations
│   │   ├── navigation.cy.js              │  UI/UX tests
│   │   └── api-integration.cy.js         │  Backend integration
│   │
│   ├── fixtures/                         ◄── TEST DATA
│   │   └── users.json                    │  Mock user data
│   │
│   ├── support/                          ◄── HELPERS
│   │   ├── commands.js                   │  Custom commands
│   │   └── e2e.js                        │  Global config
│   │
│   ├── screenshots/                      ◄── AUTO-GENERATED
│   │   └── (test failures)               │  Failure screenshots
│   │
│   └── videos/                           ◄── AUTO-GENERATED
│       └── (all test runs)               │  Test recordings
│
├── cypress.config.js                     ◄── CONFIGURATION
│
└── package.json                          ◄── SCRIPTS

\`\`\`

---

## 📊 Test Types Explained

### 1️⃣ User Flow Tests (user-management.cy.js)
\`\`\`
User opens app → Views user list → Fills form → Submits → Sees new user
     ↓              ↓                ↓           ↓            ↓
  cy.visit()   cy.contains()    cy.type()   cy.click()   cy.contains()
\`\`\`

### 2️⃣ UI Tests (navigation.cy.js)
\`\`\`
Test different screen sizes → Verify responsive layout → Check accessibility
         ↓                            ↓                          ↓
    cy.viewport()                cy.should()              cy.get().tab()
\`\`\`

### 3️⃣ API Tests (api-integration.cy.js)
\`\`\`
Mock API → Trigger action → Intercept request → Verify response
    ↓           ↓                 ↓                   ↓
cy.intercept() cy.click()    cy.wait('@api')  check statusCode
\`\`\`

---

## 🎮 Commands Reference

### Navigation
\`\`\`javascript
cy.visit('/path')              // Go to URL
cy.go('back')                  // Browser back
cy.reload()                    // Refresh page
\`\`\`

### Selectors
\`\`\`javascript
cy.get('.class')               // By class
cy.get('#id')                  // By ID
cy.get('[data-test="id"]')     // By attribute
cy.contains('text')            // By text content
\`\`\`

### Actions
\`\`\`javascript
.click()                       // Click element
.type('text')                  // Type into input
.clear()                       // Clear input
.check()                       // Check checkbox
.select('option')              // Select dropdown
\`\`\`

### Assertions
\`\`\`javascript
.should('be.visible')          // Element visible
.should('exist')               // Element exists
.should('have.value', 'x')     // Has value
.should('contain', 'text')     // Contains text
.should('have.length', 5)      // Array/list length
\`\`\`

### API
\`\`\`javascript
cy.intercept('GET', '/api')    // Intercept request
cy.wait('@alias')              // Wait for request
cy.request('POST', '/api')     // Make direct request
\`\`\`

---

## 🚀 Quick Start Commands

\`\`\`bash
# Install dependencies
cd frontend
npm install

# Open interactive test runner
npm run cypress:open

# Run all tests (headless)
npm run cypress:run

# Run in specific browser
npm run cypress:run:chrome
npm run cypress:run:firefox

# Run specific test
npx cypress run --spec "cypress/e2e/user-management.cy.js"

# Run with video off (faster)
npx cypress run --config video=false
\`\`\`

---

## 🎓 Learning Resources

### 📚 Documentation
- [Cypress Docs](https://docs.cypress.io)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Reference](https://docs.cypress.io/api/table-of-contents)

### 📹 Your Project Docs
- [README-TESTING.md](README-TESTING.md) - Complete overview
- [TESTING-QUICKSTART.md](frontend/TESTING-QUICKSTART.md) - Quick start
- [CYPRESS-TESTING.md](frontend/CYPRESS-TESTING.md) - Detailed guide

---

## ✅ Your Next Actions

\`\`\`
1. Start app:     docker-compose up
2. Open Cypress:  cd frontend && npm run cypress:open
3. Run tests:     Click on any test file
4. Watch magic:   See tests execute automatically
5. Explore code:  Read test files in cypress/e2e/
\`\`\`

🎉 **You're all set!** Happy testing!
