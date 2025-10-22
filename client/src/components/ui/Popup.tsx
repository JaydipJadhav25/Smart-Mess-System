import { CheckCircle, X, Info, AlertTriangle} from 'lucide-react';
// import React from 'react';

export default function Popup({ message, show, type = 'success', title }:any) {
  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-emerald-500 to-green-600',
          border: 'border-l-emerald-400',
          icon: <CheckCircle className="w-7 h-7 text-green-600" />,
          pulse: 'bg-emerald-200'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-red-600',
          border: 'border-l-red-400',
          icon: <X className="w-7 h-7 text-red-600" />,
          pulse: 'bg-red-200'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-amber-500 to-orange-600',
          border: 'border-l-amber-400',
          icon: <AlertTriangle className="w-7 h-7 text-yellow-600" />,
          pulse: 'bg-amber-200'
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
          border: 'border-l-blue-400',
          icon: <Info className="w-7 h-7 text-blue-600" />,
          pulse: 'bg-blue-200'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-emerald-500 to-green-600',
          border: 'border-l-emerald-400',
          icon: <CheckCircle className="w-7 h-7 text-orange-600" />,
          pulse: 'bg-emerald-200'
        };
    }
  };

  const config = getToastConfig();

  return (
    <>
      <div
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 pointer-events-none transition-all duration-700 ease-out z-50 ${
          show 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-8 scale-95'
        }`}
      >
        <div
          className={`${config.bg} ${config.border} text-white px-8 py-6 rounded-xl shadow-2xl border-l-8 pointer-events-auto min-w-96 max-w-lg backdrop-blur-sm`}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <div className="p-1 rounded-full bg-white bg-opacity-20">
                {config.icon}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              {title && (
                <h4 className="text-base font-semibold mb-1 text-white">
                  {title}
                </h4>
              )}
              <p className="text-sm font-medium leading-6 text-white text-opacity-95">
                {message}
              </p>
            </div>
            
            <div className="flex-shrink-0 ml-4">
              <div className="flex space-x-1">
                <div className={`w-2 h-2 ${config.pulse} rounded-full animate-pulse`}></div>
                <div className={`w-2 h-2 ${config.pulse} rounded-full animate-pulse delay-75`}></div>
                <div className={`w-2 h-2 ${config.pulse} rounded-full animate-pulse delay-150`}></div>
              </div>
            </div>
          </div>
          
          {/* Enhanced progress bar */}
          <div className="mt-4 bg-white bg-opacity-20 rounded-full h-1.5 overflow-hidden relative">
            <div 
              className={`bg-gradient-to-r from-white to-white bg-opacity-80 h-full rounded-full transition-all duration-2000 ease-linear absolute top-0 left-0 ${
                show ? 'w-full animate-shrink' : 'w-0'
              }`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
