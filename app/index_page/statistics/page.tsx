"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatisticsPage() {
  const router = useRouter();

  const [typeData, setTypeData] = useState({
    labels: ["Missing Persons", "Kidnap", "Seeking Info", "Unidentified Persons", "Criminals"],
    datasets: [
      {
        label: "Number of People",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  const [sexData, setSexData] = useState({
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Number of People",
        data: [0, 0],
        backgroundColor: "rgba(153,102,255,0.4)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
      },
    ],
  });

  const [hairColorData, setHairColorData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "Number of People",
        data: [],
        backgroundColor: "rgba(255,159,64,0.4)",
        borderColor: "rgba(255,159,64,1)",
        borderWidth: 1,
      },
    ],
  });

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
                  images {
                    thumb
                  }
                  sex
                  hair_raw
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

        const typeCounts = {
          "missing-persons": 0,
          "kidnap": 0,
          "seeking-info": 0,
          "unidentified-persons": 0,
          "criminals": 0,
        };

        const sexCounts = {
          "Male": 0,
          "Female": 0,
        };

        const hairColorCounts: { [key: string]: number } = {};

        result.data.Fbis.forEach((item: { images: { thumb: string }[]; sex: string; hair_raw: string }) => {
          const thumbUrl = item.images[0].thumb;
          if (thumbUrl.includes("missing-persons")) {
            typeCounts["missing-persons"]++;
          } else if (thumbUrl.includes("kidnap")) {
            typeCounts["kidnap"]++;
          } else if (thumbUrl.includes("seeking-info")) {
            typeCounts["seeking-info"]++;
          } else if (thumbUrl.includes("unidentified-persons")) {
            typeCounts["unidentified-persons"]++;
          } else {
            typeCounts["criminals"]++;
          }

          if (item.sex === "Male") {
            sexCounts["Male"]++;
          } else if (item.sex === "Female") {
            sexCounts["Female"]++;
          }

          if (item.hair_raw) {
            hairColorCounts[item.hair_raw] = (hairColorCounts[item.hair_raw] || 0) + 1;
          }
        });

        setTypeData({
          labels: ["Missing Persons", "Kidnap", "Seeking Info", "Unidentified Persons", "Criminals"],
          datasets: [
            {
              label: "Number of People",
              data: [
                typeCounts["missing-persons"],
                typeCounts["kidnap"],
                typeCounts["seeking-info"],
                typeCounts["unidentified-persons"],
                typeCounts["criminals"],
              ],
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        });

        setSexData({
          labels: ["Male", "Female"],
          datasets: [
            {
              label: "Number of People",
              data: [sexCounts["Male"], sexCounts["Female"]],
              backgroundColor: "rgba(153,102,255,0.4)",
              borderColor: "rgba(153,102,255,1)",
              borderWidth: 1,
            },
          ],
        });

        setHairColorData({
            labels: Object.keys(hairColorCounts),
            datasets: [
              {
                label: "Number of People",
                data: Object.values(hairColorCounts),
                backgroundColor: "rgba(255,159,64,0.4)",
                borderColor: "rgba(255,159,64,1)",
                borderWidth: 1,
              },
            ],
          });
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      }

      fetchData();
    }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Statistics</h1>
      <div className="w-full max-w-4xl mb-8">
        <Bar
          data={typeData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Number of People by Type",
              },
            },
          }}
        />
      </div>
      <div className="w-full max-w-4xl mb-8">
        <Bar
          data={sexData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Number of People by Sex",
              },
            },
          }}
        />
      </div>
      <div className="w-full max-w-4xl mb-8">
        <Bar
          data={hairColorData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Number of People by Hair Color",
              },
            },
          }}
        />
      </div>
      <button
        className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={() => router.push("/index_page")}
      >
        Go Back to Index
      </button>
    </div>
  );
}
