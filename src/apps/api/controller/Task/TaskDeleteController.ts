import { Request, Response } from 'express'
import { container } from '../../dependency_injection'

export class TaskDeleteController {
  async run(req: Request, res: Response) {
    const remover = container.get('Task.Context.application.TaskRemover')
    await remover.run(req.params.id)
    res.status(204).send()
  }
}
