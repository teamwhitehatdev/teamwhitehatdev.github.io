import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import { Shop } from './pages/Shop';
import { Admin } from './pages/Admin';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/CartDrawer';
import ThemeEngine from './components/ThemeEngine';

const LayoutWrapper: React.FC<{ children: React.ReactNode; onOpenAuth: () => void; onOpenCart: () => void; cartCount: number }> = ({ children, onOpenAuth, onOpenCart, cartCount }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    // Standalone Admin Layout without main site header/footer
    return <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
      <Navbar onOpenAuth={onOpenAuth} onOpenCart={onOpenCart} cartCount={cartCount} />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('wh_user_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }
  }, []);

  const handleAddToCart = (product: any) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem('wh_user_cart', JSON.stringify(updated));
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem('wh_user_cart', JSON.stringify(updated));
  };

  return (
    <Router>
      <ThemeEngine />
      <LayoutWrapper onOpenAuth={() => setIsAuthOpen(true)} onOpenCart={() => setIsCartOpen(true)} cartCount={cart.length}>
        <Routes>
          <Route path="/" element={<Home onOpenConsultation={() => setIsAuthOpen(true)} />} />
          <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </LayoutWrapper>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onRemove={handleRemoveFromCart} onClear={() => { setCart([]); localStorage.removeItem('wh_user_cart'); }} />
    </Router>
  );
}

export default App;
