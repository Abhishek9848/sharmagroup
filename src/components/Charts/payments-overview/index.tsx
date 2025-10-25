"use client";

import { PeriodPicker } from "@/components/period-picker";
import { standardFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import { PaymentsOverviewChart } from "./chart";

type PaymentData = {
  month: string;
  total: number;
};

type PropsType = {
  timeFrame?: string;
  className?: string;
  chartData: PaymentData[]; // coming from parent
};

export function PaymentsOverview({
  timeFrame = "monthly",
  className,
  chartData,
}: PropsType) {
  // Transform for chart
  const data = chartData.map((d) => ({
    x: d.month.split(" ")[0],
    y: d.total,
  }));

  // Total payments
  const totalPayments = chartData.reduce((acc, cur) => acc + cur.total, 0);

  return (
    <div
      className={cn(
        "grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Payments Overview
        </h2>
      </div>

      <PaymentsOverviewChart data={{ received: data }} />

      <dl className="grid divide-stroke text-center dark:divide-dark-3 sm:grid-cols-1 [&>div]:flex [&>div]:flex-col-reverse [&>div]:gap-1 mt-4">
        <div>
          <dt className="text-xl font-bold text-dark dark:text-white">
            ₹{standardFormat(totalPayments)}
          </dt>
          <dd className="font-medium dark:text-dark-6">Total Amount</dd>
        </div>
      </dl>
    </div>
  );
}
