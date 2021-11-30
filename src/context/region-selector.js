import { useBag, useRegions } from "@medusajs/medusa-hooks";
import { useEffect } from "react";

export const RegionSelector = ({ children }) => {
  const { regions } = useRegions();
  const { setRegion } = useBag();

  useEffect(() => {
    if (regions) {
      setRegion(regions[0]);
    }
  }, [regions]);

  return children;
};
