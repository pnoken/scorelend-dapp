import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletComponents } from "../Wallet";
import Link from "next/link";
import Image from "next/image";

/**
 * Site header
 */
export const Header: React.FC = () => {
  return (
    <nav className="navbar bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="navbar-start">
          <Link href="/" className="text-2xl font-bold">
            <Image src={"/logo.svg"} height={50} width={50} alt="Scorelend" />{" "}
          </Link>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          <WalletComponents />
        </div>
      </div>
    </nav>
  );
};
