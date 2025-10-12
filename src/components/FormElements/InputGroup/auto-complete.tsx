"use client";

import { useState, useEffect, useRef } from "react";

type AutocompleteInputProps = {
  label?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  suggestions: string[];
  onSelect?: (value: string) => void;
};

export default function AutocompleteInput({
  placeholder = "",
  id,
  required,
  label,
  suggestions,
  onSelect,
}: AutocompleteInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown on outside click
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (value: string) => {
    setInputValue(value);
    const results = suggestions.filter((s) =>
      s.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(results);
    setShowDropdown(true);
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    setShowDropdown(false);
    onSelect?.(value);
  };
  return (
    <div ref={wrapperRef} className="relative">
      <label
        htmlFor={id}
        className="text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
        {required && <span className="ml-1 select-none text-red">*</span>}
      </label>
      <div
        className="relative mt-3 [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2"
      >
        <input
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          placeholder={placeholder}
          className="w-[250px] h-12 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 dark:bg-dark-2 dark:text-white"
        />

        {showDropdown && filtered.length > 0 && (
          <ul className="fixed z-50 mt-1 max-h-48 w-[250px] overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:bg-gray-800 dark:border-gray-600">
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
