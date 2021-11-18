import React from "react";
import { client } from "../utils/client";

export const defaultReturnContext = {
  order: undefined,
};

const ReturnContext = React.createContext(defaultReturnContext);
export default ReturnContext;

const ACTIONS = {
  UPDATE_ORDER: "UPDATE_ORDER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_ORDER:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

export const ReturnProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, defaultReturnContext);

  const fetchOrder = async (payload) => {
    const response = { order: undefined, error: undefined };

    response.order = await client.orders
      .lookupOrder(payload)
      .then(({ data: { order } }) => order)
      .catch((error) => {
        response.error = error.response.data;
        return undefined;
      });

    if (!response.error) {
      dispatch({ type: ACTIONS.UPDATE_ORDER, payload: response.order });
    }

    return response;
  };

  return (
    <ReturnContext.Provider
      {...props}
      value={{
        ...state,
        actions: { fetchOrder },
      }}
    />
  );
};
