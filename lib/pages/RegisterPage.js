export class RegiserPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "E-Mail" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  signUpAsNewUser = async (email, password) => {
    await this.emailInput.waitFor();
    await this.emailInput.fill(email);
    await this.passwordInput.waitFor();
    await this.passwordInput.fill(password);
    await this.registerButton.waitFor();
    await this.registerButton.click();
    await this.page.waitForURL("/delivery-details");
  };
}
