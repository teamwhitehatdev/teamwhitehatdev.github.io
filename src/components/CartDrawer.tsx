import React, { useState } from 'react';
import { ShoppingCart, X, Trash2, ShieldCheck, CreditCard, Lock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { audioEngine } from './AudioEngine';

// Luhn Algorithm for Credit Card Validation
function isValidLuhn(numberStr: string): boolean {
  const cleanStr = numberStr.replace(/\D/g, '');
  if (cleanStr.length < 13 || cleanStr.length > 19) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = cleanStr.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanStr.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

// Auto-Detect Card Brand Network
function detectCardBrand(numberStr: string): 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER' | 'UNKNOWN' {
  const cleanStr = numberStr.replace(/\D/g, '');
  if (/^4/.test(cleanStr)) return 'VISA';
  if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(cleanStr)) return 'MASTERCARD';
  if (/^3[47]/.test(cleanStr)) return 'AMEX';
  if (/^6(?:011|5)/.test(cleanStr)) return 'DISCOVER';
  return 'UNKNOWN';
}

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, user, createOrder } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'credit_card'>('credit_card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const cardBrand = detectCardBrand(cardNumber);
  const isCardValid = isValidLuhn(cardNumber);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClick();

    // 1. Enforce Registered User Check
    if (!user) {
      alert('SECURITY MANDATE: Only registered & authenticated users can complete purchases on White Hat Dev platform. Please register or log in first!');
      return;
    }

    if (cart.length === 0) return;

    // 2. Credit Card Anti-Fraud Verification
    if (paymentMethod === 'credit_card') {
      if (!cardName.trim()) {
        alert('ANTI-FRAUD CHECK: Please enter the Cardholder Full Name.');
        return;
      }
      if (!isCardValid) {
        alert('ANTI-FRAUD CHECK FAILED: Invalid Credit Card Number! Please enter a valid Visa, Mastercard, or Amex card number.');
        return;
      }
      if (!cardExp.trim() || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardExp.trim())) {
        alert('ANTI-FRAUD CHECK FAILED: Please enter a valid Expiration Date in MM/YY format.');
        return;
      }
      if (!cardCvc.trim() || cardCvc.length < 3) {
        alert('ANTI-FRAUD CHECK FAILED: Please enter a valid 3 or 4-digit CVC code.');
        return;
      }
    }

    setIsProcessing(true);
    audioEngine.playGlitch();

    setTimeout(() => {
      const newOrder = createOrder(paymentMethod === 'paypal' ? 'PAYPAL_EXPRESS' : 'ENCRYPTED_CREDIT_CARD');
      clearCart();
      setIsProcessing(false);
      setCompletedOrder(newOrder);
      audioEngine.playClick();
    }, 1500);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-mono">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-gray-950 border-l border-[var(--primary-color)]/40 p-6 flex flex-col justify-between shadow-2xl text-white">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="text-[var(--primary-color)]" size={20} />
              <h2 className="font-orbitron font-bold text-lg text-white">SECURE CART</h2>
              <span className="text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
                {cart.length} item(s)
              </span>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-white p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List or Completed Invoice */}
          {completedOrder ? (
            <div className="my-auto space-y-4 text-center p-4 bg-gray-900 border border-green-500/40 rounded-lg">
              <CheckCircle size={48} className="mx-auto text-green-400 animate-bounce" />
              <h3 className="font-orbitron font-bold text-lg text-white">TRANSACTION VERIFIED & COMPLETED</h3>
              <p className="text-xs text-gray-300">
                Order ID: <strong className="text-green-400">{completedOrder.id}</strong><br />
                Total Paid: <strong>${completedOrder.totalPrice} USD</strong><br />
                User Account: <strong>{completedOrder.userName}</strong>
              </p>
              <div className="p-3 bg-black/60 rounded text-[10px] text-cyan-300 border border-cyan-500/30">
                🛡️ ANTI-FRAUD VERIFIED • INSTANT DIGITAL ACCESS GRANTED
              </div>
              <button
                onClick={() => {
                  setCompletedOrder(null);
                  setIsCartOpen(false);
                }}
                className="w-full py-2.5 bg-[var(--primary-color)] text-black font-bold rounded text-xs"
              >
                RETURN TO MARKETPLACE
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="my-auto text-center space-y-3 py-12">
              <ShoppingCart size={48} className="mx-auto text-gray-600" />
              <p className="text-sm text-gray-400">YOUR CART IS EMPTY</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center justify-between p-3 bg-black/60 border border-gray-800 rounded">
                  <img src={item.product.imageUrl} alt={item.product.title} className="w-12 h-12 object-cover rounded border border-gray-800" />
                  <div className="flex-1 px-3">
                    <div className="text-xs font-bold text-white line-clamp-1">{item.product.title}</div>
                    <div className="text-xs text-[var(--secondary-color)]">${item.product.price} USD</div>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-red-400 hover:text-red-300 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {/* Registered User Authentication Check Banner */}
              {!user && (
                <div className="p-3 bg-yellow-950/60 border border-yellow-500/40 rounded text-xs text-yellow-300 space-y-1">
                  <div className="font-bold flex items-center space-x-1">
                    <AlertTriangle size={14} />
                    <span>USER ACCOUNT REQUIRED FOR PURCHASE</span>
                  </div>
                  <p className="text-[10px] text-gray-300">
                    To prevent fraud, purchases are restricted to registered users. Please log in or register using the Account button.
                  </p>
                </div>
              )}

              {/* Payment Method Selector */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">CHOOSE PAYMENT METHOD</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => { audioEngine.playClick(); setPaymentMethod('credit_card'); }}
                    className={`p-2.5 rounded border text-center font-bold flex items-center justify-center space-x-1 ${
                      paymentMethod === 'credit_card'
                        ? 'bg-[var(--primary-color)] text-black border-[var(--primary-color)] shadow-[0_0_10px_var(--glow-color)]'
                        : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <CreditCard size={14} />
                    <span>CREDIT CARD</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { audioEngine.playClick(); setPaymentMethod('paypal'); }}
                    className={`p-2.5 rounded border text-center font-bold flex items-center justify-center space-x-1 ${
                      paymentMethod === 'paypal'
                        ? 'bg-[var(--primary-color)] text-black border-[var(--primary-color)] shadow-[0_0_10px_var(--glow-color)]'
                        : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Lock size={14} />
                    <span>PAYPAL</span>
                  </button>
                </div>
              </div>

              {/* Credit Card Input Form */}
              {paymentMethod === 'credit_card' && (
                <div className="space-y-3 p-3 bg-black/80 border border-cyan-500/30 rounded text-xs">
                  <div className="flex justify-between items-center text-[10px] text-cyan-400 font-bold">
                    <span>ENCRYPTED CARD CHECKOUT</span>
                    <span>BRAND: {cardBrand}</span>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 block mb-1">CARDHOLDER FULL NAME</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                      placeholder="e.g. MARCUS VANCE"
                      className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[var(--primary-color)]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 block mb-1">CARD NUMBER (VISA / MASTERCARD / AMEX)</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• ••••"
                        className={`w-full bg-gray-900 border rounded px-3 py-1.5 text-xs text-white focus:outline-none ${
                          cardNumber.length > 12 
                            ? isCardValid ? 'border-green-500 text-green-300' : 'border-red-500 text-red-300' 
                            : 'border-gray-800'
                        }`}
                      />
                      {cardNumber.length > 12 && (
                        <span className={`absolute right-2 top-2 text-[10px] font-bold ${isCardValid ? 'text-green-400' : 'text-red-400'}`}>
                          {isCardValid ? '✓ VALID LUHN' : '✗ INVALID'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-gray-400 block mb-1">EXPIRY (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExp}
                        onChange={e => setCardExp(e.target.value)}
                        placeholder="12/28"
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[var(--primary-color)]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block mb-1">CVC / CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        placeholder="•••"
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[var(--primary-color)]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Drawer Footer & Checkout Button */}
          {!completedOrder && cart.length > 0 && (
            <div className="border-t border-cyan-500/20 pt-4 space-y-3">
              <div className="flex justify-between items-center text-sm font-orbitron font-bold">
                <span>TOTAL:</span>
                <span className="text-xl text-[var(--secondary-color)]">${total} USD</span>
              </div>

              <button
                onClick={handleCheckoutSubmit}
                disabled={isProcessing}
                className="w-full py-3 bg-[var(--primary-color)] text-black font-orbitron font-bold rounded text-xs hover:bg-yellow-400 transition-colors shadow-[0_0_15px_var(--glow-color)] flex items-center justify-center space-x-2"
              >
                <ShieldCheck size={16} />
                <span>{isProcessing ? 'VERIFYING CARD & PROCESSING...' : `PAY $${total} USD NOW`}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
