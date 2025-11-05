import * as Icons from "../icons";
import { MdCreateNewFolder } from "react-icons/md";
import { MdImageSearch } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import { MdAccountTree } from "react-icons/md";

export const NAV_DATA = {
  sharmaRoadLines: [
    {
      label: "MAIN MENU",
      items: [
        {
          title: "Create Invoice",
          url: "/create-invoice",
          icon: MdCreateNewFolder,
          items: [],
        },
        {
          title: "Search Invoice",
          url: "/invoices",
          icon: MdImageSearch,
          items: [],
        },
        {
          title: "Invoice Without Amount",
          url: "/invoice-without-amount",
          icon: MdCreateNewFolder,
          items: [],
        },
      ],
    },
  ],
  sharmaInteriors: [
    {
      label: "MAIN MENU",
      items: [
        {
          title: "Add Invoice",
          url: "/add-invoice",
          icon: MdCreateNewFolder,
          items: [],
        },
        {
          title: "View Invoice",
          url: "/view-invoices",
          icon: MdImageSearch,
          items: [],
        },
        {
          title: "Ledger",
          url: "/ledger",
          icon: MdMenuBook,
          items: [],
        },
        {
          title: "Accounts",
          url: "/accounts",
          icon: MdAccountTree,
          items: [],
        },
      ],
    },
  ],
};
