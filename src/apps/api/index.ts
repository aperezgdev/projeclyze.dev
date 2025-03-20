import 'dotenv/config'
import { ApiServer } from './ApiServer'

const apiServer = new ApiServer()
apiServer.start()

export default apiServer
