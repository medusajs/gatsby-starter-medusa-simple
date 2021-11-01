import { Button, Image } from "@theme-ui/components";
import React from "react";
import Arrow from "../../icons/arrow.svg";

const Browse = ({ variant = "right", fn }) => {
  return (
    <Button onClick={fn} variant="browser">
      <Image
        sx={{
          transform: variant === "left" ? "rotate(-180deg)" : null,
          maxWidth: "1rem",
        }}
        src={Arrow}
        alt=""
      />
    </Button>
  );
};

export default Browse;
