const userTesteCypress = String(Math.random(), 1000).replace('.', '')

describe("Text login", () => {
    it('empty login entries text', () => {
        cy.visit("/");
        cy.contains("Entrar");
        cy.contains("Entrar").click();
        cy.contains("E-mail").should("be.visible");
    });

    it("valid login", ()=>{
        cy.visit("/");
        cy.get(':nth-child(4) > input').type("raphael@email")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar");
        cy.contains("Entrar").click();
        // cy.url().should('include', '/')
    })

    it("create login", ()=>{
        cy.visit("/");
        cy.get('a').click()
        cy.get(':nth-child(4) > input').type("usuario1")
        cy.get(':nth-child(5) > input').type("useremail"+userTesteCypress)
        cy.get(':nth-child(6) > input').type("senha"+userTesteCypress)
        cy.contains("Cadastrar").click()
        cy.get('.swal2-confirm').click()

    })
    it("update login", ()=>{
        cy.visit("/");
        cy.get(':nth-child(4) > input').type("useremail")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar").click();
        cy.get('.sc-grXZZQ').click()
        // cy.get(':nth-child(3) > input').clear().type("useremail@teste")
        cy.get(':nth-child(4) > input').type("1234")
        // cy.get(':nth-child(5) > input').type()
        cy.contains('Salvar').click()
        cy.contains("informar").should('be.visible')
        cy.get('.swal2-confirm').click()
        cy.visit("/");
    })

    it("logOut User", ()=>{
        cy.visit("/");
        cy.get(':nth-child(4) > input').type("useremail")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar").click()
        cy.get('.sc-dkjKgF').click()
        cy.get('.swal2-confirm').click()
        cy.contains("Faça seu login").should('be.visible')
    })

});
