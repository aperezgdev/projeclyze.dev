import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class ProjectDescription extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsValid(value)
  }

  private ensureIsValid(value: string): void {
    if (value.length < 10) {
      throw new Error('Description must be at least 10 characters')
    }
    if (value.length > 1000) {
      throw new Error('Description must be at most 1000 characters')
    }
  }
}
