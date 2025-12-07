type Currency = {
  name: string;
  unit: string;
  value: number;
  type: "crypto" | "fiat" | "commodity";
};

export type CurrenciesResponse = {
  rates: Record<string, Currency>;
};

export type CurrencyEntry = Currency & {
  symbol: string;
  originalSymbol?: string;
};
