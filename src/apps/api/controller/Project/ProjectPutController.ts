import { Request, Response } from 'express'
import { ProjectUpdater } from '../../../../context/Project/application/ProjectUpdater'
import { container } from '../../dependecy_injection'

export class ProjectPutController {
  async run(req: Request, res: Response) {
    const updater: ProjectUpdater = container.get(
      'Project.Context.application.ProjectUpdater',
    )
    const project = await updater.run({ ...req.body, id: req.params.id })
    res.status(200).json(project)
  }
}
