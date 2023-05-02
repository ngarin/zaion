describe('Login', () => {
  it('should fail if username empty', () => {
    cy.on('uncaught:exception', () => false)
    cy.visit('http://localhost')

    cy.get('.username-submit-button').click()

    cy.get('.username-submit-button').should('exist')
  })

  it('should success if username not empty', () => {
    cy.on('uncaught:exception', () => false)
    cy.visit('http://localhost')

    cy.get('.username-input')
      .focus()
      .type('MyUsername')
  
    cy.get('.username-submit-button').click()

    cy.get('.username-submit-button').should('not.exist')
  })
})