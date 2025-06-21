import {fastify} from 'fastify'
import swagger from '@fastify/swagger'
import swaggerui from '@fastify/swagger-ui'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { weatherPlugin } from './routes/weather.js'
import 'dotenv/config'

const server = fastify({logger:true}).withTypeProvider<TypeBoxTypeProvider>()
await server.register(swagger, {
  openapi: {
    info: {
      title: 'Home api',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
  }
})

await server.register(swaggerui, {
  routePrefix: '/api_docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
})

await server.register(weatherPlugin, {prefix: '/weather'})

await server.listen({ port: Number(process.env.PORT || 3000),  host: '0.0.0.0'}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
export const logger = server.log;