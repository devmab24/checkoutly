
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { StripeProvider } from '@/components/stripe/StripeProvider';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  // Format price with proper currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setProcessing(true);
    setError(null);

    // For development/demo purposes, we'll simulate a successful payment
    // In a real app, you would create a payment intent on the server
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setError("Payment processing failed. Please try again.");
      setProcessing(false);
      return;
    }

    // In development, just check if the card element is complete
    // and redirect to success page
    const isComplete = cardElement.complete;
    
    if (isComplete) {
      clearCart();
      navigate('/payment-success');
    } else {
      setError("Please enter valid card details");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-2">Shipping Address</label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, City, Country"
            required
          />
        </div>
        
        <div>
          <label htmlFor="card" className="block text-sm font-medium mb-2">Card Details</label>
          <div className="border rounded-md p-3">
            <CardElement
              id="card"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={!stripe || processing}
      >
        {processing ? 'Processing...' : `Pay ${formatPrice(subtotal)}`}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const { items, subtotal } = useCart();
  const navigate = useNavigate();

  // Format price with proper currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // If cart is empty, redirect to shop
  if (items.length === 0) {
    return (
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Your cart is empty</CardTitle>
            <CardDescription>
              Please add some items to your cart before proceeding to checkout.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
              <CardDescription>
                Complete your purchase by providing payment details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StripeProvider>
                <CheckoutForm />
              </StripeProvider>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded overflow-hidden border">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {formatPrice((item.product.discountPrice || item.product.price) * item.quantity)}
                  </p>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex-col items-start border-t pt-4">
              <div className="w-full space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">Free</span>
                </div>
                <div className="flex justify-between font-medium pt-2">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
