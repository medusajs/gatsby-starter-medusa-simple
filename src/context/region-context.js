import React from "react";

const defaultRegionContext = {
  region: undefined,
};

const RegionContext = React.createContext(defaultRegionContext);
export default RegionContext;

const ACTIONS = {
  UPDATE_REGION: "UPDATE_REGION",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_REGION:
      return {
        ...state,
        region: action.payload,
      };
    default:
      break;
  }
};

const REGION = "medusa_region";

export const RegionProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, defaultRegionContext);

  React.useEffect(() => {
    if (localStorage) {
      const json = localStorage.getItem(REGION);

      if (json) {
        const region = JSON.parse(json);
        updateRegion(region);
      }
    }
  }, []);

  const updateRegion = (region) => {
    localStorage.setItem(REGION, JSON.stringify(region));
    dispatch({
      type: ACTIONS.UPDATE_REGION,
      payload: region,
    });
  };

  return (
    <RegionContext.Provider {...props} value={{ ...state, updateRegion }} />
  );
};
