import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Title,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Chart } from 'react-chartjs-2';
import { subDays } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  Legend,
  Title
);

// Utility to generate fake time-based labels
const generateTimeLabels = (count: number) => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) =>
    subDays(now, count - i - 1)
  );
};

const generateRandomNumbers = (count: number, min = 0, max = 100) => {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

const DATA_COUNT = 7;
const labels = generateTimeLabels(DATA_COUNT);

const data: ChartData<'bar' | 'line'> = {
  labels,
  datasets: [
    {
      type: 'bar' as const,
      label: 'Dataset 1',
      data: generateRandomNumbers(DATA_COUNT),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1,
    },
    {
      type: 'bar' as const,
      label: 'Dataset 2',
      data: generateRandomNumbers(DATA_COUNT),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1,
    },
    {
      type: 'line' as const,
      label: 'Dataset 3',
      data: generateRandomNumbers(DATA_COUNT),
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgb(75, 192, 192)',
      fill: false,
      tension: 0.4,
    },
  ],
};

const options: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Combo Time Scale',
    },
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
      },
      ticks: {
        source: 'data',
      },
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Value',
      },
    },
  },
};

const ComboTimeChart = () => {
  const chartRef = useRef<ChartJS<'bar' | 'line'> | null>(null);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' ,height : '100%'}}>
      <Chart type="bar" data={data} options={options} ref={chartRef} />
    </div>
  );
};

export default ComboTimeChart;
