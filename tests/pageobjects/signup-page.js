import webdriver from 'selenium-webdriver';
import config from 'config';
import BasePage from './base-page';

const emailField = webdriver.By.name('signup-email');
const emailValidation = webdriver.By.name('signup-email-validation');
const passwordField = webdriver.By.name('signup-password');
const passwordValidation = webdriver.By.name('signup-password-validation');
const rePasswordField = webdriver.By.name('signup-repassword');
const rePasswordValidation = webdriver.By.name('signup-repassword-validation');
const loginBtn = webdriver.By.name('signup');
const formHeader = webdriver.By.css('h1');
const formSuccess = webdriver.By.name('signup-success');
const formError = webdriver.By.name('signup-error');

export default class SignupPage extends BasePage {
	constructor(driver, visit = false) {
		super(driver, formHeader, visit, config.get('signupURL'));
		this.emailField = emailField;
		this.emailValidation = emailValidation;
		this.passwordField = passwordField;
		this.passwordValidation = passwordValidation;
		this.rePasswordField = rePasswordField;
		this.rePasswordValidation = rePasswordValidation;
		this.loginBtn = loginBtn;
		this.formHeader = formHeader;
		this.formError = formError;
		this.formSuccess = formSuccess;
	}

	formHeaderDisplayed() {
		return this.getText(this.formHeader);
	}

	fillEmailField(email) {
		return this.sendKeys(this.emailField, email);
	}

	getEmailError() {
		return this.getText(this.emailValidation);
	}

	fillPasswordField(password) {
		return this.sendKeys(this.passwordField, password);
	}

	getPasswordError() {
		return this.getText(this.passwordValidation);
	}

	fillRepeatPasswordField(password) {
		return this.sendKeys(this.rePasswordField, password);
	}

	getRepeatPasswordError() {
		return this.getText(this.rePasswordValidation);
	}

	hitLoginBtn() {
		return this.driver.findElement(this.loginBtn).click();
	}

	getFormErrorText() {
		return this.getText(this.formError);
	}

	getFormSuccessText() {
		return this.getText(this.formSuccess);
	}
}
