import React, {  useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import RecipeResultCard from "@/components/admin/RecipeResultCard";
import type { RecipeType } from "@/components/admin/RecipeResultCard";
import { axiosInstance } from "@/config/axiosInstances";
import { useQuery } from "@tanstack/react-query";
import { Loader2, WifiOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import HistoryRecipe from "@/components/admin/HistoryRecipe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";


interface MealDay {
  meals: {
    breakfast: { items: string[] };
    lunch: { items: string[] };
    dinner: { items: string[] };
  };
}

interface RecipeResponse {
  recipes: RecipeType[];
}

const AdminRecipeGenerator: React.FC = () => {
  const navigate = useNavigate();

  // --- Fetch mess menu ---
  const { isError, isLoading, data } = useQuery<MealDay[]>({
    queryKey: ["Messmenu"],
    queryFn: async () => {
      const response = await axiosInstance.get("/menu");
      return response?.data?.data?.menu;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });


  // --- States ---
  const [selectedMeal, setSelectedMeal] = useState("");
  const [style, setStyle] = useState("");
  const [taste, setTaste] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [recipes, setRecipes] = useState<RecipeType[] | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [tab, setTab] = useState("recipe");
  const[history , setHistory] = useState([]);


  // --- Today Meals Logic ---
  const todayIndex = new Date().getDay();
  const mapDayIndex = [6, 0, 1, 2, 3, 4, 5];
  const today = data?.[mapDayIndex[todayIndex]];
  const allMeals =
    [
      ...(today?.meals?.breakfast?.items || []),
      ...(today?.meals?.lunch?.items || []),
      ...(today?.meals?.dinner?.items || []),
    ].filter(iteam => iteam !== "2 Chapati").flat() || [];

    console.log("today meal : " , allMeals);





  // --- Handle Generate ---
  const handleGenerate = async () => {
    if (!selectedMeal || !style || !taste || !quantity) return;
    setLoadingAI(true);
    setRecipes(null);

    try {
      const res = await axiosInstance.post<{ data: RecipeResponse }>("/recipe/generate", {
        meal: selectedMeal,
        style,
        taste,
        quantity,
        message,
      });
      setRecipes(res.data.data.recipes);
      // localStorage.setItem("recipi" , res.data.data.recipes);
    } catch (err) {
      console.error("AI generation failed:", err);
    } finally {
      setLoadingAI(false);
    }
  };


  //fetch history of recipe
  //api call
  //react-query
// const { isError, isLoading, data, error } = useQuery({
//   queryKey: ["HistoryRecipe"],
//   queryFn: async () => {
//     const response = await axiosInstance("/recipe/all");
    
//     return response?.data;
//   },
//   staleTime: Infinity,        // never becomes stale
//   gcTime: Infinity,           // never garbage collect cached data
//   refetchOnWindowFocus: false,
//   refetchOnReconnect: false,
//   refetchOnMount: false,
//   retry: false,               // optional: no retries if it fails
// });

useEffect(()=>{

  async function fetchHistoyRecipe(){
     try {
      const reponse = await axiosInstance.get("/recipe/all");
      setHistory(reponse.data);

     } catch (error) {
      console.log("error : ", error);
    
     }
  }

  fetchHistoyRecipe();

},[])




  console.log("data : " , data);
  console.log("data333 : " , recipes);

  // --- Loading UI ---
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500 mb-4" />
        <h2 className="text-lg font-semibold">Loading mess menu...</h2>
      </div>
    );
  }

  // --- Error UI ---
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 bg-red-50">
        <WifiOff className="w-14 h-14 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Connection Error</h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all"
        >
          Go Back Home
        </button>
      </div>
    );
  }




  const loadingStates = [
  { text: "Receiving your recipe request..." },
  { text: "Analyzing your ingredients..." },
  { text: "Searching for flavor pairings..." },
  { text: "Designing the cooking steps..." },
  { text: "Calculating nutritional information..." },
  { text: "Writing down the instructions..." },
  { text: "Adding the final touches..." },
  { text: "Your recipe is almost ready!" },
];

  return (
    <AdminLayout currentPage="RecipeGenerator">
      {/* loader  */}
       <Loader  loadingStates={loadingStates} loading={loadingAI} duration={2000} />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
           <Tabs value={tab} onValueChange={setTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="recipe">Today</TabsTrigger>
              <TabsTrigger value="saved">History</TabsTrigger>
            </TabsList>
            <TabsContent value="recipe">
        <div className="font-sans max-w-4xl my-10 mx-auto p-6 shadow-lg rounded-lg bg-white">
        {/* --- Header --- */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-800">AI Recipe Generator 🍳</h1>
          <p className="text-gray-600 text-sm leading-tight">
            Choose your meal. <br /> Let AI suggest tasty new styles!
          </p>
        </div>

        {/* --- Form --- */}
        <div className="space-y-4 mb-6">
          {/* Meal Select */}
          <select
            className="w-full border p-2 rounded-md text-black"
            onChange={(e) => setSelectedMeal(e.target.value)}
            value={selectedMeal}
          >
            <option value="">Select Meal...</option>
            {allMeals.map((meal, i) => (
              <option key={i} value={meal}>
                {meal}
              </option>
            ))}
          </select>

          {selectedMeal && (
            <>
              <select
                className="w-full border p-2 rounded-md text-black"
                onChange={(e) => setStyle(e.target.value)}
                value={style}
              >
                <option value="">Select Style...</option>
                <option value="North Indian">North Indian</option>
                <option value="South Indian">South Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Healthy">Healthy</option>
              </select>

              <select
                className="w-full border p-2 rounded-md text-black"
                onChange={(e) => setTaste(e.target.value)}
                value={taste}
              >
                <option value="">Select Taste...</option>
                <option value="Spicy">Spicy</option>
                <option value="Mild">Mild</option>
                <option value="Tangy">Tangy</option>
                <option value="Savory">Savory</option>
              </select>

              <input
                type="number"
                placeholder="Quantity of Students (e.g. 200)"
                className="w-full border p-2 rounded-md text-black"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />

              <textarea
                placeholder="Optional message (e.g. Add garlic twist...)"
                className="w-full border p-2 rounded-md text-black"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />

              <button
                onClick={handleGenerate}
                disabled={loadingAI}
                className="w-full mt-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-all disabled:bg-gray-400"
              >
                {loadingAI ? "Generating..." : "Generate Recipe 🍽️"}
              </button>
            </>
          )}
        </div>

        {/* --- AI Results --- */}
        {loadingAI && (
          <div className="flex justify-center items-center py-6">
            <Loader2 className="animate-spin w-8 h-8 text-green-600" />
            <span className="ml-3 text-gray-600">Generating recipes...</span>
          </div>
        )}

        {recipes && (
          <div className="space-y-4 mt-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
               Suggested Recipes ({recipes.length})
            </h2>
            {recipes.map((r, index) => (
              <RecipeResultCard key={index} recipe={r} />
            ))}
          </div>
        )}
           </div>
                   
            </TabsContent>

            <TabsContent value="saved">

            {isLoading && (
          <div className="flex justify-center items-center py-6">
            <Loader2 className="animate-spin w-8 h-8 text-green-600" />
            <span className="ml-3 text-gray-600">Generating recipes...</span>
          </div>
        )}
            
               {history && (
          <div className="space-y-4 mt-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3 dark:text-white">
               Saved Recipes ({history.length || 0})
               {/* Saved Recipes  */}
            </h2>
            { history&&  history?.map((r, index) => (
              <HistoryRecipe key={index} recipe={r}/>
            ))}
          </div>
        )}
             

            </TabsContent>
          </Tabs>

        </div>
     </main>
    </AdminLayout>
  );
};

export default AdminRecipeGenerator;
