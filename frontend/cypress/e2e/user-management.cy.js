/// <reference types="cypress" />

describe('User Management E2E Tests', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('/')
  })

  it('should load the application successfully', () => {
    // Verify page title and main heading
    cy.contains('h1', 'React + PHP User Manager').should('be.visible')
    cy.contains('Learn React with PHP Backend').should('be.visible')
  })

  it('should display the user list section', () => {
    // Check if user list section exists
    cy.contains('h2', 'User List').should('be.visible')
    
    // Verify refresh button exists
    cy.contains('button', 'Refresh List').should('be.visible')
  })

  it('should display the add user form', () => {
    // Check form heading
    cy.contains('h2', 'Add New User').should('be.visible')
    
    // Verify form inputs exist
    cy.get('input[placeholder="Enter name"]').should('be.visible')
    cy.get('input[placeholder="Enter email"]').should('be.visible')
    
    // Verify submit button exists
    cy.contains('button', 'Add User').should('be.visible')
  })

  it('should show validation error when submitting empty form', () => {
    // Try to submit empty form
    cy.contains('button', 'Add User').click()
    
    // Should show error message
    cy.contains('Please fill in all fields').should('be.visible')
  })

  it('should add a new user successfully', () => {
    // Generate unique email to avoid conflicts
    const timestamp = Date.now()
    const testUser = {
      name: `Test User ${timestamp}`,
      email: `test${timestamp}@example.com`
    }

    // Fill in the form
    cy.get('input[placeholder="Enter name"]').type(testUser.name)
    cy.get('input[placeholder="Enter email"]').type(testUser.email)
    
    // Submit the form
    cy.contains('button', 'Add User').click()
    
    // Verify success message or user appears in list
    cy.contains(testUser.name, { timeout: 5000 }).should('be.visible')
    cy.contains(testUser.email).should('be.visible')
  })

  it('should refresh the user list when clicking refresh button', () => {
    // Click refresh button
    cy.contains('button', 'Refresh List').click()
    
    // Wait for loading to complete
    cy.wait(1000)
    
    // Verify user list is still displayed
    cy.contains('h2', 'User List').should('be.visible')
  })

  it('should handle API errors gracefully', () => {
    // Intercept API call and force it to fail
    cy.intercept('GET', '**/api/users.php', {
      statusCode: 500,
      body: { success: false, message: 'Server error' }
    }).as('getUsersError')
    
    // Refresh to trigger the API call
    cy.contains('button', 'Refresh List').click()
    
    // Wait for the intercepted request
    cy.wait('@getUsersError')
    
    // Should display error message
    cy.contains(/error|failed/i).should('be.visible')
  })

  it('should clear form after successful submission', () => {
    const timestamp = Date.now()
    
    // Fill and submit form
    cy.get('input[placeholder="Enter name"]').type(`User ${timestamp}`)
    cy.get('input[placeholder="Enter email"]').type(`user${timestamp}@test.com`)
    cy.contains('button', 'Add User').click()
    
    // Wait for submission
    cy.wait(1000)
    
    // Form fields should be empty
    cy.get('input[placeholder="Enter name"]').should('have.value', '')
    cy.get('input[placeholder="Enter email"]').should('have.value', '')
  })

  it('should display loading state during data fetch', () => {
    // Intercept API with delay
    cy.intercept('GET', '**/api/users.php', (req) => {
      req.reply((res) => {
        res.delay = 2000 // 2 second delay
      })
    }).as('getUsers')
    
    // Trigger fetch
    cy.contains('button', 'Refresh List').click()
    
    // Check for loading indicator
    cy.contains(/loading/i).should('be.visible')
    
    // Wait for request to complete
    cy.wait('@getUsers')
  })
})
