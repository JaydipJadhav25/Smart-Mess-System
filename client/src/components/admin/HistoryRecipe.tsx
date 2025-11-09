import React, { useState } from "react";
import { ChevronDown, ChevronUp, Clock , ShoppingBasketIcon , StepForward} from "lucide-react";
import { Badge } from "../ui/badge";



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



const HistoryRecipe: React.FC<Props> = ({ recipe  }) => {
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
           <Badge
          variant="secondary"
          className="font-semibold text-sm bg-orange-500 dark:text-white p-1 my-0.5"
        >
          <ShoppingBasketIcon /> Ingredients 
       
        </Badge>
            {/* <h3 className="font-semibold text-slate-700"> 
              Ingredients: 
                </h3> */}
            <ul className="list-disc ml-6 text-gray-700">
              {recipe.ingredients?.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>

          <div>
            {/* <h3 className="font-semibold text-slate-700"> Steps:</h3> */}
               <Badge
          variant="secondary"
          className="font-semibold text-sm bg-orange-500 dark:text-white p-1 my-0.5"
        >
          <StepForward/> Steps
       
        </Badge>
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
        </div>
      )}
    </div>
  );
};

export default HistoryRecipe;
