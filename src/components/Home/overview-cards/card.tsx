"use client";

import React, { SVGProps } from "react"; // ✅ Import React
import CountUp from "react-countup";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons"; // import IconType

type PropsType = {
  label: string;
  data: {
    value: number | string;
    subText?: string;
    progress?: number;
  };
  Icon: IconType
  iconColor?: string;
  textColor?: string;
};

export function OverviewCard({ label, data, Icon, iconColor = "text-blue-500" , textColor = "text-blue-500" }: PropsType) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-all dark:bg-gray-dark">
      <div className="flex items-center justify-between">
        <Icon className={cn("h-6 w-6", iconColor)} />
        {data.subText && <span className="text-xs text-gray-400 dark:text-gray-300">{data.subText}</span>}
      </div>

      <div className="mt-4">
        <dt className={`text-2xl font-bold dark:text-white ${textColor}`}>
          {typeof data.value === "number" ? (
            <CountUp end={data.value} duration={1.5} separator="," prefix="₹" />
          ) : (
            data.value
          )}
        </dt>
        <dd className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dd>
      </div>

      {data.progress !== undefined && (
        <div className="mt-4 h-1 w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="h-1 bg-green-500 rounded-full"
            style={{ width: `${data.progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
