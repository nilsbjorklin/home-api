import { Type, type Static } from '@sinclair/typebox'
import { LinkSchema } from './Link.js'

const GeoboxSchema = Type.Object({
  minLatitude: Type.Number(),
  maxLatitude: Type.Number(),
  minLongitude: Type.Number(),
  maxLongitude: Type.Number(),
})
const ResourceSchema = Type.Object({
  key: Type.String(),
  title: Type.String(),
  summary: Type.String(),
  link: Type.Array(LinkSchema),
  unit: Type.String(),
  geoBox: GeoboxSchema
})

const ParameterListResponseSchema = Type.Object({
  key: Type.String(),
  title: Type.String(),
  summary: Type.String(),
  link: Type.Array(LinkSchema),
  resource: Type.Array(ResourceSchema),
})

export type ParameterListResponse = Static<typeof ParameterListResponseSchema> 