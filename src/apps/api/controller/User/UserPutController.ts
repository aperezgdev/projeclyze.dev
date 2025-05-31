import { Request, Response } from 'express'
import { UserUpdater } from '@projeclyze/context/User/application/UserUpdater'
import { container } from '../../dependency_injection'

export class UserPutController {
  async run(req: Request, res: Response) {
    const updater: UserUpdater = container.get('User.Context.application.UserUpdater')
    await updater.run(req.params.id, req.body.name, req.body.email)
    res.status(200).send()
  }
}
