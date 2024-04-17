import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DashboardInertiaProps, PageProps } from "@/types";
import { ExchangeCard } from "@/Components/ExchangeCard";
import { Label } from "@/Components/ui/label";
import { Header } from "@/Components/Header";

export default function Dashboard({
    exchangeRates,
    currencySymbol,
}: PageProps<DashboardInertiaProps>) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <Header />
            <div className="container py-14">
                <div className="grid w-full items-center gap-1.5 relative">
                    <div className="flex justify-between items-center">
                        <Label
                            htmlFor="exchange-list"
                            className="text-md font-bold"
                        >
                            Exchange Rates
                        </Label>
                    </div>
                    <div id="exchange-list" className="grid grid-cols-2 gap-5">
                        {Object.entries(exchangeRates.rates).map(
                            ([key, value]) => (
                                <ExchangeCard
                                    key={key}
                                    rate={Number(value)}
                                    code={key}
                                    countryCode={key
                                        .substring(0, 2)
                                        .toLowerCase()}
                                    name={currencySymbol[key]}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
