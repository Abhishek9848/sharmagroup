"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DataTable } from "@/components/Tables/table";
import FullScreenLoader from "@/components/ui/loader";
import { doGet } from "@/services/network.service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiDownload, FiCheckCircle } from "react-icons/fi";
import preview from "./preview";
import download from "./download";
import { compactFormat } from "@/lib/format-number";
type Invoice = {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  typeOfWork: string;
  grandTotal: number;
  totalIgst: number;
  isPaid: Boolean;
  invoice: {
    content: string,
    fileName: string,
    encoding: string
  }
};
export type Column<T> = {
  key: keyof T | "actions"; // <-- allow actions explicitly
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

const ViewInvoicePage = () => {
  const [invoices, setInvoices] = useState([])
  const [fetch, setFetch] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  console.log("setCurrentPage", setCurrentPage)
  const actions = [
    { icon: FiEye, tooltip: "View", onClick: async (row: Invoice) => { await preview(row.invoice.content, row.invoice.fileName) } },
    { icon: FiDownload, tooltip: "Download", color: "text-green-500", onClick: async (row: Invoice) => { await download(row.invoice.content, row.invoice.fileName) } },
    { icon: FiCheckCircle, tooltip: "Mark as Paid", onClick: (row: Invoice) => console.log("Update", row), color: "text-yellow-500" },
  ];
  const columns: Column<Invoice>[] = [
    { key: "invoiceNumber", label: "Invoice Number", sortable: true },
    { key: "invoiceDate", label: "Invoice Date", sortable: true },
    { key: "typeOfWork", label: "Type of Work", sortable: true },
    { key: "isPaid", label: "Status", render: (row) => (
      <div
        className={`px-3 py-1 rounded-lg text-sm font-medium w-fit ${
          row.isPaid
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.isPaid ? "Paid": "Unpaid"}
      </div>
    )},
    { key: "grandTotal", label: "Grand Total", sortable: true, render: (row) => `${compactFormat(row.grandTotal)}` },
    { key: "totalIgst", label: "GST", sortable: true, render: (row) => `${compactFormat(row.totalIgst)}` },
    { key: "actions", label: "Actions" },
  ];
  async function getInvoice() {
    try {
      setLoading(true)
      const res = await doGet('interiors/invoice/all', {});
      if (res.success === true) {
        const formattedData = (res.data as Invoice[]).map((invoice) => ({
          ...invoice,
          invoiceDate: invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }).replace(',', '') : undefined,
        }));
        setInvoices(formattedData as [])
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
  useEffect(() => {
    getInvoice()
  }, [fetch])
  return (
    <div className="">
      <FullScreenLoader loading={loading} color="#4F46E5" size={80} />
      <Breadcrumb pageName="View Invoices" />
      <DataTable
        data={invoices}
        columns={columns}
        actions={actions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ViewInvoicePage;
