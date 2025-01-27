import './commands';

import '../../node_modules/cypress-xpath';

import {mount} from 'cypress/angular';

declare global {
    namespace Cypress {
        interface Chainable {
        mount: typeof mount;
        }
    }
}

Cypress.Commands.add('mount', mount);