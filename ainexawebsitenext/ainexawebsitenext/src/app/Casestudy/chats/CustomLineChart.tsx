/**
 * CustomLineChart is a reusable Chart.js wrapper component built on top of react-chartjs-2.
 * 
 * ✅ It accepts labels, datasets, and config options like responsive, legend, and axis label visibility.
 * ✅ It also forwards a `ref` to access the chart instance directly (e.g., for programmatic updates).
 * 
 * Use Case for `ref`:
 * You might want to call methods like `update()`, `reset()`, or read chart properties directly.
 * 
 * Example usage with `ref`:
 * 
 * ```tsx
 * import { useRef } from "react";
 * import type { ChartJS } from "chart.js";
 * 
 * const chartRef = useRef<ChartJS<"line"> | null>(null);
 * 
 * <CustomLineChart
 *   ref={chartRef}
 *   labels={["Mon", "Tue", "Wed"]}
 *   datasets={[{ label: "Sales", data: [10, 20, 30], borderColor: "blue" }]}
 * />
 * 
 * // Later you can use:
 * chartRef.current?.update();
 * ```
 */


import React, { forwardRef } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface DataSetProps {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  tension?: number;
  fill?: boolean;
  pointRadius?: number;
}

interface CustomLineChartProps {
  labels: string[];
  datasets: DataSetProps[];
  responsive?: boolean;
  legend?: boolean;
  xLabel?: boolean;
  yLabel?: boolean;
  height?: number;
  width?: number;
}

// Using forwardRef to expose chart ref
const CustomLineChart = forwardRef<ChartJSOrUndefined<"line">, CustomLineChartProps>(
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
      return <p>No chart data available.</p>;
    }

    const data = { labels, datasets };

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

    return <Line ref={ref} data={data} options={options} height={height} width={width} />;
  }
);

CustomLineChart.displayName = 'CustomLineChart'

export default CustomLineChart;
