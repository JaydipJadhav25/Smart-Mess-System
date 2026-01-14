import { axiosInstance } from '@/config/axiosInstances';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Loader2  } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// --- Type Definitions ---
interface FeedbackTagProps {
  label: string;
  isSelected: boolean | undefined;
  onClick: () => void;
  type: 'positive' | 'negative';
}

interface ItemFeedbackState {
  rating?: number;
  positiveTags?: string[];
  negativeTags?: string[];
  comment?: string;
}

interface ItemFeedbackProps {
  itemName: string;
  feedback: ItemFeedbackState;
  onFeedbackChange: (itemName: string, feedback: ItemFeedbackState) => void;
}

// --- Re-usable Icon Components ---
const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const FeedbackTag: React.FC<FeedbackTagProps> = ({ label, isSelected, onClick, type }) => {
  const baseClasses = 'px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 text-xs sm:text-sm font-medium border-2';
  
  let typeClasses = '';
  if (isSelected) {
    typeClasses = type === 'positive' 
      ? 'bg-emerald-500 border-emerald-500 text-white' 
      : 'bg-red-500 border-red-500 text-white';
  } else {
    typeClasses = 'bg-transparent text-foreground hover:bg-muted dark:hover:bg-secondary border-border';
  }

  return (
    <button type="button" onClick={onClick} className={`${baseClasses} ${typeClasses}`}>
      {label}
    </button>
  );
};

// --- Item-specific Feedback Component ---
const ItemFeedback: React.FC<ItemFeedbackProps> = ({ itemName, feedback, onFeedbackChange }) => {
    const [hoverRating, setHoverRating] = React.useState<number>(0);

    const positiveOptions = ["Great Flavor", "Perfectly Cooked"];
    const negativeOptions = ["Too Salty/Sweet", "Undercooked"];

    const handleRatingChange = (newRating: number) => {
        onFeedbackChange(itemName, { ...feedback, rating: newRating });
    };

    const handleTagToggle = (tag: string, type: 'positiveTags' | 'negativeTags') => {
        const currentTags = feedback?.[type] || [];
        const newTags = currentTags.includes(tag)
            ? currentTags.filter(t => t !== tag)
            : [...currentTags, tag];
        onFeedbackChange(itemName, { ...feedback, [type]: newTags });
    };
    
    const handleCommentBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        onFeedbackChange(itemName, { ...feedback, comment: e.target.value });
    };

    return (
        <div className="p-4 bg-background rounded-lg border border-border/50 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <span className="font-semibold text-foreground">{itemName}</span>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                            key={star}
                            className={`w-6 h-6 cursor-pointer transition-all duration-200 ${(hoverRating || feedback?.rating || 0) >= star ? 'text-primary' : 'text-border'}`}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => handleRatingChange(star)}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {positiveOptions.map(tag => (
                    <FeedbackTag key={tag} label={tag} isSelected={feedback?.positiveTags?.includes(tag)} onClick={() => handleTagToggle(tag, 'positiveTags')} type="positive" />
                ))}
                {negativeOptions.map(tag => (
                    <FeedbackTag key={tag} label={tag} isSelected={feedback?.negativeTags?.includes(tag)} onClick={() => handleTagToggle(tag, 'negativeTags')} type="negative" />
                ))}
            </div>
            <input
                type="text"
                defaultValue={feedback?.comment || ''}
                onBlur={handleCommentBlur}
                placeholder="Add a specific comment (optional)..."
                className="w-full mt-2 p-2 bg-muted/50 border border-border rounded-md focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
            />
        </div>
    );
};

// --- Menu Data ---
// const weeklyMenu = [
//   { day: "Monday", meals: { breakfast: "Idli + Sambar", lunch: "Dal, Bhindi", dinner: "Paneer, Salad" } },
//   { day: "Tuesday", meals: { breakfast: "Poha", lunch: "Rajma ", dinner: "Chole" } },
//   { day: "Wednesday", meals: { breakfast: "Dosa", lunch: "Sambar", dinner: "Paratha, Aloo Sabzi" } },
//   { day: "Thursday", meals: { breakfast: "Upma", lunch: "Kadhi ", dinner: "Mix Veg" } },
//   { day: "Friday", meals: { breakfast: "Bread Butter", lunch: "Paneer", dinner: "Dal" } },
//   { day: "Saturday", meals: { breakfast: "Aloo Puri", lunch: "Veg Biryani", dinner: "Pav Bhaji" } },
//   { day: "Sunday", meals: { breakfast: "Chole Bhature", lunch: "Fried Rice, Manchurian", dinner: "Pizza, Salad" } },
// ];



const FeedbackForm: React.FC = () => {
  // --- State Management ---
  const [positiveFeedback, setPositiveFeedback] = React.useState<string[]>([]);
  const [negativeFeedback, setNegativeFeedback] = React.useState<string[]>([]);
  const [comment, setComment] = React.useState<string>('');
  const [overallRating, setOverallRating] = React.useState<number>(0);
  const [hoverOverallRating, setHoverOverallRating] = React.useState<number>(0);
  const [itemFeedback, setItemFeedback] = React.useState<Record<string, ItemFeedbackState>>({});
  const [loading , setLoading] = useState<boolean>(false)
  
  const navigate = useNavigate();


  //api call
  //react-query
const { isError, isLoading, data, error } = useQuery({
  queryKey: ["Messmenu"],
  queryFn: async () => {
    const response = await axiosInstance("/menu");
    console.log("API called only once...");
    return response?.data?.data?.menu;
  },
  staleTime: Infinity,        // never becomes stale
  gcTime: Infinity,           // never garbage collect cached data
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  retry: false,               // optional: no retries if it fails
});


console.log(isError , isLoading , error , data);


// if (isLoading) {
//   return(
//       <div className="bg-background flex flex-col items-center justify-center min-h-screen text-gray-700 dark:text-white">
//         <Loader2 className="animate-spin w-12 h-12 text-blue-500 mb-4" />
//         <h2 className="text-xl font-semibold">Loading, please wait...</h2>
//         <p className="text-sm text-gray-500 mt-2">
//           Fetching latest data from the server.
//         </p>
//       </div>
//   )
// }

  // const mealOptions = React.useMemo(() => {

  //   return weeklyMenu.flatMap(dayItem => {
      
  //     const mealsToShow: { value: string; label: string }[] = [];
  //     if (dayItem.meals.lunch) {
  //       mealsToShow.push({ value: dayItem.meals.lunch, label: dayItem.meals.lunch });
  //     }
  //     if (dayItem.meals.dinner) {
  //       mealsToShow.push({ value: dayItem.meals.dinner, label: dayItem.meals.dinner });
  //     }
  //     return mealsToShow;
  //   });
  // }, []);


const mealOptions = React.useMemo(() => {
  if (!data) return [];

  const EXCLUDED_ITEMS = ["2 Chapati", "Rice", "Roti"];

  return data.flatMap((dayItem: any) => {
    const mealsToShow = [];

    const cleanItems = (items: string[]) =>
      items.filter(item => !EXCLUDED_ITEMS.includes(item));

    if (dayItem.meals?.lunch) {
      const items = cleanItems(dayItem.meals.lunch.items);

      mealsToShow.push({
        value: items.join(", "),
        label: items.join(", "),
      });
    }

    if (dayItem.meals?.dinner) {
      const items = cleanItems(dayItem.meals.dinner.items);

      mealsToShow.push({
        value: items.join(", "),
        label: items.join(", "),
      });
    }

    return mealsToShow;
  });
}, [data]);

  
const [selectedMeal, setSelectedMeal] = React.useState<string>(mealOptions[0]?.value || '');
  



  React.useEffect(() => {
    setItemFeedback({});
  }, [selectedMeal]);

  // --- Event Handlers ---
  const handleItemFeedbackChange = (itemName: string, newFeedback: ItemFeedbackState) => {
    setItemFeedback(prev => ({...prev, [itemName]: newFeedback}));
  };

  const handlePositiveToggle = (option: string) => {
    setPositiveFeedback(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const handleNegativeToggle = (option: string) => {
    setNegativeFeedback(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
   
    if (loading) {
      return;
    }

    e.preventDefault();
    const feedbackData = {
      meal: selectedMeal,
      overallRating: overallRating,
      itemFeedback: itemFeedback,
      positiveTags: positiveFeedback,
      negativeTags: negativeFeedback,
      comment
    };
    setLoading(true)
    console.log('Feedback Submitted:', feedbackData);

   try {

    const response = await axiosInstance.post("/user/addfeedback" , feedbackData);
    console.log("response : " , response.data);
     const messageBox = document.getElementById('messageBox');
    if (messageBox) {
        messageBox.innerText = 'Thank you for your feedback!';
        messageBox.classList.remove('opacity-0');
        setTimeout(() => {
            messageBox.classList.add('opacity-0');
        }, 3000);
    }


   setTimeout(()=>{
     navigate("/profile")
   },3000);
    
   } catch (error) {

    console.log("responce : " , error);

     const messageBox = document.getElementById('messageBox2');
    if (messageBox) {
        messageBox.innerText = 'Server Error!';
        messageBox.classList.remove('opacity-0');
        setTimeout(() => {
            messageBox.classList.add('opacity-0');
        }, 3000);
    }
    
   }finally {
    setLoading(false)
   }

  };
  
  const positiveOptions = ['Good Portion Size', 'Great Service'];
  const negativeOptions = ['Long Wait', 'Poor Service'];
  
  const individualItems = selectedMeal.split(',').map(item => item.trim());

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 font-sans relative">
      <div id="messageBox" className="fixed top-5 bg-emerald-500 text-white py-2 px-4 rounded-lg shadow-lg opacity-0 transition-opacity duration-300 z-50">
        Thank you for your feedback!
      </div>

            <div id="messageBox2" className="fixed top-5 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg opacity-0 transition-opacity duration-300 z-50">
       Server Error Try Agin !
      </div>

      <div className="w-full max-w-2xl">
        <form 
          onSubmit={handleSubmit}
          className="bg-background p-8 rounded-lg shadow-lg border border-border space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Share Your Feedback</h1>
            <p className="text-muted-foreground mt-2">Help us improve your dining experience!</p>
          </div>
          
          <div>
            <label htmlFor="meal" className="block text-sm font-semibold mb-2 text-foreground">Which meal are you reviewing?</label>
            <select
              id="meal"
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
              className="w-full p-3 bg-background border-2 border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              {mealOptions.map((option : any ) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {selectedMeal && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground text-center">Rate the Individual Items</h3>
              <div className="space-y-4">
                {individualItems.map(item => (
                  <ItemFeedback
                    key={item}
                    itemName={item}
                    feedback={itemFeedback[item] || {}}
                    onFeedbackChange={handleItemFeedbackChange}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-semibold mb-3 text-emerald-600 dark:text-emerald-400">What did you like about the overall experience?</h3>
            <div className="flex flex-wrap gap-3">
              {positiveOptions.map(option => (
                <FeedbackTag key={option} label={option} isSelected={positiveFeedback.includes(option)} onClick={() => handlePositiveToggle(option)} type="positive" />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3 text-red-600 dark:text-red-400">What can we improve overall?</h3>
            <div className="flex flex-wrap gap-3">
              {negativeOptions.map(option => (
                <FeedbackTag key={option} label={option} isSelected={negativeFeedback.includes(option)} onClick={() => handleNegativeToggle(option)} type="negative" />
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="comment" className="block text-sm font-semibold mb-2 text-foreground">Any other overall comments?</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="e.g., The pasta was delicious, but I wish there were more vegetarian options..."
              className="w-full p-3 bg-background border-2 border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
            ></textarea>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3 text-foreground">Rate your overall experience</h3>
            <div className="flex justify-center items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`w-10 h-10 cursor-pointer transition-all duration-200 ${
                    (hoverOverallRating || overallRating) >= star 
                    ? 'text-primary' 
                    : 'text-border'
                  }`}
                  onMouseEnter={() => setHoverOverallRating(star)}
                  onMouseLeave={() => setHoverOverallRating(0)}
                  onClick={() => setOverallRating(star)}
                />
              ))}
            </div>
          </div>
          
          <button 
           disabled={loading}
            type="submit"
            className="w-full p-4 bg-primary text-primary-foreground font-bold text-lg rounded-lg hover:opacity-90 transition-opacity transform hover:scale-[1.01] disabled:cursor-not-allowed"
          >
            {loading ?  
             <>
             <Loader2 className="animate-spin  w-12 h-12 text-white mb-4 mx-auto" />
           <h2 className="text-xl font-semibold">Loading, please wait...</h2>
             </>
            : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
