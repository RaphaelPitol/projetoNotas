

describe("Test Cars", ()=>{
    it("Create Car", ()=>{
        cy.visit("/")
        cy.get(':nth-child(4) > input').type("raphael@email")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar");
        cy.contains("Entrar").click();
        cy.get('.sc-ksJisA').click()
        cy.get(':nth-child(1) > input').type("x6")
        cy.get(':nth-child(2) > input').type("BmW")
        cy.get(':nth-child(3) > input').type("2023")
        cy.get('select').select("raphael")
        cy.get('.sc-ivDvhZ > button').click()
        cy.get('.swal2-confirm').click()
        cy.get('[href="/lista"]').click()
        cy.contains("Lista de Carros").should('be.visible')
    })

    it("Update Car", ()=>{
        cy.visit("/")
        cy.get(':nth-child(4) > input').type("raphael@email")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar");
        cy.contains("Entrar").click();
        cy.get('.sc-ksJisA').click()
        cy.get('[href="/lista"]').click()
        cy.get(':nth-child(2) > :nth-child(5) > .edit').click()
        cy.get(':nth-child(1) > input').clear().type("Fucao Rosa")
        cy.get('.sc-ivDvhZ > button').click()
        cy.get('.swal2-confirm').click()
        cy.contains("Lista de Carros").should('be.visible')
    })

    it("Delete Car", ()=>{
        cy.visit("/")
        cy.get(':nth-child(4) > input').type("raphael@email")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar");
        cy.contains("Entrar").click();
        cy.get('.sc-ksJisA').click()
        cy.get('[href="/lista"]').click()
        cy.get(':nth-child(2) > :nth-child(5) > .delete').click()
        cy.contains("Excluir").should("be.visible")
    })

    it("List Car", ()=>{
        cy.visit("/")
        cy.get(':nth-child(4) > input').type("raphael@email")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar");
        cy.contains("Entrar").click();
        cy.get('.sc-ksJisA').click()
        cy.get('[href="/lista"]').click()
        cy.contains("Lista de Carros").should("be.visible")

    })
})
