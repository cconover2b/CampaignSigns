// /lib/utils.ts
import bcrypt from 'bcryptjs';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Hash a plain text password.
 * @param {string} plainPassword - The plain text password.
 * @returns {Promise<string>} - Returns the hashed password.
 */
export const hashPassword = async (plainPassword: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Error hashing password');
  }
};

/**
 * Compare a plain text password with a hashed password.
 * @param {string} plainPassword - The plain text password.
 * @param {string} hashedPassword - The hashed password.
 * @returns {Promise<boolean>} - Returns true if the passwords match, otherwise false.
 */
export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Error comparing passwords');
  }
};

/**
 * Utility function to merge class names.
 * @param {...ClassValue[]} inputs - The class names to merge.
 * @returns {string} - The merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Build a URL from a given path.
 * @param {string} path - The path to build the URL from.
 * @returns {string} - The constructed URL.
 */
export const buildUrl = (path: string): string => {
  // Your URL building logic here
  return `https://example.com/${path}`;
};