import { useRegion } from "./useRegion";
import { formatMoneyAmount } from "../utils/format-price";

export const usePrice = () => {
  const { region } = useRegion();

  const currency_code = region?.currency_code ? region.currency_code : "USD";
  const tax_rate = region?.tax_rate ? region.tax_rate : 0;

  const getFromPrice = (product) => {
    const { variants } = product;

    let prices = [];

    for (const variant of variants) {
      const currencySpecificPrices = variant.prices.filter(
        (price) => price.currency_code === currency_code
      );
      prices = [...prices, ...currencySpecificPrices];
    }

    if (prices.length) {
      const lowestPrice = prices.reduce((lowest, current) => {
        if (lowest.amount > current.amount) {
          return current;
        }
        return lowest;
      });

      return formatMoneyAmount(
        { amount: lowestPrice.amount || 0, currencyCode: currency_code },
        2,
        tax_rate
      );
    }

    return undefined;
  };

  return { actions: { getFromPrice } };
};
