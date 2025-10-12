import silogo from "@/assets/logos/logo-interiors.png";
import srllogo from "@/assets/logos/logo.png";
import Image from "next/image";

export function Srl() {
  return (
    <div className="">
      <Image
        src={srllogo}
        alt="Sharma Road Lines logo"
        className="object-contain w-8 h-8"
        sizes="50px, 50px"
        priority
      />
    </div>
  );
}

export function Si() {
  return (
    <div className="">
      <Image
        src={silogo}
        alt="Sharma Interiors logo"
        className="object-contain w-8 h-8"
        sizes="50px, 50px"
        priority
      />
    </div>
  );
}
