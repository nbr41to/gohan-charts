'use client';

import { LineChart, type LineChartProps } from '@mantine/charts';

type Props = {
  data: LineChartProps['data'];
};

export const Chart = ({ data }: Props) => {
  const width = data.length * 88;

  return (
    <div className="overflow-x-scroll w-full">
      <LineChart
        w={width}
        h={400}
        px={12}
        data={data}
        dataKey="date"
        series={[
          { name: '食事 朝', color: 'yellow' },
          { name: '食事 昼', color: 'orange' },
          { name: '食事 夜', color: 'blue' },
        ]}
        valueFormatter={(value) => {
          const timeString = String(value).padStart(4, '0');

          return `${timeString.slice(0, 2)}:${timeString.slice(2)}`;
        }}
        curveType="linear"
      />
    </div>
  );
};
