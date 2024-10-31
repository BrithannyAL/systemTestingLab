describe('Forms Login', function () {
    
    // Configuración antes de cada prueba
    beforeEach(function () {
        // Ignora excepciones no capturadas para evitar interrupciones
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        // Navega a la página de documentos de MuniSC
        cy.visit('https://www.munisc.go.cr/Paginas/Visitantes/Documentos.aspx');
    });

    // Configuración despues de cada prueba
    afterEach(function () {
        cy.reload(); // Recargar la página después de cada prueba
    });

    // Prueba para buscar y descargar un documento
    it('PR001 - Buscar y descargar documento', function () { 
        // Nombre de la prueba: PR001 - Buscar y descargar documento
        // Objetivo: Realizar una búsqueda de documentos y descargar el primer resultado.
        // Datos de prueba: Texto de búsqueda "Acta".
        // Resultado esperado: El documento se descargará exitosamente.

        // Paso 1: Haz clic en el campo de búsqueda
        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[1]/label[1]/input').click();

        // Paso 2: Introduce el término "Acta" en el campo de búsqueda
        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[3]/input[1]').type('Acta');

        // Paso 3: Haz clic en el botón para realizar la búsqueda
        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[3]/input[2]').click();

        // Paso 4: Selecciona el botón para descargar el primer documento de la lista
        cy.get('table tbody tr').eq(1).find('td').eq(2).find('img').click();

        // Resultado esperado: El archivo se debe descargar en la carpeta predeterminada de descargas
    });

    // Prueba para intentar buscar sin ingresar texto
    it('PR002 - Intentar buscar sin texto', function () { 
        // Nombre de la prueba: PR002 - Intentar buscar sin texto
        // Objetivo: Verificar que se muestra un mensaje de error al hacer clic en buscar sin ingresar texto.
        // Datos de prueba: No se ingresa texto en el buscador.
        // Resultado esperado: Se debe mostrar un mensaje de error en un modal.

        // Paso 1: Haz clic en el campo de búsqueda (sin escribir nada)
        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[1]/label[1]/input').click();

        // Paso 2: Introduce el término "" en el campo de búsqueda
        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[3]/input[1]').should('have.text','');

        // Paso 2: Haz clic en el botón para realizar la búsqueda
        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[3]/input[2]').click();

        // Paso 3: Verifica que el modal de error esté visible
        cy.get('body').should('have.class', 'home loading modal-open');

        // Paso 4: Verificar que el modal esté visible
        cy.xpath('/html/body/div[5]/div').should('exist').find('/html/body/div[7]/div/div/div[1]/div/div[1]/button').click();
        cy.wait(500);

        // Paso 5: Haz clic en el botón de aceptar el mensaje de error
        cy.xpath('/html/body/div[7]/div/div/div[1]/div/div[1]/button').click();

        // Resultado esperado: El modal debe cerrarse y no debe haber más mensajes de error visibles.
        cy.xpath('/html/body/div[7]/div').should('not.exist');
    });

});
