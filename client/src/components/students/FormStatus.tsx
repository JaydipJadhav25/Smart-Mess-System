


function FormStatus({status = "Pendding"}) {
 return (
    <div className="relative flex flex-col w-84 h-32 bg-[#29292c] rounded-xl overflow-hidden font-sans text-base isolate group">
      {/* Inner background */}
      <div className="absolute inset-[2px] rounded-[0.9375rem] bg-[#18181b] z-20"></div>

      {/* Left gradient bar */}
      <div className="absolute w-1 inset-y-2.5 left-2 rounded-sm bg-gradient-to-b from-[#2eadff] via-[#3d83ff] to-[#7e61ff] transition-transform duration-300 ease-in-out z-40 group-hover:translate-x-[0.15rem]" />

      {/* Glow effects */}
      <div className="absolute w-80 h-80 bg-[radial-gradient(circle_closest-side_at_center,white,transparent)] opacity-0 transition-opacity duration-300 ease-in-out z-30 group-hover:opacity-10 translate-x-[-50%] translate-y-[-50%]" />
      <div className="absolute w-80 h-80 bg-[radial-gradient(circle_closest-side_at_center,white,transparent)] opacity-0 transition-opacity duration-300 ease-in-out z-10 group-hover:opacity-10 translate-x-[-50%] translate-y-[-50%]" />

      {/* Content */}
      <div className="relative z-50 text-[#32a6ff] font-medium text-lg px-5 pt-2 pb-1 transition-transform duration-300 group-hover:translate-x-[0.15rem]">
     Application submitted successfully !
      </div>
      {/* <div className="relative z-50 text-[#99999d] px-5 transition-transform duration-300 group-hover:translate-x-[0.25rem]">
        Your details have been sent for verification.
      </div> */}

       <div className="relative z-50 text-[#b5b5b0] px-5 transition-transform duration-300 group-hover:translate-x-[0.25rem]">
        Contact your mess manager to verify details & <span className="font-semibold text-orange-700">Aadhaar copy.</span>
      </div>
        <div className="relative z-50 text-[#99999d]  px-5 transition-transform duration-300 group-hover:translate-x-[0.25rem]">
        Status :  <span className="font-semibold text-orange-700">{status}</span>
      </div>
    </div>
  );
}

export default FormStatus

