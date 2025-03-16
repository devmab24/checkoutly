
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import { CartProvider } from "./context/CartContext";
import { StripeProvider } from "./components/stripe/StripeProvider";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import TemplatePage from "./pages/TemplatePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
              
              {/* Template pages for footer links */}
              <Route path="/careers" element={<TemplatePage />} />
              <Route path="/blog" element={<TemplatePage />} />
              <Route path="/help" element={<TemplatePage />} />
              <Route path="/shipping" element={<TemplatePage />} />
              <Route path="/warranty" element={<TemplatePage />} />
              <Route path="/privacy" element={<TemplatePage />} />
              <Route path="/terms" element={<TemplatePage />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
