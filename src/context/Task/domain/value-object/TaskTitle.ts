import { ValidationError } from '../../../Shared/domain/ValidationError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class TaskTitle extends StringValueObject {
  constructor(title: string) {
    super(title)
    this.ensureIsValid()
  }

  private ensureIsValid() {
    if (this.value.length < 3) {
      throw new ValidationError('title', 'Title must be at least 3 character')
    }
    if (this.value.length > 100) {
      throw new ValidationError('title', 'Title must be at most 100 character')
    }
  }
}
