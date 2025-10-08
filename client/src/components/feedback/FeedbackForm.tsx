import React from 'react';

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
const weeklyMenu = [
  { day: "Monday", meals: { breakfast: "Idli + Sambar", lunch: "Rice, Dal, Bhindi", dinner: "Roti, Paneer, Salad" } },
  { day: "Tuesday", meals: { breakfast: "Poha", lunch: "Rajma, Rice", dinner: "Chole, Roti" } },
  { day: "Wednesday", meals: { breakfast: "Dosa", lunch: "Sambar, Rice", dinner: "Paratha, Aloo Sabzi" } },
  { day: "Thursday", meals: { breakfast: "Upma", lunch: "Kadhi, Rice", dinner: "Roti, Mix Veg" } },
  { day: "Friday", meals: { breakfast: "Bread Butter", lunch: "Paneer Rice", dinner: "Dal, Roti" } },
  { day: "Saturday", meals: { breakfast: "Aloo Puri", lunch: "Veg Biryani", dinner: "Pav Bhaji" } },
  { day: "Sunday", meals: { breakfast: "Chole Bhature", lunch: "Fried Rice, Manchurian", dinner: "Pizza, Salad" } },
];



const FeedbackForm: React.FC = () => {
  // --- State Management ---
  const [positiveFeedback, setPositiveFeedback] = React.useState<string[]>([]);
  const [negativeFeedback, setNegativeFeedback] = React.useState<string[]>([]);
  const [comment, setComment] = React.useState<string>('');
  const [overallRating, setOverallRating] = React.useState<number>(0);
  const [hoverOverallRating, setHoverOverallRating] = React.useState<number>(0);
  const [itemFeedback, setItemFeedback] = React.useState<Record<string, ItemFeedbackState>>({});

  const mealOptions = React.useMemo(() => {
    return weeklyMenu.flatMap(dayItem => {
      const mealsToShow: { value: string; label: string }[] = [];
      if (dayItem.meals.lunch) {
        mealsToShow.push({ value: dayItem.meals.lunch, label: dayItem.meals.lunch });
      }
      if (dayItem.meals.dinner) {
        mealsToShow.push({ value: dayItem.meals.dinner, label: dayItem.meals.dinner });
      }
      return mealsToShow;
    });
  }, []);

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const feedbackData = {
      meal: selectedMeal,
      overallRating: overallRating,
      itemFeedback: itemFeedback,
      positiveTags: positiveFeedback,
      negativeTags: negativeFeedback,
      comment
    };
    console.log('Feedback Submitted:', feedbackData);
    const messageBox = document.getElementById('messageBox');
    if (messageBox) {
        messageBox.innerText = 'Thank you for your feedback!';
        messageBox.classList.remove('opacity-0');
        setTimeout(() => {
            messageBox.classList.add('opacity-0');
        }, 3000);
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
              {mealOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
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
            type="submit"
            className="w-full p-4 bg-primary text-primary-foreground font-bold text-lg rounded-lg hover:opacity-90 transition-opacity transform hover:scale-[1.01]"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
