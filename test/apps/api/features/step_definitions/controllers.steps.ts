import assert from 'assert'
import request from 'supertest'
import { application } from './hooks.steps'
import { Given } from '@cucumber/cucumber'
import { Then } from '@cucumber/cucumber'

let _request: request.Test
let _response: request.Response

Given('I send a GET request to {string}', (route: string) => {
  _request = application.get(route)
})

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status)
})

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = application.put(route).send(JSON.parse(body))
})

Given('I send a POST request to {string} with body:', (route: string, body: string) => {
  _request = application.post(route).send(JSON.parse(body))
})

Given('I send a DELETE request to {string}', (route: string) => {
  _request = application.delete(route)
})

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {})
})

Then('the response content should be:', (response) => {
  assert.deepStrictEqual(_response.body, JSON.parse(response))
})

Then('the response body should be:', (response) => {
  assert.deepStrictEqual(_response.body, JSON.parse(response))
})
