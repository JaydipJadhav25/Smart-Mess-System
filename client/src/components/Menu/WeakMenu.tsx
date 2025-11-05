import { Card, CardContent, } from "@/components/ui/card";
import { axiosInstance } from "@/config/axiosInstances";
import { useQuery } from "@tanstack/react-query";
import { Loader2  } from "lucide-react";










export default function WeakMenu() {



  
//api call
  //react-query
const { isError, isLoading, data, error } = useQuery({
  queryKey: ["Messmenu"],
  queryFn: async () => {
    const response = await axiosInstance("/menu");
    console.log("API called only once...");
    return response?.data?.data?.menu;
  },
  staleTime: Infinity,        // never becomes stale
  gcTime: Infinity,           // never garbage collect cached data
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  retry: false,               // optional: no retries if it fails
});



// console.log("data : " , data)
console.log("error : " , error)








  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Hero Section */}
      <div className="bg-background backdrop-blur-lg rounded-xl p-6 text-center space-y-1">
        <h1 className="text-3xl font-bold hover:text-primary transition-colors"> Weekly Menu</h1>
        <p className="text-muted-foreground text-sm">
            {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
      </div>

     {
      isLoading ? <>
              {/* <h1 className="text-green-400">Loading....</h1> */}
               <div className="bg-background flex flex-col items-center justify-center min-h-screen text-gray-700 dark:text-white">
        <Loader2 className="animate-spin w-12 h-12 text-blue-500 mb-4" />
        <h2 className="text-xl font-semibold">Loading, please wait...</h2>
        <p className="text-sm text-gray-500 mt-2">
          Fetching latest data from the server.
        </p>
      </div>
      </>:<>
        {
          isError ? <>
              <h1 className="text-red-400">Check Network connection!</h1>
          
          </>:<>
           {/* Weekly Menu */}
      <Card className="bg-background backdrop-blur-lg hover:shadow-lg transition">
        {/* <CardHeader>
          <CardTitle>🗓️ Weekly Menu</CardTitle>
        </CardHeader> */}
        <CardContent>
          <table className="w-full text-sm text-left">
            <thead className="border-b">
              <tr>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item: any) => (
                <tr
                  key={item.day}
                  className={
                    item.day === today ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-muted/40"
                  }
                >
                  <td className="py-2 font-medium px-0.5">{item.day}</td>
                   <td className="py-2">
                      {item.meals.breakfast.items.join(", ")}
                    </td>
                    <td className="py-2">
                      {item.meals.lunch.items.join(", ")}
                    </td>
                    <td className="py-2">
                      {item.meals.dinner.items.join(", ")}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent> 
      </Card>
          </>
        }
      </>
     }


    </div>
  );
}
