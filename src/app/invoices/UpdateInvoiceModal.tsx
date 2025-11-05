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

type UpdateInvoiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
};

const UpdateInvoiceModal = ({ isOpen, onClose, invoice }: UpdateInvoiceModalProps) => {
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
console.log("trips-->>", trips)
  useEffect(() => {
    if (invoice) {
      setTrips(invoice.trips || []);
      setTotal(invoice.total || 0);
      setGrandTotal(invoice.grandTotal || 0);
    }
  }, [invoice]);

  const handleAmountChange = (index: number, value: string) => {
    const updated = [...trips];
    updated[index].amount = value;
    setTrips(updated);
  };

  const handleExtraAmountChange = (i: number, j: number, value: string) => {
    const updated = [...trips];
    updated[i].extraCharges[j].amount = value;
    setTrips(updated);
  };

  useEffect(() => {
    const newTotal = trips.reduce((sum, trip) => {
      const base = Number(trip.amount) || 0;
      const extras = trip.extraCharges?.reduce((a, b) => a + Number(b.amount || 0), 0) || 0;
      return sum + base + extras;
    }, 0);
    setTotal(newTotal);
    setGrandTotal(newTotal - (invoice?.advance || 0));
  }, [trips]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const payload = {
        id: invoice?._id,
        trips,
        total,
        grandTotal,
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
      <FullScreenLoader loading={loading} color="#4F46E5" size={80} />
      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40"
        onClick={onClose}
      >
        <div
          className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white p-6 shadow-lg dark:bg-gray-dark"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
          >
            <MdClose size={22} />
          </button>
          <h2 className="mb-4 text-center text-xl font-semibold">
            Update Invoice
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

          <div className="space-y-4">
            {trips.map((trip, i) => (
              <div
                key={i}
                className="rounded-lg border bg-gray-50 p-4 dark:bg-gray-800"
              >
                <div className="flex items-center justify-between text-sm font-medium">
                  <div>
                    <p className="mb-1">Date</p>
                    {trip.date
                      ? new Date(trip.date)
                          .toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                          .replace(",", "")
                      : ""}
                  </div>
                  <div>
                    <p className="mb-1">Vehicle Number</p>
                    {trip.vehicleNo}
                  </div>
                  <div>
                    <p className="mb-1">Container Number</p>
                    {trip.containerNo}
                  </div>
                  <div>
                    <p className="mb-1">Challan Number</p>
                    {trip.challanNo}
                  </div>
                  <InputGroup
                     key={i}
                    className="mt-[-10px]"
                    type="number"
                    name="amount"
                    placeholder=""
                    value={trip.amount}
                    handleChange={(e) => handleAmountChange(i, e.target.value)}
                  />
                </div>

                {trip.isExtraCharges && trip.extraCharges.length > 0 && (
                  <div className="mt-3 space-y-2" key={i}>
                    <p className="font-medium text-gray-600">Extra Charges:</p>
                    {trip.extraCharges.map((ex, j) => (
                     <div className="flex items-center justify-between text-sm font-medium">
                     <p>{ex.name}</p>
                     <InputGroup
                        key={j}
                        className="mt-[-10px]"
                        type="number"
                        name={`extra-${j}`}
                        placeholder=""
                        value={ex.amount}
                        handleChange={(e) =>
                          handleExtraAmountChange(i, j, e.target.value)
                        }
                      />
                     </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <div>
              <p className="font-medium text-gray-700">Total: ₹{total}</p>
              <p className="text-sm text-gray-500">
                Advance: ₹{invoice.advance}
              </p>
              <p className="font-semibold text-gray-800">
                Grand Total: ₹{grandTotal}
              </p>
            </div>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default UpdateInvoiceModal;
