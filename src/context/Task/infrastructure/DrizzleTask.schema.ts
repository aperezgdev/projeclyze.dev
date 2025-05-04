import { relations } from 'drizzle-orm'
import { pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { user } from '../../User/infrastructure/DrizzleUser.schema'

export const task = pgTable('tasks', {
  id: uuid().primaryKey(),
  title: varchar().notNull(),
  description: varchar().notNull(),
  creator: uuid()
    .notNull()
    .references(() => user.id),
  created_on: timestamp().notNull().defaultNow(),
  updated_on: timestamp().notNull().defaultNow(),
})

export const tasksRelationships = relations(task, ({ one }) => ({
  create: one(user, {
    fields: [task.creator],
    references: [user.id],
  }),
}))
