import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';

test.describe('Checkout', () => {
  // TODO: full checkout -> "Thank you for your order!"
  //   test ids: checkout, firstName, lastName, postalCode, continue, finish, complete-header
  // TODO: continue with empty first name -> "Error: First Name is required"
  // TODO: overview page: item total = sum of item prices (use faker for the form data)
});
