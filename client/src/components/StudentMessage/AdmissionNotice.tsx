const AdmissionNotice = () => {
  return (
    <div className="flex items-center justify-center min-h-[300px] p-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
        
        {/* Professional Icon Container */}
        <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        {/* Professional Message */}
        <h2 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
          Admission Required
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          Access to these features is restricted to enrolled mess members. To proceed, please submit your formal admission application for verification.
        </p>

        {/* Action Button */}
        <button 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-md shadow-indigo-100"
          onClick={() => { /* Navigate to Form */ }}
        >
          Fill Application Form
        </button>

        {/* Help text */}
        <p className="mt-4 text-xs text-slate-400">
          Need help? Contact the <span className="underline cursor-pointer">Admin Support</span>.
        </p>
      </div>
    </div>
  );
};


export default AdmissionNotice;