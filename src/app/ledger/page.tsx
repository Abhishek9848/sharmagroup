"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DataTable } from "@/components/Tables/table";
import FullScreenLoader from "@/components/ui/loader";
import { doGet } from "@/services/network.service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Ledger = {
  id: string;
  date: string;
  name: string;
  transactionType: string;
  amount: number;
};
export type Column<T> = {
  key: keyof T | "actions"; // <-- allow actions explicitly
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

const ViewLedgerPage = () => {
const [ledgers, setLedgers] = useState([])
const [fetch, setFetch] = useState(0)
const [currentPage, setCurrentPage] = useState(1);
const [loading, setLoading] = useState(false)

  const columns: Column<Ledger>[] = [
    { key: "date", label: "Date", sortable: true },
    { key: "name", label: "Particulars", sortable: true },
    {
      key: "transactionType",
      label: "Transaction Type",
      sortable: true,
      render: (row) => (
        <div
          className={`px-3 py-1 rounded-lg text-sm font-medium w-fit ${
            row.transactionType === "CREDIT"
              ? "bg-green-100 text-green-700"
              : row.transactionType === "DEBIT"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {row.transactionType}
        </div>
      ),
    },
    { key: "amount", label: "Amount", sortable: true },
    { key: "actions", label: "Actions" },
  ];
  useEffect(() => {
    async function getInvoice() {
        try {
            setLoading(true)
            const res = await doGet('interiors/ledger/search', {});
            if (res.success === true) {
              const formattedData = (res.data as Ledger[]).map((ledger) => ({
                ...ledger,
                date: ledger.date ? new Date(ledger.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
              }).replace(',', '') : undefined,
              }));
              setLedgers(formattedData as [])
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
      <FullScreenLoader loading={loading} color="#4F46E5" size={80} />
      <Breadcrumb pageName="Ledger" />
      <DataTable
        data={ledgers}
        columns={columns}
        currentPage = {currentPage}
        setCurrentPage= {setCurrentPage}
      />
    </>
  );
};

export default ViewLedgerPage;
