'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useMemo } from 'react';

// Function to generate the random data only once
const generateData = () => {
  return [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ].map(month => ({
    name: month,
    total: Math.floor(Math.random() * 5000) + 1000
  }));
};

export function Overview() {
  const data = useMemo(generateData, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          className="text-gray-500 font-weight-500"
          stroke="#888888"
          fontSize={9}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} Kg`}
        />
        <Bar dataKey="total" fill="green" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
