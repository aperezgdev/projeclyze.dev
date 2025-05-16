export class Optional<T> {
  constructor(private value: T) {}

  get(): T {
    if (!this.isPresent()) {
      throw new Error('Optional is empty')
    }
    return this.value
  }

  isPresent(): boolean {
    return this.value !== undefined
  }

  static of<T>(value: T | undefined): Optional<T> {
    return new Optional(value!)
  }

  static empty<T>(): Optional<T> {
    return new Optional(undefined!)
  }

  ifPresent(consumer: (value: T) => void): void {
    if (this.value !== undefined) {
      consumer(this.value)
    }
  }
}
