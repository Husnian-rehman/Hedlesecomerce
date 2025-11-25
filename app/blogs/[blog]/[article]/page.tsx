import Image from "next/image";
import { getArticleByHandle } from "@/lib/shopify/queries/blogs";

interface Props {
  params: { blog: string; article: string };
}

export default async function BlogDetailPage({ params }: Props) {
  const { blog, article } = params;
  const post = await getArticleByHandle(blog, article);

  if (!post) return <p className="p-6 text-center">Article not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      {post.image?.src && (
        <div className="relative w-full h-96 mb-6">
          <Image
            src={post.image.src}
            alt={post.image.altText || post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </div>
  );
}
