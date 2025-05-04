import { eq } from 'drizzle-orm'
import { DrizzleRepository } from '../../Shared/infrastructure/DrizzleRepository'
import { Task } from '../domain/Task'
import { TaskRepository } from '../domain/TaskRepository'
import { task } from './DrizzleTask.schema'
import { Optional } from '../../Shared/domain/Optional'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { TaskTitle } from '../domain/value-object/TaskTitle'
import { TaskDescription } from '../domain/value-object/TaskDescription'
import { CreatedOnValueObject } from '../../Shared/domain/value-object/CreatedOnValueObject'

export class DrizzleTaskRepository
  extends DrizzleRepository<Task>
  implements TaskRepository
{
  protected schema() {
    return task
  }

  async save(task: Task): Promise<void> {
    await this.insert(task)
  }

  async findById(id: Uuidv7): Promise<Optional<Task>> {
    const result = await this.db
      .select()
      .from(this.schema())
      .where(eq(this.schema().id, id.value))
    if (result.length === 0) return undefined
    return new Task(
      new Uuidv7(result[0].id),
      new TaskTitle(result[0].title),
      new TaskDescription(result[0].description),
      new Uuidv7(result[0].creator),
      new CreatedOnValueObject(result[0].created_on),
      new CreatedOnValueObject(result[0].updated_on),
    )
  }

  async findByOwner(ownerId: Uuidv7): Promise<Task[]> {
    const results = await this.db
      .select()
      .from(this.schema())
      .where(eq(this.schema().creator, ownerId.value))
    return results.map(
      (result) =>
        new Task(
          new Uuidv7(result.id),
          new TaskTitle(result.title),
          new TaskDescription(result.description),
          new Uuidv7(result.creator),
          new CreatedOnValueObject(result.created_on),
          new CreatedOnValueObject(result.updated_on),
        ),
    )
  }

  async update(task: Task): Promise<Task> {
    const taskUpdateData = {
      id: task.id.value,
      title: task.title.value,
      description: task.description.value,
      created_on: task.createdOn.value,
      updated_on: task.updatedOn.value,
    }
    const result = await this.db
      .update(this.schema())
      .set(taskUpdateData)
      .where(eq(this.schema().id, task.id.value))
    return result.rows[0]
  }

  async delete(id: Uuidv7): Promise<void> {
    await this.db.delete(this.schema()).where(eq(this.schema().id, id.value))
  }
}
