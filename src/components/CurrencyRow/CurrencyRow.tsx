import { CurrencyEntry } from "types";
import { useCurrencies } from "hooks";
import { useState } from "react";
import { validateSymbol } from "utils";

const CurrencyRow = ({
  currency,
  index,
}: {
  currency: CurrencyEntry;
  index: number;
}) => {
  const { updateCurrency } = useCurrencies();
  const [isSymbolValid, setIsSymbolValid] = useState(true);

  const handleSymbolChange = (value: string) => {
    setIsSymbolValid(validateSymbol(value));

    // Note: We still update the symbol even if it's invalid.
    // This allows for real-time validation feedback. In a real
    // application the update would not be sent to the API until valid.
    updateCurrency(currency.originalSymbol || currency.symbol, {
      symbol: value,
    });
  };

  return (
    <tr
      className={`border-b border-gray-300 hover:bg-blue-25 ${
        index % 2 === 0 ? "bg-white" : "bg-gray-25"
      }`}
    >
      <td className="px-6 py-4 font-medium text-gray-900 border-r border-gray-200">
        {currency.name}
      </td>
      <td className="px-6 py-4 border-r border-gray-200">
        <input
          data-testid={`symbol-input-${currency.originalSymbol || currency.symbol}`}
          type="text"
          maxLength={3}
          value={currency.symbol}
          className={`border-2 rounded px-3 py-2 text-sm focus:outline-none w-20 ${
            isSymbolValid
              ? "border-gray-300 focus:border-blue-500"
              : "border-red-500 bg-red-50 focus:border-red-600"
          }`}
          onChange={(e) => handleSymbolChange(e.target.value)}
        />
      </td>
      <td className="px-6 py-4 border-r border-gray-200">
        <input
          data-testid={`value-input-${currency.originalSymbol || currency.symbol}`}
          type="number"
          value={currency.value}
          step="0.000001"
          min={0}
          className={`border-2 border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 w-32 ${
            currency.value > 0
              ? "border-gray-300 focus:border-blue-500"
              : "border-red-500 bg-red-50 focus:border-red-600"
          }`}
          onChange={(e) =>
            updateCurrency(currency.originalSymbol || currency.symbol, {
              value: parseFloat(e.target.value),
            })
          }
        />
      </td>
      <td className="px-6 py-4 border-r border-gray-200">
        <span
          className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${
            currency.type === "crypto"
              ? "bg-purple-50 text-purple-800 border-purple-200"
              : currency.type === "fiat"
                ? "bg-green-50 text-green-800 border-green-200"
                : "bg-yellow-50 text-yellow-800 border-yellow-200"
          }`}
        >
          {currency.type}
        </span>
      </td>
      <td className="px-6 py-4">{currency.unit}</td>
    </tr>
  );
};

export default CurrencyRow;
