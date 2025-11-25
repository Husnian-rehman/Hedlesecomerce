export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText?: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: Money;
  compareAtPrice?: Money;
  availableForSale: boolean;
  sku?: string;
  weight?: number;
  weightUnit?: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage?: Image;
  images: Image[];
  variants: {
    edges: {
      node: ProductVariant;
    }[];
  };
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description?: string;
  image?: Image;
  products: {
    edges: {
      node: Product;
    }[];
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant;
  cost: {
    totalAmount: Money;
    subtotalAmount: Money;
  };
}

export interface Cart {
  id: string;
  lines: {
    edges: {
      node: CartLine;
    }[];
  };
  cost: {
    totalAmount: Money;
    subtotalAmount: Money;
  };
  totalQuantity: number;
}

export interface Media {
  id: string;
  url: string;
  altText?: string;
  mediaContentType: string;
}

export interface Tag {
  value: string;
}

export interface Article {
  id: string;
  title: string;
  handle: string;
  excerpt: string;
  contentHtml: string;
  publishedAt: string;
  image?: {
    src: string;
    altText?: string;
  };
}

export interface Blog {
  id: string;
  handle: string;
  title: string;
  articles: {
    edges: {
      node: Article;
    }[];
  };
}
