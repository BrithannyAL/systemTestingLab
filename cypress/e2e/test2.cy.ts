describe('Documentos y trámites', function () {
    
    // Configuración antes de cada prueba
    beforeEach(function () {
        // Ignora excepciones no capturadas para evitar interrupciones
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        // Navega a la página de documentos de MuniSC
        cy.visit('https://www.munisc.go.cr/Paginas/Visitantes/Documentos.aspx');
    });

    // Configuración después de cada prueba
    afterEach(function () {
        // Limpia cookies y almacenamiento local después de cada prueba
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    // Prueba para descargar el primer documento del departamento Acueducto
    it('Decargar el primer documento del departamento Acueducto', function () {
        // Nombre de la prueba: Decargar el primer documento del departamento Acueducto
        // Objetivo: Verificar que se muestra una lista de resultados en la selección Acueducto y que se pueden descargar los documentos.
        // Datos de prueba: Selección del departamento "Acueducto".
        // Resultado esperado: El documento se descargará exitosamente.

        // Paso 1: Haz clic en el campo de selección del departamento
        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[1]/label[2]/input').click();

        // Paso 2: Selecciona el departamento "Acueducto"
        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[2]/select').select('Acueducto');

        // Paso 3: Haz clic en el botón para descargar el primer documento de la lista
        cy.get('table tbody tr').eq(1).find('td').eq(2).find('img').click();

        // Resultado esperado: El archivo se debe descargar en la carpeta predeterminada de descargas
    });

    // Prueba para notificar al usuario cuando no hay documentos disponibles
    it('Notificar al usuario cuando no hay documentos disponibles', function () {
        // Nombre de la prueba: Notificar al usuario cuando no hay documentos disponibles
        // Objetivo: Verificar que se muestra un mensaje al usuario cuando no hay documentos disponibles.
        // Datos de prueba: Selección del departamento "Administración".
        // Resultado esperado: Se debe mostrar un mensaje de error indicando que no hay documentos disponibles.

        // Paso 1: Haz clic en el campo de selección del departamento
        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[1]/label[2]/input').click();

        // Paso 2: Selecciona el departamento "Administración"
        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[2]/select').select('Administración');

        // Paso 3: Verifica que se muestra el mensaje de error indicando que no hay documentos disponibles
        cy.xpath('/html/body/form/div[3]/div[2]/div[1]/div[3]/div/div[2]/fieldset/div[4]/div/table/tbody/tr/td/div/span').should('have.text', 'No existen documentos relacionados.');

        // Resultado esperado: El mensaje de error debe ser visible y debe indicar que no hay documentos disponibles
    });

});