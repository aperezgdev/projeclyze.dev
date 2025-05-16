import { Request, Response } from 'express'
import { ProjectRemover } from '../../../../context/Project/application/ProjectRemover'
import { container } from '../../dependecy_injection'

export class ProjectDeleteController {
  async run(req: Request, res: Response) {
    const deleter: ProjectRemover = container.get(
      'Project.Context.application.ProjectRemover',
    )
    await deleter.run({ id: req.params.id })
    res.status(204).send()
  }
}
