import AdminLayout from "@/components/admin/AdminLayout"
import { axiosInstance } from "@/config/axiosInstances"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Loader2, WifiOff } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

function AdminUpdateMenu() {
  const navigate = useNavigate()
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedMenu, setSelectedMenu] = useState<any>(null)
  const [loading , setLoading]  = useState<boolean>(false);

  
  const queryClient = useQueryClient();


  // --- Fetch mess menu ---
  const { isError, isLoading, data } = useQuery({
    queryKey: ["messMenu"],
    queryFn: async () => {
      const response = await axiosInstance.get("/menu")
      return response?.data?.data?.menu
    },
    staleTime: Infinity,
    gcTime: Infinity,
  })

  // --- Set selected menu when day changes ---
  useEffect(() => {
    if (!selectedDay || !data) return

    const menuForDay = data.find((m: any) => m.day === selectedDay)
    setSelectedMenu(menuForDay ? JSON.parse(JSON.stringify(menuForDay)) : null)
  }, [selectedDay, data])

  // --- Loading UI ---
  if (isLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500 mb-4" />
        <h2 className="text-lg font-semibold">Loading mess menu...</h2>
      </div>
    )
  }

  // --- Error UI ---
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
        <WifiOff className="w-14 h-14 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Connection Error</h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl"
        >
          Go Back Home
        </button>
      </div>
    )
  }

  // --- Update handlers ---
  const updateItems = (meal: string, value: string) => {

    setSelectedMenu((prev: any) => ({
      ...prev,
      meals: {
        ...prev.meals,
        [meal]: {
          ...prev.meals[meal],
          items: value.split(",").map(i => i.trim()),
        },
      },
    }))

  }

  const updateNutrition = (
    meal: string,
    field: string,
    value: string
  ) => {
    setSelectedMenu((prev: any) => ({
      ...prev,
      meals: {
        ...prev.meals,
        [meal]: {
          ...prev.meals[meal],
          nutrition: {
            ...prev.meals[meal].nutrition,
            [field]: Number(value),
          },
        },
      },
    }))
  }

 const handleSave = async () => {
  
    if (loading) return;

  setLoading(true);
  try {
    const response = await axiosInstance.put(
      `/admin/menu/${selectedDay}`,
      {
        meals: selectedMenu.meals,
      }
    );
     console.log("response : " , response);
      
     //  THIS re-triggers messMenu cache
    queryClient.invalidateQueries({ queryKey: ["messMenu"] });


    toast.success("Menu updated successfully", {
      description: `${selectedDay} menu has been saved.`,
    });

    
  
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Failed to update menu. Please try again.";

    toast.error("Update failed", {
      description: message,
    });
  } finally {
    setLoading(false);
  }
};




  return (
    <AdminLayout currentPage="MenuUpdate">
      <div className="space-y-6 max-w-5xl mx-auto">
        

 <div className="mb-8 border-b border-gray-200 pb-5">
  {/* <h1 className="text-3xl font-semibold text-gray-900 tracking-tight dark:text-white">
    Update Daily Mess Menu
  </h1> */}
            <h1 className="text-4xl font-bold text-slate-800  dark:text-white">  Update Daily Mess Menu</h1>

  <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-slate-400">
    Maintain daily meal plans by updating dishes, nutrition values, and images to ensure accurate and consistent mess information.
  </p>
</div>



        {/* Day Selector */}
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select Day" />
          </SelectTrigger>
          <SelectContent>
            {DAYS.map(day => (
              <SelectItem key={day} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Menu Editor */}
        {selectedMenu && (
          <>
            {["breakfast", "lunch", "dinner"].map(meal => (
              <Card key={meal} className="rounded-2xl bg-background">
                <CardHeader>
                  <CardTitle className="capitalize">{meal}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Items (comma separated)"
                    value={selectedMenu.meals[meal].items.join(", ")}
                    onChange={e => updateItems(meal, e.target.value)}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    {["calories", "protein", "carbs", "fat"].map(n => (
                      <Input
                        key={n}
                        type="number"
                        placeholder={n}
                        value={selectedMenu.meals[meal].nutrition[n]}
                        onChange={e =>
                          updateNutrition(meal, n, e.target.value)
                        }
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
             disabled={loading}
            onClick={handleSave} className="w-full disabled:cursor-not-allowed">
              {
                loading ? "Loading..." : " Save Menu"
              }
            </Button>
          </>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminUpdateMenu
