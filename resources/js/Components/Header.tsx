import { CircleFlag } from "react-circle-flags";
import { Label } from "@/Components/ui/label";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { ChangeCurrencyDialog } from "@/Components/ChangeCurrency";
import axios from "axios";
import { CurrencySymbol, RawCurrencySymbol } from "@/types/currency-symbol";
import { useCurrencyStore } from "@/stores/currency";

export const Header = (): ReactElement => {
    const [currencySymbols, setCurrencySymbols] = useState<CurrencySymbol[]>(
        []
    );
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const { baseCurrency } = useCurrencyStore();

    useEffect(() => {
        requestCurrencySymbol();
    }, []);

    const requestCurrencySymbol = async () => {
        const request = await axios.get<RawCurrencySymbol>(
            route("currency.symbols")
        );

        const currencySymbols = Object.entries(
            request.data
        ).map<CurrencySymbol>(([code, name]) => ({
            code,
            name,
            countryCode: code.substring(0, 2).toLocaleLowerCase(),
        }));

        setCurrencySymbols(currencySymbols);
    };

    const handleInputAmount = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            isNaN(Number(e.key)) &&
            e.key !== "Backspace" &&
            e.key !== "Delete" &&
            e.key !== "ArrowLeft" &&
            e.key !== "ArrowRight"
        ) {
            e.preventDefault();
        }
    };

    const changeOpenDialog = (state: boolean) => {
        setShowDialog(state);
    };

    return (
        <div className="container lg:px-[172px] lg:min-w-full flex bg-blue-600 justify-center">
            <div id="header" className="w-full pt-10">
                <p className="text-white font-bold text-2xl max-w-sm py-4">
                    Check Currency Exchange Rate in Real Time
                </p>
                <div className="grid w-full items-center gap-1.5 -bottom-8 relative">
                    <Label htmlFor="currency-amount" className="text-white">
                        Select Currency and Input Amount
                    </Label>
                    <div
                        id="currency-amount"
                        className="bg-white rounded-md h-16 flex shadow-md"
                    >
                        <ChangeCurrencyDialog
                            currencySymbols={currencySymbols}
                            open={showDialog}
                            setOpen={changeOpenDialog}
                        >
                            <Button
                                asChild
                                variant={"ghost"}
                                className="rounded-l-md hover:rounded-none hover:rounded-l-md"
                            >
                                <div
                                    id="country-input"
                                    className="flex justify-center items-center h-full w-full px-4 space-x-2 hover:cursor-pointer"
                                >
                                    <CircleFlag
                                        className="h-6"
                                        countryCode={baseCurrency
                                            .substring(0, 2)
                                            .toLocaleLowerCase()}
                                    />
                                    <p className="text-sm font-bold">
                                        {baseCurrency}
                                    </p>
                                </div>
                            </Button>
                        </ChangeCurrencyDialog>
                    </div>
                </div>
            </div>
        </div>
    );
};
