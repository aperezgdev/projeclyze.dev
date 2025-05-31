import { Request, Response } from 'express'
import { container } from '../../dependency_injection'

export class ProjectDeleteMemberController {
  async run(req: Request, res: Response) {
    const removeMember = container.get('Project.Context.application.ProjectRemoveMember')
    const project = await removeMember.run(req.body)
    res.status(200).json(project)
  }
}
