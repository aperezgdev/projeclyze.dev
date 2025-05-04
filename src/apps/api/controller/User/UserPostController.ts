import { UserCreator } from '../../../../context/User/application/UserCreator'
import { container } from '../../dependecy_injection'

import { Request, Response } from 'express'

export class UserPostController {
  async run(req: Request, res: Response) {
    const creator: UserCreator = container.get('User.Context.application.UserCreator')
    await creator.run(req.body.name, req.body.email)
    res.status(201).send()
  }
}
