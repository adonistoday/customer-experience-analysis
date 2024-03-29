import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const options = {
  chart: {
    type: 'line',
    toolbar: {
      show: false
    }
  },
  markers: {
    size: [6, 6, 6, 8, 8, 10],
    strokeWidth: 0,
    colors: ['#FFA500', '#FF1493', '#00BFFF', '#00FF00', '#0000FF', '#FF0000']
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yaxis: {
    title: {
      text: 'Scores'
    }
  }
};

// const series = [
//   {
//     name: 'Product A',
//     data: [
//       {
//         x: '10s',
//         y: 0.9,
//         fillColor: '#FFA500',
//         strokeColor: '#FFA500'
//       },
//       {
//         x: '20s',
//         y: 0.5,
//         fillColor: '#FF1493',
//         strokeColor: '#FF1493'
//       },
//       {
//         x: '30s',
//         y: 0.8,
//         fillColor: '#00BFFF',
//         strokeColor: '#00BFFF'
//       },
//       {
//         x: '40s',
//         y: 0.7,
//         fillColor: '#00FF00',
//         strokeColor: '#00FF00'
//       },
//       {
//         x: '50s',
//         y: 0.2,
//         fillColor: '#0000FF',
//         strokeColor: '#0000FF'
//       },
//       {
//         x: '60s',
//         y: 0.7,
//         fillColor: '#FF0000',
//         strokeColor: '#FF0000'
//       }
//     ]
//   }
// ];
// series[0].data.forEach(dataPoint => {
//   if (dataPoint.y > 0.5) {
//     dataPoint.fillColor = '#0000FF';
//     dataPoint.strokeColor = '#0000FF';
//   } else {
//     dataPoint.fillColor = '#FF0000';
//     dataPoint.strokeColor = '#FF0000';
//   }
// });

const LineChart = ({chartdata}) => {
  const [series, setSeries] = useState([]);
  useEffect(()=>{
    console.log("chartdata",chartdata)
    const new_arr = chartdata.map((item)=>{
      const seriesItem = {
        x: item.END,
        y: item.score,
        fillColor: '#FF0000',
        strokeColor: '#FF0000'
      };
      return seriesItem;
    })
    console.log("new_arr",new_arr)
    new_arr.forEach(dataPoint => {
  if (dataPoint.y > 0) {
    dataPoint.fillColor = '#0000FF';
    dataPoint.strokeColor = '#0000FF';
  } else if(dataPoint.y == 0)
  {
    dataPoint.fillColor = '#00FF00';
    dataPoint.strokeColor = '#00FF00';
  }
   else {
    dataPoint.fillColor = '#FF0000';
    dataPoint.strokeColor = '#FF0000';
  }
});
    setSeries([{
      name: 'Product A',
      data: new_arr,
    }]);
  },[chartdata])
  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height="170"
    />
  );
};

export default LineChart;
