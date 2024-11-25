"use client";

import { useRouter } from "next/navigation";

export default function IndexPage() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/"); // Navigate back to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Index Page</h1>
      <button
        className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={handleBackClick}
      >
        Go Back to Home
      </button>
    </div>
  );
}