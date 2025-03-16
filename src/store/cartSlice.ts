
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../data/products';
import { toast } from 'sonner';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
}

// Get initial state from localStorage if available
const getInitialState = (): CartState => {
  if (typeof window === 'undefined') {
    return { items: [], isOpen: false, itemCount: 0, subtotal: 0 };
  }
  
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart) as CartItem[];
      
      // Calculate totals
      let count = 0;
      let total = 0;
      
      parsedCart.forEach(item => {
        count += item.quantity;
        total += (item.product.discountPrice || item.product.price) * item.quantity;
      });
      
      return { items: parsedCart, isOpen: false, itemCount: count, subtotal: total };
    } catch (error) {
      console.error('Failed to parse cart from localStorage', error);
    }
  }
  
  return { items: [], isOpen: false, itemCount: 0, subtotal: 0 };
};

const calculateTotals = (items: CartItem[]): { itemCount: number; subtotal: number } => {
  let count = 0;
  let total = 0;
  
  items.forEach(item => {
    count += item.quantity;
    total += (item.product.discountPrice || item.product.price) * item.quantity;
  });
  
  return { itemCount: count, subtotal: total };
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState(),
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex > -1) {
        // Update quantity if product already in cart
        state.items[existingItemIndex].quantity += quantity;
        toast.success(`Updated quantity in your cart`, {
          description: product.name,
        });
      } else {
        // Add new item to cart
        state.items.push({ product, quantity });
        toast.success(`Added to your cart`, {
          description: product.name,
        });
      }
      
      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.itemCount = totals.itemCount;
      state.subtotal = totals.subtotal;
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const removedItem = state.items.find(item => item.product.id === productId);
      
      if (removedItem) {
        state.items = state.items.filter(item => item.product.id !== productId);
        
        toast.info(`Removed from your cart`, {
          description: removedItem.product.name,
        });
        
        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.itemCount = totals.itemCount;
        state.subtotal = totals.subtotal;
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      
      if (quantity < 1) {
        // Remove item if quantity is less than 1
        cartSlice.caseReducers.removeFromCart(state, { payload: productId, type: 'cart/removeFromCart' });
        return;
      }
      
      const itemIndex = state.items.findIndex(item => item.product.id === productId);
      if (itemIndex > -1) {
        state.items[itemIndex].quantity = quantity;
        
        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.itemCount = totals.itemCount;
        state.subtotal = totals.subtotal;
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
      state.subtotal = 0;
      
      localStorage.removeItem('cart');
      toast.info("Your cart has been cleared");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, openCart, closeCart, toggleCart } = cartSlice.actions;

export default cartSlice.reducer;
