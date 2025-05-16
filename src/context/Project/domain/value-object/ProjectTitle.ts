import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class ProjectTitle extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsValid(value)
  }

  private ensureIsValid(value: string): void {
    if (value.length < 3) {
      throw new Error('Title must be at least 3 characters')
    }
    if (value.length > 50) {
      throw new Error('Title must be at most 50 characters')
    }
  }
}
