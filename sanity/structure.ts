import type { StructureResolver } from "sanity/structure";

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ========== GLOBAL SETTINGS ==========
      S.listItem()
        .title("Global Settings")
        .child(
          S.list()
            .title("Global Settings")
            .items([
              S.documentTypeListItem("header").title("Navigation Bar"),
                S.documentTypeListItem("banner").title("Banner"),
              S.documentTypeListItem("footer").title("Footer"),
            ])
        ),

      // ========== HOME PAGE (ONLY FEATURED COLLECTION) ==========
      S.listItem()
        .id("home-page-sections")
        .title("Home Page")
        .child(
          S.list()
            .title("Home Page Sections")
            .items([
              S.documentTypeListItem("featuredCollectionSection").title(
                "Featured Collection Section"
              ),
              S.documentTypeListItem("tabsSection").title("Tabs Section"),
              S.documentTypeListItem("collectionSection").title("Collection Section"),
            ])
        ),

      // ========== COLLECTION PAGE ==========
      S.listItem()
        .title("Collection Page")
        .child(
          S.list()
            .title("Collection Page Sections")
            .items([
              S.documentTypeListItem("collectionBanner").title("Collection Banner"),
              // you can add other collection-specific sections here
            ])
        ),

      // ========== OTHER DOCUMENTS (AUTO) ==========
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== undefined &&
          ![
            "header",
             "banner",
            "footer",
            "featuredCollectionSection",
            "tabsSection",
            "collectionSection",
            "collectionBanner",
            "homePage",
          ].includes(item.getId()!)
      ),
    ]);

export default structure;
