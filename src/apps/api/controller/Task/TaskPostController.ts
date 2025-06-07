import { Request, Response } from 'express'
import { TaskCreator } from '@projeclyze/context/Task/application/TaskCreator'
import { container } from '../../dependency_injection'

export class TaskPostController {
  async run(req: Request, res: Response) {
    const creator: TaskCreator = container.get('Task.Context.application.TaskCreator')
    await creator.run({
      title: req.body.title,
      description: req.body.description,
      creator: req.body.creator,
      project: req.body.project,
    })
    res.status(201).send()
  }
}
