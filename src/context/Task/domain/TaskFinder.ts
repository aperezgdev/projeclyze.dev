import { NotExistError } from '../../Shared/domain/NotExistError'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Task } from './Task'
import { TaskRepository } from './TaskRepository'

export class TaskFinder {
  constructor(private readonly repository: TaskRepository) {}

  async run(taskId: string): Promise<Task> {
    const taskIdVO = new Uuidv7(taskId)
    const task = await this.repository.findById(taskIdVO)

    if (!task.isPresent()) {
      throw new NotExistError(`Task with id ${taskIdVO.value} does not exist`)
    }

    return task.get()
  }
}
