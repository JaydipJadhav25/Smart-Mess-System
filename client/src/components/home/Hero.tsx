
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, AlarmClock, Home } from "lucide-react";
import LightRays from "../ui/LightRays";
// import { useEffect } from "react";

export default function Hero() {
  const now = new Date();
  const hour = now.getHours();

  let nextMeal = "";
  if (hour < 10) {
    nextMeal = "🥣 Breakfast";
  } else if (hour < 16) {
    nextMeal = "🍛 Lunch";
  } else {
    nextMeal = "🍽️ Dinner";
  }

  const isOpen = hour >= 7 && hour < 21;
  const timeNow = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const mode  = localStorage.getItem("vite-ui-theme");

//  useEffect(() => {
//   window.location.reload();
// }, [mode]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Light Rays */}
      {
        mode === "dark" ?  <div className="absolute inset-0 -z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div> : <></>
      }
      {/* Foreground Content */}
      <div className="relative p-6 space-y-6">
        {/* Hero Section */}
        <div className="bg-background/80 backdrop-blur-md rounded-xl p-6 text-center space-y-1 shadow-lg">
          <h1
            className="
              text-3xl font-bold 
              transition-colors 
              bg-gradient-to-r from-blue-500 to-blue-700 
              bg-clip-text text-transparent 
              dark:from-orange-600 dark:to-blue-800
            "
          >
            Smart Mess System
          </h1>
          <p className="text-muted-foreground text-sm">Eat Smart, Live Smart</p>
        </div>

        {/* Mess Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div
            data-aos="fade-right"
            className="p-6 rounded-lg border flex flex-col items-center text-center 
                       hover:bg-primary/10 transition duration-300 ease-in-out cursor-pointer
                       bg-background/80 backdrop-blur-md shadow-md"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Mess Status</h3>
            <p className={`text-2xl font-bold ${isOpen ? "text-green-600" : "text-red-600"}`}>
              {isOpen ? "Open" : "Closed"}
            </p>
          </div>

          <div
            data-aos="fade-up"
            className="p-6 rounded-lg border flex flex-col items-center text-center 
                       hover:bg-primary/10 transition duration-300 ease-in-out cursor-pointer
                       bg-background/80 backdrop-blur-md shadow-md"
          >
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Utensils className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-medium">Current Meal</h3>
            <p className="text-2xl font-bold">{nextMeal}</p>
          </div>

          <div
            data-aos="fade-left"
            className="p-6 rounded-lg border flex flex-col items-center text-center 
                       hover:bg-primary/10 transition duration-300 ease-in-out cursor-pointer
                       bg-background/80 backdrop-blur-md shadow-md"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <AlarmClock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Time Now</h3>
            <p className="text-2xl font-bold">{timeNow}</p>
          </div>
        </div>

        {/* Menu Schedule */}
        <Card className="bg-background/80 backdrop-blur-md hover:shadow-lg transition shadow-md">
          <CardHeader>
            <CardTitle>📅 Today's Menu</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm text-left">
              <thead className="border-b">
                <tr>
                  <th>Meal</th>
                  <th>Time</th>
                  <th>Menu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Breakfast</td>
                  <td>8:00 AM</td>
                  <td>Idli + Sambar</td>
                </tr>
                <tr>
                  <td>Lunch</td>
                  <td>1:00 PM</td>
                  <td>Rice, Dal, Veg Curry</td>
                </tr>
                <tr>
                  <td>Dinner</td>
                  <td>7:30 PM</td>
                  <td>Roti, Paneer, Salad</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
