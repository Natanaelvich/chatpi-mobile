import { appSchema } from '@nozbe/watermelondb';

import { messageSchema } from './messageSchema';

export const schemas = appSchema({
  version: 6,
  tables: [messageSchema],
});
