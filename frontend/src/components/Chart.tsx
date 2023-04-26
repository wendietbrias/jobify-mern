import "chart.js/auto";
import { useState } from 'react';
import { useAppSelector } from "../hooks/toolkit";
import type { ChartData,ChartDataset, ChartOptions } from 'chart.js';
import { Bar } from "react-chartjs-2";
import moment from "moment";

const Chart = ({ allJobs } : { allJobs:any[] }) => {
    const BACKGROUND_COLOR = '#38bec9';
    
    const labels = allJobs.map((job)=> moment(job.createdAt).format("MMM"));

    const [data, setData] = useState({
      labels:Array.from(new Set(labels)),
      datasets: [{
        label: 'Expenses by Month',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: [
           BACKGROUND_COLOR
        ],
        borderColor: [
            BACKGROUND_COLOR
        ],
        borderWidth: 1
      }]
    });


    return (
      <div className="chart-container">
        <Bar 
          data={data}
        />
      </div>
    )
}

export default Chart;