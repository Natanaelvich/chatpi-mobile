import { tableSchema } from '@nozbe/watermelondb';

export const messageSchema = tableSchema({
  name: 'messages',
  columns: [
    {
      name: 'user',
      type: 'string',
    },
    {
      name: 'toUser',
      type: 'string',
    },
    {
      name: 'message',
      type: 'string',
    },
    {
      name: 'readed',
      type: 'string',
    },
    {
      name: 'date',
      type: 'string',
    },
    {
      name: 'name',
      type: 'string',
    },
  ],
});
