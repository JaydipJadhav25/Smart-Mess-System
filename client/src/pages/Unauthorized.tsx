import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-xl shadow">
        <h1 className="text-4xl font-bold text-red-500">403</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Access Denied
        </h2>

        <p className="mt-2 text-gray-600">
          You don’t have permission to view this page.
          If you believe this is a mistake, please contact support.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Go Home
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
