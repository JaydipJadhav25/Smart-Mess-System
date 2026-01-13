import AdminLayout from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { axiosInstance } from "@/config/axiosInstances";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheckIcon } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function AdminAttendence() {
  const now = new Date();
  const hours = now.getHours();
  const leaveType =
    hours >= 7 && hours <= 10
      ? "Morning Leaves"
      : hours <= 19
      ? "Night Leaves"
      : null;

  const [selectedDate, setDate] = useState<string>("");
  const [isLoading2, setIsLoading] = useState<boolean>(false);
  const [attendaces, setAttendaces] = useState<any>(null);
  const [tab, setTab] = useState("today");
  // const [todayMorningLeaves, settodayMorningLeaves] = useState<any>(undefined);
  // const [todayNightLeaves, setTodayNightLeaves] = useState<any>(undefined);

  const [todayLeaves, setTodayLeaves] = useState<any>(undefined);

  //get all studentts leavs
  useEffect(() => {
    async function fetchData() {
      const response = await axiosInstance("/admin/leaves/today");
      console.log("result : ", response.data);
      //    setStudentLeaveHistoryToday(response.data.data);
      //  setTotalCountToday(response.data.count);
      // setTodayNightLeaves({
      //   count: response.data.count.night,
      //   leaves: response.data.data.night,
      // });

      // settodayMorningLeaves({
      //   count: response.data.count.morning,
      //   leaves: response.data.data.morning,
      // });

      setTodayLeaves({
        count: {
          morning: response.data.count.morning,
          night: response.data.count.night,
        },
        data: {
          morning: response.data.data.morning,
          night: response.data.data.night,
        },
      });
    }
    fetchData();
  }, []);

  //api call
  //react-query
  // const { isError, isLoading, data, error } = useQuery({
  //   queryKey: ["Messmenu"],
  //   queryFn: async () => {
  //     const response = await axiosInstance("/attendace");
  //     console.log("API called only once...");
  //     return response?.data?.data?.menu;
  //   },
  //   staleTime: Infinity,        // never becomes stale
  //   gcTime: Infinity,           // never garbage collect cached data
  //   refetchOnWindowFocus: false,
  //   refetchOnReconnect: false,
  //   refetchOnMount: false,
  //   retry: false,               // optional: no retries if it fails
  // });

  async function fetchAttendace() {
    setIsLoading(true);
    //chech date
    if (!selectedDate) return null;

    try {
      const response = await axiosInstance.get("/attendance/date", {
        params: {
          date: selectedDate,
        },
      });
      //check no attendace
      if (!response.data) {
        // alert("no attendace ! ");
        toast.warning("Not Record Of This Date!");
        return;
      }

      setAttendaces(response.data?.students);
      toast.success(" Record fetch Successfully");
    } catch (error) {
      console.log("eror :", error);
      alert("fetch attendace Error!");
    } finally {
      setIsLoading(false);
    }
  }

  //fetch today attendance
  const { isLoading, data, isError, error } = useQuery<any>({
    queryKey: ["todayAttendance"],
    queryFn: async () => {
      const response = await axiosInstance("/attendance/today");
      return response.data?.students || [];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  // console.log("today data : ", data);
  console.log("error : ", error, isError);

  return (
    <AdminLayout currentPage="Attendance">
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Title Section */}
            <div className="w-full">
              <h1 className="text-3xl font-bold">Students Attendance</h1>
              <p className="text-muted-foreground">
                View and manage student attendance for today in real time
              </p>
            </div>

            {/* Cards Section */}
            <div className="w-full mb-2.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Today Leaves */}
                <div className="p-6 rounded-2xl border shadow bg-gradient-to-br from-yellow-500/20 to-blue-700/20 hover:shadow-xl transition-all duration-200">
                  <h3 className="text-lg font-semibold mb-1">
                    Today {leaveType && leaveType}
                  </h3>
                  <p className="text-4xl font-bold tracking-tight">
                    {leaveType === "Night Leaves"
                      ? todayLeaves?.count?.night
                      : todayLeaves?.count?.moring}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Recent leaves
                  </p>
                </div>

                {/* Estimation */}
                <div className="p-6 rounded-2xl border shadow-sm bg-gradient-to-br from-yellow-500/20 to-orange-700/20 hover:shadow-md transition-all duration-200">
                  <h3 className="text-lg font-semibold mb-1">Estimation</h3>
                  <p className="text-4xl font-bold tracking-tight">0</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Leave — Attendance
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Tabs value={tab} onValueChange={setTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="todayLeves">TodayLeves</TabsTrigger>
            </TabsList>

            <TabsContent value="today">
              {isLoading && <h1 className="text-green-700">Loading.....</h1>}
              {/* {isError && <h1 className="text-red-500 font-semibold">Server error. Please try again later.</h1>} */}
              {!data && isError ? (
                <>
                  <h1 className="text-red-400">
                    Today's records are not updated on the server yet. Please
                    wait...
                  </h1>
                </>
              ) : (
                <>
                  <Card className="bg-background backdrop-blur-lg hover:shadow-lg transition">
                    {/* <CardHeader>
          <CardTitle>🗓️ Weekly Menu</CardTitle>
          </CardHeader> */}
                    <CardContent>
                      <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white dark:bg-blue-600 p-1 my-0.5"
                      >
                        <BadgeCheckIcon />
                        Total Count : { data?.length || 0}
                      </Badge>
                      <table className="w-full text-sm text-left">
                        <thead className="border-b">
                          <tr>
                            <th>Stud_ID</th>
                            <th>Name</th>
                            <th>Date-Time</th>
                            {/* <th>Dinner</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {data &&
                            data?.map((item: any) => (
                              <tr>
                                <td className="py-2">{item?.ID}</td>
                                <td className="py-2">{item?.Name}</td>
                                <td className="py-2">{item?.DateTime}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            <TabsContent value="history">
              <div className="font-sans max-w-4xl my-10 mx-auto p-6 shadow-lg rounded-lg bg-white">
                {/* --- Professional Title Area --- */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <h1 className="m-0 mb-1 text-2xl font-bold text-slate-800">
                    Past Attendance Records
                  </h1>
                  <p className="m-0 text-gray-600">
                    Select a Date And Check Attendace
                  </p>
                </div>

                {/* --- Labeled Controls UI --- */}
                <div className="flex flex-wrap gap-5 items-end mb-5">
                  {/* Start Date Input with Label */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="startDate"
                      className="mb-1 font-bold text-gray-800"
                    >
                      {" "}
                      Date
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDate(e.target.value)
                      }
                      className="dark:text-black p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  {/* Fetch Button */}
                  <button
                    hidden={!selectedDate}
                    onClick={() => fetchAttendace()}
                    // disabled={isLoading}
                    className="py-2 px-5 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isLoading2 ? "Fetching..." : "Attendace"}
                  </button>
                </div>
              </div>
              {attendaces && (
                <Card className="bg-background backdrop-blur-lg hover:shadow-lg transition">
                  {/* <CardHeader>
          <CardTitle>🗓️ Weekly Menu</CardTitle>
          </CardHeader> */}
                  <CardContent>
                    <Badge
                      variant="secondary"
                      className="bg-blue-500 text-white dark:bg-blue-600 p-1 my-0.5"
                    >
                      <BadgeCheckIcon />
                      Total Count : {attendaces.length || 0}
                    </Badge>
                    <table className="w-full text-sm text-left">
                      <thead className="border-b">
                        <tr>
                          <th>Stud_ID</th>
                          <th>Name</th>
                          <th>Date-Time</th>
                          {/* <th>Dinner</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {attendaces &&
                          attendaces?.map((item: any) => (
                            <tr>
                              <td className="py-2">{item?.ID}</td>
                              <td className="py-2">{item?.Name}</td>
                              <td className="py-2">{item?.DateTime}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="todayLeves">
              {/* --- Title --- */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Today Mess Leaves
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Morning and Night mess leave details for today
                </p>
              </div>

              {/* --- Summary Cards --- */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg border bg-blue-50 border-blue-200 p-4">
                  <p className="text-sm text-blue-700 font-medium">
                    Morning Leaves
                  </p>
                  <p className="text-3xl font-bold text-blue-800">
                    {todayLeaves?.count?.morning || 0}
                  </p>
                </div>

                <div className="rounded-lg border bg-purple-50 border-purple-200 p-4">
                  <p className="text-sm text-purple-700 font-medium">
                    Night Leaves
                  </p>
                  <p className="text-3xl font-bold text-purple-800">
                    {todayLeaves?.count?.night || 0}
                  </p>
                </div>
              </div>

              {/* --- Morning Leaves List --- */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-700 dark:text-orange-400 mb-3">
                  Morning Leave List
                </h2>

                {todayLeaves?.count?.morning > 0 ? (
                  <div className="space-y-3">
                    {todayLeaves.data.morning.map((leave: any) => (
                      <div
                        key={leave._id}
                        className="flex justify-between items-center p-4 rounded-lg border bg-white dark:bg-slate-900"
                      >
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">
                            Student ID: {leave.student_id}
                          </p>
                          <p className="text-sm text-gray-500">
                            Reason: {leave.reason}
                          </p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                          Morning
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    No morning leave today
                  </p>
                )}
              </div>

              {/* --- Night Leaves List --- */}
              <div>
                <h2 className="text-lg font-semibold text-slate-700 dark:text-orange-400 mb-3">
                  Night Leave List
                </h2>

                {todayLeaves?.count?.night > 0 ? (
                  <div className="space-y-3">
                    {todayLeaves.data.night.map((leave: any) => (
                      <div
                        key={leave._id}
                        className="flex justify-between items-center p-4 rounded-lg border bg-white dark:bg-slate-900"
                      >
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">
                            Student ID: {leave.student_id}
                          </p>
                          <p className="text-sm text-gray-500">
                            Reason: {leave.reason}
                          </p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                          Night
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No night leave today</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </AdminLayout>
  );
}

export default AdminAttendence;
