import AdminLayout from "@/components/admin/AdminLayout"
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { axiosInstance } from "@/config/axiosInstances";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function AdminManegApplications() {

       const navigate = useNavigate();

    const [tab, setTab] = useState("all");
    const[applications , setApplications] = useState([]);
     const [searchTerm, setSearchTerm] = useState("");
   


    useEffect(()=>{
          async function fetchAllApplications(){
             try {
              const response = await axiosInstance.get("/admin/application/all");
              console.log("response : " , response.data?.data?.applications);
              setApplications(response.data?.data?.applications);
             } catch (error) {
              console.log("error : " , error);
              alert("error to fetch applications!")
             }
          }
          fetchAllApplications();
    } , []);


  

  const filteredApplications = applications.filter((ele :any) =>
    ele?.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );
  


  
// Pending applications 
const pendingApplications = applications.filter(
  (ele: any) => ele?.isAccepted !== true
).filter((ele : any)=> ele.name.toLowerCase().includes(searchTerm.toLowerCase().trim()));



// Confirmed applications (accepted)
const confirmedApplications = applications.filter(
  (ele: any) => ele?.isAccepted === true
).filter((ele : any)=> ele.name.toLowerCase().includes(searchTerm.toLowerCase().trim()));







  return (
    <AdminLayout currentPage="ManageApplications">
        <main className="flex-1 bg-muted/80 rounded-2xl">
        <div className="container mx-auto px-4 py-8">
           <Tabs value={tab} onValueChange={setTab} className="space-y-6">
            <div className="flex flex-col p-1 justify-center items-center gap-6">
                
           <div>
            <h1 className="text-4xl font-bold text-slate-800 text-center dark:text-white">Stundents Applications  </h1>
           </div>
    

            <TabsList>
              <TabsTrigger onClick={()=>setSearchTerm("")}  value="all">All</TabsTrigger>
              <TabsTrigger onClick={()=>setSearchTerm("")} value="pending">Pending</TabsTrigger>
              <TabsTrigger onClick={()=>setSearchTerm("")} value="submitted">Submitted</TabsTrigger>
            </TabsList>
            </div>

            <TabsContent value="all">
                <Input
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-orange-800 w-full"  placeholder="Search Student by name "/>
                {/* load all students records */}
                  <div className="max-w-5xl mx-auto p-4 md:p-6">
                  {/* <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6">
                    Student Applications
                  </h1> */}
                    {filteredApplications.length  <= 0 && <p className="text-center">No Applications </p>}
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredApplications.map((ele: any, index) => (
                      <div
              key={index}
              className="relative bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-200 p-5 flex flex-col justify-between"
            >
              {/*  Pending Badge */}
              {!ele?.isAccepted && <div className="absolute -top-3 right-3">
                <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  Pending
                </span>
              </div>}

              {/*  Student Info */}
              <div className="space-y-2 mb-4">
                  <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-semibold">ID:</span> {ele?.student_id}
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-semibold">Name:</span> {ele.name}
                </p>
                <p className="text-gray-700 dark:text-gray-200 break-words">
                  <span className="font-semibold">Email:</span> {ele.email}
                </p>
                {/* {ele.course && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                    {ele.course}
                  </p>
                )} */}
              </div>

              {/* Review Button  not on all*/}
              {/* <button
                onClick={() => navigate(`/admin-applicationReview/${ele._id}`)}
                className="mt-auto bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 active:scale-95 transition-transform duration-150"
              >
                Review Application
              </button> */}

            </div>

        ))}
                  </div>
                 </div>
            </TabsContent>

                <TabsContent value="pending" className="p-4 md:p-6">
                  {/* Search Bar */}
                  <div className="mb-5">
                    {/* <input
                      type="text"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      value={searchTerm}
                      placeholder="Search student by name..."
                      className="w-full md:w-1/2 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-800 placeholder-gray-500 shadow-sm"
                    /> */}

                     <Input
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-orange-800 w-full"  placeholder="Search Student by name "/>

                  </div>

                  {/* Pending Applications List */}
                  <div className="space-y-3">
                    {pendingApplications.length > 0 ? (
                      pendingApplications.map((ele: any, index: number) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-gray-800 shadow-sm border border-gray-200 rounded-xl px-4 py-3 hover:shadow-md transition-all duration-200"
                        >
                          {/* Student Info */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 w-full">
                            <div className="flex items-center gap-3">
                              <p className="text-gray-800 dark:text-gray-100 font-medium">
                                {ele.name}
                              </p>
                              {/* Pending Badge */}
                              <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full">
                                Pending
                              </span>
                            </div>

                            <p className="text-gray-500 dark:text-gray-300 text-sm break-all">
                              {ele.email}
                            </p>

                            {ele.course && (
                              <p className="text-gray-400 dark:text-gray-400 text-sm hidden sm:block">
                                ({ele.course})
                              </p>
                            )}
                          </div>

                          {/* Review Button */}
                          <button
                            onClick={() => navigate(`/admin-applicationReview/${ele._id}`)}
                            className="mt-2 sm:mt-0 bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-orange-600 active:scale-95 transition-transform shadow-sm"
                          >
                            Review
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No  applications 
                      </div>
                    )}
                  </div>
         </TabsContent>
             <TabsContent value="submitted">
           <Input
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-orange-800 w-full"  placeholder="Search Student by name "/>
                {/* load all students records */}
                  <div className="max-w-5xl mx-auto p-4 md:p-6">
                  {/* <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6">
                    Student Applications
                  </h1> */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {confirmedApplications .map((ele: any, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-200 p-5 flex flex-col justify-between"
          >
            {/* Student Info */}
            <div className="space-y-2 mb-4">
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Name:</span> {ele.name}
              </p>
              <p className="text-gray-700 dark:text-gray-200 break-words">
                <span className="font-semibold">Email:</span> {ele.email}
              </p>
              {ele.course && (
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-semibold">Course:</span> {ele.course}
                </p>
              )}
            </div>

            {/* Review Button */}
            <button
              onClick={() => navigate(`/admin-applicationReview/${ele._id}`)}
              className="mt-auto bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 active:scale-95 transition-transform duration-150"
            >
              Review Application
            </button>
          </div>
        ))}
                  </div>
                 </div>
            </TabsContent>
          </Tabs>
        </div>
     </main>
    </AdminLayout>
  )
}

export default AdminManegApplications