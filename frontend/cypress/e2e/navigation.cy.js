/// <reference types="cypress" />

describe('Navigation and UI Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have proper page structure', () => {
    // Check main container exists
    cy.get('.App').should('exist');
    
    // Check header section
    cy.get('header.App-header').should('be.visible');
    cy.contains('h1', '📚 React + PHP Learning Project Test').should('be.visible');
  });

  it('should be responsive', () => {
    // Test mobile viewport
    cy.viewport('iphone-x');
    cy.contains('h1', '📚 React + PHP Learning Project Test').should('be.visible');
    
    // Test tablet viewport
    cy.viewport('ipad-2');
    cy.contains('h1', '📚 React + PHP Learning Project Test').should('be.visible');
    
    // Test desktop viewport
    cy.viewport(1920, 1080);
    cy.contains('h1', '📚 React + PHP Learning Project Test').should('be.visible');
  });

  it('should have accessible form elements', () => {
    // Check form inputs are accessible
    cy.get('input[placeholder="Name"]')
      .should('be.visible')
      .and('not.be.disabled');
    
    cy.get('input[placeholder="Email"]')
      .should('be.visible')
      .and('not.be.disabled');
    
    // Check button is accessible
    cy.contains('button', 'Add User')
      .should('be.visible')
      .and('not.be.disabled');
  });

  it('should focus on form inputs when clicked', () => {
    // Click and verify focus
    cy.get('input[placeholder="Name"]')
      .click()
      .should('have.focus');
    
    cy.get('input[placeholder="Email"]')
      .click()
      .should('have.focus');
  });

  it('should allow keyboard navigation', () => {
    // Wait for initial user fetch to complete
    cy.wait(2000);
    // Tab through form elements
    cy.get('input[placeholder="Name"]').focus().tab();
    cy.focused().should('have.attr', 'placeholder', 'Email');

    cy.focused().tab();
    cy.focused().should('contain', 'Add User');
  });
});
