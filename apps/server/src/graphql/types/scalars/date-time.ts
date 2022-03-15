import { asNexusMethod } from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import { GraphQLScalarType } from "graphql";

export const DateTime = asNexusMethod<GraphQLScalarType>(
  DateTimeResolver,
  "DateTime"
);
