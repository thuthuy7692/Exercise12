import {test, expect} from '@playwright/test';
import { LoginPage } from '../POM/login';
import { DashBoad } from '../POM/dashboad';
test('ECOM-5:Verify UI trang authentication', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.usernameInput).toBeEnabled();
    await expect(loginPage.passwordInput).toBeEnabled();
    await expect(loginPage.checkboxRemember).toBeEnabled();
    await expect(loginPage.loginButton).toBeEnabled();
    await expect(loginPage.lostLink).toHaveText('Lost your password?');
    await expect(loginPage.gotoLink).toHaveText('← Go to E-Commerce (DEV)');

    await loginPage.clickLostlink();
    await expect(page).toHaveURL('https://ecom-dev.thuchanhtest.com/wp-login.php?action=lostpassword');
     await loginPage.goto();

    await loginPage.clickGotolink();
    await expect(page).toHaveURL('https://ecom-dev.thuchanhtest.com/');

    await loginPage.goto();
    await expect(loginPage.RegisterLink).toHaveCount(0);

})
test('ECOM-6:Verify đăng nhập thành công với username và password đúng', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillUsername(process.env.ADMIN_USERNAME!);
    await loginPage.fillPassword(process.env.ADMIN_PASSWORD!);
    await loginPage.clickButton();
    await expect(page).toHaveURL('https://ecom-dev.thuchanhtest.com/wp-admin/')

    const dashboad =new DashBoad(page);
    await expect(dashboad.wooCommerceSetup).toBeVisible();
    await expect(dashboad.wooCommerceStatus).toBeVisible();
    await expect(dashboad.wooCommerceRecentReviews).toBeVisible();
    await expect(dashboad.wordPressEventsandNews).toBeVisible();
    await expect(dashboad.ataGlance).toBeVisible();
    await expect(dashboad.activity).toBeVisible();
    await expect(dashboad.quickDraft).toBeVisible();

})
test('ECOM-7 bước 1:Verify đăng nhập không thành công với các nhóm user: chưa tồn tại, sai mật khẩu', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const username = `notexist_${Date.now()}`;
    await loginPage.fillUsername(username);
    await loginPage.fillPassword(process.env.ADMIN_PASSWORD!);
    await loginPage.clickButton();
    await expect(page).toHaveURL('https://ecom-dev.thuchanhtest.com/wp-login.php');
    await expect(loginPage.errorMessage).toHaveText(`Error: The username ${username} is not registered on this site. If you are unsure of your username, try your email address instead.`);
})

test('ECOM-7 bước 2:Verify đăng nhập không thành công với các nhóm user: chưa tồn tại, sai mật khẩu', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const password = `notexist_${Date.now()}`;
    await loginPage.fillUsername('admin');
    await loginPage.fillPassword(password);
    await loginPage.clickButton();
    await expect(page).toHaveURL('https://ecom-dev.thuchanhtest.com/wp-login.php');
    await expect(loginPage.errorMessage).toHaveText('Error: The password you entered for the username admin is incorrect. Lost your password?');
    await loginPage.clickLostPass();
    await expect(page).toHaveURL('https://ecom-dev.thuchanhtest.com/wp-login.php?action=lostpassword')

})