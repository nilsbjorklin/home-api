import { Type, type Static } from '@sinclair/typebox'

const ContextSchema = Type.Object({
  id: Type.String(),
  parent_id: Type.Union([Type.String(), Type.Null()]),
  user_id: Type.Union([Type.String(), Type.Null()]),
})
const AttributesSchema = Type.Record(Type.String(), Type.Any())
const StateSchema = Type.Object({
  entity_id: Type.String(),
  state: Type.String(),
  attributes: AttributesSchema,
  last_changed: Type.String(),
  last_reported: Type.String(),
  last_updated: Type.String(),
  context: ContextSchema
})

export const StatesResponseSchema = Type.Array(StateSchema)

export type StatesResponse = Static<typeof StatesResponseSchema> 