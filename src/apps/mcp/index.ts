import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { parse } from '@readme/openapi-parser'
import path from 'node:path'

const server = new McpServer({
  name: 'mcp-projeclyze.dev',
  version: '1.0.0',
})

const API_URL = process.env.API_URL || 'http://localhost:3000/api'


server.registerTool(
  'check-status-api',
  {
    description: 'Check the status of the API',
  },
  async () => {
    const response = await fetch(API_URL + '/status')
    return {
      content: [
        {
          type: 'text',
          text: `API status: ${response.status}`,
        },
      ],
    }
  },
)

try {
  ;(async () => {
    console.log('Server is running...')
    const openapiPath = path.join(__dirname, 'openapi.yml')
    console.log('Loading OpenAPI from:', openapiPath)
    const {paths} = await parse(openapiPath);
  
    const urls = Object.keys(paths ?? {});
  
    console.log('Available API endpoints:', urls);
  
    if (paths) {
      for (const url of urls) {
        const pathItem = paths[url];
        if (!pathItem) continue;
        const httpMethods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;
        for (const method of Object.keys(pathItem)) {
          if (!httpMethods.includes(method as typeof httpMethods[number])) continue;
          const operation = (pathItem as Record<string, any>)[method];
          if (!operation) continue;
          const summary = operation.summary || `Call the ${method.toUpperCase()} method on ${url}`;
          server.registerTool(
            `call-${method}${url.replace(/\//g, '-').replace(/{/g, '').replace(/}/g, '')}`,
            {
              description: summary,
            },
            async (args) => {
              const response = await fetch(API_URL + url, {
                method: method.toUpperCase(),
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(args),
              })
              const data = await response.json()
              return {
                content: [
                  {
                    type: 'text',
                    text: `Response from ${method.toUpperCase()} ${url}: ${JSON.stringify(data)}`,
                  },
                ],
              }
            },
          )
        }
      }
    }
  
    const transport = new StdioServerTransport()
    await server.connect(transport)
  })()
} catch (error) {
  console.error('Error starting the server:', error)
  process.exit(1)
}