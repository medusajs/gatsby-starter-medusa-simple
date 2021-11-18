import { colors } from "./colors";
import { text } from "./text";
import { buttons } from "./buttons";
import { forms } from "./forms";

export const theme = {
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
  cards: {
    container: {
      mt: 2,
      py: 2,
      px: 4,
      borderRadius: "8px",
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
    },
  },
  forms,
  images: {
    iconLink: {
      transition: "all .2s ease-in",
      opacity: "0.5",
      "&:hover": {
        opacity: "1",
      },
    },
  },
  badges: {
    green: {
      display: "inline-block",
      alignItems: "center",
      p: ".5rem 2rem",
      borderRadius: 0,
      fontWeight: "700",
      bg: "medusaGreen",
      color: "royalBlue",
    },
    yellow: {
      variant: "badges.green",
      bg: "warning",
    },
    initial: {
      variant: "badges.green",
      bg: "pinkSalmon",
      color: "white",
    },
  },
  layouts: {
    form: {
      "& .wrapper": {
        mt: 2,
      },
      "& .wrapper:first-of-type": {
        mt: 0,
      },
    },
    spaceBetween: {
      justifyContent: "space-between",
      alignItems: "center",
      pt: 1,
      pb: 2,
    },
    breadCrumbs: {
      fontSize: 1,
      "& .crumb": {
        color: "faded",
        mr: 2,
        transition: "all .2s linear",
        "::before": {
          content: '"/"',
          mr: 2,
        },
      },
      "& .crumb.current": {
        color: "black",
      },
      "& .crumb:first-of-type": {
        "::before": {
          content: '""',
          mr: 0,
        },
      },
    },
    orderGrid: {
      display: "grid",
      gridTemplateColumns: `"1fr 1fr 1fr 1fr 1fr"`,
      gridTemplateRows: "auto",
      gap: 4,
      gridTemplateAreas: `"id date payment shipping total"`,
      width: "100%",
      alignItems: "center",
    },
  },
  styles: {
    body: {
      margin: 0,
    },
    root: {
      fontFamily: "system-ui, sans-serif",
      a: {
        textDecoration: "none",
      },
    },
  },
};
