"use server";

import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  // In a real app, you'd validate credentials here.
  // For this demo, we'll just simulate a successful login.
  console.log("Logging in with:", Object.fromEntries(formData.entries()));

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  redirect('/chat');
}

export async function signup(prevState: any, formData: FormData) {
  // In a real app, you'd create a new user here.
  // For this demo, we'll just simulate a successful signup.
  console.log("Signing up with:", Object.fromEntries(formData.entries()));

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  redirect('/chat');
}

export async function saveSettings(prevState: any, formData: FormData) {
  // In a real app, you'd save these settings to a database.
  console.log("Saving settings:", Object.fromEntries(formData.entries()));
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { message: "Settings saved successfully!" };
}
