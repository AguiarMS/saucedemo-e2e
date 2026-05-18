/**
 * Centralização de todos os dados de teste utilizados nas specs.
 * Nenhum dado hardcoded deve existir diretamente nos arquivos de teste.
 */

export const Users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'wrong_user',
    password: 'wrong_password',
  },
  validUserWrongPassword: {
    username: 'standard_user',
    password: 'wrong_password',
  },
} as const;

export const CheckoutInfo = {
  valid: {
    firstName: 'João',
    lastName: 'Silva',
    postalCode: '01310-100',
  },
  missingFirstName: {
    firstName: '',
    lastName: 'Silva',
    postalCode: '01310-100',
  },
  missingLastName: {
    firstName: 'João',
    lastName: '',
    postalCode: '01310-100',
  },
  missingPostalCode: {
    firstName: 'João',
    lastName: 'Silva',
    postalCode: '',
  },
} as const;

export const Products = {
  backpack: {
    name: 'Sauce Labs Backpack',
    price: 29.99,
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    price: 9.99,
  },
  fleeceJacket: {
    name: 'Sauce Labs Fleece Jacket',
    price: 49.99,
  },
  boltTShirt: {
    name: 'Sauce Labs Bolt T-Shirt',
    price: 15.99,
  },
} as const;

export const Tax = {
  rate: 3.99,
} as const;

export const SortOptions = {
  nameAZ: 'az',
  nameZA: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
} as const;