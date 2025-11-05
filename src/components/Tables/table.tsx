"use client";
import React, { useState, useMemo, Dispatch, SetStateAction } from "react";
import { FiChevronDown, FiChevronUp, FiTrash2, FiEdit2, FiEye } from "react-icons/fi";
import FilterSection from "./FilterSection";
import { FilterField } from "./types";

export type Column<T> = {
  key: keyof T | "actions";
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

type FilterConfig = {
  fields: FilterField[];
  onSearch: () => void;
  onReset: () => void;
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
  rowsPerPage?: number;
  currentPage?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  filters?:FilterConfig
};

export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  searchPlaceholder = "Search...",
  rowsPerPage = 20,
  currentPage = 1,
  setCurrentPage,
  filters
}: DataTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Sorting logic
  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredData = useMemo(() => {
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
        const strA = valA?.toString().toLowerCase() ?? "";
        const strB = valB?.toString().toLowerCase() ?? "";
        if (strA < strB) return sortOrder === "asc" ? -1 : 1;
        if (strA > strB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, sortColumn, sortOrder, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, rowsPerPage]);

  // Selection
  const toggleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((_, i) => i));
    }
  };

  const toggleRow = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 overflow-x-auto border border-gray-100">
      {/* Search bar */}
      
      {filters && (
        <FilterSection
          fields={filters.fields}
          onSearch={filters.onSearch}
          onReset={filters.onReset}
        />
      )}

      {/* Table */}
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">
              <input
                type="checkbox"
                checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                onChange={toggleSelectAll}
                className="accent-blue-600 cursor-pointer"
              />
            </th>
            {columns.map((col) => (
              <th
                key={col.key as string}
                onClick={() => col.sortable && handleSort(col.key as keyof T)}
                className={`px-6 py-3 text-left font-medium ${
                  col.sortable ? "cursor-pointer select-none" : ""
                }`}
                style={{ width: col.width }}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortColumn === col.key && (
                    sortOrder === "asc" ? (
                      <FiChevronUp size={14} />
                    ) : (
                      <FiChevronDown size={14} />
                    )
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(idx)}
                    onChange={() => toggleRow(idx)}
                    className="accent-blue-600 cursor-pointer"
                  />
                </td>
                {columns.map((col) => (
                  <td key={col.key as string} className="px-4 py-4 whitespace-nowrap" style={{ width: col.width }} >
                    {col.key === "actions" && actions ? (
                      <div className="flex space-x-3 justify-end">
                        {actions.map((action, i) => {
                          const Icon = action.icon;
                          return (
                            <button
                              key={i}
                              onClick={() => action.onClick(row)}
                              className={`${action.color || "text-gray-600"} hover:opacity-80`}
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
              <td
                colSpan={columns.length + 1}
                className="text-center py-6 text-gray-400 italic"
              >
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          onClick={() => setCurrentPage?.((p: number) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-full border disabled:opacity-50"
        >
          ‹
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage?.(i + 1)}
            className={`px-3 py-1 rounded-full ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage?.((p: number) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-full border disabled:opacity-50"
        >
          ›
        </button>
      </div>
    </div>
  );
};
