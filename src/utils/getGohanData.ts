'use server';

import { getDatabase } from '@/app/getDatabase';
import { unstable_cacheTag } from 'next/cache';

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
export const getGohanData = async () => {
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
