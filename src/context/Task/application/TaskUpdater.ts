import { Logger } from '@projeclyze/context/Shared/domain/Logger'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Task } from '../domain/Task'
import { TaskFinder } from '../domain/TaskFinder'
import { TaskRepository } from '../domain/TaskRepository'
import { TaskDescription } from '../domain/value-object/TaskDescription'
import { TaskTitle } from '../domain/value-object/TaskTitle'
import { UpdatedOnValueObject } from '@projeclyze/context/Shared/domain/value-object/UpdatedOn'

export class TaskUpdater {
  constructor(
    private repository: TaskRepository,
    private finder: TaskFinder,
    private readonly logger: Logger
  ) {
    this.finder = new TaskFinder(repository)
  }

  async run({
    taskId,
    title,
    description,
    creator,
    project,
  }: {
    taskId: string
    title: string
    description: string
    creator: string
    project: string
  }): Promise<Task> {
    this.logger.log(`Updating task with id: ${taskId}, title: ${title}, description: ${description}, creator: ${creator}, project: ${project}`)
    const taskIdVO = new Uuidv7(taskId)
    const titleVO = new TaskTitle(title)
    const descriptionVO = new TaskDescription(description)
    const projectVO = new Uuidv7(project)
    const creatorVO = new Uuidv7(creator)

    const task = await this.finder.run(taskId)
    this.logger.log(`Task with id: ${taskId} found, proceeding to update`)

    const result = new Task(
      taskIdVO,
      titleVO,
      descriptionVO,
      creatorVO,
      projectVO,
      task.createdOn,
      new UpdatedOnValueObject(new Date()),
    )
    return this.repository.update(result)
  }
}
