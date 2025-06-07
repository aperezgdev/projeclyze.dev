import { Logger } from '@projeclyze/context/Shared/domain/Logger'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Task } from '../domain/Task'
import { TaskRepository } from '../domain/TaskRepository'

export class TaskProjectSeacher {
  constructor(private repository: TaskRepository, private readonly logger: Logger) {}

  async run({ projectId }: { projectId: string }): Promise<Task[]> {
    this.logger.log(`Searching tasks for project: ${projectId}`)
    const projectIdVO = new Uuidv7(projectId)
    const tasks = await this.repository.findByProject(projectIdVO)
    this.logger.log(`Found ${tasks.length} tasks for project: ${projectIdVO.value}`)
    return tasks
  }
}