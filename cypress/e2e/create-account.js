/// <reference types="cypress" />

describe("Signup & Login", () => {

    let randomstring = Math.random().toString(36).substring(2);
    let testUsername = "Auto" + randomstring;
    let testEmail = "Auto_email" + randomstring + "@gmail.com";
    const password = "Password1";
    const answer = "Strbac";

    beforeEach(() => {
        cy.log("Email: " + testEmail);
        cy.log("Password: " + password);
        cy.visit("http://localhost:3000/");
        cy.get(".mat-button-wrapper").contains("Dismiss").click();
        cy.get("#navbarAccount").click({ force: true });
        cy.get("#navbarLoginButton").click();
    })

    it("Test valid sign up", () => {
        cy.get('.mat-simple-snackbar-action > .mat-focus-indicator').click();
        cy.get("#newCustomerLink").click();
        cy.get('#emailControl').type(testEmail);
        cy.get('#passwordControl').type(password);
        cy.get('#repeatPasswordControl').type(password);
        cy.get('.mat-select-placeholder').click();
        cy.get('.mat-option-text').contains("maiden name?").click();
        cy.get('#securityAnswerControl').type(answer);
        cy.get('#registerButton').click();
        cy.get('.mat-simple-snack-bar-content').should("contain", "Registration completed successfully");
    })
    it("Test valid sign in", () => {
        cy.get("#email").type(testEmail);
        cy.get('#password').type(password);
        cy.get('#loginButton').click();
        cy.get('.mat-toolbar-row > .mat-focus-indicator.ng-star-inserted').should("contain", "Your Basket");
    })
    describe("API tests", () => {
        const userCredentials = {
            "email": testEmail,
            "password": password
        }
        it("Test valid sign in via api", () => {
            cy.request("POST", "http://localhost:3000/rest/user/login", userCredentials)
                .then(response => {
                    expect(response.status).to.eq(200)
                })
        })
    })
})
