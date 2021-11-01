import { Grid } from "@theme-ui/components";
import React from "react";
import Listing from "./listing";

const ProductListing = ({ products }) => {
  const test = [...Array(20).keys()];
  return (
    <Grid
      sx={{
        width: "100%",
        gap: ["24px", "24px", "48px"],
        gridTemplateColumns: [
          "1fr",
          "1fr 1fr",
          "repeat(3,1fr)",
          "repeat(4,1fr)",
        ],
        padding: "0 48px",
        placeItems: "center",
      }}
    >
      {test.map((i) => {
        return <Listing key={i} product={products[0].node} />;
      })}
    </Grid>
  );
};

export default ProductListing;
