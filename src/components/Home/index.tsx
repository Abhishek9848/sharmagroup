"use client";

import { useEffect, useState } from "react";
import { doGet } from "@/services/network.service";
import toast from "react-hot-toast";
import { OverviewCardsSkeleton } from "./overview-cards/skeleton";
import { OverviewCardsGroup } from "./overview-cards";
import { compactFormat } from "@/lib/format-number";
import { BiCalculator, BiDollarCircle } from "react-icons/bi";
import { RiWallet3Line } from "react-icons/ri";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsCashCoin, BsFileEarmarkText } from "react-icons/bs";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { PaymentsOverview } from "../Charts/payments-overview";
import { InvoiceOverview } from "../Charts/weeks-profit";

type Props = {
  paymentsOverviewTimeFrame?: string;
  weeksProfitTimeFrame?: string;
};
export default function HomePage({
  paymentsOverviewTimeFrame,
  weeksProfitTimeFrame,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await doGet("/interiors/dashboard");

        if (response.success) {
          setData(response.data);
          console.log("data -->>", response.data)
        } else {
          toast.error(response.message || "Failed to fetch dashboard data");
        }
      } catch (error: any) {
        console.error("Dashboard fetch error:", error);
        const message =
          error?.response?.data?.message || "Internal Server Error";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      {/* Top Overview Cards */}
      <div className="text-lg font-semibold text-gray-700  px-3 py-2 rounded-lg mb-3 bg-white dark:bg-black dark:text-white">
        Summary
      </div>
      {loading ? (
        <OverviewCardsSkeleton />
      ) : (
        <OverviewCardsGroup
          cards =  {[
              {
                label: "Total Invoice Amount",
                value: `₹${compactFormat(data?.summary?.totalGrand || 0)}`,
                Icon: BsCashCoin,
                iconColor: "text-blue-500",
                textColor: "text-gray-900",
                subText: "",
              },
              {
                label: "Total GST Paid",
                value: `₹${compactFormat(data?.summary?.totalIgst || 0)}`,
                Icon: BiDollarCircle,
                iconColor: "text-green-500",
                textColor: "text-gray-900",
                subText: "",
              },
              {
                label: "Total Paid Amount",
                value: `₹${compactFormat(data?.ledger?.totalCredit || 0)}`,
                Icon: RiWallet3Line,
                iconColor: "text-yellow-500",
                textColor: "text-gray-900",
                subText: "",
              },
              {
                label: "Profit / Loss",
                value: `₹${compactFormat(data?.ledger?.balance || 0)}`,
                Icon: data?.ledger?.balance >= 0 ? AiOutlineArrowUp : AiOutlineArrowDown,
                iconColor: data?.ledger?.balance >= 0 ? "text-green-500" : "text-red-500", // ✅ Dynamic color
                textColor: data?.ledger?.balance >= 0 ? "text-green-500" : "text-red-500", // ✅ Dynamic color
                subText: "",
              },
            ]}
        />
      )}
      <div className="text-lg font-semibold text-gray-700  px-3 py-2 rounded-lg my-3 bg-white dark:bg-black dark:text-white">
        Invoice Summary
      </div>
      {loading ? (
        <OverviewCardsSkeleton />
      ) : (
        <OverviewCardsGroup
          cards =  {[
              {
                label: "Total Invoice",
                value: `${compactFormat(data?.summary?.totalInvoices || 0)}`,
                Icon: BsFileEarmarkText,
                iconColor: "text-blue-500",
                textColor: "text-gray-900",
                subText: "",
              },
              {
                label: "Paid Invoices",
                value: `${compactFormat(data?.summary?.totalPaid || 0)}`,
                Icon: FaFileInvoiceDollar,
                iconColor: "text-green-500",
                textColor: "text-gray-900",
                subText: "",
              },
              {
                label: "Unpaid Invoices",
                value: `₹${compactFormat(data?.summary?.unpaidInvoices || 0)}`,
                Icon: MdOutlinePendingActions,
                iconColor: "text-yellow-500",
                textColor: "text-gray-900",
                subText: "",
              },
              {
                label: "Total Amount Without GST",
                value: `₹${compactFormat(data?.summary?.totalAmount || 0)}`,
                Icon:  BiCalculator,
                iconColor:  "text-green-500",
                textColor:  "text-green-500",
                subText: "",
              },
            ]}
        />
      )}
      {/* Charts Section */}
      <div className="mt-4 grid gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        <PaymentsOverview chartData={data?.trends || []} />
        <InvoiceOverview
          // data = {data?.trends || []}
        />
      </div>
    </>
  );
}
