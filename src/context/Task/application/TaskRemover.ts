import { Logger } from '@projeclyze/context/Shared/domain/Logger'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { TaskFinder } from '../domain/TaskFinder'
import { TaskRepository } from '../domain/TaskRepository'

export class TaskRemover {
  constructor(
    private repository: TaskRepository,
    private finder: TaskFinder,
    private readonly logger: Logger
  ) {
    this.finder = new TaskFinder(repository)
  }

  async run(taskId: string): Promise<void> {
    this.logger.log(`Removing task with id: ${taskId}`)
    const taskIdVO = new Uuidv7(taskId)
    await this.finder.run(taskId)
    this.logger.log(`Task with id: ${taskId} found, proceeding to delete`)
    return await this.repository.delete(taskIdVO)
  }
}
