import { eq } from 'drizzle-orm'
import { Optional } from '../../Shared/domain/Optional'
import { DrizzleRepository } from '../../Shared/infrastructure/DrizzleRepository'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'
import { user } from './DrizzleUser.schema'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Logger } from '@projeclyze/context/Shared/domain/Logger'

export class DrizzleUserRepository extends DrizzleRepository implements UserRepository {
  protected schema() {
    return user
  }

  constructor(private readonly logger: Logger) {
    super()
  }

  async save(user: User): Promise<void> {
    this.logger.log(`Saving user: ${JSON.stringify(user.toPrimitives())}`)
    await this.insert(user.toPrimitives())
  }

  async findById(id: Uuidv7): Promise<Optional<User>> {
    this.logger.log(`Finding user by id: ${id.value}`)
    const result = await this.db
      .select()
      .from(this.schema())
      .where(eq(this.schema().id, id.value))
    this.logger.log(`Finding user by id: ${id.value}, result: ${JSON.stringify(result)}`)
    if (result.length === 0) return Optional.empty()
    return Optional.of(
      User.fromPrimitives({
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        createdOn: result[0].created_on.toISOString(),
        updatedOn: result[0].updated_on.toISOString(),
      }),
    )
  }

  async update(user: User): Promise<User> {
    this.logger.log(`Updating user: ${JSON.stringify(user.toPrimitives())}`)
    const userUpdateData = {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      created_on: user.createdOn.value,
      updated_on: user.updatedOn.value,
    }
    const result = await this.db
      .update(this.schema())
      .set(userUpdateData)
      .where(eq(this.schema().id, user.id.value))
    
    this.logger.log(`User updated: ${JSON.stringify(result)}`)
    return result.rows[0]
  }
}
