import { Router } from 'express'
import { StatusGetController } from '../controller/StatusGetController'
import { container } from '../dependency_injection'

export const register = (router: Router) => {
  const statusGetController: StatusGetController = container.get(
    'Status.Api.controllers.StatusGetController',
  )

  router.get('/status', statusGetController.run.bind(statusGetController))
}
