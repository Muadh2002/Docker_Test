/// <reference types="cypress" />

describe('Navigation and UI Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have proper page structure', () => {
    // Check main container exists
    cy.get('.App').should('exist')
    
    // Check header section
    cy.get('header, .header, h1').should('be.visible')
  })

  it('should be responsive', () => {
    // Test mobile viewport
    cy.viewport('iphone-x')
    cy.contains('h1', 'React + PHP User Manager').should('be.visible')
    
    // Test tablet viewport
    cy.viewport('ipad-2')
    cy.contains('h1', 'React + PHP User Manager').should('be.visible')
    
    // Test desktop viewport
    cy.viewport(1920, 1080)
    cy.contains('h1', 'React + PHP User Manager').should('be.visible')
  })

  it('should have accessible form elements', () => {
    // Check form inputs are accessible
    cy.get('input[placeholder="Enter name"]')
      .should('be.visible')
      .and('not.be.disabled')
    
    cy.get('input[placeholder="Enter email"]')
      .should('be.visible')
      .and('not.be.disabled')
    
    // Check button is accessible
    cy.contains('button', 'Add User')
      .should('be.visible')
      .and('not.be.disabled')
  })

  it('should focus on form inputs when clicked', () => {
    // Click and verify focus
    cy.get('input[placeholder="Enter name"]')
      .click()
      .should('have.focus')
    
    cy.get('input[placeholder="Enter email"]')
      .click()
      .should('have.focus')
  })

  it('should allow keyboard navigation', () => {
    // Tab through form elements
    cy.get('body').tab()
    cy.focused().should('have.attr', 'placeholder')
    
    cy.focused().tab()
    cy.focused().should('exist')
  })
})
