import useAuth from "@/components/context/useAuth";
import StudentLayout from "@/components/students/StudentLayout";
import { axiosInstance } from "@/config/axiosInstances";
import { useQuery } from "@tanstack/react-query";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {  useNavigate} from "react-router-dom"
import PaymentInfoNote from "@/components/StudentMessage/PaymentInfoNote";
import { useAdminSettings } from "@/components/context/useAdminSettings";

function Records() {
  const { student_id } = useAuth();
  const [tab, setTab] = useState("feePay");
  const navigation = useNavigate();

  //admin settings get
  const {onlinePaymentEnabled} = useAdminSettings();



  //fethc from server
  const { data, isError, isLoading } = useQuery({
    queryKey: ["myRecord" , student_id],
    queryFn: async () => {
      if (!student_id) return [];
      const res = await axiosInstance.get(`/open/fees/records/${student_id}`);
      return res.data || [];
    },
  });
  


const studentFeePaidMonth: string[] = data?.map((ele: any) => {
  if(ele.status === "paid"){
    return ele.month;
  }
}) || [];


const allMonths = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const studentFeeRemainingMonth = allMonths.filter(
  (month) => !studentFeePaidMonth.includes(month)
);

// console.log("Paid Months:", studentFeePaidMonth);
// console.log("Remaining Months:", studentFeeRemainingMonth);

//stunde online pay fee
//  async function createOrder(month : string){
//    try {
    
//     //ask fro conform online payment
//     let userChoice = confirm("Proceed with payment of 3,300?");
//     if(!userChoice) return;
//     //1 . create razorpay order
//    const orderRes = await axiosInstance.post("/user/payment/create-order" , {student_id , month});
//     console.log("reponse : " , orderRes.data);

//     //2 .verify the order
//     const options = {
//         key: "rzp_test_Rn001LFlwYYOaD",
//         amount: orderRes.data.order.amount,
//         currency: "INR",
//         name: "Smart Mess System",
//         order_id: orderRes.data.order.id,
//         handler : async function(response : any){
//         const verifyRes  = await axiosInstance.post("/user/payment/verify-payment"  , response);
//         console.log("verifyed payment : " , verifyRes.data);
//         navigation("/profile-records");
//         }
//     }
   
//     // const rzp = new window.Razorpay(options); 
//     const rzp = new (window as any).Razorpay(options);
//     rzp.open();

//    } catch (error) {

//     console.log("create order error !" , error);
//     alert("line payment Error !");

//    } 
//   }


async function createOrder(month: string) {
  try {
    if(!onlinePaymentEnabled) return;
    if (!confirm("Proceed with payment of ₹3,300?")) return;

    const orderRes = await axiosInstance.post(
      "/user/payment/create-order",
      { student_id, month }
    );

    const options = {
      key: "rzp_test_Rn001LFlwYYOaD",
      amount: orderRes.data.order.amount,
      currency: "INR",
      name: "Smart Mess System",
      description: `Mess Fees -₹3,300`,
      order_id: orderRes.data.order.id,
      prefill: {
      name: "Student",
      email: "student@email.com",
      },
        theme: {
          color: "#22c55e",
        },
      handler: async (response: any) => {
        const verifyRes = await axiosInstance.post(
          "/user/payment/verify-payment",
          response
        );

        if (verifyRes.data.success) {
          // alert("Payment successful!");
          navigation("/profile");
        }
      },
    };

    const rzp = new (window as any).Razorpay(options);

    rzp.on("payment.failed", () => {
      alert("Payment failed or cancelled");
    });

    rzp.open();
  } catch (error) {
    console.error(error);
    alert("Online payment error");
  }
}





  return (
    <StudentLayout currentPage="records">
      {/* payment dely note */}
       <PaymentInfoNote  onlinePaymentStatus={onlinePaymentEnabled}/>
  

      <div className="max-w-3xl mx-auto p-4">
        {/* <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          My Fee Records
        </h1> */}
        {/* Loading */}
        {isLoading && (
          <p className="text-center text-gray-500">Loading records...</p>
        )}

        {/* Error */}
        {isError && (
          <p className="text-center text-red-500">
            Unable to load records. Try again later.
          </p>
        )}



        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="feePay">FeePay</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
       <TabsContent value="feePay" className="mt-6">

  {/* Header */}
  <div className="mb-6 text-center">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      Pending Fee Payments
    </h2>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Pay your remaining mess fees securely online
    </p>
  </div>

  {/* No Records */}
  {!isLoading && studentFeeRemainingMonth?.length === 0 && (
    <p className="text-center text-gray-500 mt-10">
       All fees are paid. No pending dues!
    </p>
  )}

  {/* Fee Cards */}
  <div className="space-y-5">
    {studentFeeRemainingMonth?.map((month: string, index: number) => (
      <div
        key={index}
        className="p-6 rounded-2xl border bg-white dark:bg-background
                   shadow-sm hover:shadow-md transition
                   border-gray-200 dark:border-gray-700"
      >
        {/* Top Row */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {month} 2026
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Mess Fee
            </p>
          </div>

          <span
          className="px-3 py-1 text-xs font-medium rounded-full
            bg-yellow-100 text-yellow-700
            dark:bg-yellow-900/30 dark:text-yellow-400">
            Pending
          </span>
        </div>

        {/* Amount */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            ₹3,300
          </p>

          {/* Pay Button */}
          <button
           disabled={!onlinePaymentEnabled}
            className="px-6 py-2 rounded-xl font-semibold
                       bg-green-600 text-white
                       hover:bg-green-700 active:scale-95
                       transition disabled:cursor-not-allowed"
            onClick={() => {
              // YOU will handle payment logic here
              createOrder(month);
            }}
          >
            Pay Online
          </button>

        
        </div>

        {/* Footer Info */}
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Secure online payment • Instant confirmation
        </p>
      </div>
    ))}
  </div>

       </TabsContent>
            <TabsContent value="history" className="mt-6">

  {/* Header */}
  <div className="mb-8 text-center">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      Payment History
    </h2>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Secure & transparent fee transactions
    </p>
  </div>

  {/* No Records */}
  {!isLoading && data?.length === 0 && (
    <p className="text-center text-gray-500 mt-10">
      No payment history available.
    </p>
  )}

  {/* Timeline */}
  <div className="relative pl-8">
    {/* Vertical Line */}
    <div className="absolute left-3 top-0 h-full w-[2px] bg-green-300 dark:bg-green-700"></div>

    <div className="space-y-8">
  {data?.map((fee: any, index: number) => (
    <div key={index} className="relative">

      {/* Timeline Dot */}
      <div
        className="absolute -left-[2px] top-3 w-4 h-4 rounded-full
                   bg-green-500 border-4 border-white dark:border-background"
      />

      {/* Card */}
      <div
        className={`ml-6 p-5 rounded-xl border bg-white border-emerald-400/90 dark:bg-background
                    shadow-sm hover:shadow-md transition
                    ${fee.status === "pending" && "bg-yellow-100 dark:bg-yellow-900/40"}
                    ${fee.status === "failed" && "bg-red-100 dark:bg-red-900/40"}
                   `}
      >
        {/* Header */}
        <div className="flex justify-between items-center gap-4">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {fee.month} {fee.year}
          </p>

          <span
            className={`px-3 py-1 text-xs font-medium rounded-full
              ${fee.status === "paid" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}
              ${fee.status === "pending" && "bg-yellow-200 text-yellow-800"}
              ${fee.status === "failed" && "bg-red-200 text-red-800"}
            `}
          >
            {fee.status.toUpperCase()}
          </span>

          <button
            onClick={() => navigation(`/receipt/${fee._id}`)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                       text-white px-4 py-2 rounded-lg text-sm font-medium
                       transition-all shadow-sm hover:shadow active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Receipt
          </button>
        </div>

        {/* Amount */}
        <p className="mt-3 text-3xl font-bold text-green-600 dark:text-green-400">
          ₹{fee.amount}
        </p>

        {/* Meta Info */}
        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <p>
            Method:{" "}
            <span className="font-semibold">
              {fee.method?.toUpperCase()}
            </span>
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Paid On: {new Date(fee.paymentDate).toLocaleString()}
          </p>

          <p className="text-xs text-gray-400">
            Receipt ID: {fee._id}
          </p>
        </div>

        {/* PREMIUM BLOCKCHAIN PROOF */}
        {fee.hash && (
          <div
            className="mt-5 relative overflow-hidden rounded-xl
                       border border-emerald-400/30
                       bg-gradient-to-br from-emerald-950 via-gray-900 to-black
                       p-5 shadow-lg shadow-emerald-500/10"
          >

            {/* Badge */}
            <div
              className="absolute top-3 right-3 px-3 py-1 text-[10px]
                         font-semibold rounded-full
                         bg-emerald-500/10 text-emerald-400
                         border border-emerald-400/30 hidden md:block"
            >
              BLOCKCHAIN VERIFIED
            </div>

            {/* Title */}
            <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
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
                  d="M9 12l2 2 4-4m5-1a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Payment Secured on Blockchain
            </h4>

            {/* Blockchain Details */}
            <div className="mt-3 space-y-1 text-xs text-gray-300">
              <p>
                <span className="text-gray-400">Transaction Hash:</span>{" "}
                <span className="font-mono text-emerald-300">
                  {/* {fee.hash.slice(0, 10)}...{fee.hash.slice(-8)} */}
                  {fee.hash}
                </span>
              </p>

              <p>
                <span className="text-gray-400">Block Number:</span>{" "}
                <span className="text-gray-200">
                  {fee.blockNumber}
                </span>
              </p>

              <a
                href={`https://sepolia.etherscan.io/tx/${fee.hash}#eventlog`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2
                           text-orange-400 hover:text-emerald-300
                           underline underline-offset-2"
              >
                View on Etherscan
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
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

              <p className="mt-2 text-[11px] text-gray-400 italic">
                This record is permanently stored on the Ethereum blockchain and cannot be altered.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  ))}
</div>


  </div>

</TabsContent>


            </Tabs>
      </div>
    </StudentLayout>
  );
}

export default Records;


// <Card
//               key={index}
//               className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition"
//             >
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                   {fee.month} {fee.year}
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <p className="text-gray-700 dark:text-gray-300 font-medium">
//                     Amount Paid
//                   </p>
//                   <p className="text-xl font-bold text-green-600">
//                     ₹{fee.amount}
//                   </p>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <p className="text-gray-700 dark:text-gray-300 font-medium">
//                     Payment Method
//                   </p>
//                   <p className="text-gray-800 dark:text-gray-100">
//                     {fee.method.toUpperCase()}
//                   </p>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <p className="text-gray-700 dark:text-gray-300 font-medium">
//                     Paid On
//                   </p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {new Date(fee.paymentDate).toLocaleString()}
//                   </p>
//                 </div>

//                 <hr className="border-gray-300 dark:border-gray-700" />

//                 <div className="text-right text-xs text-gray-500">
//                   Receipt ID: {fee._id}
//                 </div>
//               </CardContent>
//             </Card>















//green -bg vala

  // <TabsContent value="history">
  //               {/* No Records */}
  //                     {!isLoading && data?.length === 0 && (
  //                       <p className="text-center text-gray-500">No fee records found!</p>
  //                     )}

  //                     {/* Records */}
  //                     <div className="space-y-4 mt-4">
  //                       {data?.map((fee: any, index: number) => (
  //                   <div
  //               key={index}
  //               className={`p-6 rounded-xl border shadow-sm transition hover:shadow-md
  //                 ${fee.amount > 0 
  //                   ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700" 
  //                   : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
  //                 }`}
  //             >
  //               {/* Month & Year */}
  //               <div className="flex justify-between items-center mb-3">
  //                 <span className="px-3 py-1 text-sm font-medium rounded-full
  //                   bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
  //                   shadow-sm">
  //                   {fee.month} {fee.year}
  //                 </span>

  //                 <span className="text-xs text-gray-500 dark:text-gray-400">
  //                   Receipt ID: {fee._id}
  //                 </span>
  //               </div>

  //               {/* Amount */}
  //               <p className="text-3xl font-bold text-green-600 dark:text-green-400">
  //                 ₹{fee.amount}
  //               </p>

  //               {/* Method */}
  //               <p className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200">
  //                 Payment Method:{" "}
  //                 <span className="font-semibold">
  //                   {fee.method.toUpperCase()}
  //                 </span>
  //               </p>

  //               {/* Date */}
  //               <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
  //                 Paid On: {new Date(fee.paymentDate).toLocaleString()}
  //               </p>
  //             </div>

                          
  //                       ))}
  //                     </div>
  //           </TabsContent>
