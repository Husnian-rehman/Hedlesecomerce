import Image from "next/image";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify/client";

interface CollectionSectionProps {
  title: string;
  collectionTitles: string[];
  preview?: boolean;
}

export default async function CollectionSection({ title, collectionTitles, preview }: CollectionSectionProps) {
  const collections = await Promise.all(
    collectionTitles.map(async (collectionTitle) => {
      const shopifyData = await shopifyFetch({
        query: `
          query {
            collections(first: 250) {
              edges {
                node {
                  id
                  title
                  handle
                  image {
                    url
                    altText
                  }
                  products(first: 20) {
                    edges {
                      node {
                        id
                        title
                        handle
                        featuredImage { url }
                        priceRange { minVariantPrice { amount } }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      });

      // FILTER BY TITLE YOU WANT
      return shopifyData.collections.edges.find(
        (c: any) => c.node.title === collectionTitle
      )?.node;
    })
  );

  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {collections.map((collection, idx) => (
          <Link href={`/products`} key={idx}>
            <div className="text-center">

              {/* ⭐ DIRECT YOUR RESULT SHOWN HERE ⭐ */}
              {collection.image?.url && (
                <div className="h-[400px] mb-5">
                <Image
                  src={collection.image.url}
                  alt={collection.title}
                  width={400}
                  height={300}
                  className="rounded-lg mb-4 w-full h-full object-cover"
                />
                </div>
              )}

              <h3 className="text-xl font-semibold uppercase">{collection.title}</h3>

              <p className="text-gray-500">
                {collection.products.edges.length} Products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
