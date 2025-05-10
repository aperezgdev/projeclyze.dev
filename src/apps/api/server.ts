import 'dotenv/config'
import express, { Application, NextFunction, Request, Response } from 'express'
import Router from 'express-promise-router'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as http from 'http'
import { registerRoutes } from './routes'
import { loadContainer } from './dependecy_injection'

export class Server {
  private appExpress: Application
  private port: string
  private httpServer?: http.Server

  constructor(port: string) {
    this.port = port
    this.appExpress = express()
    this.appExpress.use(cors())
    this.appExpress.use(bodyParser.json())
  }

  async start() {
    console.log('Starting ApiServer')
    await loadContainer().then(() => {
      const router = Router()
      registerRoutes(router)
      this.appExpress.use('/api', router)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
        console.error(err)
        res.status(500).send(err.message)
      })
    })
    return new Promise<void>((resolve) => {
      this.httpServer = this.appExpress.listen(this.port, () => {
        console.log(
          `ApiServer is running at the port ${this.port} on http://localhost:${this.port}/api in ${process.env.ENV} environment`,
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
