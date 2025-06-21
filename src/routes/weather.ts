import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify'
import { getParameters, getParameter, getData } from '../service/smhiService.js';
import { getActiveStations, getAvailableParameters, getStationKey } from '../utils/smhiUtils.js';


export const weatherPlugin = (fastify: FastifyInstance, _opts: any, done: () => void): void => {
  fastify.withTypeProvider<TypeBoxTypeProvider>()
  .get('/temperature', {
    schema: {
      querystring: Type.Object({
        city: Type.String({ description: 'City name to get the weather for'})
      }),
      tags: ['Weather'],
      response: {
        200: Type.Object({
          station: Type.String(),
          parameter: Type.String(),
          value: Type.String(),
          quality: Type.String(),
        }),
        404: Type.Object({
          message: Type.String()
        })
      }
    }
  }, async (req, reply) => {
    const parameterKey = '19'
    const parameter = await getParameter(parameterKey)
    const stationKey = getStationKey(req.query.city, parameter)
    if(stationKey){
      const body = await getData(parameterKey,stationKey);
      fastify.log.info({body}, 'Response status and body:');
      reply.send({
        parameter: body.parameter.name +body.parameter.summary, 
        station: body.station.name, 
        value: body.value[0].value, 
        quality: body.value[0].quality
      });
    }
    else {
      reply.status(404).send({message: `No weather data found for city: ${req.query.city}`});
      return; 
    }
  });
  fastify.withTypeProvider<TypeBoxTypeProvider>()
  .get('/stations/:parameter', {
    schema: {
      tags: ['Weather'],
      params: Type.Object({
        parameter: Type.String({ description: 'Parameter key to filter stations by' })
      }),
      response: {
        200: Type.Record(Type.String(), Type.Object({name:Type.String(), summary:Type.String()}, {
          description: 'List of active weather stations'
      }))
      }
    }
  }, async (req, reply) => {
    const {parameter} = req.params
    reply.send(getActiveStations(await getParameter(parameter)));
  });
  fastify.withTypeProvider<TypeBoxTypeProvider>()
  .get('/parameters', {
    schema: {
      tags: ['Weather'],
      response: {
        200: Type.Record(Type.String(), Type.Object({title:Type.String(), summary:Type.String()}, {description: 'List of parameters available for weather data'}))
        }
      }
  }, async (req, reply) => {
    reply.send(getAvailableParameters(await getParameters()));
  });
  done()
}
