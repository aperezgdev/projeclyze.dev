export abstract class InMemoryRepository<T extends object> {
  protected data: T[] = []

  protected searchAll(): T[] {
    return this.data
  }

  protected insert(t: T): T[] {
    return [...this.data, t]
  }
}
