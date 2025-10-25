import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import AddAccount from "@/components/AddAccounts";

export const metadata: Metadata = {
  title: "Accounts Page",
  // other metadata
};

const AddAccountsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Accounts" />

      <AddAccount />
    </>
  );
};

export default AddAccountsPage;
