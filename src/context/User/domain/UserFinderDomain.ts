import { NotExistError } from '../../Shared/domain/NotExistError'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { User } from './User'
import { UserRepository } from './UserRepository'

export class UserFinderDomain {
  constructor(private repository: UserRepository) {}

  async run(userId: string): Promise<User> {
    const userIdVO = new Uuidv7(userId)
    const user = await this.repository.findById(userIdVO)
    if (!user) throw new NotExistError('User not exist')
    return user
  }
}
