
import Loading from "@/components/flashPages/Loading";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { BarChart, Bar, XAxis, YAxis,  CartesianGrid } from "recharts";



const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


export default function TodayNutrition() {

const weeklyMenu = [
  {
    day: "Monday",
    meals: {
      breakfast: {
        items: ["Idli", "Sambar"],
        nutrition: { calories: 320, protein: 10, carbs: 60, fat: 5 },
        image :"/"
      },
      lunch: {
        items: ["Rice", "Dal", "Bhindi", "2 Chapati"],
        nutrition: { calories: 550, protein: 18, carbs: 90, fat: 12 },
        image :"/"
      },
      dinner: {
        items: ["Roti", "Paneer", "Salad", "2 Chapati"],
        nutrition: { calories: 600, protein: 22, carbs: 80, fat: 15 },
        image :"/"
      },
    },

  },
  {
    day: "Tuesday",
    meals: {
      breakfast: {
        items: ["Poha"],
        nutrition: { calories: 280, protein: 6, carbs: 50, fat: 8 },
        image : "/"
      },
      lunch: {
        items: ["Rajma", "Rice", "2 Chapati"],
        nutrition: { calories: 620, protein: 20, carbs: 95, fat: 14 },
        image : "/"
      },
      dinner: {
        items: ["Chole", "Roti", "2 Chapati"],
        nutrition: { calories: 610, protein: 19, carbs: 92, fat: 16 },
        image : "/"
      },
    },

  },
  {
    day: "Wednesday",
    meals: {
      breakfast: {
        items: ["Dosa"],
        nutrition: { calories: 300, protein: 7, carbs: 55, fat: 9 },
        image : "/"
      },
      lunch: {
        items: ["Sambar", "Rice", "2 Chapati"],
        nutrition: { calories: 540, protein: 16, carbs: 88, fat: 11 },
        image : "/"
      },
      dinner: {
        items: ["Paratha", "Aloo Sabzi", "2 Chapati"],
        nutrition: { calories: 580, protein: 14, carbs: 90, fat: 18 },
        image : "/"
      },
    },

  },
  {
    day: "Thursday",
    meals: {
      breakfast: {
        items: ["Upma"],
        nutrition: { calories: 270, protein: 7, carbs: 45, fat: 8 },
        image : "/"
      },
      lunch: {
        items: ["Kadhi", "Rice", "2 Chapati"],
        nutrition: { calories: 560, protein: 15, carbs: 92, fat: 13 },
        image : "/"
      },
      dinner: {
        items: ["Roti", "Mix Veg", "2 Chapati"],
        nutrition: { calories: 570, protein: 17, carbs: 88, fat: 12 },
        image : "/"
      },
    },

  },
  {
    day: "Friday",
    meals: {
      breakfast: {
        items: ["Bread Butter"],
        nutrition: { calories: 310, protein: 6, carbs: 40, fat: 12 },
        image : "/"
      },
      lunch: {
        items: ["Paneer Rice", "2 Chapati"],
        nutrition: { calories: 600, protein: 20, carbs: 85, fat: 15 },
        image : "/"
      },
      dinner: {
        items: ["Dal", "Roti", "2 Chapati"],
        nutrition: { calories: 540, protein: 18, carbs: 82, fat: 11 },
        image : "/"
      },
    },
  },
  {
    day: "Saturday",
    meals: {
      breakfast: {
        items: ["Aloo Puri"],
        nutrition: { calories: 400, protein: 8, carbs: 65, fat: 14 },
        image : "/"
      },
      lunch: {
        items: ["Veg Biryani", "2 Chapati"],
        nutrition: { calories: 620, protein: 16, carbs: 95, fat: 18 },
        image : "/"
      },
      dinner: {
        items: ["Pav Bhaji", "2 Chapati"],
        nutrition: { calories: 650, protein: 15, carbs: 98, fat: 20 },
        image : "/"
      },
    },

  },
  {
    day: "Sunday",
    meals: {
      breakfast: {
        items: ["Chole Bhature"],
        nutrition: { calories: 500, protein: 14, carbs: 70, fat: 22 },
        image : "/"
      },
      lunch: {
        items: ["Fried Rice", "Manchurian", "2 Chapati"],
        nutrition: { calories: 680, protein: 18, carbs: 100, fat: 22 },
        image : "/"
      },
      dinner: {
        items: ["Pizza", "Salad", "2 Chapati"],
        nutrition: { calories: 720, protein: 20, carbs: 95, fat: 25 },
        image : "/"
      },
    },

  },
];


  const todayIndex = new Date().getDay(); // Sunday=0
  // Map Sunday=0 → index 6, Monday=1 → index 0, etc.
  const mapDayIndex = [6, 0, 1, 2, 3, 4, 5];
  const today = weeklyMenu[mapDayIndex[todayIndex]];

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
    data: today.meals.breakfast.nutrition,
    items: today.meals.breakfast?.items || [],
    image: today.meals.breakfast?.image || dummyImages.breakfast,
  },
  {
    name: "Lunch",
    data: today.meals.lunch.nutrition,
    items: today.meals.lunch?.items || [],
    image: today.meals.lunch?.image || dummyImages.breakfast,
  },
  {
    name: "Dinner",
    data: today.meals.dinner.nutrition,
    items: today.meals.dinner?.items || [],
    image: today.meals.dinner?.image || dummyImages.breakfast,
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
     <h1 className="text-3xl font-bold text-center mb-6">{today.day} Meals & Nutrition</h1>
      </div>
       

        <div className="grid md:grid-cols-3 gap-6">
          {meals.map((meal) => {
            const chartData = [
              { name: "Calories(kcal)", value: meal.data.calories },
              { name: "Protein(g)", value: meal.data.protein },
              { name: "Carbs(g)", value: meal.data.carbs },
              { name: "Fat(g)", value: meal.data.fat },
            ];

            return (
           <Card key={meal.name} className="shadow-lg hover:shadow-2xl transition bg-background border-2">
  <CardHeader>
    <CardTitle className="text-xl">{meal.name}</CardTitle>
  </CardHeader>
  <CardContent className="flex flex-col items-center space-y-4">
    {/* Meal Image */}
    <img src={meal.image} alt={meal.name} className="w-40 h-40 object-cover rounded-lg shadow-md" />

              {/* Meal Items */}
            <div className="flex flex-wrap justify-center gap-2">
              {meal.items.map((item, idx) => (
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