import { CurrencyEntry } from "types";
import { useCurrencies } from "hooks";

const CurrencyRow = ({
  currency,
  index,
}: {
  currency: CurrencyEntry;
  index: number;
}) => {
  const { updateCurrency } = useCurrencies();

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
          type="text"
          maxLength={3}
          value={currency.symbol}
          className="border-2 border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 w-20"
          onChange={(e) =>
            updateCurrency(currency.originalSymbol || currency.symbol, {
              symbol: e.target.value,
            })
          }
        />
      </td>
      <td className="px-6 py-4 border-r border-gray-200">
        <input
          type="number"
          value={currency.value}
          step="0.000001"
          className="border-2 border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 w-32"
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
