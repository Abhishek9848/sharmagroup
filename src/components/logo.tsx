import srlLogo from "@/assets/logos/logo.png";
import logo from "@/assets/logos/logo-interiors.png";
import Image from "next/image";
import  { useStateContext }  from "@/context/ContextProvider";
import { useSidebarContext } from "./Layouts/sidebar/sidebar-context";
export function Logo() {
  const {currentProfile} = useStateContext();
    const { isMobile } = useSidebarContext();
  return (
    <div className={`flex items-center ${
      isMobile ? "flex-col space-y-1" : "flex-row space-x-3"
    }`}>
      {/* Logo Container */}
      <div className="relative h-12 w-15 flex-shrink-0">
        {/* Light mode logo */}
        <Image
          src={currentProfile === "sharmaRoadLines" ? srlLogo :logo}
          alt="Sharma Interiors logo"
          fill
          className="object-contain"
          sizes="160px"
          priority
        />
      </div>

      {/* Text on the right */}
      <h1 className={`font-semibold text-lg sm:text-sm md:text-base lg:text-xl ${
          isMobile ? "text-center mt-1" : "whitespace-nowrap"
        }`}>
        {currentProfile === "sharmaRoadLines" ? "Sharma Road Lines" : "Sharma Interiors"}
      </h1>
    </div>
  );
}
