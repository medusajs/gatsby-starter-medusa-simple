export const buttons = {
  primary: {
    bg: "royalBlue",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
  },
  browser: {
    cursor: "pointer",
    px: "1rem",
    py: 0,
    bg: "transparent",
  },
  qty: {
    variant: "buttons.browser",
    color: "black",
  },
  option: {
    cursor: "pointer",
    minWidth: "40px",
    height: "40px",
    fontSize: [2],
    p: 2,
    bg: "transparent",
    border: "2px solid",
    borderColor: "royalBlue",
    color: "royalBlue",
    borderRadius: "4px",
    transition: "all .2s ease-in-out",
    "&.active": {
      bg: "royalBlue",
      color: "white",
    },
  },
  customerMenu: {
    bg: "transparent",
    textAlign: "left",
    color: "black",
    flexShrink: 1,
    cursor: "pointer",
  },
};
