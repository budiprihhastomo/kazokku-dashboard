export interface CurrencySymbol {
    code: string;
    name: string;
    countryCode: string;
}

export interface RawCurrencySymbol extends Record<string, string> { }