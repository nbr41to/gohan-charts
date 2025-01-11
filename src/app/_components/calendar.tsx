'use client';

import { Indicator } from '@mantine/core';
import { Calendar as MantineCalendar } from '@mantine/dates';

type Props = {
  data: Data;
};

export const Calendar = ({ data }: Props) => {
  return (
    <MantineCalendar
      h={300}
      static
      renderDay={(date) => {
        const day = date.getDate();
        const weekDay = date.getDay();
        const dateString = `${date.getFullYear()}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
        const dateData = data.find((item) => item.date === dateString);
        const dateDataKeys = dateData ? Object.keys(dateData) : [];

        const visibleYellow = data.some(
          (item) => item.date === dateString && dateDataKeys.includes('食事 朝')
        );
        const visibleOrange = data.some(
          (item) => item.date === dateString && dateDataKeys.includes('食事 昼')
        );
        const visibleBlue = data.some(
          (item) => item.date === dateString && dateDataKeys.includes('食事 夜')
        );

        const className = weekDay === 6 ? 'text-blue-500' : '';

        return (
          <div className={className}>
            <Indicator
              size={4}
              color="yellow"
              offset={-4}
              position="top-start"
              disabled={!visibleYellow}
            />
            <Indicator
              size={4}
              color="orange"
              offset={-4}
              position="top-center"
              disabled={!visibleOrange}
            />
            <Indicator
              size={4}
              color="blue"
              offset={-4}
              position="top-end"
              disabled={!visibleBlue}
            />
            {day}
          </div>
        );
      }}
    />
  );
};
