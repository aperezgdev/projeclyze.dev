import { Request, Response } from 'express'
import { TaskUpdater } from '../../../../context/Task/application/TaskUpdater'
import { container } from '../../dependecy_injection'

export class TaskPutController {
  async run(req: Request, res: Response) {
    const updater: TaskUpdater = container.get('Task.Context.application.TaskUpdater')
    await updater.run(req.params.id, req.body.title, req.body.description)
    res.status(200).send()
  }
}
