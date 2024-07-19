export interface ExchangeProps {
  name: string
  logo: React.ReactNode
}

export const exchanges: ExchangeProps[] = [
  {
    name: "Binance",
    logo: <img src="/img/exchange/binance.svg" loading="lazy" alt="Binance" />
  },
  {
    name: "Bybit",
    logo: <img src="/img/exchange/bybit.svg" loading="lazy" alt="Bybit" />
  },
  {
    name: "OKX",
    logo: <img src="/img/exchange/okx.svg" loading="lazy" alt="OKX" />
  }
]
