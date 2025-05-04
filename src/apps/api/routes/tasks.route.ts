import { Router } from 'express'
import { TaskGetController } from '../controller/Task/TaskGetController'
import { TaskPostController } from '../controller/Task/TaskPostController'
import { container } from '../dependecy_injection'
import { TaskPutController } from '../controller/Task/TaskPutController'
import { TaskDeleteController } from '../controller/Task/TaskDeleteController'

export const register = (router: Router) => {
  const taskGetController: TaskGetController = container.get(
    'Task.Api.controllers.TaskGetController',
  )
  const taskPostController: TaskPostController = container.get(
    'Task.Api.controllers.TaskPostController',
  )
  const taskPutController: TaskPutController = container.get(
    'Task.Api.controllers.TaskPutController',
  )
  const taskDeleteController: TaskDeleteController = container.get(
    'Task.Api.controllers.TaskDeleteController',
  )

  router.get('/users/:id/tasks', taskGetController.run.bind(taskGetController))
  router.put('/tasks/:id', taskPutController.run.bind(taskPutController))
  router.post('/tasks', taskPostController.run.bind(taskPostController))
  router.delete('/tasks/:id', taskDeleteController.run.bind(taskDeleteController))
}
