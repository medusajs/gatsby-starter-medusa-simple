export const buttons = {
  primary: {
    bg: "royalBlue",
    color: "white",
    borderRadius: 0,
    cursor: "pointer",
    fontFamily: "system-ui, sans-serif",
  },
  edit: {
    bg: "transparent",
    border: "none",
    color: "faded",
    textDecoration: "underline",
    textUnderlineOffset: 2,
    p: 0,
    transition: "all 0.2s linear",
    "&:hover": {
      color: "text",
    },
  },
  browser: {
    cursor: "pointer",
    px: "1rem",
    py: 0,
    bg: "transparent",
    color: "text",
  },
  remove: {
    variant: "buttons.browser",
    px: 0,
    fontWeight: 300,
    pb: 1,
  },
  add: {
    variant: "buttons.browser",
    pb: 1,
  },
  qty: {
    variant: "buttons.browser",
    color: "text",
    py: 2,
  },
  option: {
    cursor: "pointer",
    width: "50px",
    height: "50px",
    fontSize: 2,
    textAlign: "center",
    bg: "smoke",
    color: "text",
    transition: "all .2s ease-in-out",
    "&.active": {
      bg: "royalBlue",
      color: "white",
    },
  },
  customerMenu: {
    display: "flex",
    alignItems: "center",
    bg: "transparent",
    textAlign: "left",
    color: "black",
    px: 0,
    opacity: 0.5,
    flexShrink: 1,
    cursor: "pointer",
    transition: "opacity .2s ",
    "&.active": {
      opacity: 1,
      "::before": {
        content: '"–"',
        mr: 2,
      },
    },
    "&:hover": {
      opacity: 1,
    },
  },
  save: {
    bg: "royalBlue",
    borderRadius: "0",
    px: 4,
    transition: "all .2s ease-in-out",
    "&:disabled": {
      opacity: 0.7,
    },
  },
};
