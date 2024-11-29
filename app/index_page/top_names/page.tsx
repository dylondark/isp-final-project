"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function IndexPage() {
  const router = useRouter();
  const [data, setData] = useState([]);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-black">
      <h1 className="text-4xl text-white font-bold mb-8">FBI Most Wanted Names</h1>
      <ul className="mb-8">
      {data.map((item, index) => (
        <li key={index} className="text-white font-bold">
            {item.title}
        </li>
        ))}
      </ul>
      <button
        className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={handleBackClick}
      >
        Go Back to Home
      </button>
    </div>
  );
}
