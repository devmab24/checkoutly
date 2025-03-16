
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function PaymentCancel() {
  const navigate = useNavigate();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container max-w-md mx-auto py-20 px-4">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-4">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
          <CardDescription>
            Your payment was not completed. No charges were made.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-center text-muted-foreground">
            You can try again or contact our customer support if you need assistance.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button onClick={() => navigate('/checkout')} className="w-full">
            Try Again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/shop')} 
            className="w-full"
          >
            Continue Shopping
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
