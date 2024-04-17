import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { PropsWithChildren } from "react";
import { Separator } from "./ui/separator";
import { CircleFlag } from "react-circle-flags";
import { CurrencySymbol } from "@/types/currency-symbol";
import { useCurrencyStore } from "@/stores/currency";

interface CurrencyItemProps extends Partial<CurrencySymbol> {
    disabled: boolean;
    selected: boolean;
    onClick: (code: string) => void;
}

const CurrencyOption = ({
    code = "COD",
    name = "Currency Name",
    countryCode = "",
    disabled = false,
    selected = false,
    onClick,
}: CurrencyItemProps) => {
    return (
        <Button
            asChild
            variant={"ghost"}
            className="items-start h-20 m-0"
            onClick={() => !disabled && onClick(code)}
        >
            <div
                className={`flex flex-col ${disabled && "opacity-50"} ${
                    disabled && "bg-slate-100"
                } ${selected && "bg-blue-200"} hover:bg-blue-100`}
            >
                <div className="flex flex-dir space-x-5">
                    <CircleFlag
                        countryCode={countryCode}
                        className="h-10 w-10"
                    />
                    <div id="currency-item">
                        <p className="font-bold text-md">{code}</p>
                        <p className="text-md text-slate-500">{name}</p>
                    </div>
                </div>
            </div>
        </Button>
    );
};

export const ChangeCurrencyDialog = ({
    children,
    currencySymbols,
    open,
    setOpen,
}: PropsWithChildren<{
    currencySymbols: CurrencySymbol[];
    open: boolean;
    setOpen: (open: boolean) => void;
}>) => {
    const { baseCurrency, changeBaseCurrency } = useCurrencyStore();

    const onChangeBaseCurrency = (currency: string) => {
        changeBaseCurrency(currency);

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Change Base Currency</DialogTitle>
                </DialogHeader>
                <Separator />
                <div className="w-full max-h-72 flex flex-col space-y-2 overflow-y-scroll">
                    {currencySymbols.map((currencySymbol) => (
                        <CurrencyOption
                            key={currencySymbol.code}
                            {...currencySymbol}
                            disabled={currencySymbol.code !== "EUR"}
                            selected={currencySymbol.code === baseCurrency}
                            onClick={onChangeBaseCurrency}
                        />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};
