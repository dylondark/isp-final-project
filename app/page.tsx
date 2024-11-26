"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    console.log("Button clicked");
    router.push("/index_page");
  };

  useEffect(() => {
    const images = [
      '/images/FBI_Image_1.jpg',
      '/images/FBI_Image_2.jpg',
      '/images/FBI_Image_3.jpg',
    ];

    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8" suppressHydrationWarning>
      {/* Background Images */}
      <div className="background-images">
        <div className="background-image-3"></div>
      </div>

      {/* Overlay */}
      <div className="background-overlay relative">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)",
            zIndex: 1,
          }}
        ></div>
      </div>

      {/* Content */}
      <h1 className="massive-text mb-16 w-full text-center z-10">
        FBI Most Wanted
      </h1>

      {/* Button Container */}
      <div className="relative z-10">
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          onClick={handleButtonClick}
        >
          Index Page
        </button>
      </div>
    </div>
  );
}
