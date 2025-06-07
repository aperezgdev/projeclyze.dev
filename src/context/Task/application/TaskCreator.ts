import { Logger } from '@projeclyze/context/Shared/domain/Logger'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Task } from '../domain/Task'
import { TaskRepository } from '../domain/TaskRepository'
import { TaskDescription } from '../domain/value-object/TaskDescription'
import { TaskTitle } from '../domain/value-object/TaskTitle'

export class TaskCreator {
  constructor(private repository: TaskRepository, private readonly logger:Logger) {}

  async run({
    title,
    description,
    creator,
    project,
  }: {
    title: string
    description: string
    creator: string
    project: string
  }): Promise<void> {
    this.logger.log(`Creating task with title: ${title}, description: ${description}, creator: ${creator}, project: ${project}`)
    const titleVO = new TaskTitle(title)
    const descriptionVO = new TaskDescription(description)
    const creatorIdVO = new Uuidv7(creator)
    const projectIdVO = new Uuidv7(project)

    const task = Task.create(titleVO, descriptionVO, creatorIdVO, projectIdVO)
    this.logger.log(`Task created with id: ${task.id.value}`)
    return await this.repository.save(task)
  }
}
