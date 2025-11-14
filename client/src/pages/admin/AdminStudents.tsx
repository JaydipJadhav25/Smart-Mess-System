import AdminLayout from "@/components/admin/AdminLayout"
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { axiosInstance } from "@/config/axiosInstances";

import {  useEffect, useState } from "react";
import { toast } from "sonner";


function AdminStudents() {

    const [tab, setTab] = useState("all");
  const [applications, setApplications] = useState([]);
  const [currentMonthFees, setCurrentMonthFees] = useState([]);
  const[allFees ,  setAllFees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // const [openDialog, setOpenDialog] = useState(false);
  // const [amount, setAmount] = useState("");
  // const [method, setMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const[month , setMonth] = useState("");

  const [studentId, setStudentId] = useState("");
const [studentFees, setStudentFees] = useState([]);
// const [loading, setLoading] = useState(false);
const [searchClicked, setSearchClicked] = useState(false);

async function fetchStudentFees() {
  if (!studentId) return alert("Enter Student ID");

  setLoading(true);
  setSearchClicked(true);
  try {
    const res = await axiosInstance.get(`/open/fees/records/${studentId}`);
    setStudentFees(res.data || []);
  } catch (err) {
    console.error("Error fetching student fees:", err);
    alert("Error fetching records");
    setStudentFees([]);
  } finally {
    setLoading(false);
  }
}




  //  //all application
  //    useEffect(()=>{
  //           async function fetchAllApplications(){
  //              try {
  //               const response = await axiosInstance.get("/admin/application/all");
  //               setApplications(response.data?.data?.applications);
  //              } catch (error) {
  //               console.log("error : " , error);
  //               alert("error to fetch applications!")
  //              }
  //           }
  //           fetchAllApplications();
  //     } , []);

   
  //     //current fee paid students
  //     useEffect(()=>{
  //       async function fetcher (){
  //         try {
  //           const allstundes = await axiosInstance.get("/admin/fee/current");
  //            setAllStudentsCurrent(allstundes.data);
  //         } catch (error) {
  //           console.log("error"  , error);
  //           alert("fetching stundes Error !");
  //         }

  //       }

  //       fetcher();

  //     },[]);



  useEffect(() => {
  async function fetchData() {
    try {
      const [applicationsRes, currentFeesRes, allFeesRes] = await Promise.all([
        axiosInstance.get("/admin/application/all"),
        axiosInstance.get("/admin/fees/current"),
        axiosInstance.get("/admin/fees/all"),
      ]);
      setApplications(applicationsRes.data?.data?.applications || []);
      setCurrentMonthFees(currentFeesRes.data || []);
      setAllFees(allFeesRes.data || []);
    } catch (err) {
      console.log("Error fetching:", err);
      alert("Failed to load data!");
    }
  }
  fetchData();
}, []);




      


// Confirmed applications (accepted)
const confirmedApplications = applications.filter(
  (ele: any) => ele?.isAccepted === true
).filter((ele : any)=> ele.name.toLowerCase().includes(searchTerm.toLowerCase().trim()));



// Confirmed applications (accepted)
const  currentStudentsfeesPaid = currentMonthFees.filter((ele : any)=> ele.studentName.toLowerCase().includes(searchTerm.toLowerCase().trim()));
    

const historyMonth = allFees.filter((ele : any) => ele.month === month).filter((ele : any)=> ele.studentName.toLowerCase().includes(searchTerm.toLowerCase().trim()));

  //  Handle Fee Modal
  const addStudentFee = async(ele: any) => {
   try {

      setLoading(true);
       const feeRecord = {
                  user : ele._id,
                  student_Id: ele.student_id,
                    studentName: ele.name,
                    studentEmail: ele.email,
                    month: ele.selectedMonth,
                    amount: Number(ele.amount),
                    mobile : Number(ele.mobile),
                   method: ele.selectedMethod || "cash",
           }


    const reponse = await axiosInstance.post("/admin/fees/add" , feeRecord);
    console.log("responce : " , reponse.data);
    toast.success("fee added Sccessfully !")

    } catch (error : any) {
    console.log("error : " , error);
    // alert("fee add error!");
    const errorMessage =  error.response.data.message || ""
  
    toast.warning(errorMessage);

    }finally{
         setLoading(false);    
    }
  };




  return (
      <AdminLayout currentPage="students">
           <main className="flex-1 bg-muted/80 rounded-2xl">
        <div className="container mx-auto px-4 py-8">
           <Tabs value={tab} onValueChange={setTab} className="space-y-6">
            <div className="flex flex-col p-1 justify-center items-center gap-6">
                
           <div>
            <h1 className="text-4xl font-bold text-slate-800 text-center dark:text-white"> Fees Management </h1>
           </div>
    

            <TabsList>
              <TabsTrigger onClick={()=>setSearchTerm("")}  value="all">Students</TabsTrigger>
              <TabsTrigger onClick={()=>setSearchTerm("")} value="current">Current Month</TabsTrigger>
              <TabsTrigger onClick={()=>setSearchTerm("")} value="history">History</TabsTrigger>
              <TabsTrigger onClick={()=>setSearchTerm("")} value="student">Student</TabsTrigger>
            </TabsList>
            </div>

      <TabsContent value="all" className="p-4 md:p-6">
          <Input
           onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-5 bg-white dark:bg-gray-800"
                placeholder="Search Student by name"
          />

        <div className="space-y-4">
            {confirmedApplications.length > 0 ? (
              confirmedApplications.map((ele: any, index: number) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-gray-800 shadow-sm border border-gray-200 rounded-xl px-4 py-3 hover:shadow-md transition-all duration-200"
              >
                {/*  Left Section — Student Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-1/2">
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {index + 1}.
                  </p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {ele.name}
                  </p>
                  <p className="text-gray-500 text-sm">ID :{ele.student_id}</p>
                </div>

                {/* Right Section — Fee Inputs */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-1/2 justify-end mt-3 sm:mt-0">
                  {/* Month Selector */}
                  <select
                    required
                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-900 text-sm"
                    onChange={(e) =>
                      (ele.selectedMonth = e.target.value)
                    }
                    defaultValue=""
                  >
                    <option value="">Month</option>
                    {[
                      "January","February","March","April","May","June",
                      "July","August","September","October","November","December"
                    ].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>

                  {/* Payment Method */}
                  <select
                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-900 text-sm"
                    onChange={(e) =>
                      (ele.selectedMethod = e.target.value)
                    }
                    defaultValue="cash"
                  >
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                    <option value="online">Online</option>
                  </select>

                  {/* Amount Input */}
                  <input
                    required
                    type="number"
                    placeholder="Amount ₹"
                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-24 bg-white dark:bg-gray-900 text-sm"
                    onChange={(e) =>
                      (ele.amount = e.target.value)
                    }
                  />

                  {/* Confirm Button */}
                  <button
                    disabled={loading}
                    onClick={async () => {
                      if (!ele.selectedMonth || !ele.amount) {
                        return alert("Please select month and amount!");
                      }
                      //pass to function
                      addStudentFee(ele);            
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    {
                      loading ? "loading..." : "Confirm"
                    }
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No confirmed students found
            </div>
          )}
        </div>
      </TabsContent>
       <TabsContent value="current" className="p-4 md:p-6">
          
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-5 bg-white dark:bg-gray-800"
          placeholder="Search Student by name"
        />

        <div className="space-y-4">
          {currentMonthFees.length > 0 ? (
            currentStudentsfeesPaid.map((ele: any, index: number) => (
              <div
                key={index}
                className="
                  flex flex-col sm:flex-row sm:items-center justify-between 
                  bg-white dark:bg-gray-800 
                  shadow-sm border border-gray-200 dark:border-gray-700 
                  rounded-xl px-5 py-4 
                  hover:shadow-md transition-all duration-200
                "
              >
                {/* Left Section — Student Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-3/4">
                  
                  {/* Index */}
                  <p className="text-gray-700 dark:text-gray-200 font-semibold min-w-6">
                    {index + 1}.
                  </p>

                  {/* Student Name */}
                  <p className="text-gray-900 dark:text-gray-100 font-semibold">
                    {ele.studentName}
                  </p>

                  {/* Student ID */}
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    ID: {ele.student_Id}
                  </p>

                  {/* Month Badge */}
                  <span
                    className="
                      bg-amber-50 text-amber-700 
                      text-xs font-medium 
                      px-2.5 py-1 rounded-lg
                      border border-amber-200
                    "
                  >
                    {ele.month}
                  </span>

                  {/* Payment Date Badge */}
                  <span
                    className="
                      bg-blue-50 text-blue-700 
                      text-xs font-medium 
                      px-2.5 py-1 rounded-lg 
                      border border-blue-200
                      whitespace-nowrap
                    "
                  >
                    {new Date(ele.paymentDate).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No confirmed students found
            </div>
          )}
        </div>


  
         </TabsContent>
        <TabsContent value="history" className="p-4 md:p-6">
          
      <h1 className="text-2xl font-bold mb-4">history Records Check</h1>
             
               <select
                    required
                    className="space-y-3 border w-full  border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-900 text-sm my-2"
                    onChange={e => setMonth(e.target.value)}
                    defaultValue=""
                  >
                    <option value="">Month</option>
                    {[
                      "January","February","March","April","May","June",
                      "July","August","September","October","November","December"
                    ].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
              </select>
             
             <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-5 bg-white dark:bg-gray-800"
          placeholder="Search Student by name"
        />

        <div className="space-y-4">
          {historyMonth.length> 0 ? (
            historyMonth.map((ele: any, index: number) => (
              <div
                key={index}
                className="
                  flex flex-col sm:flex-row sm:items-center justify-between 
                  bg-white dark:bg-gray-800 
                  shadow-sm border border-gray-200 dark:border-gray-700 
                  rounded-xl px-5 py-4 
                  hover:shadow-md transition-all duration-200
                "
              >
                {/* Left Section — Student Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-3/4">
                  
                  {/* Index */}
                  <p className="text-gray-700 dark:text-gray-200 font-semibold min-w-6">
                    {index + 1}.
                  </p>

                  {/* Student Name */}
                  <p className="text-gray-900 dark:text-gray-100 font-semibold">
                    {ele.studentName}
                  </p>

                  {/* Student ID */}
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    ID: {ele.student_Id}
                  </p>

                  {/* Month Badge */}
                  <span
                    className="
                      bg-amber-50 text-amber-700 
                      text-xs font-medium 
                      px-2.5 py-1 rounded-lg
                      border border-amber-200
                    "
                  >
                    {ele.month}
                  </span>

                  {/* Payment Date Badge */}
                  <span
                    className="
                      bg-blue-50 text-blue-700 
                      text-xs font-medium 
                      px-2.5 py-1 rounded-lg 
                      border border-blue-200
                      whitespace-nowrap
                    "
                  >
                    {new Date(ele.paymentDate).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No confirmed students found
            </div>
          )}
        </div>


  
         </TabsContent>
    <TabsContent value="student" className="p-4 md:p-6">
  <div className="space-y-4">

    <h1 className="text-2xl font-bold mb-4">Personal Records Check</h1>

    {/* Input Box */}
    <div className="flex items-center gap-3">
      <Input
        placeholder="Enter Student ID"
        className="w-full bg-white dark:bg-gray-900"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <Button onClick={fetchStudentFees} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </Button>
    </div>

    {/* Results Section */}
    {studentFees.length > 0 ? (
      <div className="space-y-3 mt-4">
        {studentFees.map((fee : any, index ) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">{fee.studentName}</p>

              <div className="text-right">
                <p className="text-green-600 font-semibold text-xl">
                  ₹{fee.amount}
                </p>
                <p className="text-xs text-gray-500">{fee.method}</p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">
              {fee.month} {fee.year}
            </p>

            <p className="text-gray-500 text-xs mt-1">
              Paid On: {new Date(fee.paymentDate).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    ) : (
      searchClicked &&
      !loading && (
        <p className="text-gray-500 mt-6 text-center">No records found.</p>
      )
    )}
  </div>
     </TabsContent>
          </Tabs>
        </div>
     </main>
      </AdminLayout>
  )
}

export default AdminStudents