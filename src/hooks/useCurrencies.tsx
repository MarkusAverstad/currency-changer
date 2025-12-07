import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CurrenciesResponse, CurrencyEntry } from "types";

export interface CurrenciesContextValue {
  isLoading: boolean;
  currencies: CurrencyEntry[];
  updateCurrency: (symbol: string, update: Partial<CurrencyEntry>) => void;
}
const useCurrenciesInternal = (): CurrenciesContextValue => {
  const [isLoading, setIsLoading] = useState(true);
  const [baseCurrencies, setBaseCurrencies] =
    useState<CurrenciesResponse | null>(null);
  // Alright, so this weird autocomplete was just too wonderful for me to fix.
  // I will let it remain as a touch of whimsy. =)
  const [magicallyEditedCurrencies, setMaliciouslyEditedCurrencies] = useState<
    Record<string, Partial<Pick<CurrencyEntry, "symbol" | "value">>>
  >({});

  useEffect(() => {
    fetch("api/v3/exchange_rates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 429) {
            setBaseCurrencies(mockCurrencies);
            console.info(
              "Received 429 Too Many Requests: Using mock currencies instead.",
            );
          } else {
            throw new Error(
              `Fetching currencies failed. Received ${res.status}: ${res.statusText}`,
            );
          }
        } else {
          const currencyData: CurrenciesResponse = await res.json();
          return setBaseCurrencies(currencyData);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const currencies: CurrencyEntry[] = useMemo(() => {
    if (!baseCurrencies) {
      return [];
    }

    return Object.entries(baseCurrencies.rates).map(
      ([originalSymbol, currency]) => ({
        ...currency,
        symbol: originalSymbol, // This will be the display symbol
        originalSymbol, // Add this for stable keying
        ...magicallyEditedCurrencies[originalSymbol],
      }),
    );
  }, [baseCurrencies, magicallyEditedCurrencies]);

  const updateCurrency = useCallback(
    (symbol: string, update: Partial<CurrencyEntry>) => {
      setMaliciouslyEditedCurrencies((prevState) => ({
        ...prevState,
        [symbol]: { ...prevState[symbol], ...update },
      }));
    },
    [],
  );

  return { isLoading, currencies, updateCurrency };
};

const CurrenciesContext = createContext<CurrenciesContextValue | null>(null);

export const CurrenciesProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CurrenciesContext.Provider value={useCurrenciesInternal()}>
      {children}
    </CurrenciesContext.Provider>
  );
};

export const useCurrencies = (): CurrenciesContextValue => {
  const context = useContext(CurrenciesContext);
  if (!context) {
    throw new Error("useCurrencies must be used within a CurrenciesProvider");
  }
  return context;
};

// Note: The currency API only allows a small number of calls per time unit
// before throwing a 429 code for a while. I'll be using these as a backup.
const mockCurrencies: CurrenciesResponse = {
  rates: {
    btc: {
      name: "Bitcoin",
      unit: "BTC",
      value: 1,
      type: "crypto",
    },
    eth: {
      name: "Ether",
      unit: "ETH",
      value: 29.941,
      type: "crypto",
    },
    ltc: {
      name: "Litecoin",
      unit: "LTC",
      value: 1102.333,
      type: "crypto",
    },
    bch: {
      name: "Bitcoin Cash",
      unit: "BCH",
      value: 154.341,
      type: "crypto",
    },
    bnb: {
      name: "Binance Coin",
      unit: "BNB",
      value: 100.786,
      type: "crypto",
    },
    eos: {
      name: "EOS",
      unit: "EOS",
      value: 507550.506,
      type: "crypto",
    },
    xrp: {
      name: "XRP",
      unit: "XRP",
      value: 43978.335,
      type: "crypto",
    },
    xlm: {
      name: "Lumens",
      unit: "XLM",
      value: 379867.959,
      type: "crypto",
    },
    link: {
      name: "Chainlink",
      unit: "LINK",
      value: 6659.199,
      type: "crypto",
    },
    dot: {
      name: "Polkadot",
      unit: "DOT",
      value: 42971.785,
      type: "crypto",
    },
    yfi: {
      name: "Yearn.finance",
      unit: "YFI",
      value: 24.946,
      type: "crypto",
    },
    sol: {
      name: "Solana",
      unit: "SOL",
      value: 687.66,
      type: "crypto",
    },
    usd: {
      name: "US Dollar",
      unit: "$",
      value: 88567.672,
      type: "fiat",
    },
    aed: {
      name: "United Arab Emirates Dirham",
      unit: "DH",
      value: 325264.778,
      type: "fiat",
    },
    ars: {
      name: "Argentine Peso",
      unit: "$",
      value: 126771545.834,
      type: "fiat",
    },
    aud: {
      name: "Australian Dollar",
      unit: "A$",
      value: 133344.919,
      type: "fiat",
    },
    bdt: {
      name: "Bangladeshi Taka",
      unit: "৳",
      value: 10835880.475,
      type: "fiat",
    },
    bhd: {
      name: "Bahraini Dinar",
      unit: "BD",
      value: 33392.049,
      type: "fiat",
    },
    bmd: {
      name: "Bermudian Dollar",
      unit: "$",
      value: 88567.672,
      type: "fiat",
    },
    brl: {
      name: "Brazil Real",
      unit: "R$",
      value: 481754.999,
      type: "fiat",
    },
    cad: {
      name: "Canadian Dollar",
      unit: "CA$",
      value: 122475.806,
      type: "fiat",
    },
    chf: {
      name: "Swiss Franc",
      unit: "Fr.",
      value: 71201.943,
      type: "fiat",
    },
    clp: {
      name: "Chilean Peso",
      unit: "CLP$",
      value: 81648766.166,
      type: "fiat",
    },
    cny: {
      name: "Chinese Yuan",
      unit: "¥",
      value: 626182.303,
      type: "fiat",
    },
    czk: {
      name: "Czech Koruna",
      unit: "Kč",
      value: 1840746.226,
      type: "fiat",
    },
    dkk: {
      name: "Danish Krone",
      unit: "kr.",
      value: 568152.764,
      type: "fiat",
    },
    eur: {
      name: "Euro",
      unit: "€",
      value: 76062.891,
      type: "fiat",
    },
    gbp: {
      name: "British Pound Sterling",
      unit: "£",
      value: 66370.134,
      type: "fiat",
    },
    gel: {
      name: "Georgian Lari",
      unit: "₾",
      value: 238689.878,
      type: "fiat",
    },
    hkd: {
      name: "Hong Kong Dollar",
      unit: "HK$",
      value: 689490.475,
      type: "fiat",
    },
    huf: {
      name: "Hungarian Forint",
      unit: "Ft",
      value: 28778304.716,
      type: "fiat",
    },
    idr: {
      name: "Indonesian Rupiah",
      unit: "Rp",
      value: 1478154602.956,
      type: "fiat",
    },
    ils: {
      name: "Israeli New Shekel",
      unit: "₪",
      value: 286565.133,
      type: "fiat",
    },
    inr: {
      name: "Indian Rupee",
      unit: "₹",
      value: 7967414.99,
      type: "fiat",
    },
    jpy: {
      name: "Japanese Yen",
      unit: "¥",
      value: 13759873.64,
      type: "fiat",
    },
    krw: {
      name: "South Korean Won",
      unit: "₩",
      value: 130531036.117,
      type: "fiat",
    },
    kwd: {
      name: "Kuwaiti Dinar",
      unit: "KD",
      value: 27186.644,
      type: "fiat",
    },
    lkr: {
      name: "Sri Lankan Rupee",
      unit: "Rs",
      value: 27318224.649,
      type: "fiat",
    },
    mmk: {
      name: "Burmese Kyat",
      unit: "K",
      value: 185965542.499,
      type: "fiat",
    },
    mxn: {
      name: "Mexican Peso",
      unit: "MX$",
      value: 1609682.025,
      type: "fiat",
    },
    myr: {
      name: "Malaysian Ringgit",
      unit: "RM",
      value: 364101.702,
      type: "fiat",
    },
    ngn: {
      name: "Nigerian Naira",
      unit: "₦",
      value: 128496132.369,
      type: "fiat",
    },
    nok: {
      name: "Norwegian Krone",
      unit: "kr",
      value: 895135.755,
      type: "fiat",
    },
    nzd: {
      name: "New Zealand Dollar",
      unit: "NZ$",
      value: 153310.907,
      type: "fiat",
    },
    php: {
      name: "Philippine Peso",
      unit: "₱",
      value: 5222393.09,
      type: "fiat",
    },
    pkr: {
      name: "Pakistani Rupee",
      unit: "₨",
      value: 24829692.869,
      type: "fiat",
    },
    pln: {
      name: "Polish Zloty",
      unit: "zł",
      value: 321737.924,
      type: "fiat",
    },
    rub: {
      name: "Russian Ruble",
      unit: "₽",
      value: 6802368.543,
      type: "fiat",
    },
    sar: {
      name: "Saudi Riyal",
      unit: "SR",
      value: 332392.084,
      type: "fiat",
    },
    sek: {
      name: "Swedish Krona",
      unit: "kr",
      value: 832580.407,
      type: "fiat",
    },
    sgd: {
      name: "Singapore Dollar",
      unit: "S$",
      value: 114739.42,
      type: "fiat",
    },
    thb: {
      name: "Thai Baht",
      unit: "฿",
      value: 2821861.175,
      type: "fiat",
    },
    try: {
      name: "Turkish Lira",
      unit: "₺",
      value: 3766428.94,
      type: "fiat",
    },
    twd: {
      name: "New Taiwan Dollar",
      unit: "NT$",
      value: 2771194.001,
      type: "fiat",
    },
    uah: {
      name: "Ukrainian hryvnia",
      unit: "₴",
      value: 3718161.418,
      type: "fiat",
    },
    vef: {
      name: "Venezuelan bolívar fuerte",
      unit: "Bs.F",
      value: 8868.281,
      type: "fiat",
    },
    vnd: {
      name: "Vietnamese đồng",
      unit: "₫",
      value: 2334677008.978,
      type: "fiat",
    },
    zar: {
      name: "South African Rand",
      unit: "R",
      value: 1499122.999,
      type: "fiat",
    },
    xdr: {
      name: "IMF Special Drawing Rights",
      unit: "XDR",
      value: 62038.82,
      type: "fiat",
    },
    xag: {
      name: "Silver - Troy Ounce",
      unit: "XAG",
      value: 1516.573,
      type: "commodity",
    },
    xau: {
      name: "Gold - Troy Ounce",
      unit: "XAU",
      value: 21.099,
      type: "commodity",
    },
    bits: {
      name: "Bits",
      unit: "μBTC",
      value: 1000000,
      type: "crypto",
    },
    sats: {
      name: "Satoshi",
      unit: "sats",
      value: 100000000,
      type: "crypto",
    },
    cop: {
      name: "Colombian Peso",
      unit: "$",
      value: 336483390.014,
      type: "fiat",
    },
    kes: {
      name: "Kenyan Shilling",
      unit: "KSh",
      value: 11456419.857,
      type: "fiat",
    },
    ron: {
      name: "Romanian Leu",
      unit: "lei",
      value: 387271.003,
      type: "fiat",
    },
    dop: {
      name: "Dominican Peso",
      unit: "RD$",
      value: 5672904.908,
      type: "fiat",
    },
    crc: {
      name: "Costa Rican Colón",
      unit: "₡",
      value: 43262877.387,
      type: "fiat",
    },
    hnl: {
      name: "Honduran Lempira",
      unit: "L",
      value: 2332653.364,
      type: "fiat",
    },
    zmw: {
      name: "Zambian Kwacha",
      unit: "ZK",
      value: 2047630.727,
      type: "fiat",
    },
    svc: {
      name: "Salvadoran Colón",
      unit: "₡",
      value: 774990.866,
      type: "fiat",
    },
    bam: {
      name: "Bosnia and Herzegovina Convertible Mark",
      unit: "KM",
      value: 148731.957,
      type: "fiat",
    },
    pen: {
      name: "Peruvian Sol",
      unit: "S/",
      value: 297707.21,
      type: "fiat",
    },
    gtq: {
      name: "Guatemalan Quetzal",
      unit: "Q",
      value: 678411.717,
      type: "fiat",
    },
    lbp: {
      name: "Lebanese Pound",
      unit: "ل.ل",
      value: 7931884838.424,
      type: "fiat",
    },
    amd: {
      name: "Armenian Dram",
      unit: "֏",
      value: 33741901.27,
      type: "fiat",
    },
  },
};
