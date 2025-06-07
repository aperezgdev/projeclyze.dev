import { Logger } from '@projeclyze/context/Shared/domain/Logger'
import { NotExistError } from '../../Shared/domain/NotExistError'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { User } from './User'
import { UserRepository } from './UserRepository'

export class UserFinderDomain {
  constructor(private repository: UserRepository, private logger: Logger) {}

  async run(userId: string): Promise<User> {
    this.logger.log(`Finding user with id: ${userId}`)
    const userIdVO = new Uuidv7(userId)
    const user = await this.repository.findById(userIdVO)
    if (!user) {
      this.logger.error(`User with id ${userId} not found`)
      throw new NotExistError('User not exist')
    }

    this.logger.log(`User with id ${userId} found`)
    this.logger.log(`User details: ${JSON.stringify(user.get())}`)
    return user.get()
  }
}
