
"use client";

import { useEffect, useState } from "react";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";
import DateRangePicker from "../FormElements/DatePicker/DateRangePicker";
import InputGroup from "../FormElements/InputGroup";
import WorkDetailsRow from "./workDetailsRow";
import { doPost } from "@/services/network.service";
import toast from "react-hot-toast";

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
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("workDetails", workDetails)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    workDetails.map((row) => {
      if(errors) return;
      if (!row.total || Number(row.total) <= 0) setErrors("Grand Total should be greater than 0");
      if (!row.igst || Number(row.igst) <= 0) setErrors("IGST should be greater than 0");
      if (!row.amount || Number(row.amount) <= 0) setErrors("Amount should be greater than 0");
    });
    if(errors){
      console.log("error-->>", errors)
      toast.error(errors)
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
        grandTotal,
      });
      if (response.success === true) {
        setWorkDetails(initialWorkDetails)
        setInvoiceDate('')
        setInvoiceNumber('')
        setTypeOfWork('')
        setRange("")
        setTotal(0)
        setTotalIgst(0)
        setGrandTotal(0)
        setRoundOff(0)
        setErrors("")
        setLoading(false)
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
    "New Delhi",
    "Mumbai",
    "Chennai",
    "Kolkata",
    "Pune",
    "Bangalore",
  ];
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
      <div className="w-full max-w-full rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-5">
        <form onSubmit={handleSubmit} onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <DatePickerOne
              name="invoiceDate"
              label="Invoice Date"
              onChange={(val) => setInvoiceDate(val)}
            />
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="invoiceNumber"
              label="Invoice Number"
              placeholder=""
              handleChange={(e) => setInvoiceNumber(e.target.value)}
            />
            <DateRangePicker
              name="invoiceNumber"
              label="Measurement Period"
              onChange={(val) => setRange(val)}
            />
            <InputGroup
              className="w-full sm:w-1/2"
              type="text"
              name="typeOfWork"
              label="Type of Work"
              placeholder=""
              height="sm"
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
              defaultValue={`${total}`}
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
              defaultValue={`${totalIgst}`}
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
              defaultValue={`${roundOff}`}
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
              defaultValue={`${grandTotal}`}
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
