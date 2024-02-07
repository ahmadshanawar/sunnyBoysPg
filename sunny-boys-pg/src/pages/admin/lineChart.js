// Chart.js

import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart = ({ title, type, data }) => {
  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: Array.from({ length: 12 }, (_, i) => i + 1),
    },
  };

  const series = [
    {
      name: title,
      data: data,
    },
  ];

  return (
    <div>
      <h3>{title}</h3>
      <ReactApexChart options={options} series={series} type={type} height={350} />
    </div>
  );
};

export { Chart };
