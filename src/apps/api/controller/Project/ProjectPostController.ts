import { Request, Response } from 'express'
import { container } from '../../dependency_injection'
import { ProjectCreator } from '@projeclyze/context/Project/application/ProjectCreator'

export class ProjectPostController {
  async run(req: Request, res: Response) {
    const creator: ProjectCreator = container.get(
      'Project.Context.application.ProjectCreator',
    )
    const project = await creator.run(req.body)
    res.status(201).json(project)
  }
}
