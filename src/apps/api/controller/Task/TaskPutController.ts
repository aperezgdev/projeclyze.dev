import { Request, Response } from 'express'
import { TaskUpdater } from '@projeclyze/context/Task/application/TaskUpdater'
import { container } from '../../dependency_injection'

export class TaskPutController {
  async run(req: Request, res: Response) {
    const updater: TaskUpdater = container.get('Task.Context.application.TaskUpdater')
    await updater.run({
      taskId: req.params.id,
      title: req.body.title,
      description: req.body.description,
      creator: req.body.creator,
      project: req.body.project,
    })
    res.status(200).send()
  }
}
