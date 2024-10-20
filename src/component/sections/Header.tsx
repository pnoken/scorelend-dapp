import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletComponents } from "../Wallet";

/**
 * Site header
 */
export const Header: React.FC = () => {
  return (
    <nav className="navbar bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="navbar-start">
          <a className="text-2xl font-bold">Scorelend</a>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          <WalletComponents />
        </div>
      </div>
    </nav>
  );
};
