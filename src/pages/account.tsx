import "@anima-protocol/personhood-sdk-react/style.css";
import { useEffect, useState } from "react";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import axios from "axios";
import { Personhood } from "@anima-protocol/personhood-sdk-react";
import { useSignMessage, useAccount } from "wagmi";
import { useCallback } from "react";
import Link from "next/link";
//import ProofOfPersonhoodCheck from "@/component/POPCheck";

const AccountPage: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [passport, setPassport] = useState(false);

  // Serialize the user profile response
  const serializeUserProfile = (data: any) => {
    return {
      name: data.passport.passport_profile.name,
      displayName: data.passport.passport_profile.display_name,
      location: data.passport.passport_profile.location,
      score: data.passport.score,
      activityScore: data.passport.activity_score,
      identityScore: data.passport.identity_score,
      profilePictureUrl: data.passport.passport_profile.image_url,
      bio: data.passport.passport_profile.bio,
    };
  };

  const sign = useCallback(
    (payload: string) => signMessageAsync({ message: payload }),
    [signMessageAsync]
  );

  const shared = useCallback((e: { info: string }) => {
    console.log("shared", e.info);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (address) {
        try {
          const response = await axios.get(
            `https://api.talentprotocol.com/api/v2/passports/${address}`,
            {
              headers: {
                "X-API-KEY": process.env.NEXT_PUBLIC_TALENT_PROTOCOL_API_KEY, // Use environment variable for API key
              },
            }
          );
          // Serialize the response data
          setPassport(true);
          setUserProfile(serializeUserProfile(response.data));
        } catch (err) {
          if (axios.isAxiosError(err) && err.response?.status === 404) {
            setPassport(false);
            // Optionally, redirect to passport creation page
            // window.location.href = '/create-passport'; // Uncomment to redirect
          } else {
            setError("Failed to fetch user profile.");
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [address]);

  const credentials = [
    { name: "Coinbase KYC", verified: false },
    { name: "Email Verification", verified: false },
    { name: "Phone Number Verification", verified: true },
    { name: "Identity Verification", verified: false },
  ];

  const verify = async () => {
    try {
      const appid = "a35d4626-dab2-44bf-b9f1-96d68d50e522";
      const connector = new TransgateConnect(appid);
      const isAvailable = await connector.isTransgateAvailable();

      if (isAvailable) {
        const schemaId = "e942aa110962448b8fa432953a8ec307";
        const res = await connector.launch(schemaId);
        console.log("res", res);
      } else {
        console.log("Please install TransGate");
      }
    } catch (error) {
      console.log("transgate error", error);
    }
  };

  // Function to check loan eligibility based on builder score
  const isEligibleForLoan = (score: number) => {
    return score >= 80; // Example eligibility criteria
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
        {isConnected ? (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl">
            {/* <ProofOfPersonhoodCheck /> */}

            {/* Score Card Section */}
            {loading ? (
              <p>Loading user profile...</p>
            ) : passport ? (
              <div className="bg-blue-100 shadow-md rounded-lg p-6 mt-6">
                <h3 className="text-xl font-semibold mb-4">Builder Score</h3>
                <div className="flex items-center mb-4">
                  <img
                    src={userProfile.profilePictureUrl}
                    alt={userProfile.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-bold">
                      {userProfile.displayName}
                    </h4>
                    <p className="text-gray-600">{userProfile.location}</p>
                  </div>
                </div>
                <p className="text-3xl font-bold">{userProfile.score}</p>
                <p className="text-gray-600">
                  Activity Score: {userProfile.activityScore}
                </p>
                <p className="text-gray-600">
                  Identity Score: {userProfile.identityScore}
                </p>
                <p className="mt-2 text-gray-700">{userProfile.bio}</p>

                {/* Loan Eligibility Check */}
                <div className="mt-4">
                  {isEligibleForLoan(userProfile.score) ? (
                    <p className="text-green-600 font-semibold">
                      You are eligible for a loan!
                    </p>
                  ) : (
                    <p className="text-red-600 font-semibold">
                      You are not eligible for a loan.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid card bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 mt-4 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">
                    Set up your talent protocol passport
                  </h3>
                  <Link
                    href="https://reputation-base.anima.io/"
                    target="_blank"
                  >
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Create Passport
                    </button>
                  </Link>
                </div>
              </div>
            )}
            {/* New section for credentials verification */}
            <h3 className="text-xl font-semibold mt-6">
              Verification Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {credentials.map((credential, index) => (
                <div
                  key={index}
                  className={`bg-white shadow-md rounded-lg p-4 ${
                    credential.verified
                      ? "border-green-500 border-2"
                      : "border-red-500 border-2"
                  }`}
                >
                  <h4 className="text-lg font-semibold">{credential.name}</h4>
                  <p
                    className={`text-sm ${
                      credential.verified ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {credential.verified ? "Verified" : "Not Verified"}
                  </p>
                  {!credential.verified && (
                    <button
                      onClick={verify}
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Verify Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">
              Wallet Not Connected
            </h2>
            <p className="text-gray-600">
              Please connect your wallet to view account details.
            </p>
          </div>
        )}
      </div>
      {address && (
        <Personhood
          onFinish={shared}
          sessionId="01234567-8901-2345-6789-012345678901"
          signCallback={(payload: string | object) => sign(payload as string)}
          walletAddress={address}
        />
      )}
    </>
  );
};

export default AccountPage;
