
describe("Text address", ()=>{
    it("Create address", ()=>{
        cy.visit("/")
        cy.get(':nth-child(4) > input').type("raphael@email")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar");
        cy.contains("Entrar").click();
        cy.get('.sc-hBpgZr').click()
        cy.get('[href="/newEnd"]').click()
        cy.get('[placeholder="00.000-000"]').type("87490000")
        cy.get('.estado').select("PR")
        cy.get('[type="number"]').type("147")
        cy.get('.user').select("raphael")
        cy.get('[name="bairro"]').type("Centro")
        cy.get('[name="nomeEnd"]').type("Rua Minas Gerais", { delay: 200 })
        cy.contains("Salvar").click()
    })

    it("Delete address", ()=>{
        cy.visit("/")
        cy.get(':nth-child(4) > input').type("raphael@email")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar");
        cy.contains("Entrar").click();
        cy.get('.sc-hBpgZr').click()
        cy.get('[data-id="22"] > .MuiDataGrid-cell--withRenderer > .MuiDataGrid-actionsCell > .MuiIconButton-colorInherit').click()
        cy.get('.swal2-confirm').click()

    })

    it("Update address", ()=>{
        cy.visit("/")
        cy.get(':nth-child(4) > input').type("raphael@email")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar");
        cy.contains("Entrar").click();
        cy.get('.sc-hBpgZr').click()
        cy.get('.MuiDataGrid-row--lastVisible > .MuiDataGrid-cell--withRenderer > .MuiDataGrid-actionsCell > .css-uxfybn-MuiButtonBase-root-MuiIconButton-root').click()
        cy.get('[placeholder="00.000-000"]').clear().type("87490000")
        cy.get('.estado').select("RS")
        cy.get('[type="number"]').clear().type("147")
        cy.get('.user').select("Mateus")
        cy.get('[name="bairro"]').clear().type("Centro")
        cy.get('[name="nomeEnd"]').clear().type("Rua Minas Gerais", { delay: 200 })
        cy.contains("Salvar").click()
    })

    it("Inputs address empty", ()=>{
        cy.visit("/")
        cy.get(':nth-child(4) > input').type("raphael@email")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar");
        cy.contains("Entrar").click();
        cy.get('.sc-hBpgZr').click()
        cy.get('[href="/newEnd"]').click()
        cy.contains("Salvar").click()
        cy.contains('Informe').should('be.visible')
    })

    it("Query address", ()=>{
        cy.visit("/")
        cy.get(':nth-child(4) > input').type("raphael@email")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar");
        cy.contains("Entrar").click();
        cy.get('.sc-hBpgZr').click()
        cy.get('[placeholder="Cep"]').type("87490000")
        cy.get('form > button').click()

    })

    it("Not Valid Cep", ()=>{
        cy.visit("/")
        cy.get(':nth-child(4) > input').type("raphael@email")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar");
        cy.contains("Entrar").click();
        cy.get('.sc-hBpgZr').click()
        cy.get('[href="/newEnd"]').click()
        cy.get('[placeholder="00.000-000"]').clear().type("87490111")
        cy.contains('CEP não encontrado').should('be.visible')
    })

    it("character address", ()=>{
        cy.visit("/")
        cy.get(':nth-child(4) > input').type("raphael@email")
        cy.get(':nth-child(5) > input').type("123")
        cy.contains("Entrar");
        cy.contains("Entrar").click();
        cy.get('.sc-hBpgZr').click()
        cy.get('[href="/newEnd"]').click()
        cy.get('[placeholder="00.000-000"]').type("dddd88888888")
        cy.get('.estado').select("PR")
        cy.get('[type="number"]').type("147")
        cy.get('.user').select("raphael")
        cy.get('[name="bairro"]').type("Centro")
        cy.get('[name="nomeEnd"]').type("Rua Minas Gerais", { delay: 200 })
        cy.contains("Salvar").click()
        cy.contains('CEP não encontrado').should('be.visible')
        cy.contains('Cidade é obrigatória').should('be.visible')
    })

})
