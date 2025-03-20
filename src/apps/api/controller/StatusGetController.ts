import { Request, Response } from 'express'

export class StatusGetController {
  async run(_req: Request, res: Response) {
    res.status(200).send()
  }
}
