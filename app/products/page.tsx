// products/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/shopify/queries/product";
import { getBanner } from "@/lib/sanity/collectionbanner";

export default async function ProductsPage() {
  const products = await getProducts(50); // Shopify products
  const banner = await getBanner(); // Sanity banner

  return (
    <div>
      {/* Banner */}
      {banner && (
        <div
          className="w-full h-96 flex flex-col justify-center items-center text-white bg-cover bg-center"
          style={{ backgroundImage: `url(${banner.bgImage?.asset?.url})` }}
        >
          <h1 className="text-5xl font-bold mb-4">{banner.title}</h1>
          <p className="text-xl">{banner.description}</p>
        </div>
      )}

      <div className="container mx-auto px-6 py-12 flex gap-8">
        {/* Filters Sidebar */}
        <aside className="w-1/4">
          <h2 className="font-bold text-lg mb-4">Filters</h2>
          {/* Example Filters */}
          <div>
            <h3 className="font-semibold">Price</h3>
            <ul>
              <li><button>$0 - $50</button></li>
              <li><button>$50 - $100</button></li>
              <li><button>$100+</button></li>
            </ul>
          </div>
        </aside>

        {/* Products Grid */}
          <div className="w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
          {products.map((product: import('@/lib/shopify/types').Product) => {
            const price = product.variants.edges[0].node.price.amount;
            const comparePrice = product.variants.edges[0].node.compareAtPrice?.amount;

            return (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className="group block"
              >
                <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                  {/* IMAGE */}
                  <div className="relative w-full h-[400px] rounded overflow-hidden bg-gray-100">
                    {product.featuredImage?.url && (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        className="object-cover h-full w-full group-hover:scale-105 transition-transform"
                      />
                    )}
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>

                  {/* PRICE */}
                  <div className="mt-2 flex gap-2 items-center justify-center">
                    <span className="text-lg font-bold">${price}</span>
                    {comparePrice && (
                      <span className="line-through text-gray-400">${comparePrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
