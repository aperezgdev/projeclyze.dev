import { relations } from 'drizzle-orm'
import { pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core'
import { user } from '../../User/infrastructure/DrizzleUser.schema'
import { project } from '../../Project/infrastructure/DrizzleProject.schema'

export const task = pgTable('tasks', {
  id: uuid().primaryKey(),
  title: varchar().notNull(),
  description: varchar().notNull(),
  creator: uuid()
    .notNull()
    .references(() => user.id),
  project: uuid()
    .notNull()
    .references(() => project.id),
  created_on: timestamp().notNull().defaultNow(),
  updated_on: timestamp().notNull().defaultNow(),
})

export const tasksRelationships = relations(task, ({ one }) => ({
  create: one(user, {
    fields: [task.creator],
    references: [user.id],
  }),
  project: one(project, {
    fields: [task.project],
    references: [project.id],
  }),
}))
