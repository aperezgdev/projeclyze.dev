import { CreatedOnValueObject } from '../../Shared/domain/value-object/CreatedOnValueObject'
import { EmailValueObject } from '../../Shared/domain/value-object/EmailValueObject'
import { UpdatedOnValueObject } from '../../Shared/domain/value-object/UpdatedOn'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { UserName } from './value-object/UserName'

interface UserPrimitives {
  id: string
  name: string
  email: string
  createdOn: string
  updatedOn: string
}

export class User {
  id: Uuidv7
  name: UserName
  email: EmailValueObject
  createdOn: CreatedOnValueObject
  updatedOn: UpdatedOnValueObject

  constructor(
    id: Uuidv7,
    name: UserName,
    email: EmailValueObject,
    createdOn?: CreatedOnValueObject,
    updatedOn?: UpdatedOnValueObject,
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.createdOn = createdOn ?? new CreatedOnValueObject()
    this.updatedOn = updatedOn ?? new UpdatedOnValueObject()
  }

  static create(name: UserName, email: EmailValueObject): User {
    const id = Uuidv7.random()
    return new User(id, name, email)
  }

  static fromPrimitives({ id, name, email, createdOn, updatedOn }: UserPrimitives): User {
    const idVO = new Uuidv7(id)
    const nameVO = new UserName(name)
    const emailVO = new EmailValueObject(email)
    const createdOnVO = new CreatedOnValueObject(new Date(createdOn))
    const updatedOnVO = new UpdatedOnValueObject(new Date(updatedOn))
    return new User(idVO, nameVO, emailVO, createdOnVO, updatedOnVO)
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      createdOn: this.createdOn.value.toISOString(),
      updatedOn: this.updatedOn.value.toISOString(),
    }
  }
}
