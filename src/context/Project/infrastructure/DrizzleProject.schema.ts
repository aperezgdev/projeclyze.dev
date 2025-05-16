import { relations } from 'drizzle-orm'
import { uuid, varchar, timestamp, pgTable, primaryKey } from 'drizzle-orm/pg-core'
import { user } from '../../User/infrastructure/DrizzleUser.schema'

export const project = pgTable('projects', {
  id: uuid().primaryKey(),
  title: varchar().notNull(),
  description: varchar().notNull(),
  owner: uuid()
    .notNull()
    .references(() => user.id),
  created_on: timestamp().notNull().defaultNow(),
  updated_on: timestamp().notNull().defaultNow(),
})

export const projectToUser = pgTable(
  'project_to_user',
  {
    project_id: uuid()
      .notNull()
      .references(() => project.id),
    user_id: uuid()
      .notNull()
      .references(() => user.id),
  },
  (t) => [primaryKey({ columns: [t.project_id, t.user_id] })],
)

const projectToUserRelationships = relations(projectToUser, ({ one }) => ({
  project_id: one(project, {
    fields: [projectToUser.project_id],
    references: [project.id],
  }),
  user_id: one(user, {
    fields: [projectToUser.user_id],
    references: [user.id],
  }),
}))

export const projectRelationships = relations(project, ({ one }) => ({
  create: one(projectToUser, {
    fields: [project.owner],
    references: [projectToUser.user_id],
  }),
}))
