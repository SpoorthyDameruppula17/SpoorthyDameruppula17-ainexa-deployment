import React, { useRef } from "react";
import Text from "../../../componets/Text";
import "./OurServices.css";
import { Chart } from "chart.js";
import CustomLineChart from "../../Casestudy/chats/CustomLineChart";
import CustomBarChart from "../../Casestudy/chats/CustomBarChart";
import CustomPieChart from "../../Casestudy/chats/CustomPieChart";

const services = [
  {
    icon: "💹",
    title: "Finance Trends",
    details: [
      { label: "Stocks Tracked:", value: "Apple (AAPL)" },
      { label: "Period:", value: "Last 30 days" },
      { label: "Data Type:", value: "Closing Prices" },
      { label: "Chart Style:", value: "Volatility Visualization" },
    ],
    chartType: "line",
  },
  {
    icon: "📡",
    title: "IOT Sensor Data Comparison",
    details: [
      { label: "Data Sources:", value: "Sensor A, B, C" },
      { label: "Metric:", value: "Temperature (°C)" },
      { label: "Visualization Type:", value: "Bar Chart Comparison" },
    ],
    chartType: "bar",
  },
  {
    icon: "🤖",
    title: "Data Assistant Bot",
    details: [], // No chart for now
  },
  {
    icon: "🛠️",
    title: "Data Pipeline",
    details: [
      { label: "Pipeline Stages:", value: "Extract, Transform, Load, Fail" },
      { label: "Status Distribution:", value: "Success vs Failure Rates" },
    ],
    chartType: "pie",
  },
];

const iotLabels = ["Sensor A", "Sensor B", "Sensor C", "Sensor D"];
const iotDatasets = [
  {
    label: "Temperature (°C)",
    data: [23, 25, 20, 27],
    backgroundColor: "#4285F4",
    borderRadius: 5,
  },
];

const financeDatasets = [
  {
    label: "Apple (AAPL)",
    data: [
      150, 300, 100, 500, 400, 800, 600, 500, 700, 350, 900, 900, 1000, 500, 500,
      450, 800, 500, 950, 250, 600, 600, 1100, 500, 600, 750, 900, 950, 600, 1200,
    ],
    borderColor: "rgba(255,99,132,1)",
    backgroundColor: "rgba(255,99,132,0.2)",
    tension: 0.4,
    borderWidth: 2,
  },
];

const pipelineLabels = ["Extracted", "Transformed", "Loaded", "Failed"];
const pipelineDatasets = [
  {
    label: "Pipeline Status",
    data: [55, 30, 10, 5], // example counts
    backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#f44336"],
    borderColor: ["#388e3c", "#1976d2", "#f57c00", "#d32f2f"],
    borderWidth: 2,
  },
];

const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

const OurServices = () => {
  const chartRefs = {
    line: useRef<Chart<"line"> | null>(null),
    bar: useRef<Chart<"bar"> | null>(null),
    pie: useRef<Chart<"pie"> | null>(null),
  };

  const renderChart = (type: string) => {
    switch (type) {
      case "line":
        return (
          <CustomLineChart
            datasets={financeDatasets}
            labels={labels}
            ref={chartRefs.line}
            responsive={true}
            legend={false}
            xLabel={false}
          />
        );
      case "bar":
        return (
          <CustomBarChart
            datasets={iotDatasets}
            labels={iotLabels}
            ref={chartRefs.bar}
            responsive={true}
            legend={true}
            xLabel={true}
            yLabel={true}
          />
        );
      case "pie":
        return (
          <CustomPieChart
            datasets={pipelineDatasets}
            labels={pipelineLabels}
            ref={chartRefs.pie}
            responsive={true}
            legend={false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="services-container">
      {services.map((service, index) => (
        <div
          className="service-card"
          key={index}
        >
          <Text text={`${service.icon} ${service.title}`}/>

          <div className="finance-card-content" style={{flexDirection : index%2 !== 0 ? 'row-reverse' : 'row'}}>
            <div style={{display : 'flex' , flexDirection : 'column' , gap : 10 ,textAlign : 'center' ,width : '40%'}}> 
              {service.details.length > 0 &&
                service.details.map((detail, i) => (
                  <div style={{flexDirection : 'row' ,gap : 2}}>
                    <Text
                      text={`${detail.label} `}
                      fontWeight="bold"
                      style={{ display: "inline" }}
                    />
                    <Text
                      text={detail.value}
                      fontWeight="200"
                      style={{ display: "inline", marginLeft: 4 }}
                    />
                  </div>
                ))}
            </div>

            {service.chartType && (
              <div className="finance-chart">{renderChart(service.chartType)}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurServices;
