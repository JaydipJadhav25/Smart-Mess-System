
// import { AuthContext } from '@/components/context/AuthContext';
import useAuth from '@/components/context/useAuth';
import { axiosInstance } from '@/config/axiosInstances';
import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link, useNavigate  , Navigate} from 'react-router-dom';
import { toast } from 'sonner';

// Define the form data interface
interface LoginFormData {
  email: string;
  password: string;
}

// Main App Component for Login
const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
  


    
  //navigater
  const navigate = useNavigate();





  // use context
  const {login , role } = useAuth();



//check student and return home
if((role!=="admin" && role) || role ==="admin"){
  return <Navigate to={"/"}/>
}


 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>({
    mode: 'onBlur'
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    setStatus({ message: '', type: '' });
    try {
    console.log('Login Data:', data);
    const response = await axiosInstance.post("/admin/access/login" , data);
    console.log("response : " , response.data);
      //data store in localstorage
     if(response.data?.success){
       login(response.data.data.user.email, response.data.data.user.role, response.data.data.user.student_id);
       //store token
       localStorage.setItem("token" , response.data.data.auth);
     }
     
      setStatus({ message: response.data.mmessage ||  'Login successful! Redirecting...', type: 'success' });
       
      toast.success("Login successful!");
      
      //redirect
      navigate("/admin" , {replace : true});
      // In  futures send otp fro verify admin when lagin
      reset();
    } catch (error : any) {
      const userError = error?.response?.data.message;
      console.error('Login error:', error );
      setStatus({ message: userError || 'Login failed. Please check your credentials.', type: 'error' });
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
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
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">    
      <div className="max-w-md w-full space-y-8 bg-gradient-to-br from-orange-900 via-gray-900 to-yellow-800 text-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 p-8 md:p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            Welcome Back
            <h2
                className="
                inline-flex items-center
                px-2 py-0.5
                rounded-full
                text-[10px]
                font-semibold
                uppercase
                tracking-widest
                text-zinc-300
                bg-zinc-800
                border border-zinc-700
                "
            >
                Administrator
            </h2>
            </h2>
       <p className="text-sm tracking-wide text-zinc-400">
        Restricted access. Authorized personnel only.
       </p>

        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email Address *
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200 ${
                            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Enter your email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please enter a valid email address' }
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">
                        Password *
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200 ${
                                errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Password is required'
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
             <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <Link to={"/login"} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition duration-200">
                  {/* Back ! */}
                </Link>
              </p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
