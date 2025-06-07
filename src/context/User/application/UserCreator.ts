import { Logger } from '@projeclyze/context/Shared/domain/Logger'
import { EmailValueObject } from '../../Shared/domain/value-object/EmailValueObject'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'
import { UserName } from '../domain/value-object/UserName'

export class UserCreator {
  constructor(private repository: UserRepository, private logger: Logger) {}

  async run(name: string, email: string): Promise<void> {
    this.logger.log(`Creating user with name: ${name}, email: ${email}`)
    const nameVO = new UserName(name)
    const emailVO = new EmailValueObject(email)

    const user = User.create(nameVO, emailVO)
    this.logger.log(`Creating user: ${JSON.stringify(user.toPrimitives())}`)
    return this.repository.save(user)
  }
}
