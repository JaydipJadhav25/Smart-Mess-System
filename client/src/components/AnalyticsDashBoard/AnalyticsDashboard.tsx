import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell,  Area, AreaChart } from 'recharts';
import { FiCpu, FiStar, FiBarChart2, FiCheckCircle, FiAlertCircle, FiUsers, FiTrendingUp, FiTrendingDown, FiMessageCircle, FiShield } from 'react-icons/fi';
import { useLocation } from "react-router-dom";

// --- Type Definitions ---
interface MealPerformance {
  name: string;
  averageRating: number;
  comments?: string[];
  negativeComments?: string[];
}

// interface AnalyticsData {
//   summary: { totalFeedbacks: number; averageRating: number; };
//   positiveFeedbacks: { count: number; };
//   negativeFeedbacks: { count: number; };
//   spammingUsers: { count: number; list: string[]; };
//   mostPositiveMeals: { count: number; meals: MealPerformance[]; };
//   mostNegativeMeals: { count: number; meals: MealPerformance[]; };
//   sentimentDistribution: { "1_star": number; "2_star": number; "3_star": number; "4_star": number; "5_star": number; };
//   aiSuggestions: { goodPoints: string[]; badPoints: string[]; };
//   aiSummaryText: string;
// }

// --- Main Dashboard Component ---
// const AnalyticsDashboard: React.FC<{ analysisData: AnalyticsData }> = ({ analysisData }) => {
const AnalyticsDashboard: React.FC = () => {

  const location = useLocation();
  const analysisData = location.state?.analysisData;
  console.log("analysidata : " , analysisData);



  // const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const [showSpammersList, setShowSpammersList] = useState(false);

  // --- Section 1: Summary Data Transformations ---
  const summaryLineData = useMemo(() => [
    { name: 'Total Feedbacks', value: analysisData.summary.totalFeedbacks },
    { name: 'Avg Rating (x100)', value: analysisData.summary.averageRating * 100 },
  ], [analysisData]);

  // --- Section 2: Feedback Distribution ---
  const totalFeedbacks = analysisData.positiveFeedbacks.count + analysisData.negativeFeedbacks.count;
  const positivePieData = [
    { name: 'Positive', value: analysisData.positiveFeedbacks.count },
    { name: 'Remaining', value: totalFeedbacks - analysisData.positiveFeedbacks.count }
  ];
  const negativePieData = [
    { name: 'Negative', value: analysisData.negativeFeedbacks.count },
    { name: 'Remaining', value: totalFeedbacks - analysisData.negativeFeedbacks.count }
  ];

  // --- Section 3: Spamming Users ---
  const spammersPieData = [
    { name: 'Spammers', value: analysisData.spammingUsers.count },
    { name: 'Regular Users', value: totalFeedbacks - analysisData.spammingUsers.count }
  ];

  // --- Section 4: Rating Distribution ---
  const ratingDistributionData = useMemo(() => 
    Object.entries(analysisData.sentimentDistribution).map(([key, value]) => ({
      name: `${key.split('_')[0]} ★`,
      count: value,
    })), [analysisData]);

  // --- Meal Pie Chart Data Generator ---
  const generateMealPieData = (meal: MealPerformance) => {
    const rating = meal.averageRating;
    return [
      { name: 'Rating', value: rating },
      { name: 'Remaining', value: 5 - rating }
    ];
  };

  return (
   <div className="container dark:bg-background dark:text-white mx-auto px-4 sm:px-6 lg:px-8">
 <div className="font-sans bg-background min-h-screen p-4 md:p-6 dark:text-white">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center mb-8 dark:text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">Feedback Intelligence Dashboard</h1>
          <p className="text-gray-600 text-lg">AI-driven insights into customer satisfaction and performance metrics</p>
        </header>

        {/* Section 1: Summary Metrics */}
        <section className="bg-background/80 p-6 rounded-3xl shadow-xl border">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
            <FiBarChart2 className="text-blue-600" /> Summary Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 p-8 rounded-2xl">
                <FiUsers className="text-5xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">{analysisData.summary.totalFeedbacks}</h3>
                <p className="text-gray-600 font-semibold">Total Feedbacks</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-yellow-50 p-8 rounded-2xl">
                <FiStar className="text-5xl text-yellow-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">{analysisData.summary.averageRating.toFixed(2)}</h3>
                <p className="text-gray-600 font-semibold">Average Rating / 5.0</p>
              </div>
            </div>
          </div>
          {/* <div className="mt-6">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={summaryLineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div> */}

          {/* <div className="mt-6">
  <div className="w-full h-56 sm:h-64">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={summaryLineData}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="summaryBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: '#475569' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#475569' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip cursor={{ fill: 'rgba(239,246,255,0.6)' }} />
        <Legend verticalAlign="top" height={36} />
        <Bar
          dataKey="value"
          name="Value"
          fill="url(#summaryBar)"
          radius={[10, 10, 0, 0]}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
         </div> */}

         <div className="mt-6">
  <div className="w-full h-56 sm:h-64">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={summaryLineData}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="summaryArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: '#475569' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#475569' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: 'rgba(239,246,255,0.6)' }}
          contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '0.5rem' }}
        />
        <Legend verticalAlign="top" height={36} />
        <Area
          type="monotone"
          dataKey="value"
          name="Value"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#summaryArea)"
          dot={{ r: 4, fill: '#3b82f6' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
</div>
        </section>

        {/* Section 2: Positive vs Negative Feedback Distribution */}
        <section className="bg-background/80 p-6 rounded-3xl shadow-xl border">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
            <FiTrendingUp className="text-green-600" /> Feedback Distribution Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-orange-400 mb-4 text-center">Positive Feedbacks</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={positivePieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} paddingAngle={2}>
                    <Cell fill="#10b981" />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <span className="text-2xl font-bold text-green-600">{analysisData.positiveFeedbacks.count}</span>
                <span className="text-gray-500 ml-2">out of {totalFeedbacks}</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-red-400 mb-4 text-center">Negative Feedbacks</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={negativePieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} paddingAngle={2}>
                    <Cell fill="#f43f5e" />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <span className="text-2xl font-bold text-red-600">{analysisData.negativeFeedbacks.count}</span>
                <span className="text-gray-500 ml-2">out of {totalFeedbacks}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Spamming Users Analysis */}
        <section className="bg-background/80 p-6 rounded-3xl shadow-xl border">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FiShield className="text-orange-600" /> Spam Detection Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">User Behavior Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={spammersPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} paddingAngle={5}>
                    <Cell fill="#f59e0b" />
                    <Cell fill="#10b981" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <span className="text-2xl font-bold text-orange-600">{analysisData.spammingUsers.count}</span>
                <span className="text-gray-500 ml-2">suspicious users detected</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Flagged Users List</h3>
              <div className="bg-orange-50 p-4 rounded-2xl max-h-80 overflow-y-auto">
                {showSpammersList ? (
                  <div className="space-y-2">
                    {analysisData.spammingUsers.list.map((user : any, index : any) => (
                      <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-orange-200">
                        <span className="font-medium text-gray-800">{user}</span>
                        <span className="text-sm text-orange-600 ml-2">[Flagged]</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiUsers className="text-4xl text-orange-400 mx-auto mb-4" />
                    <button 
                      onClick={() => setShowSpammersList(true)}
                      className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors font-semibold"
                    >
                      View Flagged Users ({analysisData.spammingUsers.list.length})
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Rating Distribution */}
        <section className="bg-background/80 p-6 rounded-3xl shadow-xl border">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FiStar className="text-purple-600" /> Rating Distribution Analysis
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={ratingDistributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="url(#ratingGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Section 5: Most Positive Meals */}
        <section className="bg-background/80 p-6 rounded-3xl shadow-xl border">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FiTrendingUp className="text-green-600" /> Top Performing Meals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisData.mostPositiveMeals.meals.map((meal : any, index: any) => (
              <div key={index} className="bg-green-50 p-6 rounded-2xl border border-green-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">{meal.name}</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie 
                      data={generateMealPieData(meal)} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={40}
                      outerRadius={80}
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center mt-4">
                  <span className="text-2xl font-bold text-green-600">{meal.averageRating.toFixed(1)}</span>
                  <span className="text-gray-500">/5.0</span>
                </div>
                {meal.comments && meal.comments.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiMessageCircle className="text-green-600" /> Comments
                    </h4>
                    <div className="bg-white p-3 rounded-lg max-h-32 overflow-y-auto">
                      {meal.comments.slice(0, 3).map((comment: any, idx: any) => (
                        <p key={idx} className="text-sm text-gray-600 mb-1">• {comment}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Most Negative Meals */}
        <section className="bg-background/80 p-6 rounded-3xl shadow-xl border">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FiTrendingDown className="text-red-600" /> Meals Needing Improvement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisData.mostNegativeMeals.meals.map((meal: any, index: any) => (
              <div key={index} className="bg-red-50 p-6 rounded-2xl border border-red-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">{meal.name}</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie 
                      data={generateMealPieData(meal)} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={40}
                      outerRadius={80}
                    >
                      <Cell fill="#f43f5e" />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center mt-4">
                  <span className="text-2xl font-bold text-red-600">{meal.averageRating.toFixed(1)}</span>
                  <span className="text-gray-500">/5.0</span>
                </div>
                {meal.negativeComments && meal.negativeComments.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiMessageCircle className="text-red-600" /> Issues Reported
                    </h4>
                    <div className="bg-white p-3 rounded-lg max-h-32 overflow-y-auto">
                      {meal.negativeComments.slice(0, 3).map((comment: any, idx: any) => (
                        <p key={idx} className="text-sm text-gray-600 mb-1">• {comment}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: AI Suggestions */}
        <section className="bg-background/80 p-6 rounded-3xl shadow-xl border">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FiCpu className="text-blue-600" /> AI-Powered Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <FiCheckCircle /> Strengths & Good Points
              </h3>
              <div className="space-y-3">
                {analysisData.aiSuggestions.goodPoints.map((point:any, index:number) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <FiCheckCircle className="text-green-600" />
                      </div>
                      <p className="text-gray-700 font-medium">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                <FiAlertCircle /> Areas for Improvement
              </h3>
              <div className="space-y-3">
                {analysisData.aiSuggestions.badPoints.map((point:any, index:number) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 p-2 rounded-full">
                        <FiAlertCircle className="text-red-600" />
                      </div>
                      <p className="text-gray-700 font-medium">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: AI Summary */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-3xl shadow-xl border">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FiCpu className="text-blue-600" /> Executive AI Summary
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg italic">
                "{analysisData.aiSummaryText}"
              </p>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <FiCpu className="text-blue-500" />
                Generated by AI Analysis Engine
              </span>
              <span>•</span>
              <span>Based on {analysisData.summary.totalFeedbacks} feedback entries</span>
            </div>
          </div>
        </section>

      </div>
    </div>


</div>

   
  );
};

export default AnalyticsDashboard;



//  <div className="font-sans bg-gray-50 min-h-screen p-4 md:p-6">
//       <div className="max-w-screen-2xl mx-auto space-y-8">
        
//         {/* Header */}
//         <header className="text-center mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Feedback Intelligence Dashboard</h1>
//           <p className="text-gray-600 text-lg">AI-driven insights into customer satisfaction and performance metrics</p>
//         </header>

//         {/* Section 1: Summary Metrics */}
//         <section className="bg-white p-6 rounded-3xl shadow-xl border">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//             <FiBarChart2 className="text-blue-600" /> Summary Overview
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="text-center">
//               <div className="bg-blue-50 p-8 rounded-2xl">
//                 <FiUsers className="text-5xl text-blue-600 mx-auto mb-4" />
//                 <h3 className="text-3xl font-bold text-gray-900">{analysisData.summary.totalFeedbacks}</h3>
//                 <p className="text-gray-600 font-semibold">Total Feedbacks</p>
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="bg-yellow-50 p-8 rounded-2xl">
//                 <FiStar className="text-5xl text-yellow-600 mx-auto mb-4" />
//                 <h3 className="text-3xl font-bold text-gray-900">{analysisData.summary.averageRating.toFixed(2)}</h3>
//                 <p className="text-gray-600 font-semibold">Average Rating / 5.0</p>
//               </div>
//             </div>
//           </div>
//           <div className="mt-6">
//             <ResponsiveContainer width="100%" height={200}>
//               <LineChart data={summaryLineData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 6 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </section>

//         {/* Section 2: Positive vs Negative Feedback Distribution */}
//         <section className="bg-white p-6 rounded-3xl shadow-xl border">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//             <FiTrendingUp className="text-green-600" /> Feedback Distribution Analysis
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Positive Feedbacks</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie data={positivePieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} paddingAngle={2}>
//                     <Cell fill="#10b981" />
//                     <Cell fill="#e5e7eb" />
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//               <div className="text-center mt-4">
//                 <span className="text-2xl font-bold text-green-600">{analysisData.positiveFeedbacks.count}</span>
//                 <span className="text-gray-500 ml-2">out of {totalFeedbacks}</span>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Negative Feedbacks</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie data={negativePieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} paddingAngle={2}>
//                     <Cell fill="#f43f5e" />
//                     <Cell fill="#e5e7eb" />
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//               <div className="text-center mt-4">
//                 <span className="text-2xl font-bold text-red-600">{analysisData.negativeFeedbacks.count}</span>
//                 <span className="text-gray-500 ml-2">out of {totalFeedbacks}</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Section 3: Spamming Users Analysis */}
//         <section className="bg-white p-6 rounded-3xl shadow-xl border">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//             <FiShield className="text-orange-600" /> Spam Detection Analysis
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">User Behavior Distribution</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie data={spammersPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} paddingAngle={5}>
//                     <Cell fill="#f59e0b" />
//                     <Cell fill="#10b981" />
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//               <div className="text-center mt-4">
//                 <span className="text-2xl font-bold text-orange-600">{analysisData.spammingUsers.count}</span>
//                 <span className="text-gray-500 ml-2">suspicious users detected</span>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-4">Flagged Users List</h3>
//               <div className="bg-orange-50 p-4 rounded-2xl max-h-80 overflow-y-auto">
//                 {showSpammersList ? (
//                   <div className="space-y-2">
//                     {analysisData.spammingUsers.list.map((user, index) => (
//                       <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-orange-200">
//                         <span className="font-medium text-gray-800">{user}</span>
//                         <span className="text-sm text-orange-600 ml-2">[Flagged]</span>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <FiUsers className="text-4xl text-orange-400 mx-auto mb-4" />
//                     <button 
//                       onClick={() => setShowSpammersList(true)}
//                       className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors font-semibold"
//                     >
//                       View Flagged Users ({analysisData.spammingUsers.list.length})
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Section 4: Rating Distribution */}
//         <section className="bg-white p-6 rounded-3xl shadow-xl border">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//             <FiStar className="text-purple-600" /> Rating Distribution Analysis
//           </h2>
//           <ResponsiveContainer width="100%" height={350}>
//             <BarChart data={ratingDistributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//               <defs>
//                 <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
//                   <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.3}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count" fill="url(#ratingGradient)" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </section>

//         {/* Section 5: Most Positive Meals */}
//         <section className="bg-white p-6 rounded-3xl shadow-xl border">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//             <FiTrendingUp className="text-green-600" /> Top Performing Meals
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {analysisData.mostPositiveMeals.meals.map((meal, index) => (
//               <div key={index} className="bg-green-50 p-6 rounded-2xl border border-green-200">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">{meal.name}</h3>
//                 <ResponsiveContainer width="100%" height={200}>
//                   <PieChart>
//                     <Pie 
//                       data={generateMealPieData(meal)} 
//                       dataKey="value" 
//                       nameKey="name" 
//                       cx="50%" 
//                       cy="50%" 
//                       innerRadius={40}
//                       outerRadius={80}
//                     >
//                       <Cell fill="#10b981" />
//                       <Cell fill="#e5e7eb" />
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//                 <div className="text-center mt-4">
//                   <span className="text-2xl font-bold text-green-600">{meal.averageRating.toFixed(1)}</span>
//                   <span className="text-gray-500">/5.0</span>
//                 </div>
//                 {meal.comments && meal.comments.length > 0 && (
//                   <div className="mt-4">
//                     <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                       <FiMessageCircle className="text-green-600" /> Comments
//                     </h4>
//                     <div className="bg-white p-3 rounded-lg max-h-32 overflow-y-auto">
//                       {meal.comments.slice(0, 3).map((comment, idx) => (
//                         <p key={idx} className="text-sm text-gray-600 mb-1">• {comment}</p>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Section 6: Most Negative Meals */}
//         <section className="bg-white p-6 rounded-3xl shadow-xl border">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//             <FiTrendingDown className="text-red-600" /> Meals Needing Improvement
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {analysisData.mostNegativeMeals.meals.map((meal, index) => (
//               <div key={index} className="bg-red-50 p-6 rounded-2xl border border-red-200">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">{meal.name}</h3>
//                 <ResponsiveContainer width="100%" height={200}>
//                   <PieChart>
//                     <Pie 
//                       data={generateMealPieData(meal)} 
//                       dataKey="value" 
//                       nameKey="name" 
//                       cx="50%" 
//                       cy="50%" 
//                       innerRadius={40}
//                       outerRadius={80}
//                     >
//                       <Cell fill="#f43f5e" />
//                       <Cell fill="#e5e7eb" />
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//                 <div className="text-center mt-4">
//                   <span className="text-2xl font-bold text-red-600">{meal.averageRating.toFixed(1)}</span>
//                   <span className="text-gray-500">/5.0</span>
//                 </div>
//                 {meal.negativeComments && meal.negativeComments.length > 0 && (
//                   <div className="mt-4">
//                     <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                       <FiMessageCircle className="text-red-600" /> Issues Reported
//                     </h4>
//                     <div className="bg-white p-3 rounded-lg max-h-32 overflow-y-auto">
//                       {meal.negativeComments.slice(0, 3).map((comment, idx) => (
//                         <p key={idx} className="text-sm text-gray-600 mb-1">• {comment}</p>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Section 7: AI Suggestions */}
//         <section className="bg-white p-6 rounded-3xl shadow-xl border">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//             <FiCpu className="text-blue-600" /> AI-Powered Recommendations
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
//               <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
//                 <FiCheckCircle /> Strengths & Good Points
//               </h3>
//               <div className="space-y-3">
//                 {analysisData.aiSuggestions.goodPoints.map((point, index) => (
//                   <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
//                     <div className="flex items-start gap-3">
//                       <div className="bg-green-100 p-2 rounded-full">
//                         <FiCheckCircle className="text-green-600" />
//                       </div>
//                       <p className="text-gray-700 font-medium">{point}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
//               <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
//                 <FiAlertCircle /> Areas for Improvement
//               </h3>
//               <div className="space-y-3">
//                 {analysisData.aiSuggestions.badPoints.map((point, index) => (
//                   <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
//                     <div className="flex items-start gap-3">
//                       <div className="bg-red-100 p-2 rounded-full">
//                         <FiAlertCircle className="text-red-600" />
//                       </div>
//                       <p className="text-gray-700 font-medium">{point}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Section 8: AI Summary */}
//         <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-3xl shadow-xl border">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//             <FiCpu className="text-blue-600" /> Executive AI Summary
//           </h2>
//           <div className="bg-white p-6 rounded-2xl shadow-sm border">
//             <div className="prose max-w-none">
//               <p className="text-gray-700 leading-relaxed text-lg italic">
//                 "{analysisData.aiSummaryText}"
//               </p>
//             </div>
//             <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
//               <span className="flex items-center gap-2">
//                 <FiCpu className="text-blue-500" />
//                 Generated by AI Analysis Engine
//               </span>
//               <span>•</span>
//               <span>Based on {analysisData.summary.totalFeedbacks} feedback entries</span>
//             </div>
//           </div>
//         </section>

//       </div>
//     </div>