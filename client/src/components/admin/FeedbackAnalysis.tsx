// import AnalyticsDashboard from '@/components/AnalyticsDashBoard/AnalyticsDashboard';
import { axiosInstance } from "@/config/axiosInstances";
import React, { useState } from "react";
// import { data  } from 'react-router-dom';
import AnalyticsDashboard from "../AnalyticsDashBoard/AnalyticsDashboard";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";

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
  return new Date().toISOString().split("T")[0];
};

const FeedbackAnalysis: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>(getTodayString());
  const [feedbackData, setFeedbackData] = useState<Feedback[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [analying, setAnalying] = useState(false);
  const [result, setResult] = useState<any>(null);

  //  const navigate = useNavigate();

  const handleFetchFeedback = async (): Promise<void> => {
    // This logic remains the same
    setIsLoading(true);
    setError("");
    setFeedbackData(null);
    if (!startDate || !endDate) {
      setError("Please select both a start and end date.");
      setIsLoading(false);
      return;
    }
    try {
      //   const apiUrl = `/api/feedback/by-date?startDate=${startDate}&endDate=${endDate}`;
      //   const response = await fetch(apiUrl);
      const result = await axiosInstance.get(
        `/feedback/by-date?startDate=${startDate}&endDate=${endDate}`,
      );
      //   if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      //   const data: Feedback[] = await response.json();
      const data: Feedback[] = await result.data;
      console.log("data : ", result.data);
      setFeedbackData(data);
    } catch (err) {
      setError(
        "Failed to fetch feedback. Please check the console for details.",
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!feedbackData) return;
    alert(`Starting analysis on ${feedbackData.length} feedback records!`);
    setAnalying(true);
    try {
      const response = await axiosInstance.post(
        "/feedback/feedback-analytics",
        feedbackData,
      );
      console.log("response : ", response.data);
      localStorage.setItem("answer", JSON.stringify(response.data));
      setResult(response.data);
      // setAnalying(false);
      localStorage.setItem("data", response.data);

      //  navigate("/dashbord", { state: { analysisData:result } }); // 👈 pass data to new page
    } catch (error) {
      // setAnalying(false);
      console.log("error is : ", error);

      alert("analying error !");
    } finally {
      setAnalying(false);
    }
  };

  const loadingStates = [
    { text: "Collecting student feedback..." },
    { text: "Reading thoughts about today's meal..." },
    { text: "Analyzing satisfaction levels..." },
    { text: "Identifying top-rated dishes..." },
    { text: "Spotting improvement areas..." },
    { text: "Summarizing feedback insights..." },
    { text: "Generating analytics report..." },
    { text: "Almost done — preparing final summary..." },
  ];

  // useEffect(()=>{
  //   const data : any = localStorage.getItem("answer");
  //   setResult(JSON.parse(data));
  // },[])

  return (
    <>
      <Loader
        loadingStates={loadingStates}
        loading={analying}
        duration={2000}
      />

      {!result ? (
        <>
          <div className="font-sans max-w-4xl my-10 mx-auto p-6 shadow-lg rounded-lg bg-white">
            {/* --- Professional Title Area --- */}
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h1 className="m-0 mb-1 text-2xl font-bold text-slate-800">
                Feedback Analytics
              </h1>
              <p className="m-0 text-gray-600">
                Select a date range to generate an analysis of submitted
                feedback.
              </p>
            </div>

            {/* --- Labeled Controls UI --- */}
            <div className="flex flex-wrap gap-5 items-end mb-5">
              {/* Start Date Input with Label */}
              <div className="flex flex-col">
                <label
                  htmlFor="startDate"
                  className="mb-1 font-bold text-gray-800"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStartDate(e.target.value)
                  }
                  className="dark:text-black p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* End Date Input with Label */}
              <div className="flex flex-col">
                <label
                  htmlFor="endDate"
                  className="mb-1 font-bold text-gray-800"
                >
                  End Date
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEndDate(e.target.value)
                  }
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
                {isLoading ? "Fetching..." : "Fetch Feedback"}
              </button>
            </div>

            {/* --- Action & Display Area --- */}
            {error && <p className="text-red-600 text-center">{error}</p>}

            {feedbackData && (
              <div className="text-center mt-8 bg-gray-50 p-5 rounded-lg">
                <p className="dark:text-orange-400  m-0 mb-5 text-lg">
                  Successfully fetched <strong>{feedbackData.length}</strong>{" "}
                  feedback records.
                </p>

                <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                  {feedbackData.map((feedback) => (
                    <div
                      key={feedback._id}
                      className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    >
                      {/* Header */}
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                          {feedback.meal}
                        </h2>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {feedback.overallRating}/5
                        </span>
                      </div>

                      {/* User */}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {feedback.user}
                      </p>

                      {/* Date */}
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </p>

                      {/* Tags */}
                      <div className="mt-4 space-y-2">
                        {/* Positive */}
                        {feedback.positiveTags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {feedback.positiveTags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 rounded-md bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Negative */}
                        {feedback.negativeTags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {feedback.negativeTags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 rounded-md bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Comment */}
                      {feedback.comment && (
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-slate-700 pt-3">
                          {feedback.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

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
            {analying && (
              <p className="text-orage-600 text-center">Analying...</p>
            )}

            {/* show all data */}
            {/* {
        result && <AnalyticsDashboard analysisData={result}/>
     } */}
          </div>
        </>
      ) : (
        <>
          <AnalyticsDashboard analysisData={result} />
        </>
      )}
    </>
  );
};

export default FeedbackAnalysis;
