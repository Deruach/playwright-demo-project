import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountCodeInput = page.locator('[data-qa="discount-code-input"]');
    this.activatedDiscountButton = page.locator(
      '[data-qa="submit-discount-button"]',
    );
    this.totalValue = page.locator('[data-qa="total-value"]');
    this.discountedValue = page.locator(
      '[data-qa="total-with-discount-value"]',
    );
    this.activeDiscountMessage = page.locator(
      '[data-qa="discount-active-message"]',
    );
    this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]');
    this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]');
    this.creditCardValidInput = page.locator('[data-qa="valid-until"]');
    this.creditCardCVCInput = page.locator('[data-qa="credit-card-cvc"]');
    this.paymentButton = page.locator('[data-qa="pay-button"]');
  }

  activateDiscount = async () => {
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();
    await this.discountCodeInput.waitFor();
    // option 1
    await this.discountCodeInput.fill(code);
    await expect(this.discountCodeInput).toHaveValue(code);

    // option 2
    // await this.discountCodeInput.focus();
    // await this.discountCodeInput.type(code, { delay: 1000 });
    // expect(await this.discountCodeInput.inputValue()).toBe(code);

    expect(await this.discountedValue.isVisible()).toBe(false);
    expect(await this.activeDiscountMessage.isVisible()).toBe(false);
    await this.activatedDiscountButton.waitFor();
    await this.activatedDiscountButton.click();

    await this.activeDiscountMessage.waitFor();

    await this.discountedValue.waitFor();
    const discountValueText = await this.discountedValue.innerText();
    const discountValueOnlyStringNumber = discountValueText.replace("$", "");
    const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10);

    await this.totalValue.waitFor();
    const totalValueText = await this.totalValue.innerText();
    const totalValueOnlyStringNumber = totalValueText.replace("$", "");
    const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10);

    expect(discountValueNumber).toBeLessThan(totalValueNumber);
  };

  fillPaymentDetails = async (paymentDetails) => {
    await this.creditCardOwnerInput.waitFor();
    await this.creditCardOwnerInput.fill(paymentDetails.owner);
    await this.creditCardNumberInput.waitFor();
    await this.creditCardNumberInput.fill(paymentDetails.creditCardNumber);
    await this.creditCardValidInput.waitFor();
    await this.creditCardValidInput.fill(paymentDetails.validDate);
    await this.creditCardCVCInput.waitFor();
    await this.creditCardCVCInput.fill(paymentDetails.CVC);
  };

  completePayment = async () => {
    await this.paymentButton.waitFor();
    await this.paymentButton.click();
    await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
  };
}
