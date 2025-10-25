"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

type PropsType = {
  data: {
    received: { x: string; y: number }[];
  };
};

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function PaymentsOverviewChart({ data }: PropsType) {
  const isMobile = useIsMobile();

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 300,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "inherit",
    },
    stroke: { curve: "smooth", width: isMobile ? 2 : 3 },
    colors: ["#5750F1"], // Primary color
    fill: {
      gradient: { opacityFrom: 0.5, opacityTo: 0 },
    },
    tooltip: {
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },
    xaxis: {
      type: "category",
      categories: data.received.map((d) => d.x),
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },
    grid: { strokeDashArray: 5 },
    dataLabels: { enabled: false },
    responsive: [
      { breakpoint: 1024, options: { chart: { height: 280 } } },
      { breakpoint: 1366, options: { chart: { height: 300 } } },
    ],
  };

  return (
    <div className="w-full h-[300px]">
      <Chart
        options={options}
        series={[{ name: "Total", data: data.received }]}
        type="area"
        height={300}
      />
    </div>
  );
}
