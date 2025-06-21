import { Type } from "@fastify/type-provider-typebox";

export const LinkSchema = Type.Object({
  href: Type.String(),
  rel: Type.String(),
  type: Type.String()
})