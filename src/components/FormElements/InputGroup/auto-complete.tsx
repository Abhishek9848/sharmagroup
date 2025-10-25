"use client";

import { useState, useEffect, useRef } from "react";

type AutocompleteInputProps = {
  label?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  suggestions: string[];
  onSelect?: (value: string) => void;
};

export default function AutocompleteInput({
  placeholder = "",
  id,
  required,
  label,
  value,
  suggestions,

  onSelect,
}: AutocompleteInputProps) {
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Handle input typing
  const handleChange = (value: string) => {

    if (!value) {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }

    const results = suggestions.filter((s) =>
      s.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(results);
    setShowDropdown(results.length > 0);
    onSelect?.(value);
  };

  // Handle selection from dropdown
  const handleSelect = (value: string) => {  // update input
    setFiltered([]);        // clear filtered list
    setShowDropdown(false); // close dropdown
    onSelect?.(value);      // notify parent
  };

  return (
    <div ref={wrapperRef} className="relative w-full sm:w-[250px]">
      {label && (
        <label
          htmlFor={id}
          className="text-body-sm font-medium text-dark dark:text-white"
        >
          {label}
          {required && <span className="ml-1 select-none text-red">*</span>}
        </label>
      )}
      <div className="relative mt-3">
        <input
          id={id}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => filtered.length > 0 && setShowDropdown(true)}
          placeholder={placeholder}
          className="w-full h-12 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 dark:bg-dark-2 dark:text-white"
        />

        {showDropdown && filtered.length > 0 && (
          <ul className="absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:bg-gray-800 dark:border-gray-600">
            {filtered.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(item)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
