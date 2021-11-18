import React from "react";
import ReturnContext from "../context/returns-context";

export const useReturn = () => {
  const context = React.useContext(ReturnContext);

  if (!context) {
    throw new Error(
      "useReturn hook was used but a ReturnContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of ReturnProvider"
    );
  }

  return context;
};
