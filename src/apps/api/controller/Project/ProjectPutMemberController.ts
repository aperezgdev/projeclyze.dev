import { Request, Response } from 'express'
import { container } from '../../dependency_injection'

export class ProjectPutMemberController {
  async run(req: Request, res: Response) {
    const addMember = container.get('Project.Context.application.ProjectAddMember')
    const project = await addMember.run(req.body)
    res.status(200).json(project)
  }
}
