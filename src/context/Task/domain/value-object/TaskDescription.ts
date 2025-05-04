import { ValidationError } from '../../../Shared/domain/ValidationError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class TaskDescription extends StringValueObject {
  constructor(description: string) {
    super(description)
    this.ensureIsValid()
  }

  private ensureIsValid() {
    if (this.value.length > 500) {
      throw new ValidationError(
        'description',
        'Description must be at most 500 character',
      )
    }
  }
}
