
"use client";

import { useEffect, useState, useRef } from "react";
import DatePickerOne, { DatePickerOneRef } from "../FormElements/DatePicker/DatePickerOne";
import DateRangePicker, { DateRangePickerRef } from "../FormElements/DatePicker/DateRangePicker";
import InputGroup from "../FormElements/InputGroup";
import WorkDetailsRow from "./workDetailsRow";
import { doPost } from "@/services/network.service";
import toast from "react-hot-toast";
import FullScreenLoader from "../ui/loader";

const AddInvoice = () => {
  const initialWorkDetails = [
    {
      productDescription: '',
      sacCode: '',
      uom: '',
      quantity: '',
      rate: '',
      amount: '',
      igst: '',
      total: ''
    }
  ]
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [typeOfWork, setTypeOfWork] = useState("");
  const [range, setRange] = useState("");
  const [total, setTotal] = useState(0);
  const [totalIgst, setTotalIgst] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [roundOff, setRoundOff] = useState(0);
  const [workDetails, setWorkDetails] = useState(initialWorkDetails);
  const [loading, setLoading] = useState(false);
  const rangePickerRef = useRef<DateRangePickerRef>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let currentError = "";
    for (const row of workDetails) {
      if (!row.total || Number(row.total) <= 0) {
        currentError = "Grand Total should be greater than 0";
        break;
      }
      if (!row.igst || Number(row.igst) <= 0) {
        currentError = "IGST should be greater than 0";
        break;
      }
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
      invoiceDate,
      invoiceNumber,
      measurementPeriod: range,
      typeOfWork,
      workDetails,
      total,
      totalIgst,
      roundOff,
      grandTotal,
    }))
    try {
      setLoading(true)
      const response = await doPost("/interiors/invoice/create", {
        invoiceDate,
        invoiceNumber,
        measurementPeriod: range,
        typeOfWork,
        workDetails,
        total,
        totalIgst,
        roundOff,
        grandTotal,
      });
      if (response.success === true) {
        setWorkDetails(initialWorkDetails)
        setInvoiceDate('')
        setInvoiceNumber('')
        setTypeOfWork('')
        setRange("")
        rangePickerRef.current?.clear();
        setTotal(0)
        setTotalIgst(0)
        setGrandTotal(0)
        setRoundOff(0)
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
  const suggestions = [
    "Labour Charge For Fire Rated Door Fixing",
    "Aluminium Framing Work",
    "SC Installation - Fire Door",
    "Labour For Making Of Frames",
    "L Acoustic Insulation, Frame & Rock Work",
    "P/F Commercial Ply 19MM Thick-SPA",
    "Gypsum Board False Ceiling",
    "L Ceiling- Wooden ceiling in MDF",
    "L Korean Cladding",
    "SC- Aluminium Panel Glazing",
    "Fire Partition System",
    "SC Partly Panelled/Glazed MDF Board",
    "L- Installing Alum, Perforated Sheet",
    "L- Installing Alum, Perforated Sheet",
    "L Furniture-Slotted angle rack in M2",
    "SC Furniture Board Room Counter",
    "Fixing of Gypsum Board F/C With Frame",
    "L-Wire Mesh Shifting, Lifting & Fixing",
    "L-Extra Shuttering for Circular Column",
  ];
  console.log(JSON.stringify({
    invoiceDate,
    invoiceNumber,
    measurementPeriod: range,
    typeOfWork,
    workDetails,
    total,
    totalIgst,
    roundOff,
    grandTotal,
  }))
  useEffect(() => {
    let totalAmount = 0;
    let totalIgstAmount = 0;

    workDetails.forEach((work) => {
      totalAmount += Number(work.amount) || 0;
      totalIgstAmount += Number(work.igst) || 0;
    });

    const grandTotal = totalAmount + totalIgstAmount;
    const roundedGrandTotal = Math.round(grandTotal);
    const roundOff = +(Math.abs(roundedGrandTotal - grandTotal).toFixed(2));

    setTotal(totalAmount);
    setTotalIgst(totalIgstAmount);
    setGrandTotal(roundedGrandTotal);
    setRoundOff(roundOff);
  }, [workDetails]);

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
              defaultValue={invoiceDate}
              onChange={(val) => setInvoiceDate(val)}
            />
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="invoiceNumber"
              label="Invoice Number"
              placeholder=""
              value={invoiceNumber}
              handleChange={(e) => setInvoiceNumber(e.target.value)}
            />
            <DateRangePicker
              ref={rangePickerRef}
              name="invoiceNumber"
              label="Measurement Period"
              defaultValue={range}
              onChange={(val) => setRange(val)}
            />
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="typeOfWork"
              label="Type of Work"
              placeholder=""
              height="sm"
              value={typeOfWork}
              handleChange={(e) => setTypeOfWork(e.target.value)}
            />
          </div>
          <WorkDetailsRow
            suggestions={suggestions}
            rows={workDetails}
            setRows={setWorkDetails}
          />
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="total"
              label=""
              disabled
              defaultValue="Total"
              placeholder=""
            />
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="totlaValue"
              label=""
              placeholder=""
              height="sm"
              value={`${total}`}
              handleChange={(e) => setTotal(+e.target.value)}
            />
          </div>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="totalgst"
              label=""
              placeholder=""
              height="sm"
              disabled
              defaultValue="Total IGST"
            />
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="totalgst"
              label=""
              placeholder=""
              value={`${totalIgst}`}
              handleChange={(e) => setTotalIgst(+e.target.value)}
            />
          </div>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="roundOff"
              label=""
              placeholder=""
              height="sm"
              disabled
              defaultValue="Round Off"
            />
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="roundOffValue"
              label=""
              placeholder=""
              value={`${roundOff}`}
              handleChange={(e) => setRoundOff(+e.target.value)}
            />
          </div>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="grandtotal"
              label=""
              placeholder=""
              height="sm"
              disabled
              defaultValue="Grand Total"
            />
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="totalgst"
              label=""
              placeholder=""
              value={`${grandTotal}`}
              handleChange={(e) => setGrandTotal(+e.target.value)}
            />
          </div>
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

export default AddInvoice;
