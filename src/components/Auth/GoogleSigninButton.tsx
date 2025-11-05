import { GoogleIcon } from "@/assets/icons";

export default function GoogleSigninButton({
  text,
  className,
  onClick,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${text} with Google`}
      className={`flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray-2 p-[15px] font-medium 
        hover:bg-opacity-50 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm 
        dark:border-dark-3 dark:bg-dark-2 dark:hover:bg-opacity-50 ${className || ""}`}
    >
      <GoogleIcon />
      {text} with Google
    </button>
  );
}
