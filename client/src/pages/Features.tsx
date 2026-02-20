import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { axiosInstance } from "@/config/axiosInstances";
import { useQuery } from "@tanstack/react-query";

function Features() {
  const {
    isError,
    isLoading,
    data: feeRecord,
    error,
  } = useQuery({
    queryKey: ["feeRecord"],
    queryFn: async () => {
      const response = await axiosInstance.get("/open/fees-record");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-20">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Blockchain Powered Fee System
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our mess management system integrates secure Web3 payments, ensuring
            every transaction is transparent, verifiable, and immutable.
          </p>
        </div>

        {/* Feature Layout */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE CONTENT */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">
              Transparent & Secure Payments
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              Every student payment is recorded on blockchain, providing
              tamper-proof verification and public transparency. No manual
              manipulation. No hidden records.
            </p>

            <ul className="space-y-3 text-muted-foreground">
              <li>✔ Smart contract based validation</li>
              <li>✔ Public transaction verification</li>
              <li>✔ Secure digital record storage</li>
              <li>✔ Instant confirmation</li>
            </ul>

            {/* Button */}
            {!isLoading && !isError && feeRecord && (
              <a
                href={`https://sepolia.etherscan.io/tx/${feeRecord?.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-8 py-3 rounded-xl font-semibold
          bg-blue-600 text-white hover:bg-blue-700
          transition active:scale-95"
              >
                View Live Transaction
              </a>
            )}
          </div>

          {/* RIGHT SIDE DEMO CARD */}
          <div
            className="p-8 rounded-3xl border bg-white dark:bg-background
      shadow-lg border-gray-200 dark:border-gray-700"
          >
            {isLoading && (
              <p className="text-center animate-pulse text-muted-foreground">
                Loading blockchain demo...
              </p>
            )}

            {isError && (
              <p className="text-center text-red-500">
                Failed to load demo data
              </p>
            )}

            {!isLoading && !isError && feeRecord && (
  <div
    className="p-8 rounded-3xl border
    bg-white/80 dark:bg-background/60
    backdrop-blur-xl
    shadow-lg hover:shadow-2xl
    transition duration-300
    border-gray-200 dark:border-gray-700"
  >
    {/* Top Header */}
    <div className="flex justify-between items-start mb-6">
      <div>
        <p className="text-xl font-semibold">
          {feeRecord?.month} {feeRecord?.year}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Blockchain Payment Record
        </p>
      </div>

      <span
        className="px-4 py-1 text-xs font-semibold rounded-full
        bg-green-100 text-green-700
        dark:bg-green-900/30 dark:text-green-400"
      >
        ✔ Verified
      </span>
    </div>

    {/* Amount Highlight Section */}
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50
      dark:from-blue-900/20 dark:to-indigo-900/20
      rounded-2xl p-6 mb-6 text-center">
      <p className="text-5xl font-bold tracking-tight">
        ₹{feeRecord?.amount}
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        Successfully Recorded on Blockchain
      </p>
    </div>

    {/* User Info */}
    <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
      <div className="space-y-1">
        <p className="font-medium text-gray-800 dark:text-gray-200">
          Student Name
        </p>
        <p className="text-muted-foreground">
          {feeRecord?.studentName}
        </p>
      </div>

      <div className="space-y-1">
        <p className="font-medium text-gray-800 dark:text-gray-200">
          Student ID
        </p>
        <p className="text-muted-foreground">
          {feeRecord?.student_Id}
        </p>
      </div>

      <div className="space-y-1 md:col-span-2">
        <p className="font-medium text-gray-800 dark:text-gray-200">
          Email Address
        </p>
        <p className="text-muted-foreground">
          {feeRecord?.studentEmail}
        </p>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200 dark:border-gray-700 my-6" />

    {/* Blockchain Info */}
    <div className="space-y-4 text-sm">

      <div>
        <p className="font-medium mb-1">Transaction Hash</p>
        <div className="bg-gray-100 dark:bg-gray-800
          p-3 rounded-xl break-all text-muted-foreground">
          {feeRecord?.hash}
        </div>
      </div>

      <div>
        <p className="font-medium">
          Block Number:{" "}
          <span className="text-muted-foreground">
            {feeRecord?.blockNumber}
          </span>
        </p>
      </div>

      {/* Etherscan Link */}
      <a
        href={`https://sepolia.etherscan.io/tx/${feeRecord?.hash}#eventlog`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-2
        text-orange-500 hover:text-emerald-400
        font-medium
        underline underline-offset-4
        transition"
      >
        View on Etherscan
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 3h7m0 0v7m0-7L10 14"
          />
        </svg>
      </a>
    </div>

    <p className="text-xs text-muted-foreground mt-6 text-center">
      Secure • Transparent • Immutable Blockchain Ledger
    </p>
  </div>
)}

         
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Features;
