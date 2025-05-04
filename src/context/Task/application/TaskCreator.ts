import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Task } from '../domain/Task'
import { TaskRepository } from '../domain/TaskRepository'
import { TaskDescription } from '../domain/value-object/TaskDescription'
import { TaskTitle } from '../domain/value-object/TaskTitle'

export class TaskCreator {
  constructor(private repository: TaskRepository) {}

  async run(title: string, description: string, creatorId: string): Promise<void> {
    const titleVO = new TaskTitle(title)
    const descriptionVO = new TaskDescription(description)
    const creatorIdVO = new Uuidv7(creatorId)

    const task = Task.create(titleVO, descriptionVO, creatorIdVO)
    return this.repository.save(task)
  }
}
