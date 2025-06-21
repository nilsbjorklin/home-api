import { Type, type Static } from '@sinclair/typebox'
import { LinkSchema } from './Link.js'


const StationSchema = Type.Object({
  key: Type.String(),
  name: Type.String(),
  owner: Type.String(),
})

const ParameterSchema = Type.Object({
  key: Type.String(),
  name: Type.String(),
  summary: Type.String(),
  unit: Type.String(),
})

const PeriodSchema = Type.Object({
  key: Type.String(),
  summary: Type.String(),
})

export const DataResponseSchema = Type.Object({
  updated: Type.Number(),
  parameter: ParameterSchema,
  period: PeriodSchema,
  station: StationSchema,
  link: Type.Array(LinkSchema),
  value: Type.Array(Type.Object({
    value: Type.String(),
    quality: Type.String(),
  }))
})

export type DataResponse = Static<typeof DataResponseSchema> 