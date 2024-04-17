import { string } from "zod";

export interface ExchangeRateProps {
    rate: number;
    code: string;
    name: string;
    countryCode: string;
}

export interface ExchangeRate extends Record<string, number> { }

export interface ExchangeRateRequest extends Record<string, unknown> {
    rates: ExchangeRate[]
    base: string
    date: Date
}