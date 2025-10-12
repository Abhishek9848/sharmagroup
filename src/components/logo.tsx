import darkLogo from "@/assets/logos/logo-interiors.png";
import logo from "@/assets/logos/logo-interiors.png";
import Image from "next/image";
import  { useStateContext }  from "@/context/ContextProvider";
export function Logo() {
  const {currentProfile} = useStateContext();
  return (
    <div className="flex items-center space-x-3">
      {/* Logo Container */}
      <div className="relative h-12 w-15 flex-shrink-0">
        {/* Light mode logo */}
        <Image
          src={logo}
          alt="Sharma Interiors logo"
          fill
          className="dark:hidden object-contain"
          sizes="160px"
          priority
        />

        {/* Dark mode logo */}
        <Image
          src={darkLogo}
          alt="Sharma Interiors dark logo"
          fill
          className="hidden dark:block object-contain"
          sizes="160px"
          priority
        />
      </div>

      {/* Text on the right */}
      <h1 className="font-semibold text-lg sm:text-sm md:text-base lg:text-xl whitespace-nowrap">
        {currentProfile}
      </h1>
    </div>
  );
}
