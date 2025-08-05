// import { useEffect, useState } from "react";

// const SplashScreen: React.FC = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const handleLoad = () => {
//       setTimeout(() => {
//         setIsVisible(false);
//       }, 1500); // display time
//     };

//     if (document.readyState === "complete") {
//       handleLoad();
//     } else {
//       window.addEventListener("load", handleLoad);
//       return () => window.removeEventListener("load", handleLoad);
//     }
//   }, []);

//   if (!isVisible) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center text-white"
//       style={{
//         backgroundColor: "oklch(16.566% 0.00834 285.43 / 0.993)",
//       }}
//     >
//       <div className="flex flex-col items-center gap-4 scale-75 animate-[zoomIn_0.8s_ease-out_forwards]">
//         {/* Logo */}
//         <img src="/logo.svg" alt="Logo" className="w-20 h-20" />

//         {/* Heading with gradient text */}
//         <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-300 via-sky-400 to-purple-300 bg-clip-text text-transparent">
//           Smart Mess System
//         </h1>
//             <h1 className="text-lg md:text-base font-medium text-white/80 tracking-wide p-2">
//         {new Date().toLocaleDateString("en-US", {
//             weekday: "long",
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//         })}
//         </h1>

//       </div>
//     </div>
//   );
// };

// export default SplashScreen;



import { useEffect, useState } from "react";

const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed min-h-screen inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "oklch(16.566% 0.00834 285.43 / 0.993)",
      }}
    >
        {/* Top Loading Bar */}
{/* <div className="absolute top-0 left-0 h-0.5 w-full bg-white/10 overflow-hidden z-50">
  <div className="h-full animate-topBar bg-gradient-to-br from-blue-900 to-orange-400/10"></div>
</div> */}

<div className="absolute top-0 left-0 h-0.5 w-full bg-white/5 overflow-hidden z-50">
  <div className="h-full w-full bg-gradient-to-r from-blue-700 via-sky-400 to-orange-300 animate-topBar rounded-r-full"></div>
</div>


      {/* 💡 Background Spots */}
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-blue-500/30 to-blue-700/10 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-blue-400/20 to-purple-600/10 rounded-full blur-3xl bottom-20 right-10 animate-pulse"></div>
      <div className="absolute w-[200px] h-[200px] bg-gradient-to-br from-sky-400/30 to-indigo-600/10 rounded-full blur-2xl top-1/2 left-1/4 animate-pulse delay-200"></div>
      <div className="absolute w-[250px] h-[250px] bg-gradient-to-br from-cyan-500/20 to-blue-800/10 rounded-full blur-2xl bottom-10 left-1/3 animate-pulse delay-300"></div>
      <div className="absolute w-[150px] h-[150px] bg-gradient-to-br from-blue-300/30 to-indigo-700/10 rounded-full blur-2xl top-24 right-1/3 animate-pulse delay-400"></div>

      {/* 💬 Center Content */}
      <div className="flex flex-col items-center gap-2 animate-[zoomIn_0.8s_ease-out_forwards] scale-75 text-center z-10">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="w-52 h-52" />


   {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-300 via-sky-400 to-purple-300 bg-clip-text text-transparent">
          Smart Mess System
        </h1>
        {/* Date */}
        <p className="text-sm md:text-base font-medium text-white/80 tracking-wide">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

      
      </div>
    </div>
  );
};

export default SplashScreen;
