var expect = require('chai').expect;
var loginPage = require('../pageobjects/login.page');
var dataGen = require('../utils/dataGenerator');

describe('Login page.', () => {
    var user = dataGen.generateUser();
    dataGen.registerUser(user);

    it('Form has correct header', () => {
        loginPage.open();
        expect(loginPage.formHeader.getText()).to.equal('Hello, User');
    });

    it('User can login with correct email and password', () => {
        loginPage.open();
        loginPage.fillForm(user.email, user.password);
        loginPage.formSuccess.waitForVisible();
        expect(loginPage.formSuccess.getText()).to.equal('Thanks for logging in, dear User!');
    });

    it('User can\'t login with correct email and incorrect password', () => {
        loginPage.open();
        loginPage.fillForm(user.email, user.password + " ");
        expect(loginPage.formError.getText()).to.equal('Invalid login or/and password');
    });

    it('User can\'t login with incorrect email and correct password', () => {
        loginPage.open();
        loginPage.fillForm(user.email + "_", user.password);
        expect(loginPage.formError.getText()).to.equal('Invalid login or/and password');
    });

    it('User can\'t login with incorrect email and correct password', () => {
        loginPage.open();
        loginPage.fillForm(user.email + "_", user.password + "_");
        expect(loginPage.formError.getText()).to.equal('Invalid login or/and password');
    });

    it('User can\'t login with empty email and password', () => {
        loginPage.open();
        loginPage.submitButton.click();
        expect(loginPage.emailValidation.getText()).to.equal('This field is required.');
        expect(loginPage.passwordValidation.getText()).to.equal('This field is required.');
    });
});
