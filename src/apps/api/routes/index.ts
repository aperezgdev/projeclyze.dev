import { Router } from 'express'
import { glob } from 'glob'

export function registerRoutes(router: Router) {
  const routes = glob.globSync(__dirname + '/**/*.route.*')
  routes.map((route) => register(route, router))
}

function register(routePath: string, app: Router) {
  const splitedPath = routePath.split('\\')
  const finalPath = splitedPath.at(splitedPath.length - 1) as string
  const route = require(finalPath)
  route.register(app)
}
