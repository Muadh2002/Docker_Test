/// <reference types="cypress" />

describe('API Integration Tests', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:8000/api';

  beforeEach(() => {
    cy.visit('/');
  });

  it('should successfully fetch users on page load', () => {
    // Intercept the GET request
    cy.intercept('GET', '**/api/users.php').as('getUsers');
    
    // Wait for API response
    cy.wait('@getUsers').then((interception) => {
      // Verify response structure
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property('success');
      
      if (interception.response.body.success) {
        expect(interception.response.body).to.have.property('users');
        expect(interception.response.body.users).to.be.an('array');
      }
    });
  });

  it('should send POST request when adding user', () => {
    // Intercept the POST request
    cy.intercept('POST', '**/api/users.php').as('addUser');
    
    const timestamp = Date.now();
    const newUser = {
      name: `API Test User ${timestamp}`,
      email: `apitest${timestamp}@example.com`
    };
    
    // Fill form and submit
    cy.get('input[placeholder="Name"]').type(newUser.name);
    cy.get('input[placeholder="Email"]').type(newUser.email);
    cy.contains('button', 'Add User').click();
    
    // Wait for API response
    cy.wait('@addUser').then((interception) => {
      // Verify request was sent with correct data
      expect(interception.request.body).to.include({
        name: newUser.name,
        email: newUser.email
      });
      
      // Verify response
      expect(interception.response.statusCode).to.be.oneOf([200, 201]);
    });
  });

  it('should handle network errors when fetching users', () => {
    // Force network failure
    cy.intercept('GET', '**/api/users.php', {
      forceNetworkError: true
    }).as('networkError');
    
    // Reload the page to trigger fetch
    cy.reload();
    
    // Should show error message
    cy.contains(/failed|error|connect/i, { timeout: 5000 }).should('be.visible');
  });

  it('should handle 404 errors when fetching users', () => {
    // Mock 404 response
    cy.intercept('GET', '**/api/users.php', {
      statusCode: 404,
      body: { success: false, message: 'Not Found' }
    }).as('notFound');
    
    // Reload the page to trigger fetch
    cy.reload();
    
    cy.wait('@notFound');
    
    // Should handle error gracefully
    cy.get('.error-message').should('be.visible').and('contain', 'Not Found');
  });

  it('should validate email format on backend', () => {
    // Try to add user with invalid email
    cy.get('input[placeholder="Name"]').type('Test User');
    cy.get('input[placeholder="Email"]').type('invalid-email');
    cy.contains('button', 'Add User').click();

    // Should display error
    cy.get('[data-cy=error-message]').should('be.visible').and('contain', 'Invalid email format');
  });
});
