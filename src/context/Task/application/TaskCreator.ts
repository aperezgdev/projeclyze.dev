import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Task } from '../domain/Task'
import { TaskRepository } from '../domain/TaskRepository'
import { TaskDescription } from '../domain/value-object/TaskDescription'
import { TaskTitle } from '../domain/value-object/TaskTitle'

export class TaskCreator {
  constructor(private repository: TaskRepository) {}

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
    const titleVO = new TaskTitle(title)
    const descriptionVO = new TaskDescription(description)
    const creatorIdVO = new Uuidv7(creator)
    const projectIdVO = new Uuidv7(project)

    const task = Task.create(titleVO, descriptionVO, creatorIdVO, projectIdVO)
    return this.repository.save(task)
  }
}
