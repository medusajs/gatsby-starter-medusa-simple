import React from "react";
import styled from "@emotion/styled";
import { Box, Grid, Text } from "@theme-ui/components";
import { getImage } from "gatsby-plugin-image";
import { GatsbyImage } from "gatsby-plugin-image";
import ProductLink from "../../link/product-link";

const GridArea = styled(Grid)`
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px 16px;
  grid-template-areas:
    "product-0 product-1"
    "product-0 product-2";
`;

const ProductGrid = ({ products }) => {
  const toDisplay = [products[0], products[0], products[0]];

  return (
    <GridArea
      sx={{
        height: "calc(100vh - 100px)",
      }}
    >
      {toDisplay.map((product, i) => {
        const image = getImage(product.thumbnail);
        return (
          <Box
            sx={{
              gridArea: `product-${i}`,
              bg: "ui200",
              overflow: "hidden",
              borderRadius: "8px",
              position: "relative",
            }}
            key={i}
          >
            <ProductLink handle={product.handle}>
              <GatsbyImage
                image={image}
                alt=""
                objectFit="contain"
                objectPosition="center center"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
              <Text
                as="h2"
                sx={{
                  position: "absolute",
                  bottom: "2rem",
                  left: "2rem",
                  fontSize: i < 1 ? [5, 6, 7] : [3, 4, 5],
                }}
              >
                {product.title}
              </Text>
            </ProductLink>
          </Box>
        );
      })}
    </GridArea>
  );
};

export default ProductGrid;
