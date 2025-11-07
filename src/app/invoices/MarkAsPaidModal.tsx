"use client";

import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import InputGroup from "@/components/FormElements/InputGroup";
import FullScreenLoader from "@/components/ui/loader";
import toast from "react-hot-toast";
import { doPut } from "@/services/network.service";
import { createPortal } from "react-dom";

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
};

type MarkAsPaidModalProps = {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
};

const MarkAsPaidModal = ({ isOpen, onClose, invoice }: MarkAsPaidModalProps) => {
  const [loading, setLoading] = useState(false);
    const [paidAmount, setAmount] = useState(0)
  useEffect(() => {
    if (invoice) {
        setAmount(invoice.grandTotal|| 0)
    }
  }, [invoice]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const payload = {
        id: invoice?._id,
        paidOn: new Date(),
        paidAmount,
        isPaid: true,
        isFullyPaid: paidAmount === invoice?.grandTotal
      };
      const res = await doPut(`/invoice/update/${invoice?._id}`, payload);
      if (res.status) {
        toast.success("Invoice updated successfully");
        onClose();
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  if (!invoice) return null;
  return createPortal(
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        onClick={onClose}
      >
        <div
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-lg dark:bg-gray-dark"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
          >
            <MdClose size={22} />
          </button>
          <h2 className="mb-4 text-center text-xl font-semibold">
            Mark Invoice as Paid
          </h2>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <InputGroup
              type="text"
              name="invoiceNumber"
              label="Invoice Number"
              value={invoice.invoiceNumber}
              disabled
              placeholder=""
              handleChange={() => {}}
            />
            <InputGroup
              type="text"
              name="clientName"
              label="Client Name"
              value={invoice.clientName}
              disabled
              placeholder=""
              handleChange={() => {}}
            />
          </div>
          <div className="mb-6 gap-4">
            <InputGroup
              type="number"
              name="paidAmount"
              label="Paid Amount"
              value={`${invoice.grandTotal}`}
              placeholder=""
            handleChange={(e) => setAmount(+e.target.value)}
            />
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-2 mt-5 text-white hover:bg-blue-700"
            >
              Mark as Paid
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default MarkAsPaidModal;
