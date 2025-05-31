import { Router } from 'express'
import { container } from '../dependency_injection'

export const register = (router: Router) => {
  const projectGetController = container.get(
    'Project.Api.controller.ProjectGetController',
  )
  const projectPostController = container.get(
    'Project.Api.controller.ProjectPostController',
  )
  const projectPutController = container.get(
    'Project.Api.controller.ProjectPutController',
  )
  const projectDeleteController = container.get(
    'Project.Api.controller.ProjectDeleteController',
  )
  const projectPutMemberController = container.get(
    'Project.Api.controller.ProjectPutMemberController',
  )
  const projectDeleteMemberController = container.get(
    'Project.Api.controller.ProjectDeleteMemberController',
  )

  router.get('/users/:id/projects', projectGetController.run)
  router.post('/projects', projectPostController.run)
  router.put('/projects/:id', projectPutController.run)
  router.delete('/projects/:id', projectDeleteController.run)
  router.put('/projects/:id/members/:member', projectPutMemberController.run)
  router.delete('/projects/:id/members/:member', projectDeleteMemberController.run)
}
