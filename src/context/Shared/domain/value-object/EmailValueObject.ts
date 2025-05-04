import { StringValueObject } from './StringValueObject'

export class EmailValueObject extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsValid(value)
  }

  private ensureIsValid(value: string) {
    const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (!REGEX_EMAIL.test(value)) {
      throw new Error('Email format is not valid')
    }
  }
}
