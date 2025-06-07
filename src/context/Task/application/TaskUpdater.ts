import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Task } from '../domain/Task'
import { TaskFinder } from '../domain/TaskFinder'
import { TaskRepository } from '../domain/TaskRepository'
import { TaskDescription } from '../domain/value-object/TaskDescription'
import { TaskTitle } from '../domain/value-object/TaskTitle'

export class TaskUpdater {
  constructor(
    private repository: TaskRepository,
    private finder: TaskFinder,
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
    const taskIdVO = new Uuidv7(taskId)
    const titleVO = new TaskTitle(title)
    const descriptionVO = new TaskDescription(description)
    const projectVO = new Uuidv7(project)
    const creatorVO = new Uuidv7(creator)

    const task = await this.finder.run(taskId)

    const result = new Task(
      taskIdVO,
      titleVO,
      descriptionVO,
      creatorVO,
      projectVO,
      task.createdOn,
      task.updatedOn,
    )
    return this.repository.update(result)
  }
}
