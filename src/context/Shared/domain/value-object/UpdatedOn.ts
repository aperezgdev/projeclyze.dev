import { DateValueObject } from './DateValueObject'

export class UpdatedOnValueObject extends DateValueObject {
  constructor(date?: Date) {
    if (date) {
      super(date)
      return
    }

    super(new Date())
  }
}
