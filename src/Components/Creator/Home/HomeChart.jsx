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
      // withRightYAxis={false}
      dataKey="date"
      strokeWidth={2}
      curveType="natural"
      yAxisProps={{ domain: [-25, 40] }}
      valueFormatter={value => `${value}°C`}
    />
  );
};

export default HomeChart;
