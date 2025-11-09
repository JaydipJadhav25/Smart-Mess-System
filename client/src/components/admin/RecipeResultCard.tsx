import React, { useState } from "react";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { axiosInstance } from "@/config/axiosInstances";

export interface RecipeType {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  estimatedTime?: string;
}

interface Props {
  recipe: RecipeType;
}



const saveRecipe = async(recipe : any) =>{

    try {
        const response = await axiosInstance.post("/recipe/save" ,recipe );
        console.log("response : " , response.data);
        alert("recipe save successfully!");
    } catch (error) {
        console.log("error : " , error);
        alert("save recipe failed!")
        
    }
}


const RecipeResultCard: React.FC<Props> = ({ recipe  }) => {
  const [open, setOpen] = useState(false);




  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 shadow-sm hover:shadow-md transition-all">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <h2 className="text-xl font-semibold text-slate-800">{recipe.name}</h2>
          <p className="text-gray-600 text-sm">{recipe.description}</p>
        </div>
        {open ? <ChevronUp className="text-gray-600" /> : <ChevronDown className="text-gray-600" />}
      </div>

      {open && (
        <div className="mt-4 space-y-3 animate-fadeIn">
          <div>
            <h3 className="font-semibold text-slate-700"> 
              Ingredients: 
                </h3>
            <ul className="list-disc ml-6 text-gray-700">
              {recipe.ingredients?.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-700"> Steps:</h3>
            <ol className="list-decimal ml-6 text-gray-700">
              {recipe.steps?.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          <p className="text-gray-700 mt-2 text-sm">
            <Clock className="h-4 w-4"/>
             <strong>Estimated Time:</strong> {recipe.estimatedTime || "N/A"}
          </p>
         
         <Button 
         className="m-1 text-black"
         onClick={()=>{
              saveRecipe(recipe);
         }}
         
         >Save</Button>

        </div>
      )}
    </div>
  );
};

export default RecipeResultCard;
