import { Frown } from "lucide-react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {

    console.log("error in ef", error)
     console.log("resetErrorBoundary in ef", resetErrorBoundary)

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Frown size={64} className="text-secondary" />
        </div>

        <h1 className="text-3xl font-semibold text-gray-800">
          Uh oh! This page is not available!
        </h1>

        <h1 className="text-3xl font-semibold text-gray-800">
          {error.message}
        </h1>
        <button
          className="inline-block px-6 py-3 bg-custom-wine text-white rounded-xl hover:bg-gray-800 transition"
          onClick={resetErrorBoundary}
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
