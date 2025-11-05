import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import CreateInvoiceWithoutAmount from "@/components/CreateInvoiceWithoutAmount";

export const metadata: Metadata = {
  title: "Add Invoice Without Amount Page",
  // other metadata
};

const AddInvoiceWithoutAmountPage = () => {
  return (
    <>
      <Breadcrumb pageName="Create Invoice" />

      <CreateInvoiceWithoutAmount />
    </>
  );
};

export default AddInvoiceWithoutAmountPage;
