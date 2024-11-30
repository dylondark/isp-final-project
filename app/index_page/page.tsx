"use client"

import { useRouter } from "next/navigation";

export default function IndexPage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path); // Navigate to the specified path
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-8xl font-extrabold mb-8 text-white">
        FBI Most Wanted Options.
      </h1>
      <div className="mb-8">
        {/* First Button */}
        <button
          className="px-6 py-3 mb-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          onClick={() => handleNavigation("/index_page/top_names")}
        >
          Top Names
        </button>

        {/* Middle Button Centered */}
        <button
          className="px-6 py-3 mb-6 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          onClick={() => handleNavigation("/index_page/criminals")}
        >
          Criminals
        </button>

        {/* Third Button */}
        <button
          className="px-6 py-3 mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-600 hover:to-orange-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          onClick={() => handleNavigation("/index_page/yet_another_page")}
        >
          Yet Another Page
        </button>
      </div>

      {/* Back Button */}
      <button
        className="px-6 py-3 bg-gradient-to-r from-red-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-yellow-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={() => handleNavigation("/")}
      >
        Go Back to Home
      </button>
    </div>
  );
}
