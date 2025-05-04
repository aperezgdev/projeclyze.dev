import { v7, validate } from 'uuid'
import { StringValueObject } from './StringValueObject'

export class Uuidv7 extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsValid(value)
  }

  static random(): Uuidv7 {
    return new Uuidv7(v7())
  }

  private ensureIsValid(id: string) {
    if (!validate(id)) {
      throw new Error(`<${this.constructor.name}> does not allow the value <${id}>`)
    }
  }
}
