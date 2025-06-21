import { Type, type Static } from '@sinclair/typebox'

const LinkSchema = Type.Object({
  href: Type.String(),
  rel: Type.String(),
  type: Type.String()
})
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

const ParameterSpecSchema = Type.Object({
  key: Type.String(),
  title: Type.String(),
  summary: Type.String(),
  link: Type.Array(LinkSchema),
  resources: Type.Array(ResourceSchema),
})

export type ParameterSpec = Static<typeof ParameterSpecSchema> 

const ParameterSchema = Type.Object({
    name: Type.String(),
    levelType: Type.String(),
    level: Type.Number(),
    unit: Type.String(),
    values: Type.Array(Type.Number()),
  })
  
  export type Parameter = Static<typeof ParameterSchema> 

const CoordinateSchema = Type.Array(Type.Number())
  
export type Coordinate = Static<typeof CoordinateSchema> 

const PointSchema = Type.Object({
    type: Type.String(),
    coordinates: Type.Array(CoordinateSchema),
  })
  
export type Point = Static<typeof PointSchema> 

const DataResponseSchema = Type.Object({
    approvedTime: Type.String(),
    referenceTime: Type.String(),
    geometry: PointSchema,
    timeSeries: Type.Array(Type.Object({
      validTime: Type.String(),
      parameters: Type.Array(ParameterSchema)
    }))
  })
  
  export type DataResponse = Static<typeof DataResponseSchema> 