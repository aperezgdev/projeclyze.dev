import { Request, Response } from 'express'
import { UserFinder } from '@projeclyze/context/User/application/UserFinder'
import { container } from '../../dependency_injection'

export class UserGetController {
  async run(req: Request, res: Response) {
    const finder: UserFinder = container.get('User.Context.application.UserFinder')

    const user = await finder.run(req.params.id)
    res.json(user.toPrimitives())
  }
}
