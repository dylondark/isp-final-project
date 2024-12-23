"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function TopNamesPage() {
  const router = useRouter();
  const [data, setData] = useState<{ title: string; images: { thumb: string }[] }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBackClick = () => {
    router.push("/"); // Navigate back to the home page
  };

  useEffect(() => {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            Fbis {
              title
              images {
                thumb
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.data.Fbis);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const currentItem = data[currentIndex];

  return (
    <div
      className="flex flex-col items-center justify-between min-h-screen p-8 text-black"
      onClick={handleNext}
    >
      <h1 className="text-4xl text-white font-bold mb-8">FBI Most Wanted Names and Faces</h1>
      <div className="flex-grow flex flex-col items-center justify-center w-full">
        <h2 className="text-2xl text-white font-bold text-center mb-4">{currentItem.title}</h2>
        <img
          src={currentItem.images[0].thumb}
          alt={currentItem.title}
          className="w-1/4 h-auto rounded-lg shadow-lg mb-8"
        />
      </div>
      <button
        className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={handleBackClick}
      >
        Go Back to Home
      </button>
    </div>
  );
}
