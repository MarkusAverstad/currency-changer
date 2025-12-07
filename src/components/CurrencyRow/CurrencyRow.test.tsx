import { render, screen } from "@testing-library/react";
import { CurrencyRow } from "components";
import { CurrencyEntry } from "types";
import { expect } from "vitest";
import { userEvent } from "@testing-library/user-event";

const mockCurrency: CurrencyEntry = vi.hoisted(() => ({
  name: "Mockcoin",
  unit: "MCK",
  type: "crypto",
  symbol: "mtc",
  value: 30000,
}));

const mockUpdateCurrency = vi.hoisted(() =>
  vi.fn((originalSymbol: string, updates: Partial<CurrencyEntry>) => {
    Object.assign(mockCurrency, { ...updates, originalSymbol });
  }),
);

vi.mock("hooks", async () => ({
  ...(await vi.importActual("hooks")),
  useCurrencies: () => ({
    updateCurrency: mockUpdateCurrency,
  }),
}));

describe("CurrencyRow", () => {
  beforeEach(() => {
    mockUpdateCurrency.mockClear();
  });

  it("should render correctly", () => {
    const fixture = render(<CurrencyRow currency={mockCurrency} index={0} />);

    expect(screen.getByText("Mockcoin")).toBeInTheDocument();

    expect(fixture.asFragment()).toMatchSnapshot();
  });

  it("should render error if symbol is invalid", async () => {
    render(<CurrencyRow currency={mockCurrency} index={0} />);

    const symbolInput = screen.getByTestId(
      "symbol-input-mtc",
    ) as HTMLInputElement;
    expect(symbolInput).toHaveClass("border-gray-300", "focus:border-blue-500");

    await userEvent.clear(symbolInput);
    await userEvent.type(symbolInput, "123");

    expect(symbolInput).toHaveClass("border-red-500", "bg-red-50");
  });

  it("should update symbol", async () => {
    render(<CurrencyRow currency={mockCurrency} index={0} />);

    const symbolInput = screen.getByTestId(
      "symbol-input-mtc",
    ) as HTMLInputElement;
    await userEvent.clear(symbolInput);
    await userEvent.type(symbolInput, "ABC");

    // Note: This check is not ideal, but due to the requirement that
    // each keystroke triggers an update, we have to check each call.
    expect(mockUpdateCurrency).toHaveBeenCalledWith("mtc", {
      symbol: "A",
    });
    expect(mockUpdateCurrency).toHaveBeenCalledWith("mtc", {
      symbol: "B",
    });
    expect(mockUpdateCurrency).toHaveBeenCalledWith("mtc", {
      symbol: "C",
    });
  });
});
