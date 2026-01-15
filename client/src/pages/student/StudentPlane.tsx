import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import StudentLayout from "@/components/students/StudentLayout";
import { axiosInstance } from "@/config/axiosInstances";
import { Loader2, WifiOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import StudentPlanResult from "@/components/studentplane/StudentPlanResult";


function StudentPlane() {
  const [step, setStep] = useState("intro"); // intro | form | generate

  //to array of lunch and dinner
  const[todayMeal , setTodayMeal] = useState<any>(undefined);
  const { register, handleSubmit, setValue } = useForm();
  const[loading , setLoading] = useState(false);
  const[studnetPlan , setStudentPlan] = useState(undefined);

 
  const onSubmit = async(data : any) => {
    console.log("Saved student info:", data);
    try {
      const response = await axiosInstance.post("/user/plan/profile" , data);
      console.log("response : " , response.data);
      alert("Student plan profile saved successfully");
      setStep("generate");
    } catch (error) {
      console.log("error : " , error);
    }   
  };

  //check user status
  useEffect(()=>{
    async function fetch(){
    const response = await axiosInstance.get("/user/plan/profile");

    console.log("response of user plan profile : " , response.data);

     if (response.data.profileCompleted) {
      setStep("generate")
     }else{
      setStep("intro")
     }
    }
    fetch();
  },[]);

  //fetch today meal
    
  //api call
  //react-query
  const { isError, isLoading, data, error } = useQuery({
    queryKey: ["Messmenu"],
    queryFn: async () => {
      const response = await axiosInstance("/menu");
      console.log("API called only once...");
      return response?.data?.data?.menu;
    },
    staleTime: Infinity, // never becomes stale
    gcTime: Infinity, // never garbage collect cached data
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false, // optional: no retries if it fails
  });

  console.log("data : ", data);
  console.log("error : ", error);



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

  const mapDayIndex = [6, 0, 1, 2, 3, 4, 5];

  const today = data[mapDayIndex[todayIndex]];


  console.log("today : ", today);


  //get today meal
  useEffect(()=>{
   setTodayMeal({
    day : today.day,
    lunch :   [...today?.meals?.lunch?.items],
    dinner : [...today?.meals?.dinner?.items]
   })
  },[today]);

  // console.log(todayMeal);

//genrate today plane
const genrateStudentPlan = async() =>{
  setLoading(true);
  try {
    const response = await axiosInstance.post("/user/plan/genrate" ,todayMeal);
    console.log("response : " , response.data);
    //setIn State;
    setStudentPlan(response.data?.data);
     setStep("result");
  } catch (error) {
    console.log("error : " , error);
    alert("server Error!");
  }finally{
  setLoading(false);
  }
}

  return (
    <StudentLayout currentPage="plane">
      <div className="min-h-[calc(100vh-4rem)] flex justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl"
        >
        
          {step === "intro" && (
            <Card className="shadow-xl rounded-2xl bg-background/30 border border-gray-800">
              <CardContent className="p-10 space-y-6 text-center">
                <h1 className="text-3xl font-bold">Personal Wellness Plan</h1>
                <p className="text-slate-600">
                  Get a personalized daily meal and workout suggestion based on
                  your body goal and today’s mess menu. This setup is required
                  only once.
                </p>
                <Button size="lg" onClick={() => setStep("form")}>
                  Start Personal Plan
                </Button>
              </CardContent>
            </Card>
          )}

          {step === "form" && (
            <Card className="shadow-xl rounded-2xl bg-background/30 border border-gray-800">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl font-semibold">Basic Information</h2>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="number"
                      placeholder="Age"
                      {...register("age", { required: true })}
                    />

                    <Select onValueChange={(v) => setValue("gender", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="number"
                      placeholder="Height (cm)"
                      {...register("height", { required: true })}
                    />
                    <Input
                      type="number"
                      placeholder="Weight (kg)"
                      {...register("weight", { required: true })}
                    />
                  </div>

                  <Select onValueChange={(v) => setValue("goal", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Your Goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight_loss">Weight Loss</SelectItem>
                      <SelectItem value="maintenance">Maintain Body</SelectItem>
                      <SelectItem value="weight_gain">Weight Gain</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Today meal – later auto-filled from backend */}
                  {/* <Input
                    disabled
                    value="Chapati, Dal, Sabji"
                    className="text-slate-500"
                  /> */}

                  <Button type="submit" className="w-full cursor-pointer">
                    Save Information
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

 
          {step === "generate" && (
            <Card className="shadow-xl rounded-2xl bg-background/30 border border-gray-800">
              <CardContent className="p-10 space-y-6 text-center">
                <h2 className="text-2xl font-semibold text-orange-500">
                  Your Profile Is Ready 
                </h2>
                <p className="text-slate-600">
                  You can now generate your daily personalized plan anytime
                  based on today’s mess menu.
                </p>
                <Button 
                disabled={loading}
                onClick={()=>{
                  genrateStudentPlan();
                }}
                size="lg"
                className="disabled:cursor-not-allowed"
                >
                {loading ? "Loadin......" : "Generate Today’s Plan"}
                </Button>
              </CardContent>
            </Card>
          )}

          { step === "result" && <StudentPlanResult source={"ai"} data={studnetPlan}/>}
        
        </motion.div>
      </div>
    </StudentLayout>
  );
}

export default StudentPlane;