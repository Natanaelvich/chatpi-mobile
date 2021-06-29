import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schema';

import { Message } from './model/Message';

export const adapter = new SQLiteAdapter({
  schema: schemas,
});

export const database = new Database({
  adapter,
  modelClasses: [Message],
  actionsEnabled: true,
});

export { Message as MessageUser } from './model/Message';
