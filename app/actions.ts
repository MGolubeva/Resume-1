'use server';

import { Resend } from 'resend';
import { headers } from 'next/headers';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_MAX = 3; // Max 3 emails
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

export async function sendContactEmail(formData: FormData) {
  try {
    // 1. Honeypot Check
    const honeypot = formData.get('_honey') as string;
    if (honeypot) {
      // Silently reject bots
      return { success: true };
    }

    // 2. Rate Limiting
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown-ip';
    
    const now = Date.now();
    const userRateData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - userRateData.lastReset > RATE_LIMIT_WINDOW) {
      userRateData.count = 0;
      userRateData.lastReset = now;
    }

    if (userRateData.count >= RATE_LIMIT_MAX) {
      return { error: 'Too many requests. Please try again later.' };
    }

    userRateData.count += 1;
    rateLimitMap.set(ip, userRateData);

    // 3. Send Email
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Debugging: Check if any key containing 'RESEND' exists (case-insensitive)
      const relatedKeys = Object.keys(process.env)
        .filter(k => k.toUpperCase().includes('RESEND'))
        .join(', ');
        
      console.error('RESEND_API_KEY is not set in environment variables. Found keys:', relatedKeys);
      return { 
        error: `API key missing in production. Related secrets found: [${relatedKeys || 'None'}]. Please ensure the secret is named exactly RESEND_API_KEY with no spaces.` 
      };
    }

    const resend = new Resend(apiKey);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      return { error: 'All fields are required.' };
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'golubeva.mash@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Server Action Error:', err);
    return { error: err.message || 'Something went wrong.' };
  }
}
