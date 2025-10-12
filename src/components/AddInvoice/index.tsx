
"use client";

import { useState } from "react";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";
import DateRangePicker from "../FormElements/DatePicker/DateRangePicker";
import InputGroup from "../FormElements/InputGroup";
import AutocompleteInput from "../FormElements/InputGroup/auto-complete";
import { TextAreaGroup } from "../FormElements/InputGroup/text-area";
import WorkDetailsRow from "./workDetailsRow";

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
  const [workDetails, setWorkDetails] = useState(initialWorkDetails);
  console.log("workDetails", workDetails)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      invoiceDate,
      invoiceNumber,
      range,
      typeOfWork,
    })
  };
  const suggestions = [
    "New Delhi",
    "Mumbai",
    "Chennai",
    "Kolkata",
    "Pune",
    "Bangalore",
  ];
  return (
    <>
      <div className="w-full max-w-full rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-5">
      <form onSubmit={handleSubmit}>
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
          suggestions = {suggestions}
          rows = {workDetails}
          setRows = {setWorkDetails}
        />
        {/* <div className="mb-5.5 flex flex-col gap-3.5 sm:flex-row">
            <AutocompleteInput
            id="productDescriptions"
            label="Product Descriptions"
            suggestions={suggestions}
            onSelect={handleProductDescription}
            />
            <InputGroup
            width="w-20"
            type="text"
            name="sacCode"
            label="Sac Code"
            placeholder=""
            height="sm"
            handleChange={(e) => setTypeOfWork(e.target.value)}
          />
            <InputGroup
            width="w-15"
            type="text"
            name="uom"
            label="UOM"
            placeholder=""
            height="sm"
            handleChange={(e) => setTypeOfWork(e.target.value)}
          />
            <InputGroup
            width="w-25"
            type="text"
            name="quantity"
            label="Quantity"
            placeholder=""
            height="sm"
            handleChange={(e) => setTypeOfWork(e.target.value)}
          />
            <InputGroup
            width="w-25"
            type="text"
            name="rate"
            label="Rate"
            placeholder=""
            height="sm"
            handleChange={(e) => setTypeOfWork(e.target.value)}
          />
            <InputGroup
            width="w-35"
            type="text"
            name="amount"
            label="Amount"
            placeholder=""
            height="sm"
            handleChange={(e) => setTypeOfWork(e.target.value)}
          />
            <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="igst"
            label="IGST"
            placeholder=""
            height="sm"
            handleChange={(e) => setTypeOfWork(e.target.value)}
          />
            <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="total"
            label="Total"
            placeholder=""
            height="sm"
            handleChange={(e) => setTypeOfWork(e.target.value)}
          />
        </div> */}
        <div className="flex justify-end gap-3">
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
            Save
          </button>
        </div>
      </form>
      </div>
    </>
  );
};

export default AddInvoice;
