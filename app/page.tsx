"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/another-page"); // Replace with your target page path
  };

  useEffect(() => {
    const images = [
      '/images/FBI_Image_1.jpg',
      '/images/FBI_Image_2.jpg',
      '/images/FBI_Image_3.jpg',
      '/images/FBI_Image_4.jpg',
    ];

    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 background-rotation">
      {/* Overlay to create a film effect */}
      <div className="background-overlay"></div>

      {/* Add text at the top */}
      <h1 className="massive-text mb-16 w-full text-center z-10">
        FBI Most Wanted
      </h1>

      {/* Add a button to navigate to another page */}
      <button
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-red-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 z-10"
        onClick={handleButtonClick}
      >
        Index Page
      </button>
    </div>
  );
}