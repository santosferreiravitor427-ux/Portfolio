import { sqliteTable,text } from 'drizzle-orm/sqlite-core';
export const progress=sqliteTable('progress',{key:text('key').primaryKey(),value:text('value').notNull(),updatedAt:text('updated_at').notNull()});
