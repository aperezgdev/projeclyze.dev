import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class UserName extends StringValueObject {
  constructor(name: string) {
    super(name)
    this.ensureIsValid()
  }

  private ensureIsValid() {
    if (this.value.length < 3) {
      throw new Error('UserName must be at least 3 character')
    }
    if (this.value.length > 100) {
      throw new Error('UserName must be at most 100 character')
    }
  }
}
