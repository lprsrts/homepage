"use client";

import Navigation from "@/components/Navigation";
import { useCart } from "@/components/CartProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Checkout() {
  const { items, getTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Germany / Deutschland",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  if (items.length === 0) {
    return (
      <>
        <Navigation />
        <main className="content-container">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear cart and redirect to success page
    clearCart();
    setIsProcessing(false);
    router.push("/checkout/success");
  };

  const shippingCost = 5.99;
  const total = getTotal() + shippingCost;

  return (
    <>
      <Navigation />
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <section>
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border bg-background"
                    style={{ borderColor: "var(--color-accent-2)" }}
                  />
                </div>
              </section>

              {/* Shipping Address */}
              <section>
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border bg-background"
                      style={{ borderColor: "var(--color-accent-2)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border bg-background"
                      style={{ borderColor: "var(--color-accent-2)" }}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border bg-background"
                      style={{ borderColor: "var(--color-accent-2)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border bg-background"
                      style={{ borderColor: "var(--color-accent-2)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border bg-background"
                      style={{ borderColor: "var(--color-accent-2)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border bg-background"
                      style={{ borderColor: "var(--color-accent-2)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border bg-background"
                      style={{ borderColor: "var(--color-accent-2)" }}
                    />
                  </div>
                </div>
              </section>

              {/* Payment Information */}
              <section>
                <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border bg-background"
                      style={{ borderColor: "var(--color-accent-2)" }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        required
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border bg-background"
                        style={{ borderColor: "var(--color-accent-2)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cardCvc"
                        required
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border bg-background"
                        style={{ borderColor: "var(--color-accent-2)" }}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <button
                type="submit"
                disabled={isProcessing}
                className="btn-primary w-full"
              >
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="border p-6 sticky top-4"
              style={{ borderColor: "var(--color-accent-2)" }}
            >
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted">Qty: {item.quantity}</p>
                    </div>
                    <p>
                      $
                      {(
                        parseFloat(item.price.replace("$", "")) * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className="border-t pt-4 space-y-2"
                style={{ borderColor: "var(--color-accent-2)" }}
              >
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
