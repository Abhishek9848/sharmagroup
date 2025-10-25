"use client";

import React, { useRef, useState } from 'react'
import FullScreenLoader from '../ui/loader';
import toast from 'react-hot-toast';
import { doPost } from '@/services/network.service';
import DatePickerOne, { DatePickerOneRef } from "../FormElements/DatePicker/DatePickerOne";
import InputGroup from '../FormElements/InputGroup';
import AutocompleteInput from '../FormElements/InputGroup/auto-complete';

const AddAccount = () => {
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState('')
    const [name, setName] = useState('')
    const [transactionType, setTransactionType] = useState('')
    const [reason, setReason] = useState('')
    const [amount, setAmount] = useState(0)
    const datePickerRef = useRef<DatePickerOneRef>(null);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let currentError = "";
          if (!amount || amount <= 0) {
            currentError = "Amount should be greater than 0";
          }
    
        if (currentError) {
          toast.error(currentError);
          return;
        }
        console.log(JSON.stringify({
          date,
          name,
          transactionType,
          reason,
          amount
        }))
        try {
          setLoading(true)
          const response = await doPost("/interiors/ledger/create", {
            date,
            name,
            reason,
            transactionType,
            amount
          });
          if (response.success === true) {
            setDate("")
            setName('')
            setReason('')
            datePickerRef.current?.clear();
            setTransactionType('')
            setAmount(0)
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
    return (
        <>
          <FullScreenLoader loading={loading} color="#4F46E5" size={80} />
          <div className="w-full max-w-full rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-5">
            <form onSubmit={handleSubmit} onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <DatePickerOne
                  ref={datePickerRef}
                  name="invoiceDate"
                  label="Invoice Date"
                  defaultValue={date}
                  onChange={(val) => setDate(val)}
                />
                <InputGroup
                  className="w-full sm:w-1/2"
                  type="text"
                  name="Name"
                  required
                  label="On Account of"
                  placeholder=""
                  value={name}
                  handleChange={(e) => setName(e.target.value)}
                />
                <InputGroup
                  className="w-full sm:w-1/2"
                  type="text"
                  name="reason"
                  label="Reason"
                  placeholder=""
                  value={reason}
                  handleChange={(e) => setReason(e.target.value)}
                />
                <AutocompleteInput
                    id={`typeOfTransaction`}
                    label="Type"
                    suggestions={["CREDIT", "DEBIT"]}
                    value={transactionType}
                    onSelect={(value) => setTransactionType(value)}
                />
                <InputGroup
                  className="w-full sm:w-1/2"
                  type="text"
                  name="amount"
                  label="Amount"
                  placeholder=""
                  required
                  height="sm"
                  value={`${amount}`}
                  handleChange={(e) => setAmount(+e.target.value)}
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
}

export default AddAccount
