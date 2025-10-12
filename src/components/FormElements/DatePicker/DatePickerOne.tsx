"use client";

import { Calendar } from "@/components/Layouts/sidebar/icons";
import flatpickr from "flatpickr";
import { useEffect, useRef } from "react";

type DatePickerOneProps = {
  name: string;
  label?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
};

const DatePickerOne = ({ name, label, onChange, defaultValue }: DatePickerOneProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const picker = flatpickr(inputRef.current, {
        mode: "single",
        monthSelectorType: "static",
        dateFormat: "d-m-Y", // ✅ Good format for saving in DB / form
        defaultDate: defaultValue || undefined,
        onChange: (selectedDates, dateStr) => {
          if (onChange) {
            onChange(dateStr);
          }
        },
      });

      return () => picker.destroy();
    }
  }, [onChange, defaultValue]);

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          {label}
        </label>
      )}
      <div className="relative w-[220px]">
        <input
          ref={inputRef}
          id={name}
          name={name}
          className="form-datepicker w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
          placeholder="Select date"
        />
        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
          <Calendar className="size-5 text-[#9CA3AF]" />
        </div>
      </div>
    </div>
  );
};

export default DatePickerOne;
