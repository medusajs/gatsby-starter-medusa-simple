import { useContext } from "react";
import DisplayContext from "../context/display-context";

export const useDisplay = () => {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error(
      "useDisplay hook was used but a DisplayContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of DisplayProvider"
    );
  }

  return context;
};
