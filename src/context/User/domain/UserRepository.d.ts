import { Optional } from '../../Shared/domain/Optional'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { User } from './User'

export interface UserRepository {
  save(user: User): Promise<void>
  findById(id: Uuidv7): Promise<Optional<User>>
  update(user: User): Promise<User>
}
