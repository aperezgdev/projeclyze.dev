import { Logger } from '@projeclyze/context/Shared/domain/Logger'
import { NotExistError } from '../../Shared/domain/NotExistError'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Task } from '../domain/Task'
import { TaskRepository } from '../domain/TaskRepository'

export class TaskOwnerSearcher {
  constructor(private repository: TaskRepository, private readonly logger: Logger) {}

  async run(owner: string): Promise<Task[]> {
    this.logger.log(`Searching tasks for owner: ${owner}`)
    const ownerIdVO = new Uuidv7(owner)
    const tasks = await this.repository.findByOwner(ownerIdVO)
    if (!tasks) {
      this.logger.error(`No tasks found for owner: ${ownerIdVO.value}`)
      throw new NotExistError(`No tasks found for owner: ${ownerIdVO.value}`)
    }
    this.logger.log(`Found ${tasks.length} tasks for owner: ${ownerIdVO.value}`)
    return tasks
  }
}
