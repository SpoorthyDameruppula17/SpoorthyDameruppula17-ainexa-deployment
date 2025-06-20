/**
 * CustomScatterPlot is a reusable React component for displaying scatter plots using Chart.js.
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
 * import CustomScatterPlot from "./CustomScatterPlot";
 *
 * const chartRef = useRef<ChartJS<"scatter"> | null>(null);
 *
 * <CustomScatterPlot
 *   ref={chartRef}
 *   datasets={[{
 *     label: "Sample Dataset",
 *     data: [
 *       { x: 10, y: 20 },
 *       { x: 15, y: 10 },
 *       { x: 7, y: 25 }
 *     ],
 *     backgroundColor: "rgba(75, 192, 192, 0.6)",
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
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import type { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

// Register necessary chart elements
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface ScatterDataPoint {
  x: number;
  y: number;
}

interface ScatterDataSetProps {
  label?: string;
  data: ScatterDataPoint[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  pointRadius?: number;
  pointHoverRadius?: number;
}

interface CustomScatterPlotProps {
  datasets: ScatterDataSetProps[];
  responsive?: boolean;
  legend?: boolean;
  height?: number;
  width?: number;
  xLabel?: string;
  yLabel?: string;
}

const CustomScatterPlot = forwardRef<
  ChartJSOrUndefined<"scatter">,
  CustomScatterPlotProps
>(
  (
    {
      datasets,
      responsive = true,
      legend = true,
      height,
      width,
      xLabel,
      yLabel,
    },
    ref
  ) => {
    if (!datasets || datasets.length === 0) {
      return <p>No scatter plot data available.</p>;
    }

    const data = {
      datasets,
    };

    const options = {
      responsive,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: legend },
      },
      scales: {
        x: {
          type: "linear" as const,
          position: "bottom" as const,
          title: {
            display: !!xLabel,
            text: xLabel,
          },
        },
        y: {
          title: {
            display: !!yLabel,
            text: yLabel,
          },
        },
      },
    };

    return (
      <Scatter
        ref={ref}
        data={data}
        options={options}
        height={height}
        width={width}
      />
    );
  }
);

CustomScatterPlot.displayName = 'CustomScatterPlot'

export default CustomScatterPlot;
