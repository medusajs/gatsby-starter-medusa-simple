import React from "react";
import styled from "@emotion/styled";
import { Box, Grid, Text } from "@theme-ui/components";
import { getImage } from "gatsby-plugin-image";
import { GatsbyImage } from "gatsby-plugin-image";
import ProductLink from "../../link/product-link";
import { usePrice } from "../../../hooks/usePrice";
import { useRegion } from "../../../hooks/useRegion";

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

  const {
    actions: { getFromPrice },
  } = usePrice();

  const { region } = useRegion();

  return (
    <Grid
      sx={{
        gridTemplateColumns: ["1fr", "1fr", "2fr 1fr"],
        gridTemplateRows: ["1fr 1fr 1fr", "1fr 1fr 1fr", "1fr 1fr"],
        gap: "16px 16px",
        gridTemplateAreas: `"product-0 product-1"
                            "product-0 product-2"`,
        height: "calc(100vh - 120px)",
      }}
    >
      {toDisplay.map((product, i) => {
        const image = getImage(product.thumbnail);
        const fromPrice = getFromPrice(product);
        return (
          <Box
            sx={{
              gridArea: `product-${i}`,
              bg: "ui200",
              overflow: "hidden",
              position: "relative",
              flexGrow: [1, 1, 0],
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
              <Box
                sx={{
                  position: "absolute",
                  bottom: 3,
                  left: 3,
                  color: "royalBlue",
                }}
              >
                <Text
                  as="h2"
                  sx={{
                    fontSize: i < 1 ? [4, 5, 6] : [3, 4, 5],
                    fontWeight: 500,
                  }}
                >
                  {product.title}
                </Text>
                {fromPrice ? (
                  <Text
                    sx={{
                      fontSize: 2,
                    }}
                  >
                    from {fromPrice}
                  </Text>
                ) : null}
              </Box>
            </ProductLink>
          </Box>
        );
      })}
    </Grid>
  );
};

export default ProductGrid;
