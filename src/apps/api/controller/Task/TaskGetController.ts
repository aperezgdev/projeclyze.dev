import { Request, Response } from 'express'
import { container } from '../../dependency_injection'
import { TaskOwnerSearcher } from '@projeclyze/context/Task/application/TaskOwnerSearcher'

export class TaskGetController {
  async run(req: Request, res: Response) {
    const taskOwnerSearcher: TaskOwnerSearcher = container.get(
      'Task.Context.application.TaskOwnerSearcher',
    )
    const tasks = await taskOwnerSearcher.run(req.params.id)
    res.json(tasks.map((t) => t.toPrimitives()))
  }
}
