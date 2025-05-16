import { ArrayValueObject } from '../../../Shared/domain/value-object/ArrayValueObject'
import { Uuidv7 } from '../../../Shared/domain/value-object/Uuidv7'

export class ProjectMembers extends ArrayValueObject<Uuidv7> {
  constructor(value: Uuidv7[]) {
    super(value)
    this.ensureIsValid(value)
  }

  private ensureIsValid(value: Uuidv7[]) {
    if (value.length === 0) {
      throw new Error('ProjectMembers must have at least one member')
    }
  }

  add(member: Uuidv7): ProjectMembers {
    const result = this.value.find((m) => m.equals(member))
    if (result) {
      throw new Error(`ProjectMembers already has member ${member.value}`)
    }

    return new ProjectMembers([...this.value, member])
  }

  remove(member: Uuidv7): ProjectMembers {
    const result = this.value.find((m) => m.equals(member))
    if (!result) {
      throw new Error(`ProjectMembers does not have member ${member.value}`)
    }
    return new ProjectMembers(this.value.filter((m) => !m.equals(member)))
  }
}
