import { NotExistError } from '../../Shared/domain/NotExistError'
import { Optional } from '../../Shared/domain/Optional'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { InMemoryRepository } from '../../Shared/infrastructure/InMemoryRepository'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'

export class InMemoryUserRepository
  extends InMemoryRepository<User>
  implements UserRepository
{
  protected data: User[] = [
    User.fromPrimitives({
      id: '0196959b-349e-7683-a2ab-24ea33d93662',
      name: 'John',
      email: 'john@example.com',
      createdOn: '2023-01-01T00:00:00.000Z',
      updatedOn: '2023-01-01T00:00:00.000Z',
    }),
  ]

  async save(user: User): Promise<void> {
    this.insert(user)
  }

  async findById(id: Uuidv7): Promise<Optional<User>> {
    const result = this.searchAll().find((t) => t.id.value === id.value)
    return result
  }

  async update(user: User): Promise<User> {
    const result = this.searchAll().find((t) => t.id.value === user.id.value)
    if (!result) throw new NotExistError('User not found')
    this.data = this.data.map((t) => (t.id.value === user.id.value ? user : t))
    return result
  }
}
