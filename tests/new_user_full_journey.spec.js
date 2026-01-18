import { v4 as uuidv4 } from "uuid";
import { test } from "@playwright/test";
import { ProductsPage } from "../lib/pages/ProductsPage";
import { Navigation } from "../lib/pages/Navigation";
import { Checkout } from "../lib/pages/Checkout";
import { Login } from "../lib/pages/Login";
import { RegiserPage } from "../lib/pages/RegisterPage";
import { DeliveryDetails } from "../lib/pages/DeliveryDetails";
import userAddress from "../data/userAddress.json";
import { payemntDetails } from "../data/paymentDetails";
import { PaymentPage } from "../lib/pages/PaymentPage";

test("New user full end-to-end test journey", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visit();
  await productsPage.sortByCheapest();
  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);
  const navigation = new Navigation(page);
  await navigation.goToCheckout();

  const checkout = new Checkout(page);
  await checkout.removeCheapestProject();
  await checkout.continueToCheckout();

  const login = new Login(page);
  await login.continueToRegister();

  const registerPage = new RegiserPage(page);
  const email = uuidv4() + "@gmail.com";
  const password = uuidv4();
  await registerPage.signUpAsNewUser(email, password);

  const deliveryDetails = new DeliveryDetails(page);
  const userAdderssDetails = userAddress[0];
  await deliveryDetails.fillDetails(userAdderssDetails);
  await deliveryDetails.saveDetails();
  await deliveryDetails.continueToPayment();

  const paymentPage = new PaymentPage(page);
  await paymentPage.activateDiscount();
  await paymentPage.fillPaymentDetails(payemntDetails);
  await paymentPage.completePayment();
});
