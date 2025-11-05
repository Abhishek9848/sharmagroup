import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import CreateInvoice from "@/components/CreateInvoice";

export const metadata: Metadata = {
  title: "Add Invoice Page",
  // other metadata
};

const AddInvoicePage = () => {
  return (
    <>
      <Breadcrumb pageName="Create Invoice" />

      <CreateInvoice />
    </>
  );
};

export default AddInvoicePage;
