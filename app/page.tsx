import Banner from '@/components/Banner';
import FeaturedCollectionSection from '@/components/Featuredcollection';
import TabsSection from '@/components/Tabsection';
import CollectionSection from "@/components/CollectionSection";
import { client } from "@/sanity/lib/client";
import { shopifyFetch } from "@/lib/shopify/client";
import { getCollectionProductsByTitle } from "@/lib/shopify/queries/collection";

export default async function Home() {

  // bannr 
  const bannerData = await client.fetch(`
  *[_type == "banner"][0]{
    slides[]{
      heading,
      description,
      "bgImage": bgImage.asset->url,
      shopAllBtn
    }
  }
`);
  // FeaturedCollectionSection data
  const sections = await client.fetch(`
    *[_type == "featuredCollectionSection"]{
      _id,
      sectionTitle,
      collectionName,
      limit
    }
  `);

  const sectionsWithProducts = await Promise.all(
    sections.map(async (section: any) => {
      const data = await shopifyFetch({
        query: getCollectionProductsByTitle,
        variables: { title: section.collectionName },
      });

      const products =
        data?.collections?.edges?.[0]?.node?.products?.edges?.map(
          (edge: any) => edge.node
        ) || [];

      return { ...section, products };
    })
  );

  // Tabs Section
  const tabsData = await client.fetch(`
    *[_type == "tabsSection"][0]{
      sectionTitle,
      tabs[] {
        buttonHeading,
        contentHeading,
        description,
        "image": image.asset->url
      }
    }
  `);

  // CollectionSection data (multiple collections)
  const collectionSections = await client.fetch(`
    *[_type == "collectionSection"]{
      _id,
      sectionTitle,
      collectionTitles
    }
  `);

  return (
    <div>
    <Banner banner={bannerData} />

      {sectionsWithProducts.map((section: any) => (
        <FeaturedCollectionSection
          key={section._id}
          title={section.sectionTitle}
          products={section.products.slice(0, section.limit)}
        />
      ))}

      <TabsSection sectionTitle={tabsData.sectionTitle} tabs={tabsData.tabs} />

       {collectionSections.map((section: any) => (
          <CollectionSection
            key={section._id}
            title={section.sectionTitle}
            collectionTitles={section.collectionTitles}
            preview={true} // ✅ Preview mode enabled
          />
        ))}
    </div>
  );
}
