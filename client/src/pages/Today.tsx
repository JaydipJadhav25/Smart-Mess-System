
import Loading from "@/components/flashPages/Loading";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { BarChart, Bar, XAxis, YAxis,  CartesianGrid } from "recharts";
import {useQuery } from "@tanstack/react-query"
import { axiosInstance } from "@/config/axiosInstances";
import { useNavigate } from "react-router-dom";
import { Loader2, WifiOff } from "lucide-react";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


export default function TodayNutrition() {

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



console.log("data : " , data);
console.log("error : " , error);
  

// if (isLoading) return <p>Loading...</p>;
// if (isError) return <p>Error fetching data</p>;



  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-background flex flex-col items-center justify-center min-h-screen text-gray-700 dark:text-white">
        <Loader2 className="animate-spin w-12 h-12 text-blue-500 mb-4" />
        <h2 className="text-xl font-semibold">Loading, please wait...</h2>
        <p className="text-sm text-gray-500 mt-2">
          Fetching latest data from the server.
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-gray-800">
        <WifiOff className="w-14 h-14 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Connection Error</h2>
        <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
          We couldn’t fetch the data. Please check your internet connection or
          try again later.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all"
        >
          Go Back Home
        </button>
      </div>
    );
  }


  const todayIndex = new Date().getDay(); // Sunday=0
  
  // Map Sunday=0 → index 6, Monday=1 → index 0, etc.
  const mapDayIndex = [6, 0, 1, 2, 3, 4, 5];
  // const mapDayIndex = [4, 5, 2, 3, 0, 1, 6];// as per my online-Db
  const today = data[mapDayIndex[todayIndex]] ;
  // const today = data?.data?.[mapDayIndex[todayIndex]];


  console.log("today : " , today);

  // const meals = [
  //   { name: "Breakfast", data: today.meals.breakfast.nutrition, image: today.meals.breakfast?.image || " "},
  //   { name: "Lunch", data: today.meals.lunch.nutrition, image: today.meals.lunch?.image|| " " },
  //   { name: "Dinner", data: today.meals.dinner.nutrition, image: today.meals.dinner?.image || " "},
  // ];

  const dummyImages = {
  breakfast: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
  lunch: "https://images.unsplash.com/photo-1600891964330-33c5e1c5d4b2?auto=format&fit=crop&w=400&q=80",
  dinner: "https://images.unsplash.com/photo-1600891964182-611d9f86392d?auto=format&fit=crop&w=400&q=80",
};


  const meals = [
  {
    name: "Breakfast",
    data: today?.meals.breakfast.nutrition,
    items: today?.meals.breakfast?.items || [],
    image: today?.meals.breakfast?.image || dummyImages.breakfast,
  },
  {
    name: "Lunch",
    data: today?.meals.lunch.nutrition,
    items: today?.meals.lunch?.items || [],
    image: today?.meals.lunch?.image || dummyImages.breakfast,
  },
  {
    name: "Dinner",
    data: today?.meals.dinner.nutrition,
    items: today?.meals.dinner?.items || [],
    image: today?.meals.dinner?.image || dummyImages.breakfast,
  },
];


// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// // Recommended daily intake (approximate values for adults)
// const recommendedNutrition = [
//   { name: "Calories", value: 2000 },
//   { name: "Protein", value: 50 },  // grams
//   { name: "Carbs", value: 275 },   // grams
//   { name: "Fat", value: 70 },      // grams
// ];

const recommendedNutrition = [
  { nutrient: "Calories (kcal)", value: 2000 },
  { nutrient: "Protein (g)", value: 50 },
  { nutrient: "Carbs (g)", value: 275 },
  { nutrient: "Fat (g)", value: 70 },
];


  return (
    <div className="min-h-screen flex flex-col">
      <Loading />
      <Navbar />
      <main className="flex-1 p-6 space-y-6">

    <div className="bg-background backdrop-blur-lg rounded-xl p-6 text-center space-y-1">
     {/* <h1 className="text-3xl font-bold text-center mb-6">{today.day} Meals &  <PointerHighlight>
        <span> Nutrition</span>
      </PointerHighlight></h1> */}
      <h1 className="text-3xl font-bold text-center mb-6">{today && today.day || " "} Meals & <PointerHighlight containerClassName="inline-block">Nutrition</PointerHighlight></h1>

      </div>
       {

        isLoading ? <>
                <h1 className="text-green-600">Loading....!</h1>
        </>:<>
          {
            isError ? <>
                     <h1 className="text-red-500"> Check NetWork Connectio!</h1>
            </>:<>
             <div className="grid md:grid-cols-3 gap-6">
          {meals && meals.map((meal) => {
            const chartData = [
              { name: "Calories(kcal)", value: meal.data?.calories },
              { name: "Protein(g)", value: meal.data?.protein },
              { name: "Carbs(g)", value: meal.data?.carbs },
              { name: "Fat(g)", value: meal.data.fat },
            ];

            return (
           <Card key={meal.name} className="shadow-lg hover:shadow-2xl transition bg-background border-2">
     <CardHeader>
     <CardTitle className="text-xl">{meal.name}</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center space-y-4">
    {/* Meal Image */}
       {/* <img src={meal.image} alt={meal.name} className="w-40 h-40 object-cover rounded-lg shadow-md" /> */}

              {/* Meal Items */}
            <div className="flex flex-wrap justify-center gap-2">
              {meal.items.map((item : any, idx : number) => (
                <span
                  key={idx}
                  className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>


    {/* Nutrition Pie Chart */}
    <PieChart width={250} height={250}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {chartData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  </CardContent>
           </Card>

            );
          })}
        </div>
            </>
          }
        </>

       }



      {/* recomaedation netrutionn */}
      <div>
        <Card className="shadow-lg hover:shadow-2xl transition bg-background border-2">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Recommended Daily Nutrition
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <BarChart
          width={350}
          height={250}
          data={recommendedNutrition}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nutrient" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {recommendedNutrition.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>

        <div className="text-sm text-muted-foreground space-y-1 text-center">
          <p>Calories: 2000 kcal</p>
          <p>Protein: 50 g</p>
          <p>Carbs: 275 g</p>
          <p>Fat: 70 g</p>
        </div>
      </CardContent>
    </Card>

      </div>
      </main>
      <Footer />
    </div>
  );
}