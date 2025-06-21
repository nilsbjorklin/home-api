import { Type, type Static } from '@sinclair/typebox'

const StationSchema = Type.Object({
  key: Type.String(),
  summary: Type.String(),
  name: Type.String(),
  active: Type.Boolean(),
})

const ParameterResponseSchema = Type.Object({
  station: Type.Array(StationSchema),
})

export type ParameterResponse = Static<typeof ParameterResponseSchema> 