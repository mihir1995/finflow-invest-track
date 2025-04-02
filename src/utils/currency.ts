
export type CurrencyCode = "USD" | "INR";

export interface CurrencyData {
  code: CurrencyCode;
  symbol: string;
  name: string;
  exchangeRate: number; // relative to USD
}

export const currencies: Record<CurrencyCode, CurrencyData> = {
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    exchangeRate: 1,
  },
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    exchangeRate: 83.5, // Example rate: 1 USD = 83.5 INR (this should be updated with real rates)
  }
};

export const formatCurrency = (amount: number, currencyCode: CurrencyCode = "USD"): string => {
  const currency = currencies[currencyCode];
  return `${currency.symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const convertCurrency = (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to USD first if not already
  const amountInUSD = fromCurrency === "USD" 
    ? amount 
    : amount / currencies[fromCurrency].exchangeRate;
  
  // Then convert from USD to target currency
  return toCurrency === "USD" 
    ? amountInUSD 
    : amountInUSD * currencies[toCurrency].exchangeRate;
};
