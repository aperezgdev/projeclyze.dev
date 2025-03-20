import { Server } from './server'

export class ApiServer {
  private server?: Server

  async start() {
    const port = process.env.PORT || '5001'
    this.server = new Server(port)

    return this.server.start()
  }

  get httpServer() {
    return this.server?.getHTTPServer()
  }

  getAppExpress() {
    return this.server?.getAppExpress
  }

  async stop() {
    return this.server?.stop()
  }
}
