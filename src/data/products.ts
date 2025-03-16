
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  featured: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
  specs?: Record<string, string>;
  colors?: string[];
}

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'audio', name: 'Audio' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'wearables', name: 'Wearables' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and a comfortable over-ear design.',
    price: 299.99,
    category: 'audio',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
      'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=1000',
    ],
    featured: true,
    inStock: true,
    rating: 4.8,
    reviews: 124,
    specs: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0, 3.5mm jack',
      'Weight': '250g',
      'Charging': 'USB-C',
    },
    colors: ['#000000', '#FFFFFF', '#1E3A8A'],
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    description: 'Stay connected and track your fitness with our sleek Smart Watch Series X. Features heart rate monitoring, sleep tracking, and up to 7 days of battery life.',
    price: 249.99,
    discountPrice: 199.99,
    category: 'wearables',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000',
    ],
    featured: true,
    inStock: true,
    rating: 4.7,
    reviews: 89,
    specs: {
      'Battery Life': '7 days',
      'Display': '1.4" AMOLED',
      'Water Resistance': '5 ATM',
      'Sensors': 'Heart rate, Accelerometer, GPS',
    },
    colors: ['#000000', '#EFEFEF', '#B91C1C'],
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    description: 'Take your music anywhere with our durable, waterproof Bluetooth speaker. Features 24-hour battery life and immersive 360° sound.',
    price: 129.99,
    category: 'audio',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000',
      'https://images.unsplash.com/photo-1558537348-c0f8e733989d?q=80&w=1000',
    ],
    featured: false,
    inStock: true,
    rating: 4.5,
    reviews: 56,
    specs: {
      'Battery Life': '24 hours',
      'Connectivity': 'Bluetooth 5.1',
      'Water Resistance': 'IPX7',
      'Weight': '560g',
    },
    colors: ['#000000', '#3B82F6', '#059669'],
  },
  {
    id: '4',
    name: 'Professional Camera Drone',
    description: 'Capture stunning aerial footage with our professional-grade camera drone. Features 4K camera, 30-minute flight time, and advanced obstacle avoidance.',
    price: 799.99,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=1000',
      'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=1000',
    ],
    featured: true,
    inStock: true,
    rating: 4.9,
    reviews: 42,
    specs: {
      'Flight Time': '30 minutes',
      'Camera': '4K, 60fps',
      'Range': '8 km',
      'Max Speed': '72 km/h',
    },
    colors: ['#1F2937'],
  },
  {
    id: '5',
    name: 'Minimalist Desk Lamp',
    description: 'Enhance your workspace with our modern, adjustable desk lamp. Features touch controls, multiple color temperatures, and wireless phone charging base.',
    price: 89.99,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1507394650988-06d251023615?q=80&w=1000',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000',
    ],
    featured: false,
    inStock: true,
    rating: 4.6,
    reviews: 31,
    specs: {
      'Power': '12W',
      'Brightness Levels': '5',
      'Color Temperature': '2700K-6500K',
      'Charging': 'Qi Wireless, USB-A',
    },
    colors: ['#FFFFFF', '#000000', '#FBBF24'],
  },
  {
    id: '6',
    name: 'Ultralight Laptop',
    description: 'Experience exceptional performance with our ultralight laptop. Featuring a stunning display, all-day battery life, and powerful processing capabilities.',
    price: 1299.99,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000',
    ],
    featured: true,
    inStock: false,
    rating: 4.9,
    reviews: 78,
    specs: {
      'Processor': 'Latest Gen Quad-Core',
      'RAM': '16GB',
      'Storage': '512GB SSD',
      'Display': '14" 4K OLED',
      'Battery': 'Up to 18 hours',
    },
    colors: ['#737373', '#EFEFEF'],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
