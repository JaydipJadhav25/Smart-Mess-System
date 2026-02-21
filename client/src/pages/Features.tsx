import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { axiosInstance } from "@/config/axiosInstances";
import { useQuery } from "@tanstack/react-query";

function Features() {
  const {
    isError,
    isLoading,
    data: feeRecord,
    error: feeError,
  } = useQuery({
    queryKey: ["feeRecord"],
    queryFn: async () => {
      const response = await axiosInstance.get("/open/fees-record");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });



  //2 meal plane
  const {
    isLoading: mealLoading,
    isError: mealError,
    data: mealData,
    error: mealErrorData,
  } = useQuery({
    queryKey: ["mealPlan"],
    queryFn: async () => {
      const response = await axiosInstance.get("/open/mealPlan-record");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });



    console.log("feeError : ", feeError);
    console.log("mealplan Error : ", mealError);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-24">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Smart Face Attendance System
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Real-time facial recognition powered by AI to ensure secure,
            automated and tamper-proof attendance tracking.
          </p>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE CONTENT */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              AI Driven Identity Verification
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              Our system uses advanced facial recognition algorithms to
              automatically detect and verify student identity, eliminating
              proxy attendance and manual errors.
            </p>

            <ul className="space-y-3 text-muted-foreground">
              <li>✔ Real-time face detection</li>
              <li>✔ Anti-spoof verification</li>
              <li>✔ Attendance history tracking</li>
              <li>✔ Admin monitoring dashboard</li>
            </ul>

            <div className="pt-4">
              <span
                className="inline-block px-4 py-1 rounded-full text-xs font-medium
          bg-purple-100 text-purple-700
          dark:bg-purple-900/30 dark:text-purple-400"
              >
                AI + Computer Vision
              </span>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE / GIF */}
          <div className="relative">
            <img
              src="/features/face-attendance-demo.gif"
              alt="AI Face Recognition"
              className="rounded-3xl shadow-2xl"
            />
            <div
              className="absolute -inset-2 bg-gradient-to-r
    from-purple-500 to-pink-500
    blur-2xl opacity-20 -z-10 rounded-3xl"
            ></div>

            {/* Glow Effect */}
            <div
              className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500
        rounded-3xl blur-2xl opacity-20 -z-10"
            ></div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Blockchain Powered Fee System
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our mess management system integrates secure Web3 payments, ensuring
            every transaction is transparent, verifiable, and immutable.
          </p>
        </div>

        {/* Feature Layout */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE CONTENT */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">
              Transparent & Secure Payments
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              Every student payment is recorded on blockchain, providing
              tamper-proof verification and public transparency. No manual
              manipulation. No hidden records.
            </p>

            <ul className="space-y-3 text-muted-foreground">
              <li>✔ Smart contract based validation</li>
              <li>✔ Public transaction verification</li>
              <li>✔ Secure digital record storage</li>
              <li>✔ Instant confirmation</li>
            </ul>

            {/* Button */}
            {!isLoading && !isError && feeRecord && (
              <a
                href={`https://sepolia.etherscan.io/tx/${feeRecord?.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-8 py-3 rounded-xl font-semibold
          bg-blue-600 text-white hover:bg-blue-700
          transition active:scale-95"
              >
                View Live Transaction
              </a>
            )}
          </div>

          {/* RIGHT SIDE DEMO CARD */}
          <div
            className="p-8 rounded-3xl border bg-white dark:bg-background
      shadow-lg border-gray-200 dark:border-gray-700"
          >
            {isLoading && (
              <p className="text-center animate-pulse text-muted-foreground">
                Loading blockchain demo...
              </p>
            )}

            {isError && (
              <p className="text-center text-red-500">
                Failed to load demo data
              </p>
            )}

            {!isLoading && !isError && feeRecord && (
              <div
                className="p-8 rounded-3xl border
    bg-white/80 dark:bg-background/60
    backdrop-blur-xl
    shadow-lg hover:shadow-2xl
    transition duration-300
    border-gray-200 dark:border-gray-700"
              >
                {/* Top Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-xl font-semibold">
                      {feeRecord?.month} {feeRecord?.year}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Blockchain Payment Record
                    </p>
                  </div>

                  <span
                    className="px-4 py-1 text-xs font-semibold rounded-full
        bg-green-100 text-green-700
        dark:bg-green-900/30 dark:text-green-400"
                  >
                    ✔ Verified
                  </span>
                </div>

                {/* Amount Highlight Section */}
                <div
                  className="bg-gradient-to-r from-blue-50 to-indigo-50
      dark:from-blue-900/20 dark:to-indigo-900/20
      rounded-2xl p-6 mb-6 text-center"
                >
                  <p className="text-5xl font-bold tracking-tight">
                    ₹{feeRecord?.amount}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Successfully Recorded on Blockchain
                  </p>
                </div>

                {/* User Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      Student Name
                    </p>
                    <p className="text-muted-foreground">
                      {feeRecord?.studentName}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      Student ID
                    </p>
                    <p className="text-muted-foreground">
                      {feeRecord?.student_Id}
                    </p>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      Email Address
                    </p>
                    <p className="text-muted-foreground">
                      {feeRecord?.studentEmail}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-700 my-6" />

                {/* Blockchain Info */}
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium mb-1">Transaction Hash</p>
                    <div
                      className="bg-gray-100 dark:bg-gray-800
          p-3 rounded-xl break-all text-muted-foreground"
                    >
                      {feeRecord?.hash}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium">
                      Block Number:{" "}
                      <span className="text-muted-foreground">
                        {feeRecord?.blockNumber}
                      </span>
                    </p>
                  </div>

                  {/* Etherscan Link */}
                  <a
                    href={`https://sepolia.etherscan.io/tx/${feeRecord?.hash}#eventlog`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2
        text-orange-500 hover:text-emerald-400
        font-medium
        underline underline-offset-4
        transition"
                  >
                    View on Etherscan
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 3h7m0 0v7m0-7L10 14"
                      />
                    </svg>
                  </a>
                </div>

                <p className="text-xs text-muted-foreground mt-6 text-center">
                  Secure • Transparent • Immutable Blockchain Ledger
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            AI Powered Personal Meal Plan
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Smart nutrition planning based on age, height, weight and fitness
            goal. Personalized suggestions generated using AI.
          </p>
        </div>

        {mealLoading && (
          <div className="text-center py-10">
            <p className="animate-pulse text-muted-foreground">
              Loading personalized meal plan...
            </p>
          </div>
        )}

        {mealError && (
          <div className="text-center py-10 text-red-500">
            Failed to load meal plan: {mealErrorData?.message}
          </div>
        )}

        {!mealLoading && mealData && (
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* LEFT SIDE - Meal Plan Info */}
            <div
              className="p-8 rounded-3xl border bg-white/80 dark:bg-background/60
        shadow-lg border-gray-200 dark:border-gray-700 space-y-6"
            >
              <div>
                <p className="text-lg font-semibold">
                  {mealData?.day}'s Meal Plan
                </p>
                <p className="text-sm text-muted-foreground">
                  Goal: {mealData?.goal}
                </p>
              </div>

              {/* Lunch */}
              <div>
                <p className="font-medium mb-2">Lunch</p>
                <ul className="space-y-1 text-muted-foreground">
                  {mealData?.lunch?.map((item: any, i: any) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Dinner */}
              <div>
                <p className="font-medium mb-2">Dinner</p>
                <ul className="space-y-1 text-muted-foreground">
                  {mealData?.dinner?.map((item: any, i: any) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Student Criteria */}
              <div className="text-sm text-muted-foreground pt-4 border-t">
                <p>
                  Age: {mealData?.ageRange?.min}-{mealData?.ageRange?.max}
                </p>
                <p>
                  Height: {mealData?.heightRange?.min}-
                  {mealData?.heightRange?.max} cm
                </p>
                <p>
                  Weight: {mealData?.weightRange?.min}-
                  {mealData?.weightRange?.max} kg
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - AI Suggestions */}
            <div
              className="p-8 rounded-3xl border
        bg-gradient-to-br from-emerald-50 to-teal-50
        dark:from-emerald-900/20 dark:to-teal-900/20
        shadow-lg border-gray-200 dark:border-gray-700 space-y-6"
            >
              <h3 className="text-xl font-semibold">AI Nutrition Insights</h3>

              <p className="text-muted-foreground">
                {mealData?.aiResponse?.summary}
              </p>

              <div>
                <p className="font-medium">Lunch Suggestion</p>
                <p className="text-muted-foreground text-sm mt-1">
                  {mealData?.aiResponse?.meal_suggestion?.lunch}
                </p>
              </div>

              <div>
                <p className="font-medium">Dinner Suggestion</p>
                <p className="text-muted-foreground text-sm mt-1">
                  {mealData?.aiResponse?.meal_suggestion?.dinner}
                </p>
              </div>

              <div>
                <p className="font-medium">Workout Suggestion</p>
                <p className="text-muted-foreground text-sm mt-1">
                  {mealData?.aiResponse?.workout_suggestion}
                </p>
              </div>

              <div>
                <p className="font-medium">Extra Tips</p>
                <ul className="text-muted-foreground text-sm mt-2 space-y-1">
                  {mealData?.aiResponse?.extra_tips?.map((tip: any, i: any) => (
                    <li key={i}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
            Smart Admin Dashboard
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A centralized control system enabling administrators to manage
            students, payments, menus, attendance, and AI-driven insights — all
            in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE - DASHBOARD IMAGE */}
          <div className="relative">
            <div
              className="rounded-3xl overflow-hidden shadow-2xl
        border border-gray-200 dark:border-gray-700
        hover:scale-[1.02] transition duration-300"
            >
              <img
                src="/features/admin-dashboard-demo.gif"
                alt="Smart Admin Dashboard"
                className="w-full h-auto rounded-3xl shadow-2xl
  hover:scale-[1.02] transition duration-300"
              />
            </div>

            {/* Glow Effect */}
            <div
              className="absolute -inset-1 bg-gradient-to-r
        from-indigo-500 to-blue-500
        rounded-3xl blur-2xl opacity-20 -z-10"
            ></div>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Complete Administrative Control
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              The admin dashboard provides real-time analytics, payment
              tracking, menu updates, student verification, and AI-powered
              decision support tools to ensure smooth and efficient mess
              management.
            </p>

            <ul className="space-y-3 text-muted-foreground">
              <li>✔ Student registration & verification</li>
              <li>✔ Blockchain payment monitoring</li>
              <li>✔ Smart menu management system</li>
              <li>✔ Attendance tracking panel</li>
              <li>✔ AI-based analytics & recommendations</li>
            </ul>

            <div className="pt-4">
              <span
                className="inline-block px-4 py-1 rounded-full text-xs font-medium
          bg-indigo-100 text-indigo-700
          dark:bg-indigo-900/30 dark:text-indigo-400"
              >
                Admin Control Panel
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Centralized Administrative Control
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Secure, real-time access to all operational data with full profile
            management and intelligent decision support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE CONTENT */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Full System Visibility & Management
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              The admin panel provides complete oversight of student data,
              payments, attendance logs, meal plans, and AI-generated insights —
              all through a secure role-based authentication system.
            </p>

            <ul className="space-y-3 text-muted-foreground">
              <li>✔ View & manage all student records</li>
              <li>✔ Monitor blockchain & online payments</li>
              <li>✔ Track face attendance logs</li>
              <li>✔ Update menus & meal plans</li>
              <li>✔ Maintain secure admin profile</li>
              <li>✔ AI-based operational insights</li>
            </ul>

            {/* Profile Badge */}
            <div className="pt-4">
              <span
                className="inline-flex items-center gap-2 px-4 py-1
          rounded-full text-xs font-medium
          bg-cyan-100 text-cyan-700
          dark:bg-cyan-900/30 dark:text-cyan-400"
              >
                Role-Based Secure Access
              </span>
            </div>
          </div>

          {/* RIGHT SIDE PROFILE MOCK UI */}
          <div
            className="p-8 rounded-3xl border
      bg-black/90 text-white
      border-cyan-500/30
      shadow-[0_0_40px_rgba(0,255,255,0.15)]
      space-y-4"
          >
            <p className="text-sm text-cyan-400 font-semibold">ADMIN PROFILE</p>

            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Name:</span> System
                Administrator
              </p>
              <p>
                <span className="text-gray-400">Role:</span> Super Admin
              </p>
              <p>
                <span className="text-gray-400">Access Level:</span> Full System
                Access
              </p>
              <p>
                <span className="text-gray-400">Last Login:</span> Today • 09:42
                AM
              </p>
            </div>

            <div className="pt-4 border-t border-cyan-500/20">
              <span className="inline-flex items-center gap-2 text-xs text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                SYSTEM ACTIVE
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            AI Recipe Generator
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Requirement-based smart cooking engine that generates scalable
            professional recipes for bulk mess operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* LEFT SIDE - REQUIREMENT INFO */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Generated Based on Requirement
            </h3>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl space-y-2 text-sm">
              <p>
                <span className="font-medium">Students:</span> 50
              </p>
              <p>
                <span className="font-medium">Meal Type:</span> Lunch
              </p>
              <p>
                <span className="font-medium">Diet:</span> Vegetarian
              </p>
              <p>
                <span className="font-medium">Goal:</span> High Protein
              </p>
              <p>
                <span className="font-medium">Budget:</span> Moderate
              </p>
            </div>

            <ul className="space-y-3 text-muted-foreground">
              <li>✔ Ingredient auto-scaling</li>
              <li>✔ Nutrition-optimized planning</li>
              <li>✔ Bulk cooking support</li>
              <li>✔ Step-by-step preparation guide</li>
            </ul>

            <span
              className="inline-flex items-center gap-2 px-4 py-1
        rounded-full text-xs font-medium
        bg-orange-100 text-orange-700
        dark:bg-orange-900/30 dark:text-orange-400"
            >
              AI Generated Demo
            </span>
          </div>

          {/* RIGHT SIDE - RECIPE CARD */}
          <div
            className="p-8 rounded-3xl border
      bg-white dark:bg-background
      border-gray-200 dark:border-gray-700
      shadow-xl space-y-6"
          >
            <div>
              <p className="text-2xl font-bold">
                Paneer Butter Masala with Jeera Rice
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Serves 50 Students • Estimated Time: 1.5 Hours
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <p className="font-medium mb-2">Ingredients</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 5 kg basmati rice</li>
                <li>• 3 kg paneer (cubed)</li>
                <li>• 4 kg tomatoes (pureed)</li>
                <li>• 1 kg onions (finely chopped)</li>
                <li>• 500 g butter</li>
                <li>• 700 ml fresh cream</li>
                <li>• Spices: turmeric, chili powder, garam masala, cumin</li>
              </ul>
            </div>

            {/* Steps */}
            <div>
              <p className="font-medium mb-2">Preparation Steps</p>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Soak rice for 30 minutes and cook until fluffy.</li>
                <li>Sauté onions in butter until golden brown.</li>
                <li>Add tomato puree and cook until oil separates.</li>
                <li>Add spices and simmer for 10 minutes.</li>
                <li>Add paneer cubes and cook for 8–10 minutes.</li>
                <li>Finish with fresh cream and garnish.</li>
                <li>Prepare jeera rice separately and serve hot.</li>
              </ol>
            </div>

            <div className="text-xs text-muted-foreground pt-4 border-t">
              Nutrition Focus: High Protein • Balanced Carbs • Rich Flavor
              Profile
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Features;
