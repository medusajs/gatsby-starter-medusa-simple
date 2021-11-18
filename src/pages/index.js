import React from "react";
import { graphql } from "gatsby";
import ProductGrid from "../components/product/product-grid";
import { Box } from "@theme-ui/components";

const Index = ({ data }) => {
  const {
    allMedusaProducts: { edges },
  } = data;
  const products = edges.map((e) => e.node);
  // return <ProductGrid products={products} />;
  return (
    <Box>
      <ProductGrid products={products} />
    </Box>
  );
};

export const query = graphql`
  {
    allMedusaProducts(limit: 3) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          handle
          title
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
    }
  }
`;

export default Index;
