import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getRandomData = (count: number) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 200 - 100));
};

const HorizontalBarChart = () => {
  const chartRef = useRef<ChartJS<'bar'> | null>(null);

  const data: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Dataset 1',
        data: getRandomData(5),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Horizontal Bar Chart',
      },
    },
  };

  const randomize = () => {
    const chart = chartRef.current;
    if (!chart) return;

    chart.data.datasets.forEach((dataset) => {
      dataset.data = getRandomData(chart.data.labels?.length || 0);
    });
    chart.update();
  };

  const addDataset = () => {
    const chart = chartRef.current;
    if (!chart || !chart.data.labels) return;

    const color = `hsl(${Math.random() * 360}, 70%, 60%)`;

    chart.data.datasets.push({
      label: `Dataset ${chart.data.datasets.length + 1}`,
      data: getRandomData(chart.data.labels.length),
      borderColor: color,
      backgroundColor: `${color}80`,
      borderWidth: 2,
    });

    chart.update();
  };

  const addData = () => {
    const chart = chartRef.current;
    if (!chart || !chart.data.labels) return;

    const newLabel = `Label ${chart.data.labels.length + 1}`;
    chart.data.labels.push(newLabel);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(Math.floor(Math.random() * 200 - 100));
    });

    chart.update();
  };

  const removeDataset = () => {
    const chart = chartRef.current;
    if (!chart) return;

    chart.data.datasets.pop();
    chart.update();
  };

  const removeData = () => {
    const chart = chartRef.current;
    if (!chart || !chart.data.labels) return;

    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => dataset.data.pop());
    chart.update();
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <Chart
        type="bar"
        data={data}
        options={options}
        ref={chartRef}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        <button onClick={randomize} style={buttonStyle}>Randomize Data</button>
        <button onClick={addDataset} style={buttonStyle}>Add Dataset</button>
        <button onClick={addData} style={buttonStyle}>Add Data</button>
        <button onClick={removeDataset} style={buttonStyle}>Remove Dataset</button>
        <button onClick={removeData} style={buttonStyle}>Remove Data</button>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 12px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default HorizontalBarChart;



