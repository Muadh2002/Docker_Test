/// <reference types="cypress" />

describe('User Management E2E Tests', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('/');
  });

  it('should load the application successfully', () => {
    // Verify page title and main heading
    cy.contains('h1', '📚 React + PHP Learning Project Test').should('be.visible');
    cy.contains('p', 'Simple User Management System').should('be.visible');
  });

  it('should display the user list section', () => {
    // Check if user list section exists
    cy.contains('h2', 'Users List').should('be.visible');
  });

  it('should display the add user form', () => {
    // Check form heading
    cy.contains('h2', 'Add New User').should('be.visible');
    
    // Verify form inputs exist
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    
    // Verify submit button exists
    cy.contains('button', 'Add User').should('be.visible');
  });

  it('should show validation error when submitting empty form', () => {
    // Try to submit empty form
    cy.contains('button', 'Add User').click();
    
    // Should show error message
    cy.contains('Please fill in all fields').should('be.visible');
  });

  it('should add a new user successfully', () => {
    // Generate unique email to avoid conflicts
    const timestamp = Date.now();
    const testUser = {
      name: `Test User ${timestamp}`,
      email: `test${timestamp}@example.com`
    };

    // Fill in the form
    cy.get('input[placeholder="Name"]').type(testUser.name);
    cy.get('input[placeholder="Email"]').type(testUser.email);
    
    // Submit the form
    cy.contains('button', 'Add User').click();
    
    // Verify success message or user appears in list
    cy.contains(testUser.name, { timeout: 5000 }).should('be.visible');
    cy.contains(testUser.email).should('be.visible');
  });

  it('should delete a user successfully', () => {
    // Add a user to delete
    const timestamp = Date.now();
    const testUser = {
      name: `Delete User ${timestamp}`,
      email: `delete${timestamp}@example.com`
    };

    cy.request('POST', 'http://localhost:8000/api/users.php', testUser);

    // Reload the page to see the new user
    cy.reload();

    // Find the user and click delete
    cy.contains('.user-card', testUser.name).within(() => {
      cy.get('.delete-btn').click();
    });

    // Confirm the deletion
    cy.on('window:confirm', () => true);

    // Verify the user is gone
    cy.contains(testUser.name).should('not.exist');
  });


  it('should handle API errors gracefully when fetching', () => {
    // Intercept API call and force it to fail
    cy.intercept('GET', '**/api/users.php', {
      statusCode: 500,
      body: { success: false, message: 'Server error' }
    }).as('getUsersError');
    
    // Reload to trigger the API call
    cy.reload();
    
    // Wait for the intercepted request
    cy.wait('@getUsersError');
    
    // Should display error message
    cy.contains(/error|failed/i).should('be.visible');
  });

  it('should clear form after successful submission', () => {
    const timestamp = Date.now();
    
    // Fill and submit form
    cy.get('input[placeholder="Name"]').type(`User ${timestamp}`);
    cy.get('input[placeholder="Email"]').type(`user${timestamp}@test.com`);
    cy.contains('button', 'Add User').click();
    
    // Wait for submission
    cy.wait(2000);
    
    // Form fields should be empty
    cy.get('input[placeholder="Name"]').should('have.value', '');
    cy.get('input[placeholder="Email"]').should('have.value', '');
  });

  it('should display loading state during data fetch', () => {
    // Intercept API with delay
    cy.intercept('GET', '**/api/users.php', (req) => {
      req.reply((res) => {
        res.delay = 2000; // 2 second delay
      });
    }).as('getUsers');
    
    // Reload to trigger fetch
    cy.reload();
    
    // Check for loading indicator
    cy.contains(/loading/i).should('be.visible');
    
    // Wait for request to complete
    cy.wait('@getUsers');
  });
});
