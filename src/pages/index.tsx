import type { NextPage } from "next";
import { useAccount } from "wagmi";
import Link from "next/link";
import ProofOfPersonhoodCheck from "../component/POPCheck";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();

  const openDeals = [
    {
      title: "African Innovative Pool",
      shortDescription: "Automated Diversified Portfolio",
      description:
        "Capital from this pool will be used to fund leading fintech companies in Africa - the epicenter of the world's population growth. Proceeds will be used for a wide array of use cases including SMB lending, asset financing, payday/invoice advances, supply chain financing, remittances, and more.",
      icon: "/assets/afric.jpg",
      usdcInterest: "8.50%",
      gfiAPY: "1.25%",
      loanTerm: "Open-ended",
      liquidity: "1 week withdraw requests",
      link: "/pools/af-inno", // Add a link for the deal
    },
    // Additional deals can be added here
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:block w-1/4 bg-white shadow-lg rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Base</h3>
        <nav className="flex flex-col gap-2">
          <Link
            className="bg-gray-200 rounded-lg p-3 hover:bg-gray-300 transition duration-200"
            href="/account"
          >
            Account
          </Link>
          <a
            className="bg-gray-200 rounded-lg p-3 hover:bg-gray-300 transition duration-200"
            href="#borrow"
          >
            Borrow
          </a>
          <a
            className="bg-gray-200 rounded-lg p-3 hover:bg-gray-300 transition duration-200"
            href="#gas-request"
          >
            Gas Request
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="md:w-3/4 w-full bg-gray-100 p-4">
        <div className="flex flex-col w-full border-opacity-50">
          {isConnected && <ProofOfPersonhoodCheck />}

          <div className="grid card bg-blue-200 rounded-xl p-4 mt-4 shadow-md">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold">Active Loans</h4>
                <span className="text-2xl font-bold">$0.00</span>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold">Total Loss Rate</h4>
                <span className="text-2xl font-bold">0.00%</span>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold">Total Loans Repaid</h4>
                <span className="text-2xl font-bold">$0.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="open-deals-section my-12">
          <h2 className="text-xl font-bold mb-4">Open Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {openDeals.map((deal, index) => (
              <Link key={index} href={deal.link} passHref>
                <div className="deal-card bg-gray-200 shadow-md rounded-xl p-6 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center mb-4 rounded-xl">
                    <div className="mb-4 rounded-full">
                      <img
                        src={deal.icon}
                        alt={deal.title}
                        className="w-16 mr-4 rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{deal.title}</h3>
                      <p className="text-gray-600 text-sm">
                        {deal.shortDescription}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-700">Variable USDC interest:</p>
                    <p className="font-bold text-3xl">{deal.usdcInterest}</p>
                    <p className="text-gray-700">
                      Variable SLD APY:{" "}
                      <span className="font-bold">{deal.gfiAPY}</span>
                    </p>
                    <p className="text-gray-700">
                      Loan term:{" "}
                      <span className="font-bold">{deal.loanTerm}</span>
                    </p>
                    <p className="text-gray-700">
                      Liquidity:{" "}
                      <span className="font-bold">{deal.liquidity}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-gray-600 mt-6">0 Closed Deals</p>
        </div>

        {/* <Stakings /> */}
      </main>
    </div>
  );
};

export default Home;
