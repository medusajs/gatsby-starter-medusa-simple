import { Box, Flex, Grid, Text } from "@theme-ui/components";
import { GatsbyImage } from "gatsby-plugin-image";

import React, { useState } from "react";
import Browse from "../../buttons/browse";

const ImageDisplay = ({ images = [], productTitle }) => {
  const [current, setCurrent] = useState(0);

  const updateCurrent = (update) => {
    const newCurrent = current + update;

    if (newCurrent < 0) {
      setCurrent(images.length - 1);
    } else if (newCurrent >= images.length) {
      setCurrent(0);
    } else {
      setCurrent(newCurrent);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "50%",
        maxHeight: "calc(100vh - 120px)",
        minHeight: "500px",
        position: "relative",
        overflow: "hidden",
        bg: "ui200",
      }}
    >
      <Grid
        sx={{
          height: "100%",
        }}
      >
        <GatsbyImage
          image={images[current].image.childImageSharp.gatsbyImageData}
          style={{ gridArea: "1/1" }}
          objectFit="contain"
          alt={`${productTitle} #${1}`}
        />
      </Grid>
      {images.length > 1 ? (
        <>
          <Box
            sx={{
              position: "absolute",
              bottom: "1rem",
              left: "1rem",
            }}
          >
            <Text>{`${current + 1} of ${images.length}`}</Text>
          </Box>
          <Flex
            sx={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              fontFamily: "monospace",
            }}
          >
            <Browse variant="left" fn={() => updateCurrent(-1)} />
            <Browse fn={() => updateCurrent(1)} />
          </Flex>
        </>
      ) : null}
    </Box>
  );
};

export default ImageDisplay;
