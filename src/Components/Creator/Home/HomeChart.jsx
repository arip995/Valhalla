import { LineChart } from '@mantine/charts';
import React from 'react';

export const data = [
  { date: 'Jan', temperature: -25 },
  { date: 'Feb', temperature: -10 },
  { date: 'Mar', temperature: 5 },
  { date: 'Apr', temperature: 15 },
  { date: 'May', temperature: 30 },
  { date: 'Jun', temperature: 15 },
  { date: 'Jul', temperature: 30 },
  { date: 'Aug', temperature: 35 },
  { date: 'Sep', temperature: 15 },
  { date: 'Oct', temperature: 20 },
  { date: 'Nov', temperature: 0 },
  { date: 'Dec', temperature: -10 },
];

const HomeChart = () => {
  return (
    <LineChart
      h={300}
      data={data}
      series={[
        {
          name: 'temperature',
          label: 'Avg. Temperature',
          color: 'indigo.6',
        },
      ]}
      dataKey="date"
      // type="gradient"
      // gradientStops={[
      //   { offset: 0, color: 'red.6' },
      //   { offset: 20, color: 'orange.6' },
      //   { offset: 40, color: 'yellow.5' },
      //   { offset: 70, color: 'lime.5' },
      //   { offset: 80, color: 'cyan.5' },
      //   { offset: 100, color: 'blue.5' },
      // ]}
      strokeWidth={2}
      curveType="natural"
      yAxisProps={{ domain: [-25, 40] }}
      valueFormatter={value => `${value}°C`}
    />
  );
};

export default HomeChart;
