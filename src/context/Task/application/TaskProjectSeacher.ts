import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Task } from '../domain/Task'
import { TaskRepository } from '../domain/TaskRepository'

export class TaskProjectSeacher {
  constructor(private repository: TaskRepository) {}

  async run({ projectId }: { projectId: string }): Promise<Task[]> {
    const projectIdVO = new Uuidv7(projectId)
    return this.repository.findByProject(projectIdVO)
  }
}
