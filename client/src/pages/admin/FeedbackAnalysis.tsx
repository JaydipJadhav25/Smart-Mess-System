import AnalyticsDashboard from '@/components/AnalyticsDashBoard/AnalyticsDashboard';
import { axiosInstance } from '@/config/axiosInstances';
import React, { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';



// --- Type Definitions (No changes needed) ---
interface ItemFeedbackDetail {
  rating: number;
  comment: string;
  positiveTags: string[];
  negativeTags: string[];
}
interface Feedback {
  _id: string;
  user: string;
  meal: string;
  Date: string; 
  overallRating: number;
  itemFeedback: Record<string, ItemFeedbackDetail>;
  positiveTags: string[];
  negativeTags: string[];
  comment: string;
  createdAt: string;
  updatedAt: string;
}

const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

const FeedbackAnalysis: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>(getTodayString());
  const [feedbackData, setFeedbackData] = useState<Feedback[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const[analying , setAnalying] = useState(false);
  const[result , setResult] = useState<any>(null);


   const navigate = useNavigate();


  const handleFetchFeedback = async (): Promise<void> => {
    // This logic remains the same
    setIsLoading(true);
    setError('');
    setFeedbackData(null);
    if (!startDate || !endDate) {
      setError('Please select both a start and end date.');
      setIsLoading(false);
      return;
    }
    try {
    //   const apiUrl = `/api/feedback/by-date?startDate=${startDate}&endDate=${endDate}`;
    //   const response = await fetch(apiUrl);
    const result = await axiosInstance.get(`/feedback/by-date?startDate=${startDate}&endDate=${endDate}`)
    //   if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    //   const data: Feedback[] = await response.json();
      const data: Feedback[] = await result.data;
      console.log("data : " , result.data);
      setFeedbackData(data);
    } catch (err) {
      setError('Failed to fetch feedback. Please check the console for details.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAnalyze = async()=> {
    if (!feedbackData) return;
    alert(`Starting analysis on ${feedbackData.length} feedback records!`);
    setAnalying(true);
     try {
  //   const response = await axiosInstance.post("/feedback/feedback-analytics" , feedbackData);
  //   console.log("response : " , response.data);
  // localStorage.setItem("answer" , JSON.stringify( response.data));
  //   setResult(response.data);
  //   setAnalying(false);

   navigate("/dashbord", { state: { analysisData:result } }); // 👈 pass data to new page

     } catch (error) {
    setAnalying(false);
    alert("analying error !");
     }finally{
        setAnalying(false);
     }

  };

useEffect(()=>{
  const data : any = localStorage.getItem("answer");
  setResult(JSON.parse(data));
},[])


  console.log("data in state : " , data);

  return (
    <div className="font-sans max-w-4xl my-10 mx-auto p-6 shadow-lg rounded-lg bg-white">
      
      {/* --- Professional Title Area --- */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="m-0 mb-1 text-2xl font-bold text-slate-800">Feedback Analytics</h1>
        <p className="m-0 text-gray-600">Select a date range to generate an analysis of submitted feedback.</p>
      </div>
      
      {/* --- Labeled Controls UI --- */}
      <div className="flex flex-wrap gap-5 items-end mb-5">
        
        {/* Start Date Input with Label */}
        <div className="flex flex-col">
          <label htmlFor="startDate" className="mb-1 font-bold text-gray-800">Start Date</label>
          <input 
            id="startDate"
            type="date" 
            value={startDate} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
            className="dark:text-black p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* End Date Input with Label */}
        <div className="flex flex-col">
          <label htmlFor="endDate" className="mb-1 font-bold text-gray-800">End Date</label>
          <input 
            id="endDate"
            type="date" 
            value={endDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
            max={getTodayString()}
            className="dark:text-black  p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        
        {/* Fetch Button */}
        <button 
          onClick={handleFetchFeedback} 
          disabled={isLoading}
          className="py-2 px-5 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Fetching...' : 'Fetch Feedback'}
        </button>
      </div>

      {/* --- Action & Display Area --- */}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {feedbackData && (
        <div className="text-center mt-8 bg-gray-50 p-5 rounded-lg">
          <p className="dark:text-orange-400  m-0 mb-4 text-lg">
            Successfully fetched <strong>{feedbackData.length}</strong> feedback records.
          </p>
          <button 
            disabled={analying}
            onClick={handleAnalyze} 
            className="py-2 px-6 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors text-base"
          >
            Analyze Feedback
          </button>
        </div>
      )}


      {/* --- Action & Display charts --- */}
      {analying && <p className="text-orage-600 text-center">Analying...</p>}
     
     {/* show all data */}
     {/* {
        result && <AnalyticsDashboard analysisData={result}/>
     } */}
    </div>
  );
};

export default FeedbackAnalysis;