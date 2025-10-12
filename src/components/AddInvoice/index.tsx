import DateRangePicker from "../FormElements/DatePicker/DateRangePicker";
import InputGroup from "../FormElements/InputGroup";
import { TextAreaGroup } from "../FormElements/InputGroup/text-area";

const AddInvoice = () => {
  return (
    <>
      <div className="w-full max-w-full rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-5">
      <form>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="invoiceNumber"
            label="Invoice Number"
            placeholder=""
            height="sm"
          />
          <DateRangePicker />
        </div>

        <InputGroup
          className="mb-5.5"
          type="email"
          name="email"
          label="Email Address"
          placeholder="devidjond45@gmail.com"
          defaultValue="devidjond45@gmail.com"
          iconPosition="left"
          height="sm"
        />

        <InputGroup
          className="mb-5.5"
          type="text"
          name="username"
          label="Username"
          placeholder="devidjhon24"
          defaultValue="devidjhon24"
          iconPosition="left"
          height="sm"
        />

        <TextAreaGroup
          className="mb-5.5"
          label="BIO"
          placeholder="Write your bio here"
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis tortor, consequat efficitur mi congue a. Curabitur cursus, ipsum ut lobortis sodales, enim arcu pellentesque lectus ac suscipit diam sem a felis. Cras sapien ex, blandit eu dui et suscipit gravida nunc. Sed sed est quis dui."
        />

        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
          >
            Cancel
          </button>

          <button
            className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
      </div>
    </>
  );
};

export default AddInvoice;
