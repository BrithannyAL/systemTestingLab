describe('Documentos y trámites', function () {
    
    beforeEach(function () {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.visit('https://www.munisc.go.cr/Paginas/Visitantes/Documentos.aspx');
    });

    it('PR031- Iniciar Sesión', function () { // Prueba con usuario valido

        
    })

});