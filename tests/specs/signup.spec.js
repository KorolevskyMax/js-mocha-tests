var expect = require('chai').expect;
var signupPage = require('../pageobjects/signup.page');
var loginPage = require('../pageobjects/login.page');
var dataGen = require('../utils/dataGenerator');

var incorrectEmails = {
    emails: [
        "plainaddress",
        "#@%^%#$@#$@#.com",
        "@domain.com",
        "Joe Smith <email@domain.com>",
        "email.domain.com",
        "email@domain@domain.com",
        ".email@domain.com",
        "email.@domain.com",
        "email..email@domain.com",
        "email@domain",
        "email@-domain.com",
        "email@111.222.333.44444",
        "email@domain..com"
    ],
    reasons: [
        "Missing @ sign and domain",
        "Garbage",
        "Missing username",
        "Encoded html within email is invalid",
        "Missing @",
        "Two @ sign",
        "Leading dot in address is not allowed",
        "Trailing dot in address is not allowed",
        "Multiple dots",
        "Missing top level domain (.com/.net/.org/etc)",
        "Leading dash in front of domain is invalid",
        "Invalid IP format",
        "Multiple dot in the domain portion is invalid"
    ]
};
describe('Signup page.', () => {
    var user = dataGen.generateUser();

    it('User can signup with correct data', () => {
        signupPage.open();
        signupPage.fillForm(user.email, user.password, user.retypePassword);
        signupPage.formSuccess.waitForVisible();
        expect(signupPage.formSuccess.getText()).to.equal('Thanks for registering, dear User!');
    });

    it('User can login with created user', () => {
        loginPage.open();
        loginPage.fillForm(user.email, user.password);
        loginPage.formSuccess.waitForVisible();
        expect(loginPage.formSuccess.getText()).to.equal('Thanks for logging in, dear User!');
    });

    it('User can\'t signup twice correct data', () => {
        signupPage.open();
        signupPage.fillForm(user.email, user.password, user.retypePassword);
        signupPage.formError.waitForVisible();
        expect(signupPage.formError.getText()).to.equal("Hello, " + user.email + " seems that you're already registered, try to login");
    });

    it('User can\'t signup with correct email and short passwords', () => {
        signupPage.open();
        signupPage.fillForm(user.email, "1234a", "1234a");
        expect(signupPage.passwordValidation.getText()).to.equal('Password is too short.');
    });

    it('User can\'t signup with different passwords', () => {
        signupPage.open();
        signupPage.fillForm(user.email, user.password, user.retypePassword + "123");
        expect(signupPage.rePasswordValidation.getText()).to.equal('Passwords are not equal.');
    });

    for (let i = 0; i < incorrectEmails.emails.length; i++) {
        it('User can\'t signup with incorrect email: ' + incorrectEmails.reasons[i], () => {
            signupPage.open();
            signupPage.emailField.setValue(incorrectEmails.emails[i]);
            signupPage.submitButton.click();
            expect(signupPage.emailValidation.getText()).to.equal('This is not a valid email.');
        });
    }

    it('User can\'t signup with empty fields', () => {
        signupPage.open();
        signupPage.submitButton.click();
        expect(signupPage.emailValidation.getText()).to.equal("This field is required.");
        expect(signupPage.passwordValidation.getText()).to.equal("This field is required.");
        expect(signupPage.rePasswordValidation.getText()).to.equal("This field is required.");
    });

});
