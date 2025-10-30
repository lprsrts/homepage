import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <>
      <Navigation />
      <main className="content-container">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-muted mb-8">
            Thank you for your purchase. You will receive a confirmation email
            shortly.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop" className="btn-primary">
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="px-6 py-2 border"
              style={{ borderColor: "var(--color-accent-2)" }}
            >
              Go Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
