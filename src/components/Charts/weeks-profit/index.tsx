import { PeriodPicker } from "@/components/period-picker";
import { cn } from "@/lib/utils";
import { getWeeksProfitData } from "@/services/charts.services";
import { InvoiceOverviewChart } from "./chart";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

export function InvoiceOverview({ className }: PropsType) {
  const data =  getWeeksProfitData("timeFrame");

  return (
    <div
      className={cn(
        "rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Invoice Overview
        </h2>
      </div>

      <InvoiceOverviewChart data={data} />
    </div>
  );
}
