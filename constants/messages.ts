/**
 * Centralização de todas as mensagens de erro e textos esperados da aplicação.
 * Alterar um texto na interface requer mudança apenas aqui.
 */

export const ErrorMessages = {
  login: {
    usernameRequired: 'Epic sadface: Username is required',
    passwordRequired: 'Epic sadface: Password is required',
    credentialsInvalid:
      'Epic sadface: Username and password do not match any user in this service',
    userLocked: 'Epic sadface: Sorry, this user has been locked out.',
  },
  checkout: {
    firstNameRequired: 'Error: First Name is required',
    lastNameRequired: 'Error: Last Name is required',
    postalCodeRequired: 'Error: Postal Code is required',
  },
} as const;

export const PageTitles = {
  inventory: 'Products',
  cart: 'Your Cart',
  checkoutStep1: 'Checkout: Your Information',
  checkoutStep2: 'Checkout: Overview',
  confirmation: 'Checkout: Complete!',
} as const;

export const ConfirmationMessages = {
  header: 'Thank you for your order!',
  description:
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
} as const;

export const CartLabels = {
  removeButton: 'Remove',
  addToCartButton: 'Add to cart',
  checkoutButton: 'Checkout',
  continueShoppingButton: 'Continue Shopping',
} as const;