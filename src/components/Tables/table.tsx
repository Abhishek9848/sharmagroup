"use client";
import React, { useState, useMemo } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export type Column<T> = {
  key: keyof T | "actions";
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  actions?: {
    icon: React.ElementType;
    tooltip?: string;
    onClick: (row: T) => void;
    color?: string;
  }[];
  searchPlaceholder?: string;
};

export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  searchPlaceholder = "Search...",
}: DataTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  // Sorting
  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedData = useMemo(() => {
    let filtered = data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    if (sortColumn) {
      filtered.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, sortColumn, sortOrder, searchTerm]);

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="border p-2 rounded w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                onClick={() => col.sortable && handleSort(col.key as keyof T)}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  col.sortable ? "cursor-pointer select-none" : ""
                }`}
              >
                <div className="flex items-center">
                  {col.label}
                  {col.sortable && sortColumn === col.key && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? (
                        <FiChevronUp size={14} />
                      ) : (
                        <FiChevronDown size={14} />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.length > 0 ? (
            sortedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                {columns.map((col) => (
                  <td key={col.key as string} className="px-6 py-4 whitespace-nowrap">
                    {col.key === "actions" && actions ? (
                      <div className="flex space-x-2">
                        {actions.map((action, i) => {
                          const Icon = action.icon;
                          return (
                            <button
                              key={i}
                              className={`${action.color || "text-blue-500"} hover:opacity-80`}
                              onClick={() => action.onClick(row)}
                              title={action.tooltip}
                            >
                              <Icon size={18} />
                            </button>
                          );
                        })}
                      </div>
                    ) : col.render ? (
                      col.render(row)
                    ) : (
                      row[col.key as keyof T]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
