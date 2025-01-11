import { revalidateTag } from 'next/cache';
import Form from 'next/form';
import { Button } from '@mantine/core';
import { Chart } from './_components/chart';
import { Calendar } from './_components/calendar';
import { getGohanData } from '@/utils/getGohanData';
import { CompositeChart } from '@mantine/charts';

export default async function Home() {
  const results = await getGohanData();

  const data = results.reduce((acc: Data, result) => {
    const date = result.datetime.split('T')[0].replaceAll('-', '/');
    const time = result.datetime.split('T')[1].split(':00.')[0];
    const value = Number(time.replace(':', ''));

    if (acc.find((data) => data.date === date)) {
      return acc.map((data) => {
        if (data.date === date) {
          return {
            ...data,
            [result.type]: value,
          };
        }

        return data;
      }) as Data;
    }

    return [
      ...acc,
      {
        date,
        [result.type]: value,
      },
    ] as Data;
  }, [] as Data);

  const action = async () => {
    'use server';
    revalidateTag('gohan-data');
  };

  return (
    <div className="space-y-8 p-2">
      <h1 className="font-bold text-lg">YUKIGOHAN</h1>

      <div className="mx-auto w-fit">
        <Calendar data={data} />
      </div>

      <Chart data={data} />

      <Form action={action}>
        <Button type="submit">データを更新</Button>
      </Form>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <CompositeChart
        h={300}
        data={dataTest}
        dataKey="date"
        maxBarWidth={30}
        series={[
          { name: 'your', color: 'orange.5', type: 'bar' },
          { name: 'average', color: 'blue.5', type: 'area' },
        ]}
        curveType="linear"
      />
    </div>
  );
}

const dataTest = [
  {
    date: '2024-11-01',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-02',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-03',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-04',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-05',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-06',
    average: 357,
    your: 399,
  },
  {
    date: '2024-11-07',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-08',
    average: 113,
    your: 113,
  },
  {
    date: '2024-11-09',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-10',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-11',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-12',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-13',
    average: 145,
    your: 153,
  },
  {
    date: '2024-11-14',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-15',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-16',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-17',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-18',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-19',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-20',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-21',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-22',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-23',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-24',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-25',
    average: 182,
    your: 182,
  },
  {
    date: '2024-11-26',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-27',
    average: 110,
    your: 110,
  },
  {
    date: '2024-11-28',
    average: 145,
    your: 145,
  },
  {
    date: '2024-11-29',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-30',
    average: 0,
    your: 0,
  },
  {
    date: '2024-11-31',
    average: 0,
    your: 0,
  },
];
