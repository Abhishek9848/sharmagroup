"use client";
import { useStateContext } from "@/context/ContextProvider";
import { Srl, Si } from "./icons";

export function CompanyToggleSwitch() {
  const { setProfile, currentProfile } = useStateContext();

  const toggleProfile = () => {
    setProfile(
      currentProfile === "sharmaRoadLines"
        ? "sharmaInteriors"
        : "sharmaRoadLines"
    );
  };

  return (
    <button
      onClick={toggleProfile}
      className={`relative flex w-25 items-center justify-between rounded-full p-2  transition-colors ${
        currentProfile === "sharmaRoadLines"
          ? "bg-blue-500 text-white"
          : "bg-green-500 text-white"
      }`}
    >
      <span
        className={`absolute top-1 bottom-1 w-[50%] rounded-full bg-white transition-all ${
          currentProfile === "sharmaRoadLines"
            ? "left-1"
            : "left-[calc(50%+4px)]"
        }`}
      ></span>

      <span
        className={`z-10 w-1/2 text-center transition ${
          currentProfile === "sharmaRoadLines"
            ? "text-blue-500 font-semibold"
            : "text-white"
        }`}
      >
        <Srl />
      </span>
      <span
        className={`z-10 w-1/2 text-center transition ${
          currentProfile === "sharmaInteriors"
            ? "text-green-500 font-semibold"
            : "text-white"
        }`}
      >
       <Si />
      </span>
    </button>
  );
}
