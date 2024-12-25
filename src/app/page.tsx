import { revalidateTag, unstable_cacheTag } from 'next/cache';
import { getDatabase } from './getDatabase';
import Form from 'next/form';
import { Button } from '@mantine/core';
import { Chart } from './_components/chart';
import { Calendar } from './_components/calendar';

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
const getGohanData = async () => {
  'use cache';
  unstable_cacheTag('gohan-data');

  const response = await getDatabase();

  return response.results
    .map((result) => {
      if (!('properties' in result)) return;
      if (
        result.properties.Date.type !== 'date' ||
        !result.properties.Date.date?.start
      )
        return;
      if (
        result.properties.Date.type !== 'date' ||
        !result.properties.Date.date?.start
      )
        return;
      if (
        result.properties.Type.type !== 'select' ||
        !result.properties.Type.select ||
        !('name' in result.properties.Type.select)
      )
        return;

      return {
        type: result.properties.Type.select.name,
        datetime: result.properties.Date.date.start,
      };
    })
    .filter(isDefined);
};

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
    </div>
  );
}
