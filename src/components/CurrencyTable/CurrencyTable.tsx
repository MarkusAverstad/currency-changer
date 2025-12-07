import { useCurrencies } from "hooks";
import { CurrencyRow } from "components";

const CurrencyTable = () => {
  const { currencies } = useCurrencies();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-[900px]">
      <div className="overflow-y-auto max-h-[80vh]">
        <table className="w-full border-collapse">
          <thead className="sticky top-0">
            <tr className="bg-blue-50 border-b-2 border-blue-200 text-left font-semibold text-blue-900">
              <th className="px-6 py-4 border-r border-blue-200">Currency</th>
              <th className="px-6 py-4 border-r border-blue-200">Symbol</th>
              <th className="px-6 py-4 border-r border-blue-200">Rate</th>
              <th className="px-6 py-4 border-r border-blue-200">Type</th>
              <th className="px-6 py-4">Unit</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currencies.map((currency, index) => (
              <CurrencyRow
                key={currency.originalSymbol || currency.symbol}
                currency={currency}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrencyTable;
