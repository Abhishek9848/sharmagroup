"use client";

import { Calendar } from "@/components/Layouts/sidebar/icons";
import flatpickr from "flatpickr";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

type DatePickerOneProps = {
  name: string;
  label?: string;
  onChange?: (value: string) => void;
  defaultValue?: string; // use this to control or clear externally
};

export type DatePickerOneRef = {
  clear: () => void;
};

const DatePickerOne = forwardRef<DatePickerOneRef, DatePickerOneProps>(
  ({ name, label, onChange, defaultValue }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const pickerRef = useRef<flatpickr.Instance | null>(null);

    // Expose clear method to parent
    useImperativeHandle(ref, () => ({
      clear: () => pickerRef.current?.clear(),
    }));

    // Initialize flatpickr once
    useEffect(() => {
      if (inputRef.current) {
        pickerRef.current = flatpickr(inputRef.current, {
          mode: "single",
          monthSelectorType: "static",
          dateFormat: "d-m-Y",
          defaultDate: defaultValue || undefined,
          onChange: (selectedDates, dateStr) => {
            if (onChange) onChange(dateStr);
          },
        });

        return () => pickerRef.current?.destroy();
      }
    }, [onChange]);

    // ✅ Reactively update when defaultValue changes (for reset)
    useEffect(() => {
      if (!pickerRef.current) return;
      if (defaultValue) pickerRef.current.setDate(defaultValue, true);
      else pickerRef.current.clear();
    }, [defaultValue]);

    return (
      <div>
        {label && (
          <label
            htmlFor={name}
            className="mb-3.5 block text-body-sm font-medium text-dark dark:text-white"
          >
            {label}
          </label>
        )}
        <div className="relative w-[220px]">
          <input
            ref={inputRef}
            id={name}
            name={name}
            className="form-datepicker w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-2.5 font-normal outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
            placeholder="Select date"
            readOnly
          />
          <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
            <Calendar className="size-5 text-[#9CA3AF]" />
          </div>
        </div>
      </div>
    );
  }
);

DatePickerOne.displayName = "DatePickerOne";
export default DatePickerOne;
