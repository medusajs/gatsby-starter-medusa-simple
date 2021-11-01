import { useContext } from "react";
import RegionContext from "../context/region-context";

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within a child of RegionProvider");
  }

  return context;
};
