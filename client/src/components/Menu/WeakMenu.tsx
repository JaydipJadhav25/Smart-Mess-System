import { Card, CardContent, } from "@/components/ui/card";


const weeklyMenu = [
  {
    day: "Monday",
    meals: {
      breakfast: "Idli + Sambar",
      lunch: "Rice, Dal, Bhindi",
      dinner: "Roti, Paneer, Salad",
    },
  },
  {
    day: "Tuesday",
    meals: {
      breakfast: "Poha",
      lunch: "Rajma, Rice",
      dinner: "Chole, Roti",
    },
  },
  {
    day: "Wednesday",
    meals: {
      breakfast: "Dosa",
      lunch: "Sambar, Rice",
      dinner: "Paratha, Aloo Sabzi",
    },
  },
  {
    day: "Thursday",
    meals: {
      breakfast: "Upma",
      lunch: "Kadhi, Rice",
      dinner: "Roti, Mix Veg",
    },
  },
  {
    day: "Friday",
    meals: {
      breakfast: "Bread Butter",
      lunch: "Paneer Rice",
      dinner: "Dal, Roti",
    },
  },
  {
    day: "Saturday",
    meals: {
      breakfast: "Aloo Puri",
      lunch: "Veg Biryani",
      dinner: "Pav Bhaji",
    },
  },
  {
    day: "Sunday",
    meals: {
      breakfast: "Chole Bhature",
      lunch: "Fried Rice, Manchurian",
      dinner: "Pizza, Salad",
    },
  },
];

export default function WeakMenu() {
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
              {weeklyMenu.map((item) => (
                <tr
                  key={item.day}
                  className={
                    item.day === today ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-muted/40"
                  }
                >
                  <td className="py-2 font-medium px-0.5">{item.day}</td>
                  <td className="py-2">{item.meals.breakfast}</td>
                  <td className="py-2">{item.meals.lunch}</td>
                  <td className="py-2">{item.meals.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
