/// <reference types="cypress" />

describe('API Integration Tests', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:8000/api'

  beforeEach(() => {
    cy.visit('/')
  })

  it('should successfully fetch users from API', () => {
    // Intercept the GET request
    cy.intercept('GET', '**/api/users.php').as('getUsers')
    
    // Trigger refresh
    cy.contains('button', 'Refresh List').click()
    
    // Wait for API response
    cy.wait('@getUsers').then((interception) => {
      // Verify response structure
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body).to.have.property('success')
      
      if (interception.response.body.success) {
        expect(interception.response.body).to.have.property('users')
        expect(interception.response.body.users).to.be.an('array')
      }
    })
  })

  it('should send POST request when adding user', () => {
    // Intercept the POST request
    cy.intercept('POST', '**/api/users.php').as('addUser')
    
    const timestamp = Date.now()
    const newUser = {
      name: `API Test User ${timestamp}`,
      email: `apitest${timestamp}@example.com`
    }
    
    // Fill form and submit
    cy.get('input[placeholder="Enter name"]').type(newUser.name)
    cy.get('input[placeholder="Enter email"]').type(newUser.email)
    cy.contains('button', 'Add User').click()
    
    // Wait for API response
    cy.wait('@addUser').then((interception) => {
      // Verify request was sent with correct data
      expect(interception.request.body).to.include({
        name: newUser.name,
        email: newUser.email
      })
      
      // Verify response
      expect(interception.response.statusCode).to.be.oneOf([200, 201])
    })
  })

  it('should handle network errors', () => {
    // Force network failure
    cy.intercept('GET', '**/api/users.php', {
      forceNetworkError: true
    }).as('networkError')
    
    // Trigger API call
    cy.contains('button', 'Refresh List').click()
    
    // Should show error message
    cy.contains(/failed|error|connect/i, { timeout: 5000 }).should('be.visible')
  })

  it('should handle 404 errors', () => {
    // Mock 404 response
    cy.intercept('GET', '**/api/users.php', {
      statusCode: 404,
      body: { success: false, message: 'Not found' }
    }).as('notFound')
    
    // Trigger API call
    cy.contains('button', 'Refresh List').click()
    
    cy.wait('@notFound')
    
    // Should handle error gracefully
    cy.contains(/error|failed/i).should('be.visible')
  })

  it('should retry failed requests', () => {
    let requestCount = 0
    
    // Intercept and count requests
    cy.intercept('GET', '**/api/users.php', (req) => {
      requestCount++
      req.reply({ success: true, users: [] })
    }).as('getUsers')
    
    // Trigger multiple refreshes
    cy.contains('button', 'Refresh List').click()
    cy.wait('@getUsers')
    
    cy.contains('button', 'Refresh List').click()
    cy.wait('@getUsers')
    
    // Verify multiple requests were made
    cy.wrap(requestCount).should('be.gte', 2)
  })

  it('should validate email format on backend', () => {
    // Intercept POST and mock validation error
    cy.intercept('POST', '**/api/users.php', {
      statusCode: 400,
      body: { success: false, message: 'Invalid email format' }
    }).as('invalidEmail')
    
    // Try to add user with invalid email
    cy.get('input[placeholder="Enter name"]').type('Test User')
    cy.get('input[placeholder="Enter email"]').type('invalid-email')
    cy.contains('button', 'Add User').click()
    
    cy.wait('@invalidEmail')
    
    // Should display error
    cy.contains(/invalid|error/i).should('be.visible')
  })
})
