import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AppProject, ShopProduct, ServiceItem, CourseItem, Testimonial, GalleryItem,
  INITIAL_APPS, INITIAL_PRODUCTS, INITIAL_SERVICES, INITIAL_COURSES, INITIAL_TESTIMONIALS, INITIAL_GALLERY 
} from '../utils/initialData';
import { audioEngine } from '../components/AudioEngine';

export interface CartItem {
  product: ShopProduct;
  quantity: number;
}

export interface UserAccount {
  name: string;
  email: string;
  country: string;
  isRegistered: boolean;
}

export interface Order {
  id: string;
  userEmail: string;
  userName: string;
  items: { title: string; price: number; quantity: number }[];
  totalPrice: number;
  deliveryType: string;
  shippingAddress?: string;
  paymentMethod: 'PayPal' | 'CreditCard' | 'Crypto';
  status: 'Completed' | 'Pending' | 'Shipped';
  date: string;
  invoiceUrl?: string;
}

interface AppContextType {
  apps: AppProject[];
  products: ShopProduct[];
  services: ServiceItem[];
  courses: CourseItem[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  cart: CartItem[];
  user: UserAccount | null;
  orders: Order[];
  subscribers: string[];
  isAdmin: boolean;
  adminPass: string;
  isCartOpen: boolean;
  isAuthOpen: boolean;
  isCaptchaOpen: boolean;
  pendingCheckoutAction: (() => void) | null;

  // Actions
  addToCart: (product: ShopProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  registerUser: (name: string, email: string, country: string) => void;
  logoutUser: () => void;
  createOrder: (deliveryType: string, shippingAddress?: string) => Order;
  subscribeNewsletter: (email: string) => boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  addProduct: (item: Omit<ShopProduct, 'id'>) => void;
  deleteProduct: (id: string) => void;

  setIsCartOpen: (open: boolean) => void;
  setIsAuthOpen: (open: boolean) => void;
  setIsCaptchaOpen: (open: boolean) => void;
  setPendingCheckoutAction: (action: (() => void) | null) => void;
  exportDatabaseJSON: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apps, setApps] = useState<AppProject[]>(INITIAL_APPS);
  const [products, setProducts] = useState<ShopProduct[]>(() => {
    const saved = localStorage.getItem('whitehat_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [courses] = useState<CourseItem[]>(INITIAL_COURSES);
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('whitehat_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('whitehat_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('whitehat_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('whitehat_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-98241',
        userEmail: 'client.alpha@tech.com',
        userName: 'Marcus Vance',
        items: [{ title: 'Cyber-SaaS Next.js Template', price: 99, quantity: 1 }],
        totalPrice: 99,
        deliveryType: 'instant_download',
        paymentMethod: 'PayPal',
        status: 'Completed',
        date: '2026-07-29 14:32'
      }
    ];
  });

  const [subscribers, setSubscribers] = useState<string[]>(() => {
    const saved = localStorage.getItem('whitehat_subscribers');
    return saved ? JSON.parse(saved) : ['developer@client.org', 'hacker@whitehat.com'];
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('whitehat_admin_auth') === 'true';
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [pendingCheckoutAction, setPendingCheckoutAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    localStorage.setItem('whitehat_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('whitehat_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('whitehat_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('whitehat_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('whitehat_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  const addToCart = (product: ShopProduct) => {
    audioEngine.playClick();
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    audioEngine.playGlitch();
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const registerUser = (name: string, email: string, country: string) => {
    audioEngine.playSuccess();
    const newUser: UserAccount = { name, email, country, isRegistered: true };
    setUser(newUser);
    localStorage.setItem('whitehat_user', JSON.stringify(newUser));
  };

  const logoutUser = () => {
    audioEngine.playGlitch();
    setUser(null);
    localStorage.removeItem('whitehat_user');
  };

  const createOrder = (deliveryType: string, shippingAddress?: string): Order => {
    audioEngine.playSuccess();
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const newOrder: Order = {
      id: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
      userEmail: user?.email || 'guest@whitehatdev.com',
      userName: user?.name || 'Guest Client',
      items: cart.map(i => ({ title: i.product.title, price: i.product.price, quantity: i.quantity })),
      totalPrice: total,
      deliveryType,
      shippingAddress: shippingAddress || 'Digital Delivery via Email',
      paymentMethod: 'PayPal',
      status: 'Completed',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const subscribeNewsletter = (email: string): boolean => {
    if (!email || subscribers.includes(email)) return false;
    audioEngine.playSuccess();
    setSubscribers(prev => [...prev, email]);
    return true;
  };

  const loginAdmin = (pass: string): boolean => {
    if (pass === 'whitehat2026') {
      audioEngine.playSuccess();
      setIsAdmin(true);
      sessionStorage.setItem('whitehat_admin_auth', 'true');
      return true;
    }
    audioEngine.playGlitch();
    return false;
  };

  const logoutAdmin = () => {
    audioEngine.playGlitch();
    setIsAdmin(false);
    sessionStorage.removeItem('whitehat_admin_auth');
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    audioEngine.playSuccess();
    const newItem: GalleryItem = { ...item, id: 'gal-' + Date.now() };
    setGallery(prev => [newItem, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    audioEngine.playGlitch();
    setGallery(prev => prev.filter(i => i.id !== id));
  };

  const addProduct = (item: Omit<ShopProduct, 'id'>) => {
    audioEngine.playSuccess();
    const newProd: ShopProduct = { ...item, id: 'prod-' + Date.now() };
    setProducts(prev => [newProd, ...prev]);
  };

  const deleteProduct = (id: string) => {
    audioEngine.playGlitch();
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const exportDatabaseJSON = () => {
    audioEngine.playBeep();
    const dbExport = {
      timestamp: new Date().toISOString(),
      products,
      gallery,
      orders,
      subscribers
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dbExport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `whitehat_database_config_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <AppContext.Provider value={{
      apps, products, services, courses, testimonials, gallery, cart, user, orders, subscribers,
      isAdmin, adminPass: 'whitehat2026', isCartOpen, isAuthOpen, isCaptchaOpen, pendingCheckoutAction,
      addToCart, removeFromCart, updateQuantity, clearCart, registerUser, logoutUser, createOrder,
      subscribeNewsletter, loginAdmin, logoutAdmin, addGalleryItem, deleteGalleryItem, addProduct, deleteProduct,
      setIsCartOpen, setIsAuthOpen, setIsCaptchaOpen, setPendingCheckoutAction, exportDatabaseJSON
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
