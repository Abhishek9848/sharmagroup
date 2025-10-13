"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DataTable } from "@/components/Tables/table";
import { doGet } from "@/services/network.service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
const [invoices, setInvoices] = useState([])
const [fetch, setFetch] = useState(0)
const [loading, setLoading] = useState(false)
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
  useEffect(() => {
    async function getInvoice() {
        try {
            setLoading(true)
            const res = await doGet('interiors/invoice/all', {});
            console.log("Response out: ", res)
            if (res.success === true) {
              console.log("Response: ", res)
              // const data = transformGridData(res.data)
              setInvoices(res.data)
            }
            setLoading(false)
        } catch (error: any) {
          setLoading(false)
          if (error.response) {
            const message =
            (error.response?.data as { message?: string })?.message ||
            "Something went wrong";
            return toast.error(message);
          }
          toast.error("Internal server error")
        }
        }
    getInvoice()
}, [fetch])
  return (
    <>
      <Breadcrumb pageName="View Invoices" />

      <DataTable data={invoices} columns={columns} actions={actions} />
    </>
  );
};

export default ViewInvoicePage;
