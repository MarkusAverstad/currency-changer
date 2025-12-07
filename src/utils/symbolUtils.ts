export const validateSymbol = (symbol: string): boolean => {
  return /^[A-Za-z]{3}$/.test(symbol);
};
