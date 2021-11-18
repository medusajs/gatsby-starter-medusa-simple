import { Flex } from "@theme-ui/components";
import { graphql } from "gatsby";
import React from "react";
import ProductListing from "../../components/product/product-listing";

export default function AllProductsPage({ data: { products } }) {
  console.log(products);
  return (
    <Flex>
      <ProductListing products={products.edges} />
    </Flex>
  );
}

export const query = graphql`
  {
    products: allMedusaProducts(limit: 10, sort: { fields: updated_at }) {
      edges {
        node {
          id
          title
          handle
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
          variants {
            prices {
              amount
              currency_code
            }
          }
          images {
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
