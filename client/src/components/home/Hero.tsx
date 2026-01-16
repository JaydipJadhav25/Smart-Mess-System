// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, AlarmClock, Home } from "lucide-react";
// import LightRays from "../ui/LightRays";
// import { useEffect } from "react";
// import {
//   Calendar,
//   Sun,
//   Moon,
//   Star,
//   CheckCircle,
//   RefreshCw,
//   Clock,
// } from "lucide-react";
import { Link } from "react-router-dom";
import HowItWorksSection from "./HowItWorksSection";

// import { LayoutTextFlip } from "../ui/layout-text-flip";
// import { PointerHighlight } from "../ui/pointer-highlight";
// import { Button } from "@headlessui/react";
// import LaserFlow from "../ui/LaserFlow";

export default function Hero() {
  // const navigate = useNavigate();

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
        <div className="container bg-background/0 mx-auto">
          <div className="relative overflow-hidden bg-background/0 text-white">
            {/* Background Grid Lines */}

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_60px]" />
              {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" /> */}
            </div>

            <div className="relative container mx-auto px-6 py-12">
              <div className="relative flex flex-col items-center text-center">
                {/* Left Illustration */}

                {/* Eyebrow */}
                <p className="mb-4 text-sm font-medium tracking-widest text-primary uppercase">
                  Smart Mess System
                </p>

                {/* Heading */}
                {/* <h1 className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                  A complete digital platform for
                  <span className="block text-orange-400">
                    modern mess management
                  </span>
                </h1> */}

                {/* Heading */}
           {/* <h1 className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
  Modern
  <span className="block text-primary">
    mess management
  </span>
</h1> */}

<h1 className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-black dark:text-white">
  One platform for
  <span className="block text-primary">
    intelligent mess management
  </span>
</h1>

                {/* Description */}
                {/* <p className="mt-6 max-w-2xl text-lg text-slate-300">
                  Simplify meal scheduling, attendance, payments, and analytics
                  with a centralized system designed for efficiency and
                  transparency.
                </p> */}

             
                {/* Feature Pills */}
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  {[
                     "Automation",
                    "Face Attendance",
                    "Payments",
                    "Analytics",
                    "Blockchain Security"
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/10 px-4 py-1 text-sm text-black dark:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                 
                    {/* Description */}
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                 AI-driven face attendance and smart mess automation.
Secured with blockchain for reliable, transparent operations.
                </p>

                {/* CTA */}
                <div className="mt-10">
                  <Link to={"/profile"}>
                    <button className="rounded-md bg-orange-500 px-8 py-3 text-sm font-semibold text-black hover:bg-orange-400 transition">
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </div>

   {/* Right Illustration */}
            <img
              src="/left.png"
              alt="AI & ML Illustration"
              className="
    hidden lg:block
    absolute
    left-1
    bottom-4
    w-72 xl:w-80
    opacity-90
    pointer-events-none
  "
            />

            {/* Right Illustration */}
            <img
              src="/right.png"
              alt="Secure Blockchain Illustration"
              className="
    hidden lg:block
    absolute
    right-1
    bottom-2
    w-72 xl:w-80
    opacity-90
    pointer-events-none
  "
            />

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
            <p
              className={`text-2xl font-bold ${
                isOpen ? "text-green-600" : "text-red-600"
              }`}
            >
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
              <Utensils className="h-6 w-6 text-primary" />
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

        {/* how is work */}
        <HowItWorksSection/>
         


        
      </div>
    </div>
  );
}




        // {/* Menu Schedule */}
        // <Card
        //   onClick={() => {
        //     navigate("/today");
        //   }}
        //   className="bg-background/95 backdrop-blur-lg hover:shadow-xl transition-all duration-300 shadow-lg cursor-pointer"
        // >
        //   <CardHeader className="pb-4">
        //     <div className="flex items-center justify-between">
        //       <CardTitle className="text-xl font-semibold flex items-center gap-2">
        //         <Calendar className="h-6 w-6 text-indigo-600" />
        //         Today's Menu
        //       </CardTitle>
        //       <div className="text-sm text-gray-500 font-medium">
        //         {new Date().toLocaleDateString("en-US", {
        //           weekday: "long",
        //           year: "numeric",
        //           month: "long",
        //           day: "numeric",
        //         })}
        //       </div>
        //     </div>
        //   </CardHeader>
        //   <CardContent className="pt-0">
        //     <div className="overflow-hidden rounded-lg border border-gray-200">
        //       <table className="w-full text-sm">
        //         <thead className="bg-background">
        //           <tr>
        //             <th className="px-4 py-3 text-left font-semibold border-b">
        //               Meal
        //             </th>
        //             <th className="px-4 py-3 text-left font-semibold border-b">
        //               Timing
        //             </th>
        //             <th className="px-4 py-3 text-left font-semibold border-b">
        //               Menu
        //             </th>
        //             <th className="px-4 py-3 text-center font-semibold border-b">
        //               Status
        //             </th>
        //           </tr>
        //         </thead>
        //         <tbody className="divide-y divide-gray-100">
        //           <tr className="">
        //             <td className="px-4 py-4">
        //               <div className="flex items-center gap-2">
        //                 <Sun className="h-5 w-5 text-yellow-500" />
        //                 <span className="font-medium">Breakfast</span>
        //               </div>
        //             </td>
        //             <td className="px-4 py-4">
        //               <div className="flex items-center gap-1">
        //                 <Clock className="h-4 w-4 text-indigo-600" />
        //                 <span className="text-indigo-600 font-medium">
        //                   8:00 AM – 10:00 AM
        //                 </span>
        //               </div>
        //             </td>
        //             <td className="px-4 py-4">
        //               <div className="space-y-1">
        //                 <div className="font-medium">South Indian Special</div>
        //                 <div className="text-gray-600 text-xs">
        //                   Idli, Sambar, Coconut Chutney
        //                 </div>
        //               </div>
        //             </td>
        //             <td className="px-4 py-4 text-center">
        //               <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        //                 <CheckCircle className="h-4 w-4 mr-1" />
        //                 Available
        //               </span>
        //             </td>
        //           </tr>
        //           <tr className="">
        //             <td className="px-4 py-4">
        //               <div className="flex items-center gap-2">
        //                 <Star className="h-5 w-5 text-orange-400" />
        //                 <span className="font-medium">Lunch</span>
        //               </div>
        //             </td>
        //             <td className="px-4 py-4">
        //               <div className="flex items-center gap-1">
        //                 <RefreshCw className="h-4 w-4 text-indigo-600" />
        //                 <span className="text-indigo-600 font-medium">
        //                   12:30 PM – 2:30 PM
        //                 </span>
        //               </div>
        //             </td>
        //             <td className="px-4 py-4">
        //               <div className="space-y-1">
        //                 <div className="font-medium">Complete Thali</div>
        //                 <div className="text-gray-600 text-xs">
        //                   Rice, Dal Tadka, Mix Veg Curry, Pickle
        //                 </div>
        //               </div>
        //             </td>
        //             <td className="px-4 py-4 text-center">
        //               <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        //                 <RefreshCw className="h-4 w-4 mr-1" />
        //                 Serving
        //               </span>
        //             </td>
        //           </tr>
        //           <tr className="">
        //             <td className="px-4 py-4">
        //               <div className="flex items-center gap-2">
        //                 <Moon className="h-5 w-5 text-blue-600" />
        //                 <span className="font-medium">Dinner</span>
        //               </div>
        //             </td>
        //             <td className="px-4 py-4">
        //               <div className="flex items-center gap-1">
        //                 <Clock className="h-4 w-4 text-indigo-600" />
        //                 <span className="text-indigo-600 font-medium">
        //                   7:30 PM – 9:30 PM
        //                 </span>
        //               </div>
        //             </td>
        //             <td className="px-4 py-4">
        //               <div className="space-y-1">
        //                 <div className="font-medium">North Indian Delights</div>
        //                 <div className="text-gray-600 text-xs">
        //                   Butter Roti, Paneer Butter Masala, Salad
        //                 </div>
        //               </div>
        //             </td>
        //             <td className="px-4 py-4 text-center">
        //               <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        //                 <Clock className="h-4 w-4 mr-1" />
        //                 Upcoming
        //               </span>
        //             </td>
        //           </tr>
        //         </tbody>
        //       </table>
        //     </div>

        //     {/* Legend and Timestamp */}
        //     <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        //       <div className="flex items-center gap-4">
        //         <span className="flex items-center gap-1">
        //           <CheckCircle className="h-3 w-3 text-green-500" />
        //           Available
        //         </span>
        //         <span className="flex items-center gap-1">
        //           <RefreshCw className="h-3 w-3 text-yellow-500" />
        //           Serving
        //         </span>
        //         <span className="flex items-center gap-1">
        //           <Clock className="h-3 w-3 text-blue-500" />
        //           Upcoming
        //         </span>
        //       </div>
        //       <div className="flex items-center gap-1">
        //         <Calendar className="h-4 w-4 text-gray-400" />
        //         <span>Last updated: {new Date().toLocaleTimeString()}</span>
        //       </div>
        //     </div>
        //   </CardContent>
        // </Card>


