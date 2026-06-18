"use client";

import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeFromCart, updateQuantity, clearCart } from "../../store/slices/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * (1 - item.product.discountPercentage / 100) * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const shipping = subtotal >= 150 ? 0 : 9.99;
  const total = subtotal + tax + shipping;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleUpdateQty = (productId: number, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ productId, quantity: newQty }));
    }
  };

  const handleCheckout = () => {
    alert(
      `🎉 Purchase simulated successfully!\nItems: ${totalItems}\nTotal Amount: $${total.toFixed(2)}\n\nThank you for choosing our store! Your cart has been cleared.`
    );
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link href="/products" className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Shopping Cart</h1>
            <p className="text-sm text-gray-500 mt-2">
              {items.length === 0 ? "Your cart is empty" : `${totalItems} ${totalItems === 1 ? "item" : "items"} in cart`}
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-gray-100 rounded-2xl p-16 text-center space-y-6">
            <div className="p-4 bg-gray-50 border border-gray-100 inline-block text-gray-400 rounded-2xl mx-auto">
              <ShoppingBag size={40} className="stroke-[1.5]" />
            </div>
            <div className="max-w-xs mx-auto">
              <h3 className="text-lg font-semibold text-gray-900">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Start adding items to your cart and they will appear here. Happy shopping!
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm rounded-xl transition-colors"
            >
              <ShoppingBag size={16} />
              <span>Browse Products</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
                return (
                  <div
                    key={item.product.id}
                    className="bg-white border border-gray-100 rounded-2xl p-6 flex items-start space-x-6 hover:border-gray-200 transition-all duration-200"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="w-full h-full object-contain p-2"
                        referrerPolicy="no-referrer"
                      />
                      {item.product.discountPercentage > 0 && (
                        <span className="absolute -top-2 -right-2 inline-flex items-center px-2 py-1 rounded-full text-[9px] font-bold bg-rose-50 text-rose-600 border border-rose-100">
                          -{Math.round(item.product.discountPercentage)}%
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.product.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{item.product.category}</p>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline space-x-2">
                        <span className="text-sm font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
                        {item.product.discountPercentage > 0 && (
                          <span className="text-xs text-gray-400 line-through">${item.product.price.toFixed(2)}</span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 pt-2">
                        <button
                          onClick={() => handleUpdateQty(item.product.id, item.quantity, -1)}
                          className="p-1.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <Minus size={14} className="text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-semibold text-sm text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQty(item.product.id, item.quantity, 1)}
                          className="p-1.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <Plus size={14} className="text-gray-600" />
                        </button>
                        <span className="text-xs text-gray-500 ml-auto">
                          ${(discountedPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="p-2 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer flex-shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6 sticky top-20 h-fit">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Order Summary</h3>
                  <div className="space-y-3 border-b border-gray-100 pb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Tax (8%)</span>
                      <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Shipping</span>
                      {shipping === 0 ? (
                        <span className="font-semibold text-emerald-600">FREE</span>
                      ) : (
                        <span className="font-semibold text-gray-900">${shipping.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {subtotal >= 150 ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-xs text-emerald-700 font-medium">🎉 You qualify for FREE shipping!</p>
                  </div>
                ) : (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-700 font-medium">
                      Add ${(150 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  </div>
                )}

                {/* Total */}
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-gray-600">Total</span>
                    <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>

                {/* Clear Cart */}
                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full px-6 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-colors cursor-pointer text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
