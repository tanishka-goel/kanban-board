import NewButton from "@/components/shared/NewButton";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className=" mt-40 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold text-darkest tracking-tight">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-darkest">
          Page not found
        </h2>

        <p className="mt-2 text-gray-500 text-sm">
          Sorry, the page you’re looking for doesn’t exist.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-lg bg-linear-to-r from-black to-darkest  text-white text-sm font-medium
            hover:bg-gray-800 transition-all duration-200"
          >
            Go to Login
          </Link>

         
        </div>

      </div>
    </div>
  );
};

export default PageNotFound;