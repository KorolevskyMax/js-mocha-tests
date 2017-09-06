var page = require('./page');

var signupPage = Object.create(page, {
    /**
     *  elements
     */
    emailField: { get: () => $('[name="signup-email"]') },
    passwordField: { get: () => $('[name="signup-password"]')},
    rePasswordField: { get: () => $('[name="signup-repassword"]')},
    submitButton: { get: () => $('button[name="signup"]') },
    emailValidation: { get: () => $('[name="signup-email-validation"]') },
    passwordValidation: { get: () => $('[name="signup-password-validation"]') },
    rePasswordValidation: { get: () => $('[name="signup-repassword-validation"]') },
    formHeader: { get: () => $('h1') },
    formSuccess: { get: () => $('[name="signup-success"]') },
    formError: { get: () => $('[name="signup-error"]') },
    /**
     *  methods
     */
    open: { value: () => {
        page.open.call(this, 'signup');
        signupPage.formHeader.waitForVisible();
    } },

    fillForm: { value: (email, password, rePassword) => {
        signupPage.emailField.setValue(email);
        signupPage.passwordField.setValue(password);
        signupPage.rePasswordField.setValue(rePassword);
        signupPage.submitButton.click();
    } },

});

module.exports = signupPage;
