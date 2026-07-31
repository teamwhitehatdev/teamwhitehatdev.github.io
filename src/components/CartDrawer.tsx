import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, CreditCard, Lock, CheckCircle, PackageCheck } from 'lucide-react';
import { useApp, Order } from '../context/AppContext';
import { audioEngine } from './AudioEngine';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, createOrder, setIsCaptchaOpen, setPendingCheckoutAction } = useApp();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [deliveryType, setDeliveryType] = useState<'instant_download' | 'physical_shipping'>('instant_download');
  const [shippingAddress, setShippingAddress] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const finalTotal = Math.max(0, subtotal - discount);

  const applyPromo = () => {
    audioEngine.playClick();
    if (promoCode.trim().toUpperCase() === 'WHITEHAT10') {
      audioEngine.playSuccess();
      setDiscount(subtotal * 0.1);
    } else {
      audioEngine.playGlitch();
      alert('Invalid Promo Code. Try WHITEHAT10 for 10% off!');
    }
  };

  const executeCheckout = () => {
    if (cart.length === 0) return;
    const order = createOrder(deliveryType, shippingAddress);
    setCompletedOrder(order);
  };

  const handleCheckoutClick = () => {
    audioEngine.playClick();
    setPendingCheckoutAction(() => executeCheckout);
    setIsCaptchaOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end font-mono">
      <div className="w-full max-w-md bg-[#0d0f18] border-l border-[var(--border-color)] h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
            <h2 className="font-orbitron font-bold text-white text-lg tracking-wider flex items-center space-x-2">
              <span className="text-[var(--primary-color)]">CYBER</span>_CART
            </h2>
            <button 
              onClick={() => {
                audioEngine.playGlitch();
                setIsCartOpen(false);
                setCompletedOrder(null);
              }}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {completedOrder ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border-2 border-green-400 animate-bounce">
                <CheckCircle size={36} />
              </div>
              <h3 className="font-orbitron font-bold text-xl text-white">PAYMENT SUCCESSFUL!</h3>
              <p className="text-xs text-gray-300">
                Order ID: <span className="text-yellow-400 font-bold">{completedOrder.id}</span>
              </p>
              <p className="text-xs text-gray-400">
                A confirmation receipt & download links have been issued to <span className="text-cyan-400">{completedOrder.userEmail}</span>.
              </p>
              <div className="p-4 bg-black/60 border border-cyan-500/30 rounded text-left text-xs space-y-2">
                <div>Delivery Mode: <span className="text-white font-bold">{completedOrder.deliveryType}</span></div>
                <div>Status: <span className="text-green-400 font-bold">Paid via PayPal Merchant</span></div>
                <div>Est. Shipping/Delivery: <span className="text-yellow-400">7 - 15 Days Tracked (or Instant Download)</span></div>
              </div>
              <button
                onClick={() => {
                  audioEngine.playClick();
                  setCompletedOrder(null);
                  setIsCartOpen(false);
                }}
                className="w-full py-2.5 rounded bg-[var(--primary-color)] text-black font-bold hover:bg-yellow-400 transition-colors"
              >
                DONE & CLOSE
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500 space-y-3">
                  <div className="text-4xl">🛒</div>
                  <div>Your Cyber Cart is currently empty.</div>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.product.id} className="p-3 bg-black/60 border border-gray-800 rounded flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={item.product.imageUrl} alt="" className="w-12 h-12 object-cover rounded border border-cyan-500/20" />
                        <div>
                          <div className="text-xs text-white font-bold max-w-[180px] truncate">{item.product.title}</div>
                          <div className="text-xs text-[var(--primary-color)]">${item.product.price} USD</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                          className="w-12 bg-black border border-gray-700 rounded text-center text-xs py-0.5 text-white"
                        />
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Delivery Options */}
              <div className="space-y-3 mb-6">
                <label className="text-xs text-gray-400 block font-bold">SELECT DELIVERY MODE:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setDeliveryType('instant_download')}
                    className={`p-2 rounded border text-center ${
                      deliveryType === 'instant_download'
                        ? 'border-[var(--primary-color)] bg-cyan-500/10 text-cyan-400'
                        : 'border-gray-800 text-gray-400'
                    }`}
                  >
                    Digital Download (Instant)
                  </button>
                  <button
                    onClick={() => setDeliveryType('physical_shipping')}
                    className={`p-2 rounded border text-center ${
                      deliveryType === 'physical_shipping'
                        ? 'border-[var(--primary-color)] bg-cyan-500/10 text-cyan-400'
                        : 'border-gray-800 text-gray-400'
                    }`}
                  >
                    Physical Shipping (7-15 Days)
                  </button>
                </div>

                {deliveryType === 'physical_shipping' && (
                  <textarea
                    value={shippingAddress}
                    onChange={e => setShippingAddress(e.target.value)}
                    placeholder="Enter full shipping address & country for worldwide courier..."
                    className="w-full bg-black border border-gray-700 rounded p-2 text-xs text-white h-20 focus:outline-none focus:border-[var(--primary-color)]"
                  />
                )}
              </div>

              {/* Promo Code */}
              <div className="flex space-x-2 mb-6">
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  placeholder="PROMO CODE (e.g. WHITEHAT10)"
                  className="flex-1 bg-black border border-gray-700 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[var(--primary-color)] uppercase"
                />
                <button
                  onClick={applyPromo}
                  className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-white rounded text-xs hover:border-[var(--primary-color)]"
                >
                  APPLY
                </button>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-800 pt-4 space-y-2 text-xs mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (10%):</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-gray-800">
                  <span>TOTAL DUE:</span>
                  <span className="text-[var(--secondary-color)]">${finalTotal.toFixed(2)} USD</span>
                </div>
              </div>
            </>
          )}
        </div>

        {!completedOrder && cart.length > 0 && (
          <div className="space-y-3">
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3 rounded bg-[#0070ba] hover:bg-[#005ea6] text-white font-orbitron font-bold text-xs tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,112,186,0.5)] transition-colors"
            >
              <CreditCard size={18} />
              <span>PAY WITH PAYPAL MERCHANT</span>
            </button>
            <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-500">
              <ShieldCheck size={14} className="text-green-400" />
              <span>256-Bit Anti-Fraud Protected Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
