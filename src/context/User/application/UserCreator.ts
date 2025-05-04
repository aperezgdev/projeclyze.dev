import { EmailValueObject } from '../../Shared/domain/value-object/EmailValueObject'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'
import { UserName } from '../domain/value-object/UserName'

export class UserCreator {
  constructor(private repository: UserRepository) {}

  async run(name: string, email: string): Promise<void> {
    const nameVO = new UserName(name)
    const emailVO = new EmailValueObject(email)

    const user = User.create(nameVO, emailVO)
    return this.repository.save(user)
  }
}
