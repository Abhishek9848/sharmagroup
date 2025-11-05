import { Dispatch, SetStateAction, useRef } from "react";
import InputGroup from "../FormElements/InputGroup";
import { MdDelete, MdOutlineAdd } from "react-icons/md";
import DatePickerOne, { DatePickerOneRef } from "../FormElements/DatePicker/DatePickerOne";
import SwitcherThree from "../FormElements/Switchers/SwitcherThree";

// ---------------- Types ----------------
type ExtraCharge = {
  name: string;
  amount: string;
};

type RowType = {
  date: string;
  vehicleNo: string;
  containerNo: string;
  challanNo: string;
  isExtraCharges: boolean;
  extraCharges: ExtraCharge[];
  from: string;
  to: string;
  amount: string;
};

type WorkDetailsRowProps = {
  rows: RowType[];
  setRows: Dispatch<SetStateAction<RowType[]>>;
};

// ---------------- Component ----------------
const WorkDetailsRow = ({ rows, setRows }: WorkDetailsRowProps) => {
  const datePickerRefs = useRef<DatePickerOneRef[]>([]);

  // ---------------- Unified Row Change Handler ----------------
  function handleRowChange(rowIndex: number, field: keyof RowType, value: any): void;
  function handleRowChange(rowIndex: number, field: keyof ExtraCharge, value: any, extraIndex: number): void;
  function handleRowChange(
    rowIndex: number,
    field: keyof RowType | keyof ExtraCharge,
    value: any,
    extraIndex?: number
  ): void {
    const updatedRows = [...rows];

    if (typeof extraIndex === "number") {
      // Nested extra charge field update
      const extraCharges = [...updatedRows[rowIndex].extraCharges];
      const updatedExtra = { ...extraCharges[extraIndex], [field]: value };
      extraCharges[extraIndex] = updatedExtra;
      updatedRows[rowIndex].extraCharges = extraCharges;
    } else if (field === "isExtraCharges") {
      // Switch toggle
      updatedRows[rowIndex].isExtraCharges = value;

      if (value && updatedRows[rowIndex].extraCharges.length === 0) {
        updatedRows[rowIndex].extraCharges = [{ name: "", amount: "" }];
      } else if (!value) {
        updatedRows[rowIndex].extraCharges = [];
      }
    } else {
      // Normal row-level update
      updatedRows[rowIndex] = { ...updatedRows[rowIndex], [field]: value };
    }

    setRows(updatedRows);
  }

  // ---------------- Helper functions ----------------
  const addRow = () => {
    setRows([
      ...rows,
      {
        date: "",
        vehicleNo: "",
        challanNo: "",
        containerNo: "",
        from: "",
        to: "",
        amount: "",
        isExtraCharges: false,
        extraCharges: [],
      },
    ]);
  };

  const removeRow = (index: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
      datePickerRefs.current.splice(index, 1);
    }
  };

  const addExtraField = (rowIndex: number) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].extraCharges.push({ name: "", amount: "" });
    setRows(updatedRows);
  };

  const removeExtraField = (rowIndex: number, extraIndex: number) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].extraCharges.splice(extraIndex, 1);
    setRows(updatedRows);
  };

  // ---------------- JSX ----------------
  return (
    <>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="mb-8 border-b pb-4">
          <div className="mb-5.5 flex flex-col gap-1.5 sm:flex-row items-end">
            <DatePickerOne
              name="date"
              label="Date"
              defaultValue={row.date}
              onChange={(val) => handleRowChange(rowIndex, "date", val)}
            />
            <InputGroup
              width="w-60"
              type="text"
              name="vehicleNumber"
              label="Vehicle Number"
              value={row.vehicleNo}
              height="sm"
              placeholder=""
              handleChange={(e) => handleRowChange(rowIndex, "vehicleNo", e.target.value)}
            />
            <InputGroup
              width="w-60"
              type="text"
              name="challanNumber"
              label="Challan Number"
              value={row.challanNo}
              height="sm"
              placeholder=""
              handleChange={(e) => handleRowChange(rowIndex, "challanNo", e.target.value)}
            />
            <InputGroup
              width="w-70"
              type="text"
              name="containerNumber"
              label="Container Number"
              value={row.containerNo}
              height="sm"
              placeholder=""
              handleChange={(e) => handleRowChange(rowIndex, "containerNo", e.target.value)}
            />
            <button
              type="button"
              className="text-red-500 h-max mt-auto ml-4 mb-4"
              onClick={() => removeRow(rowIndex)}
            >
              <MdDelete size={25} />
            </button>
          </div>

          <div className="flex gap-2.5 items-center mb-2">
            <SwitcherThree
              enabled={row.isExtraCharges}
              setEnabled={(val) => handleRowChange(rowIndex, "isExtraCharges", val)}
            />
            <span>Is there any extra charge included?</span>
          </div>

          {row.isExtraCharges &&
            row.extraCharges.map((extra, extraIndex) => (
              <div className="flex items-end gap-3 mb-3 pl-10" key={extraIndex}>
                <InputGroup
                  width="w-80"
                  type="text"
                  name="name"
                  label="Name of the charge"
                  value={extra.name}
                  height="sm"
                  placeholder=""
                  handleChange={(e) =>
                    handleRowChange(rowIndex, "name", e.target.value, extraIndex)
                  }
                />
                <InputGroup
                  width="w-80"
                  type="number"
                  name="amount"
                  label="Amount"
                  value={extra.amount}
                  height="sm"
                  placeholder=""
                  handleChange={(e) =>
                    handleRowChange(rowIndex, "amount", e.target.value, extraIndex)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeExtraField(rowIndex, extraIndex)}
                  className="text-red-500 ml-2 mb-4 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <MdDelete size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => addExtraField(rowIndex)}
                  className="text-green-600 ml-2 mb-4 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <MdOutlineAdd size={22} />
                </button>
              </div>
            ))}
        </div>
      ))}

      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={addRow}
      >
        Add Trips
      </button>
    </>
  );
};

export default WorkDetailsRow;
