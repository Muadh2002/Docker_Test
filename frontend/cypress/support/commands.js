// ***********************************************
// Custom Cypress Commands
// ***********************************************

// Command to add a user via the UI
Cypress.Commands.add('addUser', (name, email) => {
  cy.get('input[placeholder="Enter name"]').clear().type(name)
  cy.get('input[placeholder="Enter email"]').clear().type(email)
  cy.contains('button', 'Add User').click()
})

// Command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('h1').should('be.visible')
  cy.get('h2').should('be.visible')
})

// Command to generate test user data
Cypress.Commands.add('generateTestUser', () => {
  const timestamp = Date.now()
  return {
    name: `Test User ${timestamp}`,
    email: `test${timestamp}@example.com`
  }
})

// Command to clear all form fields
Cypress.Commands.add('clearUserForm', () => {
  cy.get('input[placeholder="Enter name"]').clear()
  cy.get('input[placeholder="Enter email"]').clear()
})

// Command to verify user in list
Cypress.Commands.add('verifyUserInList', (name, email) => {
  cy.contains(name).should('be.visible')
  cy.contains(email).should('be.visible')
})

// Command to mock successful API response
Cypress.Commands.add('mockSuccessfulUserFetch', (users = []) => {
  cy.intercept('GET', '**/api/users.php', {
    statusCode: 200,
    body: {
      success: true,
      users: users
    }
  }).as('getUsers')
})

// Command to mock API error
Cypress.Commands.add('mockApiError', (method = 'GET', statusCode = 500) => {
  cy.intercept(method, '**/api/users.php', {
    statusCode: statusCode,
    body: {
      success: false,
      message: 'Server error'
    }
  }).as('apiError')
})
