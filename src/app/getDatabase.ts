'use server';
import 'server-only';

import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_INTERNAL_INTEGRATION_TOKEN!,
});

export const retrieveDatabase = async () => {
  const response = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  return response;
};

export const getDatabase = async () => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Type',
      select: {
        is_not_empty: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'ascending',
      },
    ],
  });

  return response;
};
