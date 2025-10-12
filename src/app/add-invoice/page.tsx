import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AddInvoice from "@/components/AddInvoice";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Invoice Page",
  // other metadata
};

const AddInvoicePage = () => {
  return (
    <>
      <Breadcrumb pageName="Add Invoice" />

      <AddInvoice />
    </>
  );
};

export default AddInvoicePage;
