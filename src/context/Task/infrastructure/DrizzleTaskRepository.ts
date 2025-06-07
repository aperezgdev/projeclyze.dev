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
import { Logger } from '@projeclyze/context/Shared/domain/Logger'

export class DrizzleTaskRepository extends DrizzleRepository implements TaskRepository {
  protected schema() {
    return task
  }

  constructor(private readonly logger: Logger) {
    super()
  }

  async save(task: Task): Promise<void> {
    this.logger.log(`Saving task: ${JSON.stringify(task.toPrimitives())}`)
    await this.insert(task.toPrimitives())
  }

  async findById(id: Uuidv7): Promise<Optional<Task>> {
    this.logger.log(`Finding task by id: ${id.value}`)
    const result = await this.db
      .select()
      .from(this.schema())
      .where(eq(this.schema().id, id.value))
    this.logger.log(`Finding task by id: ${id.value}, result: ${JSON.stringify(result)}`)
    if (result.length === 0) return Optional.empty()

    return Optional.of(
      Task.fromPrimitives({
        id: result[0].id,
        title: result[0].title,
        description: result[0].description,
        creator: result[0].creator,
        project: result[0].project,
        createdOn: result[0].created_on.toISOString(),
        updatedOn: result[0].updated_on.toISOString(),
      }),
    )
  }

  async findByOwner(ownerId: Uuidv7): Promise<Task[]> {
    this.logger.log(`Finding tasks by owner id: ${ownerId.value}`)
    const results = await this.db
      .select()
      .from(this.schema())
      .where(eq(this.schema().creator, ownerId.value))
    this.logger.log(`Found ${results.length} tasks for owner id: ${ownerId.value}, results: ${JSON.stringify(results)}`)
    return results.map(
      (result) =>
        new Task(
          new Uuidv7(result.id),
          new TaskTitle(result.title),
          new TaskDescription(result.description),
          new Uuidv7(result.creator),
          new Uuidv7(result.project),
          new CreatedOnValueObject(result.created_on),
          new CreatedOnValueObject(result.updated_on),
        ),
    )
  }

  async findByProject(projectId: Uuidv7): Promise<Task[]> {
    this.logger.log(`Finding tasks by project id: ${projectId.value}`)
    const results = await this.db
      .select()
      .from(this.schema())
      .where(eq(this.schema().project, projectId.value))
    this.logger.log(`Found ${results.length} tasks for project id: ${projectId.value}, results: ${JSON.stringify(results)}`)
    return results.map(
      (result) =>
        new Task(
          new Uuidv7(result.id),
          new TaskTitle(result.title),
          new TaskDescription(result.description),
          new Uuidv7(result.creator),
          new Uuidv7(result.project),
          new CreatedOnValueObject(result.created_on),
          new CreatedOnValueObject(result.updated_on),
        ),
    )
  }

  async update(task: Task): Promise<Task> {
    this.logger.log(`Updating task: ${JSON.stringify(task.toPrimitives())}`)
    const taskUpdateData = {
      id: task.id.value,
      title: task.title.value,
      description: task.description.value,
      creator: task.creator.value,
      project: task.project.value,
      created_on: task.createdOn.value,
      updated_on: task.updatedOn.value,
    }
    const result = await this.db
      .update(this.schema())
      .set(taskUpdateData)
      .where(eq(this.schema().id, task.id.value))
    this.logger.log(`Task updated: ${JSON.stringify(result)}`)
    return result.rows[0]
  }

  async delete(id: Uuidv7): Promise<void> {
  this.logger.log(`Deleting task with id: ${id.value}`)
    await this.db.delete(this.schema()).where(eq(this.schema().id, id.value))
  }
}
