/**
 * CustomPieChart is a reusable React component for displaying pie charts using Chart.js.
 *
 * ✅ Takes dynamic data via props.
 * ✅ Allows customization of responsiveness, legend visibility, and dimensions.
 * ✅ Uses `forwardRef` to expose the Chart.js instance to parent components.
 *
 * ------------------------------------
 * ✅ Ref Use Case Example:
 * ------------------------------------
 * ```tsx
 * import { useRef } from "react";
 * import type { ChartJS } from "chart.js";
 * import CustomPieChart from "./CustomPieChart";
 * 
 * const chartRef = useRef<ChartJS<"pie"> | null>(null);
 * 
 * <CustomPieChart
 *   ref={chartRef}
 *   labels={["Red", "Blue", "Yellow"]}
 *   datasets={[{
 *     data: [300, 50, 100],
 *     backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"]
 *   }]}
 * />
 * 
 * // Later you can call:
 * chartRef.current?.update();
 * ```
 */

import React, { forwardRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import type { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

// Register necessary chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

interface DataSetProps {
  label?: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
  borderWidth?: number;
}

interface CustomPieChartProps {
  labels: string[];
  datasets: DataSetProps[];
  responsive?: boolean;
  legend?: boolean;
  height?: number;
  width?: number;
}

const CustomPieChart = forwardRef<ChartJSOrUndefined<"pie">, CustomPieChartProps>(
  (
    {
      labels,
      datasets,
      responsive = true,
      legend = true,
      height,
      width,
    },
    ref
  ) => {
    if (!labels || !datasets || datasets.length === 0) {
      return <p>No pie chart data available.</p>;
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
    };

    return <Pie ref={ref} data={data} options={options} height={height} width={width} />;
  }
);

CustomPieChart.displayName = 'CustomPieChart'

export default CustomPieChart;
