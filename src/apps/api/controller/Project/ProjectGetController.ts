import { Request, Response } from 'express'
import { ProjectOwnerSearcher } from '@projeclyze/context/Project/application/ProjectOwnerSearcher'
import { container } from '../../dependency_injection'

export class ProjectGetController {
  async run(req: Request, res: Response) {
    const finder: ProjectOwnerSearcher = container.get(
      'Project.Context.application.ProjectOwnerSearcher',
    )
    const project = await finder.run(req.params.id)
    res.status(200).json(project.map((p) => p.toPrimitives()))
  }
}
