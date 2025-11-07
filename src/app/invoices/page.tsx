"use client";
import { useEffect, useRef, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DataTable } from "@/components/Tables/table";
import FullScreenLoader from "@/components/ui/loader";
import { doGet } from "@/services/network.service";
import toast from "react-hot-toast";
import { FiEye, FiDownload, FiCheckCircle } from "react-icons/fi";
import preview from "./preview";
import download from "./download";
import { MdOutlineEditCalendar } from "react-icons/md";
import { compactFormat } from "@/lib/format-number";
import InputGroup from "@/components/FormElements/InputGroup";
import DatePickerOne, { DatePickerOneRef } from "@/components/FormElements/DatePicker/DatePickerOne";
import UpdateInvoiceModal from "./UpdateInvoiceModal";
import MarkAsPaidModal from "./MarkAsPaidModal";

type ExtraCharge = {
  name: string;
  amount: string;
};

type Trip = {
  date: string;
  vehicleNo: string;
  challanNo: string;
  containerNo: string;
  from: string;
  to: string;
  amount: string;
  isExtraCharges: boolean;
  extraCharges: ExtraCharge[];
};

type Invoice = {
  _id: string;
  invoiceNumber: string;
  clientName: string;
  billingDate: string;
  total: number;
  advance: number;
  grandTotal: number;
  trips: Trip[];
  paidOn: string;
  paidAmount: number;
  isPaid: boolean;
  invoice: {
    content: string;
    fileName: string;
    encoding: string;
  };
};

export type Column<T> = {
  key: keyof T | "actions";
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

const ViewInvoicePage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [fetch, setFetch] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [markAsPaidModal, setMarkAsPaidModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const actions = [
    {
      icon: FiEye,
      tooltip: "View",
      onClick: async (row: Invoice) =>
        await preview(row.invoice.content, row.invoice.fileName),
    },
    {
      icon: FiDownload,
      tooltip: "Download",
      color: "text-green-500",
      onClick: async (row: Invoice) =>
        await download(row.invoice.content, row.invoice.fileName),
    },
    {
      icon: FiCheckCircle,
      tooltip: "Mark as Paid",
      color: "text-yellow-500",
      onClick: (row: Invoice) => {
        setSelectedInvoice(row);
        setMarkAsPaidModal(true)
      },
    },
    {
      icon: MdOutlineEditCalendar,
      tooltip: "Update Invoice",
      color: "text-blue-600",
      onClick: (row: Invoice) => {
        setSelectedInvoice(row);
        setOpen(true);
      },
    },
  ];
  const filters = {
  fields: [
    { type: "date" as const, name: "fromDate", label: "From", value: from, onChange: setFrom },
    { type: "date" as const, name: "toDate", label: "To", value: to, onChange: setTo },
    { type: "text" as const, name: "invoiceNumber", label: "Invoice Number", value: invoiceNumber, onChange: setInvoiceNumber },
  ],
  onSearch: getInvoice,
  onReset: () => {
    setFrom("");
    setTo("");
    setInvoiceNumber("");
  },
};


  const columns: Column<Invoice>[] = [
    { key: "billingDate", label: "Invoice Date", sortable: true },
    { key: "invoiceNumber", label: "Invoice Number", sortable: true },
    {
      key: "grandTotal",
      label: "Amount",
      sortable: true,
      render: (row) => compactFormat(row.grandTotal || 0),
    },
    {
      key: "isPaid",
      label: "Status",
      render: (row) => (
        <div
          className={`px-3 py-1 rounded-lg text-sm font-medium w-fit ${
            row.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {row.isPaid ? "Paid" : "Unpaid"}
        </div>
      ),
    },
    { key: "paidOn", label: "Payment Date", sortable: true },
    {
      key: "paidAmount",
      label: "Paid Amount",
      sortable: true,
      render: (row) => compactFormat(row.paidAmount || 0),
    },
    { key: "actions", label: "Actions" },
  ];

  async function getInvoice() {
    setLoading(true);
    try {
      let newFrom  = from;
      let newTo = to;
      if (from) {
        const [day, month, year] = from.split("-");
        newFrom = new Date(+year, +month, +day).toISOString().split("T")[0];
      }
  
      if (to) {
        const [day, month, year] = to.split("-");
        newTo = new Date(+year, +month, +day).toISOString().split("T")[0];
      }
      const res = await doGet("invoice/fetchby", { from : newFrom, to : newTo, invoiceNumber });

      if (res.success) {
        const formattedData = res.data.map((invoice: Invoice) => ({
          ...invoice,
          billingDate: invoice.billingDate
            ? new Date(invoice.billingDate)
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                .replace(",", "")
            : "",
            paidOn: invoice.paidOn
            ? new Date(invoice.paidOn)
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                .replace(",", "")
            : "",
        }));

        setInvoices(formattedData);
        filters.onReset();
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getInvoice() {
    setLoading(true);
    try {
      let newFrom  = from;
      let newTo = to;
      if (from) {
        const [day, month, year] = from.split("-");
        newFrom = new Date(+year, +month, +day).toISOString().split("T")[0];
      }
  
      if (to) {
        const [day, month, year] = to.split("-");
        newTo = new Date(+year, +month, +day).toISOString().split("T")[0];
      }
      const res = await doGet("invoice/fetchby", { from : newFrom, to : newTo, invoiceNumber });

      if (res.success) {
        const formattedData = res.data.map((invoice: Invoice) => ({
          ...invoice,
          billingDate: invoice.billingDate
            ? new Date(invoice.billingDate)
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                .replace(",", "")
            : "",
            paidOn: invoice.paidOn
            ? new Date(invoice.paidOn)
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                .replace(",", "")
            : "",
        }));

        setInvoices(formattedData);
        filters.onReset();
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }
    getInvoice();
  }, [fetch]);

  return (
    <div>
      <FullScreenLoader loading={loading} color="#4F46E5" size={80} />
      <Breadcrumb pageName="View Invoices" />
      {/* Table */}
      <DataTable
        data={invoices}
        columns={columns}
        actions={actions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filters = {filters}
      />
      {open &&
        <UpdateInvoiceModal
          isOpen={open}
          onClose={() => {
            setOpen(false)
            setFetch(fetch+1)
          }}
          invoice={selectedInvoice}
        />}
        {markAsPaidModal &&
        <MarkAsPaidModal
          isOpen={markAsPaidModal}
          onClose={() => {
            setMarkAsPaidModal(false)
            setFetch(fetch+1)
          }}
          invoice={selectedInvoice}
        />}
    </div>
  );
};

export default ViewInvoicePage;
