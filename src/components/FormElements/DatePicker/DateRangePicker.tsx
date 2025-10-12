"use client";

import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import type { Instance as FlatpickrInstance } from "flatpickr/dist/types/instance";
import { Calendar } from "@/components/Layouts/sidebar/icons";
import "flatpickr/dist/flatpickr.min.css";

type DateRangePickerProps = {
  name: string;
  label?: string;
  onChange?: (value: string) => void;  // 📅 Returns the full date range string
  defaultValue?: string;
};

const DateRangePicker = ({ name, label, onChange, defaultValue }: DateRangePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fpRef = useRef<FlatpickrInstance | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;
  
    // Destroy previous instance
    fpRef.current?.destroy();
  
    fpRef.current = flatpickr(inputRef.current, {
      mode: "range",
      altInput: false,
      dateFormat: "d-m-Y",
      defaultDate: defaultValue ? defaultValue.split(" to ") : undefined,
      monthSelectorType: "static",
      allowInput: false,   // prevents early closing
      clickOpens: true,    // allows opening by click       // keeps calendar fixed
      onChange: (_, dateStr) => {
        onChange?.(dateStr);
      },
    });
  
    return () => fpRef.current?.destroy();
  }, [defaultValue, onChange]);

  return (
    <div className="w-[560px] relative">
      {label && (
        <label
          htmlFor={name}
          className="mb-3.5 block text-body-sm font-medium text-dark dark:text-white"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          id={name}
          name={name}
          placeholder="Select date range"
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 pr-12 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
        />
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <Calendar className="w-5 h-5 text-[#9CA3AF]" />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
