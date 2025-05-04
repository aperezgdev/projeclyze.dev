import { NotExistError } from '../../Shared/domain/NotExistError'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Task } from '../domain/Task'
import { TaskRepository } from '../domain/TaskRepository'

export class TaskOwnerSearcher {
  constructor(private repository: TaskRepository) {}

  async run(owner: string): Promise<Task[]> {
    const ownerIdVO = new Uuidv7(owner)
    const task = await this.repository.findByOwner(ownerIdVO)
    if (!task) throw new NotExistError('Task not exist')
    return task
  }
}
