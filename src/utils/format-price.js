function getCartCurrency(cart) {
  if ('currency_code' in cart) {
    return cart.currency_code;
  } else if (cart.region) {
    return cart.region.currency_code;
  }
  return null;
}

function getTaxRate(cart) {
  if ('tax_rate' in cart) {
    return cart.tax_rate;
  } else if (cart.region) {
    return cart.region && cart.region.tax_rate;
  }
  return 0;
}

export function formatMoneyAmount(moneyAmount, digits, taxRate = 0) {
  let locale = 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: moneyAmount.currencyCode,
    minimumFractionDigits: digits,
  }).format((moneyAmount.amount / 100) * (1 + taxRate / 100));
}

export function getVariantPrice(cart, variant) {
  let taxRate = getTaxRate(cart);

  const cartCurrency = getCartCurrency(cart);
  let moneyAmount = variant.prices.find(
    p => p.currency_code.toLowerCase() === cartCurrency,
  );

  if (moneyAmount && moneyAmount.amount) {
    return moneyAmount.amount * (1 + taxRate);
  }

  return undefined;
}

export function formatPrices(cart, variant, digits = 2) {
  if (!cart || !cart.region || !variant) return;
  if (!variant.prices) return `15.00 EUR`;
  return formatMoneyAmount(
    {
      currencyCode: cart.region.currency_code,
      amount: getVariantPrice(cart, variant),
    },
    digits,
  );
}
