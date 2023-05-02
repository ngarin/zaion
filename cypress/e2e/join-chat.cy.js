describe('Join Chat', () => {
    beforeEach(() => {
      cy.on('uncaught:exception', () => false)
      cy.visit('http://localhost')
  
      cy.get('.username-input')
        .focus()
        .type('MyUsername')
    
      cy.get('.username-submit-button').click()
    })
  
    it('should fail if roomID is empty', () => {
      cy.get('.join-chat form button').first().click()
  
      cy.get('.join-chat').should('exist')
    })
  
    it('should success if roomID not empty', () => {
      cy.get('.join-chat form input')
        .focus()
        .type('123')
    
      cy.get('.join-chat form button').first().click()
  
      cy.get('.join-chat').should('not.exist')
    })
  })