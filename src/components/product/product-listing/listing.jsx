import { Flex, Grid, Text } from "@theme-ui/components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

const Listing = ({ product }) => {
  console.log(product);
  const thumbnail = getImage(product.thumbnail);
  return (
    <Flex
      sx={{
        flexDirection: "column",
      }}
    >
      <Grid
        sx={{
          width: "300px",
          height: "300px",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <GatsbyImage
          style={{
            gridArea: "1/1",
          }}
          image={thumbnail}
          alt={product.title}
        />
      </Grid>
      <Flex
        sx={{
          justifyContent: "space-between",
          maxWidth: "300px",
          mt: 2,
          alignItems: "center ",
        }}
      >
        <Text
          sx={{
            fontWeight: 500,
          }}
        >
          {product.title}
        </Text>
        <Text
          sx={{
            fontSize: [2],
          }}
        >
          from €19.5
        </Text>
      </Flex>
    </Flex>
  );
};

export default Listing;
