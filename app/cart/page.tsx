"use client";

import Navigation from "@/components/Navigation";
import { useCart } from "@/components/CartProvider";
import Link from "next/link";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Navigation />
        <main className="content-container">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
          <div className="text-center py-12">
            <p className="text-muted mb-6">Your cart is empty</p>
            <Link href="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="border p-4 flex gap-4"
                style={{ borderColor: "var(--color-accent-2)" }}
              >
                <div 
                  className="w-24 h-24 flex-shrink-0"
                  style={{ backgroundColor: "var(--color-accent-1)" }}
                ></div>
                <div className="flex-grow">
                  <h3 className="font-bold mb-1">{item.name}</h3>
                  <p className="text-sm text-muted mb-2">{item.description}</p>
                  <p className="font-bold">{item.price}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-muted hover:text-foreground"
                  >
                    Remove
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border"
                      style={{ borderColor: "var(--color-accent-2)" }}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border"
                      style={{ borderColor: "var(--color-accent-2)" }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div 
              className="border p-6 sticky top-4"
              style={{ borderColor: "var(--color-accent-2)" }}
            >
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div 
                className="border-t pt-4 mb-6"
                style={{ borderColor: "var(--color-accent-2)" }}
              >
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout" className="btn-primary w-full block text-center">
                Proceed to Checkout
              </Link>
              <Link href="/shop" className="block text-center mt-4 text-sm text-muted hover:text-foreground">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
