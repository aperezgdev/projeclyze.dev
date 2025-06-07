import { Logger } from '@projeclyze/context/Shared/domain/Logger'
import { User } from '../domain/User'
import { UserFinderDomain } from '../domain/UserFinderDomain'
import { UserRepository } from '../domain/UserRepository'

export class UserFinder {
  constructor(
    repository: UserRepository,
    private finder: UserFinderDomain,
    private logger: Logger
  ) {
    this.finder = new UserFinderDomain(repository, logger)
  }

  async run(userId: string): Promise<User> {
    this.logger.log(`Finding user with id: ${userId}`)
    const user = await this.finder.run(userId)

    this.logger.log(`User found: ${JSON.stringify(user.toPrimitives())}`)
    return user
  }
}
