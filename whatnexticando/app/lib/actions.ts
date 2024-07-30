'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { createUserDB } from './data';
import { hash } from 'bcrypt';


export async function createInvoice(formData: FormData) {}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

  export async function createUser(
    prevState: string | undefined,
    formData: FormData
  ) {
  
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
  
    try {
      if (!name || !email || !password) {
        console.log("Validation failed: Missing fields");
        return 'All fields are required.';
      }
  
      if (!email.includes('@')) {
        return 'Invalid email format.';
      }
  
      // Hash password
      const hashedPassword = await hash(password, 10);
      console.log("Password hashed");
  
      // Create user in the database
      await createUserDB( name, email, hashedPassword );
      console.log("User created in the database");
  
      return 'User created successfully!';
    } catch (error) {
      console.error("Error creating user:", error);
      return 'Error creating user.';
    }
  }