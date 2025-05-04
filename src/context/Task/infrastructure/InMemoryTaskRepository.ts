import { NotExistError } from '../../Shared/domain/NotExistError'
import { Optional } from '../../Shared/domain/Optional'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { InMemoryRepository } from '../../Shared/infrastructure/InMemoryRepository'
import { Task } from '../domain/Task'
import { TaskRepository } from '../domain/TaskRepository'

export class InMemoryTaskRepository
  extends InMemoryRepository<Task>
  implements TaskRepository
{
  protected data: Task[] = [
    Task.fromPrimitives({
      id: '0196959b-349e-7683-a2ab-24ea33d93662',
      title: 'Task 1',
      description: 'Task 1 description',
      creator: '0196959b-349e-7683-a2ab-24ea33d93662',
      createdOn: '2022-01-01T00:00:00.000Z',
      updatedOn: '2022-01-01T00:00:00.000Z',
    }),
  ]

  async save(task: Task): Promise<void> {
    this.insert(task)
  }

  async findById(id: Uuidv7): Promise<Optional<Task>> {
    const result = this.searchAll().find((t) => t.id.value === id.value)
    return result
  }

  async findByOwner(ownerId: Uuidv7): Promise<Task[]> {
    const results = this.searchAll().filter((t) => t.creator.value === ownerId.value)
    return results
  }

  async update(task: Task): Promise<Task> {
    const result = this.searchAll().find((t) => t.id.value === task.id.value)
    if (!result) throw new NotExistError('Task not found')
    this.data = this.data.map((t) => (t.id.value === task.id.value ? task : t))
    return result
  }

  async delete(id: Uuidv7): Promise<void> {
    this.data = this.searchAll().filter((t) => t.id.value !== id.value)
  }
}
