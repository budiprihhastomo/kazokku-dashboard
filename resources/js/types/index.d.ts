import { Config } from 'ziggy-js';
import { ExchangeRateRequest } from './exchange-rate';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        roles: string[]
    };
    ziggy: Config & { location: string };
};

export type DashboardInertiaProps = {
    currencySymbol: Record<string, string>
    exchangeRates: ExchangeRateRequest
}

export type LaravelPaginationProps<T> = {
    current_page: number
    data: T[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: string[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: string
    to: number
    total: number
}