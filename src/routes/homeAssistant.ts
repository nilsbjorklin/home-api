import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify'
import { alive, states } from '../service/homeAssistantService.js';
import { StatesResponseSchema } from '../models/homeAssistant/statesResponse.js';
import { filterScripts } from '../utils/homeAssistantUtils.js';


export const homeAssistantPlugin = (fastify: FastifyInstance, _opts: any, done: () => void): void => {
  fastify.withTypeProvider<TypeBoxTypeProvider>()
  .get('/', {
    schema: {
      tags: ['Home Assistant'],
      response: {
        200: Type.Boolean()
      }
    }
  }, async (req, reply) => {
    reply.send(await alive());
  });
  fastify.withTypeProvider<TypeBoxTypeProvider>()
  .get('/states', {
    schema: {
      tags: ['Home Assistant'],
      response: {
        200: StatesResponseSchema
      }
    }
  }, async (req, reply) => {
    const allStates = await states()
    reply.send(allStates);
  });
  fastify.withTypeProvider<TypeBoxTypeProvider>()
  .get('/states/scripts', {
    schema: {
      tags: ['Home Assistant'],
      response: {
        200: StatesResponseSchema
      }
    }
  }, async (req, reply) => {
    const allStates = await states()
    reply.send(filterScripts(allStates));
  });
  done()
}
