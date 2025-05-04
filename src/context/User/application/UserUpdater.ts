import { EmailValueObject } from '../../Shared/domain/value-object/EmailValueObject'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'
import { UserName } from '../domain/value-object/UserName'

export class UserUpdater {
  constructor(private repository: UserRepository) {}

  async run(userId: string, name: string, email: string): Promise<User> {
    const userIdVO = new Uuidv7(userId)
    const nameVO = new UserName(name)
    const emailVO = new EmailValueObject(email)

    const user = new User(userIdVO, nameVO, emailVO)
    return this.repository.update(user)
  }
}
