import { Link } from "react-router-dom";

import SettingCard from "@/components/admin/SettingCard";
import { useAdminSettings } from "@/components/context/useAdminSettings";

 function AdminSettingPage() {

  const admin =  useAdminSettings();

  if (!admin) return null;

  const {
    onlinePaymentEnabled,
    feedbackEnabled,
    toggleOnlinePayment,
    toggleFeedback,
    loading
  } = admin;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---------- NAVBAR ---------- */}
      <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Back */}
          <Link
            to="/"
            className="group flex items-center text-gray-500 hover:text-blue-600"
          >
            <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center mr-2">
              ←
            </div>
            <span className="font-medium text-sm">Back</span>
          </Link>

          <div className="font-semibold text-gray-700">Admin Settings</div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            Dashboard
          </button>
        </div>
      </nav>

      {/* ---------- SETTINGS ---------- */}
      {
        loading ? <p className="text-green-800 text-center pt-2.5 font-semibold">Loading... </p>
         : 
         <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Online Payment Toggle */}
        <SettingCard
          title="Online Payments"
          description="Enable or disable student online payments & blockchain operations."
          enabled={onlinePaymentEnabled}
          onToggle={toggleOnlinePayment}
        />

        {/* Feedback Toggle */}
        <SettingCard
          title="Student Feedback"
          description="Control whether students can submit feedback."
          enabled={feedbackEnabled}
          onToggle={toggleFeedback}
        />
      </div>
      }
    </div>
  );
}

export default AdminSettingPage;
