
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container max-w-md mx-auto py-20 px-4">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for your purchase. Your order has been processed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-center text-muted-foreground">
            We've sent you a confirmation email with all the details of your order.
          </p>
          <p className="text-center text-muted-foreground">
            Your order will be shipped soon.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button onClick={() => navigate('/shop')} className="w-full">
            Continue Shopping
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')} 
            className="w-full"
          >
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
