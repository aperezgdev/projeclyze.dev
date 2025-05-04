import { eq } from 'drizzle-orm'
import { Optional } from '../../Shared/domain/Optional'
import { DrizzleRepository } from '../../Shared/infrastructure/DrizzleRepository'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'
import { user } from './DrizzleUser.schema'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { UserName } from '../domain/value-object/UserName'
import { EmailValueObject } from '../../Shared/domain/value-object/EmailValueObject'

export class DrizzleUserRepository
  extends DrizzleRepository<User>
  implements UserRepository
{
  protected schema() {
    return user
  }

  async save(user: User): Promise<void> {
    await this.insert(user)
  }

  async findById(id: Uuidv7): Promise<Optional<User>> {
    const result = await this.db
      .select()
      .from(this.schema())
      .where(eq(this.schema().id, id.value))
    if (result.length === 0) return undefined
    return new User(
      new Uuidv7(result[0].id),
      new UserName(result[0].name),
      new EmailValueObject(result[0].email),
    )
  }

  async update(user: User): Promise<User> {
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
    return result.rows[0]
  }
}
