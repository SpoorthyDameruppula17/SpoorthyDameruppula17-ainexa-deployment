/**
 * CustomBarChart is a reusable Chart.js wrapper component using Bar chart.
 * 
 * ✅ Accepts chart data via props: labels and datasets.
 * ✅ Fully customizable options for legend, responsiveness, and axis labels.
 * ✅ Uses `forwardRef` to allow parent components to access the Chart.js instance directly.
 *
 * ---------------------------
 * ✅ Ref Use Case Example:
 * ---------------------------
 * ```tsx
 * import { useRef } from "react";
 * import type { ChartJS } from "chart.js";
 * import CustomBarChart from "./CustomBarChart";
 * 
 * const chartRef = useRef<ChartJS<"bar"> | null>(null);
 * 
 * <CustomBarChart
 *   ref={chartRef}
 *   labels={["Q1", "Q2", "Q3"]}
 *   datasets={[{ label: "Revenue", data: [300, 500, 700], backgroundColor: "#28a745" }]}
 * />
 * 
 * // Later you can trigger an update like:
 * chartRef.current?.update();
 * ```
 */

import React, { forwardRef } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

// Register the bar chart elements with Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface DataSetProps {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
}

interface CustomBarChartProps {
  labels: string[];
  datasets: DataSetProps[];
  responsive?: boolean;
  legend?: boolean;
  xLabel?: boolean;
  yLabel?: boolean;
  height?: number;
  width?: number;
}

const CustomBarChart = forwardRef<ChartJSOrUndefined<"bar">, CustomBarChartProps>(
  (
    {
      labels,
      datasets,
      responsive = true,
      legend = true,
      xLabel = true,
      yLabel = true,
      height,
      width,
    },
    ref
  ) => {
    if (!labels || !datasets || datasets.length === 0) {
      return <p>No bar chart data available.</p>;
    }

    const data = {
      labels,
      datasets,
    };

    const options = {
      responsive,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: legend },
      },
      scales: {
        x: { display: xLabel },
        y: { display: yLabel },
      },
    };

    return <Bar ref={ref} data={data} options={options} height={height} width={width} />;
  }
);

CustomBarChart.displayName = 'CustomBarChart'

export default CustomBarChart;
