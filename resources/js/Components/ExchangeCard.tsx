import { CircleFlag } from "react-circle-flags";
import { Badge } from "@/Components/ui/badge";
import { ExchangeRateProps } from "@/types/exchange-rate";

export const ExchangeCard = ({
    name = "Currency Name",
    code = "Currency Code",
    rate = 0.0,
    countryCode = "",
}: Partial<ExchangeRateProps>) => {
    return (
        <div className="bg-white rounded-md p-5 flex flex-col space-y-4 shadow-md">
            <div className="flex justify-between">
                <CircleFlag countryCode={countryCode} className="w-10 h-10" />
                <div className="relative">
                    <Badge className="bg-yellow-400 hover:bg-yellow-500 text-yellow-800 text-xs">
                        {rate.toFixed(2)}
                    </Badge>
                </div>
            </div>
            <div id="exchange-desc" className="flex flex-col space-y-0.5">
                <p className="font-bold">{code}</p>
                <p className="text-sm text-slate-500">{name}</p>
            </div>
        </div>
    );
};
