import { axiosInstance } from '@/config/axiosInstances';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
  import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

// Define the form data interface
interface OtpFormData {
  otp: string;
}

// Main App Component for OTP Verification
// The user's email can be passed as a prop for display purposes.
const OtpVerification = ({ email = "your-email@example.com" }) => {

  //user email 
  const { userEmail } = useParams();
  
  //navigater
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpDigits, setOtpDigits] = useState<string[]>(new Array(6).fill(''));
  

  
  // State for theme management
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger
  } = useForm<OtpFormData>({
    mode: 'onBlur'
  });

  // Effect to update the hidden form value when otpDigits changes
  useEffect(() => {
    const otpValue = otpDigits.join('');
    setValue('otp', otpValue);
    if (otpValue.length === 6) {
        trigger('otp'); // Trigger validation when all digits are filled
    }
  }, [otpDigits, setValue, trigger]);

  // Effect to toggle dark class on the root element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  // Effect for the resend cooldown timer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const onSubmit: SubmitHandler<OtpFormData> = async (data) => {
    setIsLoading(true);
    setStatus({ message: '', type: '' });
    try {
      console.log('Verifying OTP:', data.otp);

     const response = await axiosInstance.post("/user/verify", { otp: data.otp });
      console.log("responce : " , response.data);
       toast.success("Verification successful! Your account is now active.'");
              

      setStatus({ message: response.data.message  || 'Verification successful! Your account is now active.', type: 'success' });
      reset();

      //navigate
      navigate("/login" , {replace : true});

      setOtpDigits(new Array(6).fill(''));

    } catch (error : any) {
      const userError = error?.response?.data.message;
      console.error('OTP verification error:', error);
      
      setStatus({ message: userError || 'Verification failed. The code is incorrect.', type: 'error' });

    } finally {

      setIsLoading(false);
    }
  };
  
  const handleChange = (element: HTMLInputElement, index: number) => {
    // Only allow single numeric digits
    if (!/^[0-9]$/.test(element.value)) {
        element.value = "";
        return;
    }

    const newOtp = [...otpDigits];
    newOtp[index] = element.value;
    setOtpDigits(newOtp);

    // Move to next input if there is a value and it's not the last one
    if (element.value && element.nextSibling) {
        (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    console.log(index);
    // Move focus to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !e.currentTarget.value && e.currentTarget.previousSibling) {
        (e.currentTarget.previousSibling as HTMLInputElement).focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      const paste = e.clipboardData.getData('text');
      if (/^[0-9]{6}$/.test(paste)) {
          const newOtp = paste.split('');
          setOtpDigits(newOtp);
          // Focus on the last input after paste
          const inputs = e.currentTarget.querySelectorAll('input');
          if (inputs && inputs.length > 0) {
              inputs[inputs.length - 1].focus();
          }
      }
  };


  const handleResendOtp = () => {
      if (resendCooldown > 0) return; // Prevent resend during cooldown
      console.log("Resending OTP to", email);
      // Place your API call logic to resend OTP here
      setResendCooldown(60); // Start 60-second cooldown
      setStatus({ message: 'A new code has been sent to your email.', type: 'success' });
  };
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const SunIcon = () => (
     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
  );

  const MoonIcon = () => (
     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
  );


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="absolute top-4 right-4">
          <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all duration-300"
              aria-label="Toggle dark mode"
          >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
      </div>
        
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-xl transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Email Verification
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Enter the 6-digit code sent to <br/> <span className="font-medium text-gray-800 dark:text-gray-100">{userEmail}</span>
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
                {/* OTP Input */}
                <div>
                    <label htmlFor="otp-0" className="sr-only">
                        Verification Code
                    </label>
                     {/* Hidden input for react-hook-form to handle validation and submission */}
                    <input
                        id="otp"
                        type="hidden"
                        {...register('otp', {
                            required: 'Verification code is required',
                            minLength: { value: 6, message: 'Code must be 6 digits' },
                        })}
                    />
                    <div className="flex justify-center space-x-2 sm:space-x-3" onPaste={handlePaste}>
                        {otpDigits.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="tel" // Use 'tel' for better mobile numeric keyboard
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onFocus={(e) => e.target.select()}
                                className={`w-12 h-12 sm:w-14 sm:h-14 text-center border rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200 ${
                                    errors.otp ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                            />
                        ))}
                    </div>
                    {errors.otp && (
                        <p className="text-red-500 text-sm mt-2 text-center">{errors.otp.message}</p>
                    )}
                </div>
            </div>

            {/* Status Message */}
            {status.message && (
              <div className={`text-sm text-center font-medium ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {status.message}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  'Verify Account'
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Didn't receive the code?{' '}
                <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendCooldown > 0}
                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Resend {resendCooldown > 0 ? `(${resendCooldown}s)` : ''}
                </button>
              </p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;

