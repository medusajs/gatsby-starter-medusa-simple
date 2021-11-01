import { colors } from "./colors";
import { text } from "./text";
import { buttons } from "./buttons";

const theme = {
  bp: {
    desktop: "@media only screen and (min-width: 768px)",
    largeDesktop: "@media only screen and (min-width: 992px)",
    hd: "@media only screen and (min-width: 1200px)",
  },
  breakpoints: ["768px", "992px", "1600px"],
  fonts: {
    body: "system-ui, sans-serif",
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [10, 12, 14, 16, 20, 24, 32, 48, 64],
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  text,
  colors,
  buttons,
  badges: {
    done: {
      p: ".5rem 1rem",
      bg: "medusaGreen",
      color: "white",
    },
    wait: {
      variant: "labels.statusDone",
      bg: "salmon",
      color: "white",
    },
    initial: {
      variant: "labels.statusDone",
      bg: "pinkSalmon",
      color: "white",
    },
  },
  styles: {
    body: {
      margin: 0,
    },
    root: {
      fontFamily: "body",
      a: {
        textDecoration: "none",
      },
    },
  },
};

export default theme;
