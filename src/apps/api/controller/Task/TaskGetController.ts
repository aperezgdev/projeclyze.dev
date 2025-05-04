import { Request, Response } from 'express'
import { TaskOwnerSearcher } from '../../../../context/Task/application/TaskOwnerSearcher'
import { container } from '../../dependecy_injection'

export class TaskGetController {
  async run(req: Request, res: Response) {
    const taskOwnerSearcher: TaskOwnerSearcher = container.get(
      'Task.Context.application.TaskOwnerSearcher',
    )
    const tasks = await taskOwnerSearcher.run(req.params.id)
    res.json(tasks.map((t) => t.toPrimitives()))
  }
}
