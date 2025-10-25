"use client";
import React, { useState, useMemo, Dispatch, SetStateAction } from "react";
import { FiChevronDown, FiChevronUp, FiTrash2, FiEdit2, FiEye } from "react-icons/fi";

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
  rowsPerPage?: number;
  currentPage?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
};

export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  searchPlaceholder = "Search...",
  rowsPerPage = 20,
  currentPage = 1,
  setCurrentPage
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
    <div className="bg-white shadow-md rounded-xl p-4 overflow-hidden border border-gray-100">
      {/* Search bar */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 ml-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
            Add User
          </button>
          <button className="border px-4 py-2 rounded-lg hover:bg-gray-100 text-sm">
            Export CSV
          </button>
        </div>
      </div>

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
                  <td key={col.key as string} className="px-6 py-4 whitespace-nowrap">
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
