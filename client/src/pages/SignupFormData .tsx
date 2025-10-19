import { axiosInstance } from '@/config/axiosInstances';
import  { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner"


// Define the form data interface
interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define the submission data interface (without confirmPassword)
interface SignupSubmissionData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Main App Component
const SignupFormData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
  
  //navigater
  const navigate = useNavigate();


  // State for theme management
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Effect to toggle dark class on the root element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors  },
    reset 
  } = useForm<SignupFormData>({
    mode: 'onBlur'
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setIsLoading(true);
    setStatus({ message: '', type: '' });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { confirmPassword, ...submitData } = data;
      const signupData: SignupSubmissionData = submitData as SignupSubmissionData;
      console.log('Signup Data:', signupData);
      
      // Uncomment the below block to make a real API call
      // const response = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(signupData)
      // });
      // if (!response.ok) throw new Error('Network response was not ok.');
      // const result = await response.json();

       const responce = await axiosInstance.post("/user/signup" , signupData);
       console.log("repose from server : " , responce.data);

       //check response
      setStatus({ message: responce.data?.message || "user signup suucessfully", type: 'success' });
      
      //success message
      toast.success("user signup suucessfully");

      //re-direct on verification
      navigate(`/verification/${responce.data.data.email}` , {replace : true});
      reset();

    } catch (error : any) {

      // console.error('Signup error:', error?.AxiosError?.response?.data);
      const userError = error?.response?.data.message;
      console.error('Signup error:', userError);

      //message
       toast.error("Signup failed. Please try again.");

      setStatus({ message: userError || 'Signup failed. Please try again.', type: 'error' });

    } finally {
      setIsLoading(false);
    }
  };


  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const EyeIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    </svg>
  );
  
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
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Sign up to get started</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
                 {/* First Name and Last Name */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            First Name *
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200 ${
                                errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                            placeholder="Enter your first name"
                            {...register('firstName', {
                                required: 'First name is required',
                                minLength: { value: 2, message: 'First name must be at least 2 characters' },
                                pattern: { value: /^[A-Za-z\s]+$/, message: 'First name should contain only letters' }
                            })}
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div className="w-full sm:w-1/2">
                         <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Last Name *
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200 ${
                                errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                            placeholder="Enter your last name"
                            {...register('lastName', {
                                required: 'Last name is required',
                                minLength: { value: 2, message: 'Last name must be at least 2 characters' },
                                pattern: { value: /^[A-Za-z\s]+$/, message: 'Last name should contain only letters' }
                            })}
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>


                {/* Generic Input Field Component */}
                {(['email', 'password', 'confirmPassword'] as const).map(fieldName => {
                    const isPasswordField = fieldName === 'password' || fieldName === 'confirmPassword';
                    const showState = fieldName === 'password' ? showPassword : showConfirmPassword;
                    const toggleVisibility = fieldName === 'password' ? () => setShowPassword(!showPassword) : () => setShowConfirmPassword(!showConfirmPassword);
                    
                    const fieldLabels = {
                        email: "Email Address",
                        password: "Password",
                        confirmPassword: "Confirm Password",
                    };
                    
                    const fieldTypes = {
                        email: 'email',
                        password: showPassword ? 'text' : 'password',
                        confirmPassword: showConfirmPassword ? 'text' : 'password',
                    }

                    return (
                        <div key={fieldName}>
                            <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {fieldLabels[fieldName]} *
                            </label>
                            <div className="relative">
                                <input
                                    id={fieldName}
                                    type={fieldTypes[fieldName] || 'text'}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200 ${
                                        errors[fieldName] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                    placeholder={`Enter your ${fieldLabels[fieldName].toLowerCase()}`}
  
                                    {...register(fieldName, {
                                        required: `${fieldLabels[fieldName]} is required`,
                                        ...(fieldName === 'email' && {
                                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please enter a valid email address' }
                                         ,
                                          // --- ✨ THIS IS THE NEW PART ---
                                          // validate: async (value) => {
                                          //   const isEmailTaken = await checkEmailExists(value);
                                          //   return isEmailTaken ? 'This email is already registered.' : true;
                                          // }
                                          // --- END OF NEW PART ---
                                        }),

                                        ...(fieldName === 'password' && {
                                            minLength: { value: 8, message: 'Password must be at least 8 characters' },
                                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, message: 'Must contain uppercase, lowercase, number and special character' }
                                        }),

                                        ...(fieldName === 'confirmPassword' && {
                                            validate: (value: string) => value === password || 'Passwords do not match'
                                        })
                                    })}
                                />
                                {isPasswordField && (
                                    <button
                                        type="button"
                                        onClick={toggleVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        aria-label="Toggle password visibility"
                                    >
                                       {showState ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                )}
                            </div>
                            {errors[fieldName] && (
                                <p className="text-red-500 text-sm mt-1">{errors[fieldName]?.message}</p>
                            )}
                        </div>
                    );
                })}
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
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <Link to={"/login"} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition duration-200">
                  Sign in here
                </Link>
              </p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default SignupFormData;

