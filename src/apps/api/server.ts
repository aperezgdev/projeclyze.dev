import express, { Application, NextFunction, Request, Response } from 'express'
import Router from 'express-promise-router'
import { loadContainer } from './dependecy_injection/index'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as http from 'http'
import { registerRoutes } from './routes'

export class Server {
  private appExpress: Application
  private port: string
  private httpServer?: http.Server

  constructor(port: string) {
    this.port = port
    this.appExpress = express()
    this.appExpress.use(cors())
    this.appExpress.use(bodyParser.json())
    loadContainer.then(() => {
      const router = Router()
      registerRoutes(router)
      this.appExpress.use(router)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
        res.status(500).send(err.message)
      })
    })
  }

  async start() {
    await loadContainer
    return new Promise<void>((resolve) => {
      this.httpServer = this.appExpress.listen(this.port, () => {
        console.log(
          `ApiServer is running at the port ${this.port} on http://localhost:${this.port} in ${process.env.ENV} environment`,
        )
        resolve()
      })
    })
  }

  getHTTPServer() {
    return this.httpServer
  }

  getAppExpress() {
    return this.appExpress
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error)
          }
          return resolve()
        })
      }

      return resolve()
    })
  }
}
