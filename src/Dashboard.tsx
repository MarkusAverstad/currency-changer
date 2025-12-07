import { CurrencyTable } from "components";
import { useCurrencies } from "hooks";

function Dashboard() {
  const { isLoading } = useCurrencies();

  return (
    <div className="h-screen bg-gray-50 p-8">
      <header className="min-h-[80px]">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Currency Exchange Rates
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Monitor and edit exchange rates in real-time
        </p>
      </header>

      <div
        className="flex flex-col items-center justify-center w-full max-w-[900px] mx-auto"
        data-testid="currency-table"
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading exchange rates...</p>
          </div>
        ) : (
          <CurrencyTable />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
