import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { TaskFinder } from '../domain/TaskFinder'
import { TaskRepository } from '../domain/TaskRepository'

export class TaskRemover {
  constructor(
    private repository: TaskRepository,
    private finder: TaskFinder,
  ) {
    this.finder = new TaskFinder(repository)
  }

  async run(taskId: string): Promise<void> {
    const taskIdVO = new Uuidv7(taskId)
    await this.finder.run(taskId)

    return this.repository.delete(taskIdVO)
  }
}
