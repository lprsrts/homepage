import Navigation from "@/components/Navigation";

// Sample products - replace with actual data
const products = [
  {
    id: "1",
    name: "Starter Kit",
    description: "Essential tools and resources to get started.",
    price: "$29",
    image: "/products/kit1.jpg",
  },
  {
    id: "2",
    name: "Developer Tee",
    description: "Comfortable black and white minimalist t-shirt.",
    price: "$25",
    image: "/products/tee.jpg",
  },
  {
    id: "3",
    name: "Sticker Pack",
    description: "Set of 10 minimalist stickers.",
    price: "$10",
    image: "/products/stickers.jpg",
  },
];

export default function Shop() {
  return (
    <>
      <Navigation />
      <main className="content-container">
        <h1 className="text-4xl font-bold mb-8">Shop</h1>
        <p className="mb-12 text-muted">Kits, merch, and more.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="border" style={{ borderColor: "var(--color-accent-3)" }}>
              <div className="aspect-square" style={{ backgroundColor: "var(--color-accent-1)" }}></div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">{product.price}</span>
                  <button className="btn-primary">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
