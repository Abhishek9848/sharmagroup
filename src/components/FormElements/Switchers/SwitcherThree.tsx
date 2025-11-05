import { Dispatch, SetStateAction } from "react";

type SwitcherThreeProps = {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
};

const SwitcherThree = ({ enabled, setEnabled }: SwitcherThreeProps) => {
  return (
    <div>
      <label
        htmlFor="toggle3"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggle3"
            className="sr-only"
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
          />

          {/* Track */}
          <div
            className={`block h-6 w-12 rounded-full transition-colors duration-300 ${
              enabled ? "bg-[#1976d2]" : "bg-gray-300 dark:bg-[#5A616B]"
            }`}
          ></div>

          {/* Dot */}
          <div
            className={`absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${
              enabled ? "translate-x-[1.5rem]" : ""
            }`}
          >
            {/* ✅ Tick when enabled */}
            {enabled ? (
              <svg
                className="fill-primary"
                width="9"
                height="6"
                viewBox="0 0 11 8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.2355 0.812752L10.2452 0.824547C10.4585 1.08224 10.4617 1.48728 10.1855 1.74621L4.85633 7.09869C4.66442 7.29617 4.41535 7.4001 4.14693 7.4001C3.89823 7.4001 3.63296 7.29979 3.43735 7.09851L0.788615 4.43129C0.536589 4.1703 0.536617 3.758 0.788643 3.49701C1.04747 3.22897 1.4675 3.22816 1.72731 3.49457L4.16182 5.94608L9.28643 0.799032C9.54626 0.532887 9.96609 0.533789 10.2248 0.801737L10.2355 0.812752Z"
                />
              </svg>
            ) : (
              /* ❌ Cross when disabled */
              <svg
                className="fill-gray-500 dark:fill-gray-300"
                width="8"
                height="8"
                viewBox="0 0 11 11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.23529 2.29669C0.942402 2.00379 0.942402 1.52892 1.23529 1.23603C1.52819 0.943134 2.00306 0.943134 2.29596 1.23603L5.37433 4.3144L8.45261 1.23612C8.7455 0.943225 9.22038 0.943225 9.51327 1.23612C9.80616 1.52901 9.80616 2.00389 9.51327 2.29678L6.43499 5.37506L9.51327 8.45334C9.80616 8.74624 9.80616 9.22111 9.51327 9.514C9.22038 9.8069 8.7455 9.8069 8.45261 9.514L5.37433 6.43572L2.29596 9.51409C2.00306 9.80699 1.52819 9.80699 1.23529 9.51409C0.942402 9.2212 0.942402 8.74633 1.23529 8.45343L4.31367 5.37506L1.23529 2.29669Z"
                />
              </svg>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default SwitcherThree;
