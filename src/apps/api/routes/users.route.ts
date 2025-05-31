import { Router } from 'express'
import { container } from '../dependency_injection'
import { UserGetController } from '../controller/User/UserGetController'
import { UserPostController } from '../controller/User/UserPostController'
import { UserPutController } from '../controller/User/UserPutController'

export const register = (router: Router) => {
  const userGetController: UserGetController = container.get(
    'User.Api.controllers.UserGetController',
  )
  const userPostController: UserPostController = container.get(
    'User.Api.controllers.UserPostController',
  )
  const userPutController: UserPutController = container.get(
    'User.Api.controllers.UserPutController',
  )

  router.get('/users/:id', userGetController.run.bind(userGetController))
  router.put('/users/:id', userPutController.run.bind(userPutController))
  router.post('/users', userPostController.run.bind(userPostController))
}
