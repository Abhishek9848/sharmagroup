import { Dispatch, SetStateAction } from "react";

export type FilterField =
  | {
      type: "text";
      name: string;
      label: string;
      value: string;
      onChange: (val: string) => void | Dispatch<SetStateAction<string>>;
    }
  | {
      type: "date";
      name: string;
      label: string;
      value: string;
      onChange: (val: string) => void | Dispatch<SetStateAction<string>>;
    }
  | {
      type: "select";
      name: string;
      label: string;
      value: string;
      options?: { label: string; value: string }[];
      onChange: (val: string) => void | Dispatch<SetStateAction<string>>;
    };

export type FilterConfig = {
  fields: FilterField[];
  onSearch: () => void | Promise<void>;
  onReset: () => void;
};
