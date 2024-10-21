import React, { useEffect, useState } from "react"; // Added useState and useEffect
import { useAccount, useReadContract } from "wagmi";
import Link from "next/link";
import contracts from "../contracts/external";
//import AnimaPOPService from "@/services/AnimaPOPService";

const ProofOfPersonhoodCheck: React.FC = () => {
  const { address } = useAccount();
  const [metadata, setMetaData] = useState<any | null>();
  const contractConfig = {
    address: contracts[8453][0].contracts.AnimaPOP.address,
    abi: contracts[8453][0].contracts.AnimaPOP.abi,
  };

  // Step 1: Fetch the master token ID
  const {
    data: masterToken,
    isError: masterTokenError,
    isLoading: masterTokenLoading,
  } = useReadContract({
    ...contractConfig,
    functionName: "getMasterToken",
    args: ["0x1731d34b07ca2235e668c7b0941d4bfab370a2d0"], // replace with the account address
  });

  // Step 2: Fetch the token URI based on the master token ID
  const {
    data: tokenURI,
    isError: tokenURIError,
    isLoading: tokenURILoading,
  } = useReadContract({
    ...contractConfig,
    functionName: "tokenURI",
    args: masterToken ? [masterToken] : [BigInt(0)], // Only fetch if masterToken is available
  });

  async function getMetaData(tokenURL: string) {
    const response = await fetch(tokenURL);
    if (response.status === 404) {
      setMetaData(null); // User needs to verify
    } else {
      const metadata = await response.json();
      console.log("metadata", metadata);
      setMetaData(metadata);
    }
  }
  if (masterTokenLoading || tokenURILoading) return <div>Loading...</div>;
  if (masterTokenError || tokenURIError) return <div>Error loading data</div>;
  if (tokenURI !== undefined) {
    getMetaData(tokenURI);
  }

  return (
    <div className="grid card bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 mt-4 shadow-md">
      <div className="flex justify-between">
        <div className="w-5/6">
          {metadata ? (
            <div className="text-center">
              <h3 className="font-semibold text-white">
                You have verified your proof of personhood!
              </h3>
              <img
                src={metadata.image}
                alt={metadata.name}
                className="my-4 rounded"
              />
              <p className="text-white">Name: {metadata.name}</p>
              <p className="text-white">
                Reputation Level:{" "}
                {
                  metadata.attributes.find(
                    (attr: { trait_type: string; value: any }) =>
                      attr.trait_type === "Reputation Level"
                  )?.value
                }
              </p>
              <p className="text-white">
                Last Verification:{" "}
                {new Date(
                  metadata.attributes.find(
                    (attr: { trait_type: string; value: any }) =>
                      attr.trait_type === "Last Verification"
                  )?.value * 1000
                ).toLocaleString()}
              </p>
              <a
                href={metadata.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline"
              >
                View More Details
              </a>
            </div>
          ) : (
            <div className="flex justify-between">
              <h3 className="font-semibold text-white">
                Set up your UID to start
              </h3>
              <Link href="https://reputation-base.anima.io/" target="_blank">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Verify Now
                </button>
              </Link>
            </div>
          )}
          <p className="text-white">
            Unique Identity (UID) is a non-transferrable NFT representing
            KYC-verification on-chain. A UID is required to participate in the
            ScoreLend lending protocol. No personal information is stored
            on-chain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProofOfPersonhoodCheck;
