export class Login {
  constructor(page) {
    this.page = page;
    this.continueToRegisterButton = page.locator(
      '[data-qa="go-to-signup-button"]',
    );
  }

  continueToRegister = async () => {
    await this.continueToRegisterButton.waitFor();
    await this.continueToRegisterButton.click();
    await this.page.waitForURL(/\/signup/, { timeout: 3000 });
  };
}
