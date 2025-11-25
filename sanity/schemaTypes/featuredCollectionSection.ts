import { Rule } from "sanity";

export default {
  name: "featuredCollectionSection",
  title: "Featured Collection Section",
  type: "document",
  fields: [
    {
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      description: "This title will show above the products on the frontend",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "collectionName",
      title: "Shopify Collection Name",
      type: "string",
      description: "Enter the exact Shopify collection title to fetch products",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "limit",
      title: "Number of Products to Show",
      type: "number",
      initialValue: 8,
      validation: (Rule: Rule) => Rule.min(1).max(50),
    },
  ],

  preview: {
    select: { title: "sectionTitle", collection: "collectionName" },
    prepare(value: Record<string, any>) {
      const { title, collection } = value;
      return {
        title: title || "Featured Collection Section",
        subtitle: `Shopify Collection: ${collection}`,
      };
    },
  },
};
