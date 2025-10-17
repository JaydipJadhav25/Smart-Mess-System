
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, AlarmClock, Home } from "lucide-react";
// import LightRays from "../ui/LightRays";
// import { useEffect } from "react";
import { Calendar, Sun, Moon, Star, CheckCircle, RefreshCw, Clock } from 'lucide-react';
  import { useNavigate } from 'react-router-dom';
import { LayoutTextFlip } from "../ui/layout-text-flip";
// import { PointerHighlight } from "../ui/pointer-highlight";
// import { Button } from "@headlessui/react";
// import LaserFlow from "../ui/LaserFlow";


export default function Hero() {
    const navigate = useNavigate();

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

  // const mode  = localStorage.getItem("vite-ui-theme");

//  useEffect(() => {
//   window.location.reload();
// }, [mode]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Light Rays */}
      {/* {
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
      } */}
      {/* Foreground Content */}
      <div className="relative p-6 space-y-6">
        {/* Hero Section */}
        {/* <div className="bg-background/80 backdrop-blur-md rounded-xl p-6 text-center space-y-1 shadow-lg">
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
        </div> */}
         
   
{/* <div style={{ height: '500px', position: 'relative', overflow: 'hidden' }}>
  <LaserFlow />
</div> */}


        {/* <div className="container px-4 py-24 mx-auto"> */}
  <div className="container px-4 pb-4 pt-4 mx-auto">
    <div className="flex flex-col lg:flex-row items-center gap-12">
      
      {/* Left section with text */}
      <div
        className="flex-1 text-left space-y-6"  
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          {/* <img
            src="/logo.png"
            alt="Department Logo"
            className="w-24 h-24 object-contain rounded-xl shadow-md ring-1 ring-muted"

          /> */}
          {/* <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">Exploding beams.</span>
          </div> */}
          {/* <span className="block mt-2  bg-clip-text bg-no-repeat dark:text-transparent bg-gradient-to-r py-4 from-purple-700 via-violet-200 to-pink-700 [text-shadow:0_0_rgba(0,0,0,0.1)]"> */}
          <span className="block mt-2  bg-clip-text text-blue-950 dark:text-white">
            {/* Smart Mess Platfrom */}
             {/* <LayoutTextFlip
          text="Welcome to "
          words={["Smart Mess Platfrom", "Fight Club", "The Matrix", "The Jungle"]}
        /> */}
              <LayoutTextFlip
                text="Smart Mess "
                words={[
                  "Platform",
                  "AI",
                  "Automation",
                  "Tracking",
                  "Dashboard",
                  "Sustainability"
                ]}
              />



            </span>
     
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
        A comprehensive web-based platform designed to simplify mess operations.
            From meal scheduling to payments, everything is managed digitally.
            Enhancing transparency, efficiency, and convenience for every student.
        </p>

        {/* <div className="flex flex-wrap items-center gap-4 pt-4" data-aos="fade-up" data-aos-delay="300"> */}
        {/* <div className="flex flex-wrap items-center gap-4 pt-4">
          <Button size="lg" className="gap-2" asChild>
            <Link to="/events">
              <Terminal className="h-5 w-5" />
              Join Events
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link to="/members">
              <Users className="h-5 w-5" />
              Meet Our Team
            </Link>
          </Button>
        </div> */}

        {/* <div className="flex flex-wrap items-center gap-3 pt-6" data-aos="fade-up" data-aos-delay="400"> */}
        <div className="flex flex-wrap items-center gap-3 pt-6" >
                            {[
                        "Automation",
                        "Tracking",
                        "Analytics",
                        "Centralization",
                        "Optimization",
                        "Transparency",
                        "Integration",
                        "Sustainability"
                      ]
                  .map((tech, index) => (
            // <span key={tech} className="px-3 py-1 text-sm bg-muted rounded-full" data-aos="zoom-in" data-aos-delay={500 + index * 100}>
                    <span key={index+tech} className="px-3 py-1 text-sm bg-muted rounded-full"> 
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Right section with terminal */}
      
      <div className="flex-1 relativ flex justify-center" data-aos="fade-left">
        <div className="relative z-10 bg-backgroud p-1 rounded-lg border shadow-lg overflow-hidden w-3/4">
         
        <img src="/features/Centralized-System.png" alt="heropng" className=""/>
        </div>

        {/* Decorative elements */}
        {/* <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/20 rounded-full blur-xl" />
 */}

      </div>

    </div>
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
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Utensils className="h-6 w-6 text-primary"/>
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
  <Card
   onClick={()=>{
       navigate("/today")
   }}
  className="bg-background/95 backdrop-blur-lg hover:shadow-xl transition-all duration-300 shadow-lg cursor-pointer">
  <CardHeader className="pb-4">
    <div className="flex items-center justify-between">
      <CardTitle className="text-xl font-semibold flex items-center gap-2">
        <Calendar className="h-6 w-6 text-indigo-600" />
        Today's Menu
      </CardTitle>
      <div className="text-sm text-gray-500 font-medium">
        {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </div>
  </CardHeader>
  <CardContent className="pt-0">
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-background">
          <tr>
            <th className="px-4 py-3 text-left font-semibold border-b">Meal</th>
            <th className="px-4 py-3 text-left font-semibold border-b">Timing</th>
            <th className="px-4 py-3 text-left font-semibold border-b">Menu</th>
            <th className="px-4 py-3 text-center font-semibold border-b">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="">
            <td className="px-4 py-4">
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">Breakfast</span>
              </div>
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-indigo-600" />
                <span className="text-indigo-600 font-medium">8:00 AM – 10:00 AM</span>
              </div>
            </td>
            <td className="px-4 py-4">
              <div className="space-y-1">
                <div className="font-medium">South Indian Special</div>
                <div className="text-gray-600 text-xs">Idli, Sambar, Coconut Chutney</div>
              </div>
            </td>
            <td className="px-4 py-4 text-center">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                Available
              </span>
            </td>
          </tr>
          <tr className="">
            <td className="px-4 py-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-orange-400" />
                <span className="font-medium">Lunch</span>
              </div>
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4 text-indigo-600" />
                <span className="text-indigo-600 font-medium">12:30 PM – 2:30 PM</span>
              </div>
            </td>
            <td className="px-4 py-4">
              <div className="space-y-1">
                <div className="font-medium">Complete Thali</div>
                <div className="text-gray-600 text-xs">Rice, Dal Tadka, Mix Veg Curry, Pickle</div>
              </div>
            </td>
            <td className="px-4 py-4 text-center">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <RefreshCw className="h-4 w-4 mr-1" />
                Serving
              </span>
            </td>
          </tr>
          <tr className="">
            <td className="px-4 py-4">
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Dinner</span>
              </div>
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-indigo-600" />
                <span className="text-indigo-600 font-medium">7:30 PM – 9:30 PM</span>
              </div>
            </td>
            <td className="px-4 py-4">
              <div className="space-y-1">
                <div className="font-medium">North Indian Delights</div>
                <div className="text-gray-600 text-xs">Butter Roti, Paneer Butter Masala, Salad</div>
              </div>
            </td>
            <td className="px-4 py-4 text-center">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <Clock className="h-4 w-4 mr-1" />
                Upcoming
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    {/* Legend and Timestamp */}
    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3 text-green-500" />
          Available
        </span>
        <span className="flex items-center gap-1">
          <RefreshCw className="h-3 w-3 text-yellow-500" />
          Serving
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-blue-500" />
          Upcoming
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4 text-gray-400" />
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  </CardContent>
</Card>
   
      </div>
    </div>
  );
}
