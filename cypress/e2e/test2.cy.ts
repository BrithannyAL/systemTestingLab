describe('Documentos y trámites', function () {
    
    beforeEach(function () {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.visit('https://www.munisc.go.cr/Paginas/Visitantes/Documentos.aspx');
    });

    afterEach(function () {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Decargar el primer documento del departamento Acueducto', function () {

        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[1]/label[2]/input').click();

        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[2]/select').select('Acueducto');

        cy.get('table tbody tr').eq(1).find('td').eq(2).find('img').click();
    })

    it('Notificar al usuario cuando no hay documentos disponibles', function () {

        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[1]/label[2]/input').click();

        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[2]/select').select('Administración');

        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[4]/div/table/tbody/tr/td/div/span').should('have.text', 'No existen documentos relacionados.');
    })

});