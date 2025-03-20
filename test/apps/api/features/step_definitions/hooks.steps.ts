import { AfterAll, BeforeAll } from '@cucumber/cucumber'
import { ApiServer } from '../../../../../src/apps/api/ApiServer'
import { agent } from 'supertest'
import TestAgent from 'supertest/lib/agent'
import Test from 'supertest/lib/test'

export let application: TestAgent<Test>
let server: ApiServer

BeforeAll(async () => {
  server = new ApiServer()
  await server.start()
  application = agent(server.httpServer)
})

AfterAll(async () => {
  await server.stop()
})
