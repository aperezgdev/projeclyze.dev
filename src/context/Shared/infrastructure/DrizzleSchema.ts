import { PgTableWithColumns } from 'drizzle-orm/pg-core'

export interface DrizzleSchema extends PgTableWithColumns<any> {}
