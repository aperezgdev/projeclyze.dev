import 'dotenv/config'
import { DrizzleSchema } from './DrizzleSchema'
import { drizzle } from 'drizzle-orm/node-postgres'

export abstract class DrizzleRepository<T extends object> {
  protected db: ReturnType<typeof drizzle>

  constructor() {
    this.db = drizzle(process.env.DB_URL!)
  }

  protected abstract schema(): DrizzleSchema

  protected async searchAll() {
    const result = await this.db.select().from(this.schema())
    return result
  }

  protected async insert(t: T): Promise<number> {
    const result = await this.db.insert(this.schema()).values(t)
    return result.rows.length
  }
}
