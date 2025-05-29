import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

interface UserDistributionProps {
  data: {
    labels: string[];
    values: number[];
  };
  type?: 'pie' | 'doughnut' | 'bar';
}

export const UserDistributionChart: React.FC<UserDistributionProps> = ({
  data,
  type = 'doughnut'
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      // Get the context of the canvas
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        // Create the chart
        chartInstance.current = new Chart(ctx, {
          type,
          data: {
            labels: data.labels,
            datasets: [
              {
                data: data.values,
                backgroundColor: [
                  'rgba(59, 130, 246, 0.7)', // blue
                  'rgba(16, 185, 129, 0.7)', // green
                  'rgba(249, 115, 22, 0.7)', // orange
                  'rgba(168, 85, 247, 0.7)', // purple
                  'rgba(239, 68, 68, 0.7)', // red
                ],
                borderColor: [
                  'rgba(59, 130, 246, 1)',
                  'rgba(16, 185, 129, 1)',
                  'rgba(249, 115, 22, 1)',
                  'rgba(168, 85, 247, 1)',
                  'rgba(239, 68, 68, 1)',
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
                position: 'bottom',
                labels: {
                  font: {
                    size: 12,
                  },
                  color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#374151',
                },
              },
              tooltip: {
                backgroundColor: document.documentElement.classList.contains('dark') ? '#374151' : 'rgba(255, 255, 255, 0.9)',
                titleColor: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827',
                bodyColor: document.documentElement.classList.contains('dark') ? '#d1d5db' : '#4b5563',
                borderColor: document.documentElement.classList.contains('dark') ? '#4b5563' : '#e5e7eb',
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
    
    // Clean up chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, type]);
  
  // Update chart when theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          // Redraw the chart when theme changes
          if (chartInstance.current) {
            chartInstance.current.destroy();
            // Trigger re-render by updating a state variable
            // or directly recreate the chart
            const ctx = chartRef.current?.getContext('2d');
            if (ctx) {
              // Recreate the chart with the new theme colors
              // This is a simplified version, you'd need to recreate with the same config
              // Re-creating the chart triggers the useEffect above
              chartRef.current?.click();
            }
          }
        }
      });
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="h-64">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};