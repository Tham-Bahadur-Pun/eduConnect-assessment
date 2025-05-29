import { Chart, registerables } from "chart.js";
import React, { useEffect, useRef, useState } from "react";

Chart.register(...registerables);

interface UserDistributionProps {
  data: {
    labels: string[];
    values: number[];
  };
  type?: "pie" | "doughnut" | "bar";
}

export const UserDistributionChart: React.FC<UserDistributionProps> = ({
  data,
  type = "doughnut",
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [themeKey, setThemeKey] = useState(0); // 👈 Key to force chart update on theme change

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        const isDark = document.documentElement.classList.contains("dark");

        chartInstance.current = new Chart(ctx, {
          type,
          data: {
            labels: data.labels,
            datasets: [
              {
                data: data.values,
                backgroundColor: [
                  "rgba(59, 130, 246, 0.7)",
                  "rgba(16, 185, 129, 0.7)",
                  "rgba(249, 115, 22, 0.7)",
                  "rgba(168, 85, 247, 0.7)",
                  "rgba(239, 68, 68, 0.7)",
                ],
                borderColor: [
                  "rgba(59, 130, 246, 1)",
                  "rgba(16, 185, 129, 1)",
                  "rgba(249, 115, 22, 1)",
                  "rgba(168, 85, 247, 1)",
                  "rgba(239, 68, 68, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  font: { size: 12 },
                  color: isDark ? "#f3f4f6" : "#374151",
                },
              },
              tooltip: {
                backgroundColor: isDark
                  ? "#374151"
                  : "rgba(255, 255, 255, 0.9)",
                titleColor: isDark ? "#f3f4f6" : "#111827",
                bodyColor: isDark ? "#d1d5db" : "#4b5563",
                borderColor: isDark ? "#4b5563" : "#e5e7eb",
                borderWidth: 1,
                padding: 10,
                displayColors: true,
                usePointStyle: true,
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, type, themeKey]); // 👈 themeKey dependency added

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setThemeKey((prev) => prev + 1); // 👈 Trigger chart re-render
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-64">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
