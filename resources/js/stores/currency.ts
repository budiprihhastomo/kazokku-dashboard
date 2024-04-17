import { create } from "zustand";

type CurrencyStore = {
    baseCurrency: string
    changeBaseCurrency: (currency: string) => void
}

export const useCurrencyStore = create<CurrencyStore>()((set) => ({
    baseCurrency: "EUR",
    changeBaseCurrency: (currency) => set(() => ({ baseCurrency: currency }))
}))