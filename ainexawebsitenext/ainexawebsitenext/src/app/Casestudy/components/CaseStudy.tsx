import React from "react";
import CustomPieChart from "../chats/CustomPieChart";
import CustomLineChart from "../chats/CustomLineChart";
import CustomBarChart from "../chats/CustomBarChart";

import "../css/CaseStudy.css";
import Text from "../../../componets/Text";

const CaseStudyLanding = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept"],
    datasets: [
      {
        label: "Absenteeism",
        data: [5, 6, 4, 7, 5, 6, 8, 6, 9],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const pieData = {
    labels: ["Readmission", "Non-Readmission"],
    datasets: [
      {
        label: "Readmission Rate",
        data: [75, 23],
        backgroundColor: ["#3b82f6", "#e5e7eb"],
      },
    ],
  };

  const lineData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: "Device A",
        data: [10, 12, 14, 13, 15, 16, 18],
        borderColor: "#3b82f6",
        fill: false,
      },
      {
        label: "Device B",
        data: [8, 9, 10, 9, 11, 12, 13],
        borderColor: "#9ca3af",
        fill: false,
      },
    ],
  };

  return (
    <div className="caseStudy-container" >

      <div className="case-box">
        <Text text="HR & Payroll Absenteeism Data Visualization" tag="h2" fontSize={30}/>
        <Text text="Insightful visualization of absenteeism trends, patterns, and impacts on payroll." />
        <div className="chart-container">
          <CustomBarChart {...barData} height={200} />
        </div>
      </div>

      <div className="case-box">
        <Text text="Health Care Patient Summary with ML Prediction"  tag="h2" fontSize={30}/>
        <Text text="Summary of patient data with predictive analytics for better care decisions." />
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
            <Text text="Age: 55" />
            <Text text="Sex: Female" />
            <Text text="BMI: 27.8" />
          </div>
          <CustomPieChart {...pieData} height={150} width={150} />
        </div>
      </div>

      <div className="case-box">
        <Text text="IoT Device Performance Comparison"  tag="h2" fontSize={30}/>
        <Text text="Visualizing IoT device data and comparing their performance metrics in real time." />
        <div className="chart-container">
          <CustomLineChart {...lineData} height={200} />
        </div>
      </div>
    </div>
  );
};

export default CaseStudyLanding;
