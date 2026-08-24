/**
 * Centralized validation utilities for the application.
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Allows optional +, followed by 10-15 digits, ignoring spaces, dashes, parentheses
export const PHONE_REGEX = /^\+?[\d\s\-\(\)]{10,20}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Strip non-digits to check core length
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 15 && PHONE_REGEX.test(phone);
}

export function isValidAmount(amount: number, min: number = 1): boolean {
  return amount >= min && Number.isFinite(amount);
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

export function isValidAddress(address: string): boolean {
  return address.trim().length >= 10;
}
