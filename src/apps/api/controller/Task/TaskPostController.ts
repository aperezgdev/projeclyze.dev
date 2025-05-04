import { Request, Response } from 'express'
import { TaskCreator } from '../../../../context/Task/application/TaskCreator'
import { container } from '../../dependecy_injection'

export class TaskPostController {
  async run(req: Request, res: Response) {
    const creator: TaskCreator = container.get('Task.Context.application.TaskCreator')
    await creator.run(req.body.title, req.body.description, req.body.creator)
    res.status(201).send()
  }
}
