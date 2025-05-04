import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const user = pgTable('users', {
  id: uuid().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  created_on: timestamp().notNull().defaultNow(),
  updated_on: timestamp().notNull().defaultNow(),
})
