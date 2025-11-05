"use client";
import React, { useRef } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import DatePickerOne, { DatePickerOneRef } from "@/components/FormElements/DatePicker/DatePickerOne";
import { FilterConfig, FilterField } from "./types";

type FilterSectionProps = FilterConfig;

const FilterSection = ({ fields, onSearch, onReset }: FilterSectionProps) => {
    // Keep refs for all date fields for easy reset

    const handleReset = () => {
        fields.forEach((field) => {
            if (field.onChange) {
                field.onChange("");
            }
        });
        onReset?.();
    };

    return (
        <div className="mb-5.5 flex flex-wrap items-end justify-between gap-5">
            <div className="flex flex-wrap gap-5">
                {fields.map((field) =>
                field.type === "text" ? (
                    <InputGroup
                        type="text"
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        value={field.value}
                        height="sm"
                        placeholder={`Enter ${field.label}`}
                        handleChange={(e) => field.onChange(e.target.value)}
                    />
                ) : (
                    <DatePickerOne
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        defaultValue={field.value}
                        onChange={(val) => field.onChange(val)}
                    />
                )
            )}
            </div>
            <div className="flex gap-3">
                <button
                    onClick={onSearch}
                    className="rounded-lg bg-primary px-8 py-2 font-medium text-white hover:bg-opacity-90"
                >
                    Search
                </button>
                <button
                    onClick={handleReset}
                    className="rounded-lg border border-stroke px-6 py-2 font-medium text-dark hover:shadow-1"
                >
                    Reset
                </button>
            </div>

        </div>
    );
};

export default FilterSection;
