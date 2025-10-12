import { Dispatch, SetStateAction } from "react";
import AutocompleteInput from "../FormElements/InputGroup/auto-complete";
import InputGroup from "../FormElements/InputGroup";


type RowType = {
    productDescription: string;
    sacCode: string;
    uom: string;
    quantity: string;
    rate: string;
    amount: string;
    igst: string;
    total: string;
};

type WorkDetailsRowProps = {
    rows: RowType[];
    setRows: Dispatch<SetStateAction<RowType[]>>;
    suggestions: string[];
};

const WorkDetailsRow = ({ suggestions, rows, setRows }: WorkDetailsRowProps) => {
    const handleRowChange = (index: number, field: keyof RowType, value: string) => {
        console.log("i")
        const updatedRows = [...rows];
        updatedRows[index][field] = value;

        // Auto-calculate IGST and Total if amount changes
        if (field === "amount") {
            const amountNum = parseFloat(value) || 0;
            const igst = amountNum * 0.18;          // 18% IGST
            const total = amountNum + igst;

            updatedRows[index].igst = igst.toFixed(2);  // store as string
            updatedRows[index].total = total.toFixed(2);
        }
        setRows(updatedRows);
    };
    const addRow = () => {
        setRows([
            ...rows,
            {
                productDescription: "",
                sacCode: "",
                uom: "",
                quantity: "",
                rate: "",
                amount: "",
                igst: "",
                total: "",
            },
        ]);
    };

    const removeRow = (index: number) => {
        if (rows.length > 1) {
            setRows(rows.filter((_, i) => i !== index));
        }
    };

    return (
        <>
            {rows.map((row, index) => (
                <div key={index} className="mb-5.5 flex flex-col gap-3.5 sm:flex-row">
                    <AutocompleteInput
                        id={`productDescriptions-${index}`}
                        label="Product Descriptions"
                        suggestions={suggestions}
                        onSelect={(value) => handleRowChange(index, "productDescription", value)}
                    />
                    <InputGroup
                        width="w-20"
                        type="text"
                        name="sacCode"
                        label="Sac Code"
                        value={row.sacCode}
                        height="sm"
                        placeholder=""
                        handleChange={(e) => handleRowChange(index, "sacCode", e.target.value)}
                    />
                    <InputGroup
                        width="w-15"
                        type="text"
                        name="uom"
                        label="UOM"
                        value={row.uom}
                        height="sm"
                        placeholder=""
                        handleChange={(e) => handleRowChange(index, "uom", e.target.value)}
                    />
                    <InputGroup
                        width="w-25"
                        type="text"
                        name="quantity"
                        label="Quantity"
                        value={row.quantity}
                        height="sm"
                        placeholder=""
                        handleChange={(e) => handleRowChange(index, "quantity", e.target.value)}
                    />
                    <InputGroup
                        width="w-25"
                        type="text"
                        name="rate"
                        label="Rate"
                        value={row.rate}
                        height="sm"
                        placeholder=""
                        handleChange={(e) => handleRowChange(index, "rate", e.target.value)}
                    />
                    <InputGroup
                        width="w-30"
                        type="text"
                        name="amount"
                        label="Amount"
                        value={row.amount}
                        height="sm"
                        placeholder=""
                        handleChange={(e) => handleRowChange(index, "amount", e.target.value)}
                    />
                    <InputGroup
                        width="w-30"
                        type="text"
                        name="igst"
                        label="IGST"
                        value={row.igst}
                        height="sm"
                        placeholder=""
                        handleChange={(e) => handleRowChange(index, "igst", e.target.value)}
                    />
                    <InputGroup
                        width="w-30"
                        type="text"
                        name="total"
                        label="Total"
                        value={row.total}
                        height="sm"
                        placeholder=""
                        handleChange={(e) => handleRowChange(index, "total", e.target.value)}
                    />

                    <button
                        type="button"
                        className="text-red-500 ml-2 h-max mt-auto mb-2"
                        onClick={() => removeRow(index)}
                    >
                        Remove
                    </button>
                </div>
            ))}

            <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={addRow}
            >
                Add Row
            </button>
        </>
    );
};

export default WorkDetailsRow;
