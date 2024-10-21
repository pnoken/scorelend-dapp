import React from "react";

const AfricaInnovationFund: React.FC = () => {
  return (
    <>
      <div className="flex flex-row p-6 bg-gray-50">
        {/* Fund Details Card */}
        <div className="bg-blue-100 shadow-lg rounded-lg p-6 w-full md:w-1/2 mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">
            Africa Innovation Fund Pool
          </h2>
          <div className="mb-4">
            <a
              href="https://basescan.org/address/0x4d2bdc1a27c7982cba348b9fc7f41194600018ea"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              Basescan
            </a>
          </div>
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p className="mb-2">
            The Africa Innovation Fund Pool provides Liquidity Providers (LPs)
            with exposure to a variety of borrowers across Africa. LPs who
            provide capital into this pool are seeking diversified exposure
            across various borrower profiles.
          </p>
          <div className="mb-4">
            <div className="flex justify-between">
              <span className="font-semibold">Variable USDC APY:</span>
              <span>9.93%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Variable SCL APY:</span>
              <span>0.00%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Loan term:</span>
              <span>Open-ended</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Liquidity</h3>
          <p>
            The current utilization rate is 100%. Therefore, not all withdrawals
            can be processed at this time. As borrowers make interest and
            principal payments, withdrawals will be processed according to the
            withdrawal queue.
          </p>
          <button
            onClick={() =>
              window.open("https://reputation-base.anima.io/", "_blank")
            }
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Verify my identity
          </button>
        </div>

        {/* Tabs Section */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Details</h2>
          <div className="flex space-x-4 mb-6">
            <button className="flex-1 py-2 text-center bg-blue-500 text-white rounded hover:bg-blue-600">
              Overview
            </button>
            <button className="flex-1 py-2 text-center bg-gray-200 rounded hover:bg-gray-300">
              Highlights
            </button>
            <button className="flex-1 py-2 text-center bg-gray-200 rounded hover:bg-gray-300">
              Repayment
            </button>
            <button className="flex-1 py-2 text-center bg-gray-200 rounded hover:bg-gray-300">
              Portfolio
            </button>
            <button className="flex-1 py-2 text-center bg-gray-200 rounded hover:bg-gray-300">
              Risk
            </button>
          </div>

          {/* Overview Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">Total pool assets</h4>
              <p>$48,484,716.93</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">Utilization rate</h4>
              <p>100.00%</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">Total loss rate</h4>
              <p>14.55%</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">Next repayment</h4>
              <p>Oct 22, 2024</p>
            </div>
          </div>

          {/* Highlights Section */}
          <h3 className="text-lg font-semibold mb-2">Highlights</h3>
          <p className="mb-4">
            The Africa Innovation Fund Pool gives Liquidity Providers exposure
            to a variety of borrowers across Africa. These borrowers span
            multiple sectors, including asset financing, SME loans, and consumer
            loans, intended to serve investors in search of diversified yield
            generated through real-world economic activity.
          </p>

          {/* Additional Highlights in Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">Protected by first-loss capital</h4>
              <p>
                All deals protected by 20-25% first-loss capital bar one legacy
                investment.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">Secured</h4>
              <p>Overcollateralized with real-world off-chain assets.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">Ongoing monitoring</h4>
              <p>
                Borrowers are required to provide quarterly reporting in secure
                datarooms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AfricaInnovationFund;
