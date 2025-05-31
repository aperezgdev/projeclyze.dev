import { UserCreator } from '@projeclyze/context/User/application/UserCreator'
import { container } from '../../dependency_injection'

import { Request, Response } from 'express'

export class UserPostController {
  async run(req: Request, res: Response) {
    const creator: UserCreator = container.get('User.Context.application.UserCreator')
    console.log('asdasd')
    await creator.run(req.body.name, req.body.email)
    res.status(201).send()
  }
}
