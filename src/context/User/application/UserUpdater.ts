import { Logger } from '@projeclyze/context/Shared/domain/Logger'
import { EmailValueObject } from '../../Shared/domain/value-object/EmailValueObject'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'
import { UserName } from '../domain/value-object/UserName'

export class UserUpdater {
  constructor(private repository: UserRepository, private logger: Logger) {}

  async run(userId: string, name: string, email: string): Promise<User> {
    this.logger.log(`Updating user with id: ${userId}, name: ${name}, email: ${email}`)
    const userIdVO = new Uuidv7(userId)
    const nameVO = new UserName(name)
    const emailVO = new EmailValueObject(email)

    const user = new User(userIdVO, nameVO, emailVO)
    this.logger.log(`Updating user: ${JSON.stringify(user.toPrimitives())}`)
    return this.repository.update(user)
  }
}
