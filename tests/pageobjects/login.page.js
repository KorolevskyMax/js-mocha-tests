var page = require('./page');

var loginPage = Object.create(page, {
    /**
     *  elements
     */
    emailField: { get: () => $('[name="email"]') },
    passwordField: { get: () => $('[name="password"]')},
    submitButton: { get: () => $('button[name="login"]') },
    emailValidation: { get: () => $('[name="email-validation"]') },
    passwordValidation: { get: () => $('[name="password-validation"]') },
    formHeader: { get: () => $('h1') },
    formSuccess: { get: () => $('[name="login-success"]') },
    formError: { get: () => $('[name="login-error"]') },
    /**
     *  methods
     */
    open: { value: () => {
        page.open.call(this, 'login');
        loginPage.formHeader.waitForVisible();
    } },

    fillForm: { value: (email, password) => {
        loginPage.emailField.setValue(email);
        loginPage.passwordField.setValue(password);
        loginPage.submitButton.click();
    } },
});

module.exports = loginPage;
