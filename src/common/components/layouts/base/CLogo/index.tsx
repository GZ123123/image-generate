import Image from "next/image";
import Link from "next/link";

export const CLogo = () => {
  return (
    <Link href="/" className="-m-1.5 p-1.5">
      <span className="sr-only">Your Company</span>
      <Image
        className="dark:fill-white"
        src="/next.svg"
        width={150}
        height={50}
        alt="Logo"
      />
    </Link>
  );
};
