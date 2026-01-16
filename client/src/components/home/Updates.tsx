import { Card } from "@/components/ui/card";
import { axiosInstance } from "@/config/axiosInstances";
import { useQuery } from "@tanstack/react-query";

function Updates() {
  const { isError, isLoading, data , error } = useQuery({
    queryKey: ["adminanncements"],
    queryFn: async () => {
      const response = await axiosInstance("/open/announcements");
      return response.data;
    }
  });

  // 1. Sort by date (newest first) and 2. Limit to top 4
  // const recentAnnouncements = data 
  //   ? [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4) 
  //   : [];


  console.log("anncounments : : " , data , error);

    // Sort by createdAt (newest first) and take the top 4
  // const recentAnnouncements = data
  //   ? [...data]
  //       .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  //       .slice(0, 4)
  //   : [];



    const recentAnnouncements = data 
    ? [...data].reverse().slice(0, 4) 
    : [];

  return (
    <div className="max-w-5xl mx-auto px-4 mt-24 mb-3">
      <div className="text-center mb-10">
        <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-4 py-1 rounded-full">
          📢 Important Updates
        </span>
        <h2 className="text-4xl font-bold mt-4 mb-2 tracking-tight text-primary">
          Stay In The Loop
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <h1 className="text-green-300 text-center col-span-2">Loading...</h1>
        ) : isError ? (
          <h1 className="text-red-500 text-center col-span-2">
            Server Error! Check your network connection.
          </h1>
        ) : (
          recentAnnouncements.map((announcement: any) => (
            <Card
              key={announcement._id}
              className="hover:shadow-xl transition-shadow border bg-background hover:bg-background/10 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary/10 text-primary rounded-full p-2">
                      📣
                    </div>
                    <h3 className="text-xl font-semibold">{announcement.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  {announcement.description}
                </p>
              </div>
              
              {/* Optional: Display how long ago it was posted */}
              {announcement.createdAt && (
                <p className="text-xs text-muted-foreground mt-4">
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </p>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Updates;