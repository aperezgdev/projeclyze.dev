import 'dotenv/config'

import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection'

export const container = new ContainerBuilder()
const loader = new YamlFileLoader(container)
const env = process.env.ENV || 'test'

export const loadContainer = async () => {
  return new Promise<void>((resolve, reject) => {
    console.log(`${__dirname}/application${env != 'prod' ? '_' + env : ''}.yaml`)
    loader
      .load(`${__dirname}/application${env != 'prod' ? '_' + env : ''}.yaml`)
      .then(() => {
        resolve()
      })
  })
}
