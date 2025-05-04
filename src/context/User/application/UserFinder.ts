import { User } from '../domain/User'
import { UserFinderDomain } from '../domain/UserFinderUserFinderDomain'
import { UserRepository } from '../domain/UserRepository'

export class UserFinder {
  constructor(
    private repository: UserRepository,
    private finder: UserFinderDomain,
  ) {
    this.finder = new UserFinderDomain(repository)
  }

  async run(userId: string): Promise<User> {
    const user = await this.finder.run(userId)

    return this.repository.update(user)
  }
}
