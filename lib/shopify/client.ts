export const shopifyFetch = async ({ query, variables = {} }: any) => {
  try {
    const url = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    console.log("Shopify Fetch Result →");
    console.dir(result, { depth: null, colors: true });

    if (result.errors) {
      throw new Error(`Shopify GraphQL Errors: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  } catch (error) {
    console.error("Shopify Fetch Failed →", error);
    throw error;
  }
};
