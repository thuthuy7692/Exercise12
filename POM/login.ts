import { Page, Locator } from '@playwright/test'

export class LoginPage {
    page: Page;
    usernameInput: Locator;
    passwordInput: Locator;
    checkboxRemember: Locator;
    loginButton: Locator;
    lostLink: Locator;
    gotoLink: Locator;
    RegisterLink: Locator;
    errorMessage: Locator;
    lostyourPassword: Locator;



    constructor(page: Page) {
        this.page = page;
        this.usernameInput = this.page.getByRole('textbox', { name: 'Username or Email Address' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.checkboxRemember = this.page.getByRole('checkbox', { name: 'Remember Me' });
        this.loginButton = this.page.getByRole('button', { name: 'Log in' });
        this.lostLink = this.page.getByRole('link', { name: 'Lost your password?' });
        this.gotoLink = this.page.getByRole('link', { name: 'go to E-Commerce (DEV)' });
        this.RegisterLink = this.page.getByRole('link', { name: 'Register' });
        this.errorMessage = this.page.locator('#login_error');
    this.lostyourPassword = this.errorMessage.getByRole('link',{name: 'Lost your password?'});
    }
    async goto() {
        await this.page.goto('https://ecom-dev.thuchanhtest.com/wp-admin');

    }
    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }
    async fillPassword(pass: string) {
        await this.passwordInput.fill(pass);
    }
    async checkRemember() {
        await this.checkboxRemember.check();
    }
    async clickButton() {
        await this.loginButton.click();
    }
    async clickLostlink() {
        await this.lostLink.click()
    }
    async clickGotolink() {
        await this.gotoLink.click();
    }

    async clickLostPass(){
        await this.lostyourPassword.click();
    }
}
