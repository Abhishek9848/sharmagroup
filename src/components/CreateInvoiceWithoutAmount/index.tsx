
"use client";

import { useEffect, useState } from "react";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";
import InputGroup from "../FormElements/InputGroup";
import WorkDetailsRow from "./workDetailsRow";
import toast from "react-hot-toast";
import FullScreenLoader from "../ui/loader";
import { doGet, doPost } from "@/services/network.service";

const CreateInvoiceWithoutAmount = () => {
  const initialWorkDetails = [
    {
      date: '',
      vehicleNo: '',
      challanNo: '',
      containerNo: '',
      from: '',
      to: '',
      amount: '',
      isExtraCharges: false,
      extraCharges: [] as { name: string; amount: string }[],
    },
  ];
  const [billingDate, setBillingDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [total, setTotal] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [workDetails, setWorkDetails] = useState(initialWorkDetails);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let currentError = "";
    for (const row of workDetails) {
      if (!row.amount || Number(row.amount) <= 0) {
        currentError = "Amount should be greater than 0";
        break;
      }
    }

    if (currentError) {
      toast.error(currentError);
      return;
    }
    console.log(JSON.stringify({
      billingDate,
      invoiceNumber,
      clientName,
      trips: workDetails,
      total,
      advance,
      grandTotal,
    }))
    try {
      setLoading(true)
      const response = await doPost("/invoice/create", {
        billingDate,
        invoiceNumber,
        clientName,
        trips: workDetails,
        total,
        advance,
        grandTotal,
      });
      if (response.success === true) {
        await handleReset()
        toast.success(response.message)
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
  };
  const handleReset = async () => {
    setWorkDetails(initialWorkDetails)
    setBillingDate('')
    setInvoiceNumber('')
    setClientName('')
    setTotal(0)
    setAdvance(0)
    setGrandTotal(0)
  }
  useEffect(() => {
    let totalAmount = 0;

    workDetails.forEach((work) => {
      const base = Number(work.amount) || 0;
      const extras = work.extraCharges?.reduce(
        (sum, c) => sum + (Number(c.amount) || 0),
        0
      );
      totalAmount += base + extras;
    });

    setTotal(totalAmount);
    setGrandTotal(totalAmount - advance);
  }, [workDetails, advance]);
  useEffect(() => {
    async function getInvoiceNumber() {
      try {
        setLoading(true)
        const res = await doGet('invoice/invoiceNumber');
        if (res.success === true) {
          setInvoiceNumber(res.data)
          setLoading(false)
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
    getInvoiceNumber()
  }, [invoiceNumber])
  return (
    <>
      <FullScreenLoader loading={loading} color="#4F46E5" size={80} />
      <div className="w-full max-w-full rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-5">
        <form onSubmit={handleSubmit} onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <DatePickerOne
              name="invoiceDate"
              label="Invoice Date"
              defaultValue={billingDate}
              onChange={(val) => setBillingDate(val)}
            />
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="clientName"
              label="M/S"
              placeholder=""
              height="sm"
              value={clientName}
              handleChange={(e) => setClientName(e.target.value)}
            />
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="invoiceNumber"
              label="Invoice Number"
              placeholder=""
              height="sm"
              value={invoiceNumber}
              handleChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </div>
          <WorkDetailsRow
            rows={workDetails}
            setRows={setWorkDetails}
          />
          <div className="flex justify-start mt-3 gap-3">
            <button
              className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
              type="button"
            >
              Cancel
            </button>

            <button
              className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateInvoiceWithoutAmount;
