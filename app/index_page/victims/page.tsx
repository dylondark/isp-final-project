"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function VictimPage() {
  const router = useRouter();
  const [data, setData] = useState<{ title: string; description: string; images: { thumb: string }[]; details: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBackClick = () => {
    router.push("/index_page"); // Navigate back to the home page
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                Fbis {
                  title
                  description
                  images {
                    thumb
                  }
                  details
                }
              }
            `,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.errors) {
          throw new Error(`GraphQL error: ${result.errors.map((error: any) => error.message).join(", ")}`);
        }

        // Filter to include only entries whose image value contains 'missing-persons', 'kidnap', 'seeking-info', or 'unidentified-persons'
        const filteredData = result.data.Fbis.filter((item: { images: { thumb: string }[] }) => {
          const thumbUrl = item.images[0].thumb;
          return thumbUrl.includes('missing-persons') || thumbUrl.includes('kidnap') || thumbUrl.includes('seeking-info') || thumbUrl.includes('unidentified-persons');
        });

        setData(filteredData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const currentItem = data[currentIndex];

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen p-8 text-black" onClick={handleNext}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/WorldBackground.jpg')", opacity: 0.5 }}></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <h1 className="relative text-4xl text-white font-bold mb-8">FBI Most Wanted Victims</h1>
      <div className="relative flex flex-grow w-full">
        <div className="flex-shrink-0 w-1/3">
          <img
            src={currentItem.images[0].thumb}
            alt={currentItem.title}
            className="w-full h-auto rounded-lg shadow-lg mb-8"
          />
        </div>
        <div className="ml-8 flex-grow">
          <h2 className="text-2xl text-white font-bold mb-4">{currentItem.title}</h2>
          <p className="text-white">{currentItem.description}</p>
          <div className="text-white mt-4" dangerouslySetInnerHTML={{ __html: currentItem.details }}></div>
        </div>
      </div>
      <button
        className="relative px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={handleBackClick}
      >
        Go Back to Index
      </button>
    </div>
  );
}
