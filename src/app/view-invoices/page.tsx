"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DataTable } from "@/components/Tables/table";
import { FiEye, FiDownload, FiEdit } from "react-icons/fi";
type Invoice = {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  typeOfWork: string;
  grandTotal: number;
};
export type Column<T> = {
  key: keyof T | "actions"; // <-- allow actions explicitly
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

const ViewInvoicePage = () => {

  const invoices: Invoice[] = [
    { id: "1", invoiceNumber: "INV001", invoiceDate: "2025-10-12", typeOfWork: "Painting", grandTotal: 1500 },
    { id: "2", invoiceNumber: "INV002", invoiceDate: "2025-10-10", typeOfWork: "Renovation", grandTotal: 2500 },
  ];
  const actions = [
    { icon: FiEye, tooltip: "View", onClick: (row: Invoice) => console.log("View", row) },
    { icon: FiDownload, tooltip: "Download", onClick: (row: Invoice) => console.log("Download", row), color: "text-green-500" },
    { icon: FiEdit, tooltip: "Update", onClick: (row: Invoice) => console.log("Update", row), color: "text-yellow-500" },
  ];
  const columns: Column<Invoice>[] = [
    { key: "invoiceNumber", label: "Invoice Number", sortable: true },
    { key: "invoiceDate", label: "Invoice Date", sortable: true },
    { key: "typeOfWork", label: "Type of Work", sortable: true },
    { key: "grandTotal", label: "Grand Total", sortable: true, render: (row) => row.grandTotal.toFixed(2) },
    { key: "actions", label: "Actions" },
  ];
  return (
    <>
      <Breadcrumb pageName="View Invoices" />

      <DataTable data={invoices} columns={columns} actions={actions} />
    </>
  );
};

export default ViewInvoicePage;
