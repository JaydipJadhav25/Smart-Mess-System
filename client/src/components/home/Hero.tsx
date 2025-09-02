import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Utensils,  AlarmClock,  Home } from "lucide-react";

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


  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Hero Section */}
            <div className="bg-background backdrop-blur-lg rounded-xl p-6 text-center space-y-1">
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
              <p className="text-muted-foreground text-sm">
                Eat Smart, Live Smart
              </p>
            </div>


      {/* Mess Overview */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-background backdrop-blur-lg hover:shadow-lg transition">
          <CardContent className="pt-4">
            <h3 className="text-lg font-medium">🍛 Meals Served Today</h3>
            <p className="text-2xl font-bold">128</p>
          </CardContent>
        </Card>

        <Card className="bg-background backdrop-blur-lg hover:shadow-lg transition">
          <CardContent className="pt-4">
            <h3 className="text-lg font-medium">📋 Leaves Reported</h3>
            <p className="text-2xl font-bold">7</p>
          </CardContent>
        </Card>

        <Card className="bg-background backdrop-blur-lg hover:shadow-lg transition">
          <CardContent className="pt-4">
            <h3 className="text-lg font-medium">🕐 Next Meal</h3>
            <p className="text-2xl font-bold">Dinner @ 7:30 PM</p>
          </CardContent>
        </Card>
      </div> */}


       {/* Mess Overview */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-background backdrop-blur-lg hover:shadow-lg transition">
          <CardContent className="pt-4">
            <h3 className="text-lg font-medium">🚪 Mess Status</h3>
            <p className={`text-2xl font-bold ${isOpen ? "text-green-600" : "text-red-600"}`}>
              {isOpen ? "Open" : "Closed"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background backdrop-blur-lg hover:shadow-lg transition">
          <CardContent className="pt-4">
            <h3 className="text-lg font-medium">🕐 Current Meal</h3>
            <p className="text-2xl font-bold">{nextMeal}</p>
          </CardContent>
        </Card>

        <Card className="bg-background backdrop-blur-lg hover:shadow-lg transition">
          <CardContent className="pt-4">
            <h3 className="text-lg font-medium">🧭 Time Now</h3>
            <p className="text-2xl font-bold">{timeNow}</p>
          </CardContent>
        </Card>
      </div> */}

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div
           data-aos="fade-right"
          className="p-6 rounded-lg border flex flex-col  items-center text-center hover:bg-primary/10 transition duration-300 ease-in-out cursor-pointer">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Home className="h-6 w-6 text-primary" />
            </div>
            {/* <h3 className="text-xl font-semibold mb-2">20+ Projects</h3>
            <p className="text-muted-foreground">Successfully completed by students</p> */}
              <h3 className="text-lg font-medium">Mess Status</h3>
            <p className={`text-2xl font-bold ${isOpen ? "text-green-600" : "text-red-600"}`}>
              {isOpen ? "Open" : "Closed"}
            </p>
          </div>
          
          <div
          data-aos="fade-up"
          className="p-6 rounded-lg border flex flex-col items-center text-center hover:bg-primary/10 transition duration-300 ease-in-out cursor-pointer">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Utensils className="h-6 w-6 text-secondary" />
            </div>
             <h3 className="text-lg font-medium">Current Meal</h3>
            <p className="text-2xl font-bold">{nextMeal}</p>
          </div>
          
          <div
          data-aos="fade-left"
          className="p-6 rounded-lg border flex flex-col items-center text-center hover:bg-primary/10 transition duration-300 ease-in-out cursor-pointer">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <AlarmClock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Time Now</h3>
            <p className="text-2xl font-bold">{timeNow}</p>
          </div>
        </div>

      {/* Menu Schedule */}
      <Card className="bg-background backdrop-blur-lg hover:shadow-lg transition">
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

      {/* Announcements */}
      <Card className="bg-background backdrop-blur-lg hover:shadow-lg transition">
        <CardHeader>
          <CardTitle>📢 Announcements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>⚠️ Mess will be closed on Aug 15 for cleaning.</p>
          <p>🆕 New feedback system launched.</p>
        </CardContent>
      </Card>

      {/* Mission Statement */}
      <Card className="bg-background backdrop-blur-lg hover:shadow-lg transition">
        <CardHeader>
          <CardTitle>🎯 About This System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Our goal is to streamline mess operations with real-time insights, easy leave reporting,
            and transparent meal planning for all students and staff.
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/report" className="w-full">
          <Button className="w-full bg-background backdrop-blur-lg hover:scale-[1.02] transition">
            📤 Report Leave
          </Button>
        </Link>
        <Link to="/menu" className="w-full">
          <Button className="w-full bg-background backdrop-blur-lg hover:scale-[1.02] transition" variant="outline">
            📥 View Menu
          </Button>
        </Link>
        <Link to="/feedback" className="w-full">
          <Button className="w-full bg-background backdrop-blur-lg hover:scale-[1.02] transition" variant="secondary">
            💬 Give Feedback
          </Button>
        </Link>
      </div>
    </div>
  );
}
