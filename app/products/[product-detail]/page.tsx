//  

import Image from "next/image";
import Link from "next/link";
import { getProductByHandle } from "@/lib/shopify/queries/productByHandle";
import { ProductVariant } from "@/lib/shopify/types";
import ProductGallery from "@/components/ProductGallery"; // interactive gallery client component
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

interface ProductDetailProps {
  params: Promise<{ "product-detail": string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { "product-detail": handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) return <p className="p-6 text-center">Product not found</p>;

  const images = product.images?.edges || [];
  const variants = product.variants?.edges || [];

  return (
    <div className="container mx-auto px-6 py-12">
      <Link
        href="/products"
        className="inline-block mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Media gallery */}
        <div className="w-full md:w-[70%] space-y-4">
          <ProductGallery images={images} productTitle={product.title} />
        </div>

        {/* Product info */}
        <div className="w-full md:w-[30%]">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl font-semibold mb-4">
            ${variants[0]?.node?.price?.amount || "N/A"}
          </p>
          <p className="mb-6 leading-relaxed">{product.description}</p>

          {variants.length > 1 && (
            <div className="mb-6">
              <label htmlFor="variant" className="block mb-2 font-semibold">
                Choose Variant
              </label>
              <select
                id="variant"
                className="w-full border p-2 rounded focus:ring focus:ring-green-200"
              >
{variants.map((v: { node: { id: Key | readonly string[] | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; price: { amount: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; }; }; }) => {
  const keyId =
    v.node.id == null
      ? "unknown-key"
      : Array.isArray(v.node.id)
      ? v.node.id.join(",")
      : v.node.id.toString();

  return (
    <option key={keyId} value={keyId}>
      {v.node.title} — ${v.node.price.amount}
    </option>
  );
})}
              </select>
            </div>
          )}

          <button
            className="w-full cursor-pointer bg-gray-700 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition-all"
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}




// // app/products/[product-detail]/page.tsx

// import Image from "next/image";
// import Link from "next/link";
// import { getProductByHandle } from "@/lib/shopify/queries/productByHandle";

// interface ProductDetailProps {
//   params: Promise<{ "product-detail": string }>;
// }

// export default async function ProductDetail({ params }: ProductDetailProps) {
//   const { "product-detail": handle } = await params;

//   const product = await getProductByHandle(handle);

//   if (!product) return <p className="p-6 text-center">Product not found</p>;

//   const images = product.images?.edges || [];
//   const variants = product.variants?.edges || [];

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-12">
//       {/* Back button */}
//       <Link
//         href="/products"
//         className="inline-block mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//       >
//         ← Back to Products
//       </Link>

//       <div className="flex flex-col md:flex-row gap-10">
//         {/* Media gallery */}
//         <div className="w-full md:w-1/2 space-y-4">
//           {images.length > 0 ? (
//             images.map((img, idx) => (
//               <Image
//                 key={idx}s
//                 src={img.node.url}
//                 alt={img.node.altText || product.title}
//                 width={600}s
//                 height={600}
//                 className="rounded-lg"
//               />s
//             ))
//           ) : (
//             <div className="w-full h-80 bg-gray-100 flex items-center justify-center rounded-lg">
//               No Images
//             </div>
//           )}
//         </div>

//         {/* Product info */}
//         <div className="w-full md:w-1/2">
//           <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

//           <p className="text-3xl font-semibold mb-4">
//             ${variants[0]?.node?.price?.amount || "N/A"}
//           </p>

//           <p className="mb-6 leading-relaxed">{product.description}</p>

//           {/* Variants dropdown */}
//           {variants.length > 1 && (
//             <div className="mb-6">
//               <label htmlFor="variant" className="block mb-2 font-semibold">
//                 Choose Variant
//               </label>
//               <select
//                 id="variant"
//                 className="w-full border p-2 rounded focus:ring focus:ring-green-200"
//               >
//                 {variants.map((v) => (
//                   <option key={v.node.id} value={v.node.id}>
//                     {v.node.title} — ${v.node.price.amount}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* Add to Cart button */}
//           <button
//             className="w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition-all"
//             type="button"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
