import { useContext } from "react";
import RegionContext from "../context/region-context";

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error(
      "useRegion hook was used but a RegionContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of RegionProvider"
    );
  }

  return context;
};
