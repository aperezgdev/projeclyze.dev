import { Primitives, ValueObject } from './ValueObject'

export abstract class ArrayValueObject<T extends ValueObject<Primitives>> {
  readonly value: T[]

  constructor(value: T[]) {
    this.value = value
  }
}
