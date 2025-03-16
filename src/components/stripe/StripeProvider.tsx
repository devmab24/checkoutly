
import { ReactNode } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Replace with your actual publishable key
const stripePromise = loadStripe('pk_test_51O5AZvK6PjmUmHIhvNQIaYwt5GQUbORlOFskRi1Ts5E2VuWm8qD5Ck1T2zQjh4UGpyacb5o4iJpAVYjkRIy1fBdl00UKcZRRLX');

interface StripeProviderProps {
  children: ReactNode;
}

export function StripeProvider({ children }: StripeProviderProps) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}
