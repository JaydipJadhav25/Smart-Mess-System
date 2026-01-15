import { useNavigate } from "react-router-dom"

function TranscationSuccess() {
    const navigation = useNavigate();
  return (

   <div className="w-full h-screen flex justify-center items-center overflow-hidden">
     <div className="flex flex-col items-center justify-center p-8 bg-white border border-green-200 rounded-xl shadow-lg max-w-lg mx-auto">
      
      {/* Success Icon */}
      <div className="flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
        {/* Replace with an actual SVG checkmark icon (e.g., from Heroicons or Lucide) */}
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="www.w3.org"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
        Payment Successful!
      </h1>
      
      <p className="text-md text-gray-600 text-center mb-6">
        Your transaction has been successfully verified on the blockchain.
      </p>

      {/* Next Steps/Details Section */}
      <div className="w-full text-left bg-gray-50 p-4 rounded-lg">
        <p className="text-sm font-semibold text-gray-700">Order Details:</p>
        <p className="text-sm text-gray-500">Transaction ID: **0x1a2b3c4d...**</p>
        <p className="text-sm text-gray-500">Amount Paid: **0.05 BTC**</p>
      </div>
      
    
      <button 
        onClick={() => { 
         navigation("/profile-records")
        }}
        className="mt-6 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Go Back
      </button>
    </div>
   </div>
  )
}

export default TranscationSuccess