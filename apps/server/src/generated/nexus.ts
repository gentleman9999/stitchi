/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { core, connectionPluginCore } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    DateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    DateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  GlobalRole: "CUSTOMER" | "SUPERADMIN"
  MembershipRole: "OWNER"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Catalog: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  CatalogProduct: { // root type
    catalogId: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    isActive: boolean; // Boolean!
    manufacturerId: string; // String!
    name: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    vendorId?: string | null; // String
  }
  CatalogProductConnection: { // root type
    edges?: Array<NexusGenRootTypes['CatalogProductEdge'] | null> | null; // [CatalogProductEdge]
    nodes?: Array<NexusGenRootTypes['CatalogProduct'] | null> | null; // [CatalogProduct]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  CatalogProductEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['CatalogProduct'] | null; // CatalogProduct
  }
  Manufacturer: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    name: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Membership: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    organizationId: string; // String!
    role?: NexusGenEnums['MembershipRole'] | null; // MembershipRole
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userId: string; // String!
  }
  Mutation: {};
  Organization: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    name?: string | null; // String
    role?: NexusGenEnums['GlobalRole'] | null; // GlobalRole
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor?: string | null; // String
  }
  Query: {};
  User: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    email?: string | null; // String
    emailVerified?: boolean | null; // Boolean
    familyName?: string | null; // String
    givenName?: string | null; // String
    id?: string | null; // ID
    lastLogin?: NexusGenScalars['DateTime'] | null; // DateTime
    loginsCount?: number | null; // Int
    name?: string | null; // String
    nickname?: string | null; // String
    phoneNumber?: string | null; // String
    phoneVerified?: boolean | null; // Boolean
    picture?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    username?: string | null; // String
  }
  Vendor: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    name: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Catalog: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    product: NexusGenRootTypes['CatalogProduct'] | null; // CatalogProduct
    products: NexusGenRootTypes['CatalogProductConnection'] | null; // CatalogProductConnection
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  CatalogProduct: { // field return type
    catalog: NexusGenRootTypes['Catalog'] | null; // Catalog
    catalogId: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    isActive: boolean; // Boolean!
    manufacturer: NexusGenRootTypes['Manufacturer'] | null; // Manufacturer
    manufacturerId: string; // String!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    vendor: NexusGenRootTypes['Vendor'] | null; // Vendor
    vendorId: string | null; // String
  }
  CatalogProductConnection: { // field return type
    edges: Array<NexusGenRootTypes['CatalogProductEdge'] | null> | null; // [CatalogProductEdge]
    nodes: Array<NexusGenRootTypes['CatalogProduct'] | null> | null; // [CatalogProduct]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  CatalogProductEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['CatalogProduct'] | null; // CatalogProduct
  }
  Manufacturer: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Membership: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    organization: NexusGenRootTypes['Organization'] | null; // Organization
    organizationId: string; // String!
    role: NexusGenEnums['MembershipRole'] | null; // MembershipRole
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    user: NexusGenRootTypes['User'] | null; // User
    userId: string; // String!
  }
  Mutation: { // field return type
    userBoostrap: NexusGenRootTypes['User'] | null; // User
  }
  Organization: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    memberships: Array<NexusGenRootTypes['Membership'] | null> | null; // [Membership]
    name: string | null; // String
    role: NexusGenEnums['GlobalRole'] | null; // GlobalRole
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Query: { // field return type
    catalog: NexusGenRootTypes['Catalog'] | null; // Catalog
    viewer: NexusGenRootTypes['Membership'] | null; // Membership
  }
  User: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    email: string | null; // String
    emailVerified: boolean | null; // Boolean
    familyName: string | null; // String
    givenName: string | null; // String
    id: string | null; // ID
    lastLogin: NexusGenScalars['DateTime'] | null; // DateTime
    loginsCount: number | null; // Int
    name: string | null; // String
    nickname: string | null; // String
    phoneNumber: string | null; // String
    phoneVerified: boolean | null; // Boolean
    picture: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    username: string | null; // String
  }
  Vendor: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
}

export interface NexusGenFieldTypeNames {
  Catalog: { // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    product: 'CatalogProduct'
    products: 'CatalogProductConnection'
    updatedAt: 'DateTime'
  }
  CatalogProduct: { // field return type name
    catalog: 'Catalog'
    catalogId: 'String'
    createdAt: 'DateTime'
    id: 'ID'
    isActive: 'Boolean'
    manufacturer: 'Manufacturer'
    manufacturerId: 'String'
    name: 'String'
    updatedAt: 'DateTime'
    vendor: 'Vendor'
    vendorId: 'String'
  }
  CatalogProductConnection: { // field return type name
    edges: 'CatalogProductEdge'
    nodes: 'CatalogProduct'
    pageInfo: 'PageInfo'
  }
  CatalogProductEdge: { // field return type name
    cursor: 'String'
    node: 'CatalogProduct'
  }
  Manufacturer: { // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    name: 'String'
    updatedAt: 'DateTime'
  }
  Membership: { // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    organization: 'Organization'
    organizationId: 'String'
    role: 'MembershipRole'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
  }
  Mutation: { // field return type name
    userBoostrap: 'User'
  }
  Organization: { // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    memberships: 'Membership'
    name: 'String'
    role: 'GlobalRole'
    updatedAt: 'DateTime'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Query: { // field return type name
    catalog: 'Catalog'
    viewer: 'Membership'
  }
  User: { // field return type name
    createdAt: 'DateTime'
    email: 'String'
    emailVerified: 'Boolean'
    familyName: 'String'
    givenName: 'String'
    id: 'ID'
    lastLogin: 'DateTime'
    loginsCount: 'Int'
    name: 'String'
    nickname: 'String'
    phoneNumber: 'String'
    phoneVerified: 'Boolean'
    picture: 'String'
    updatedAt: 'DateTime'
    username: 'String'
  }
  Vendor: { // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    name: 'String'
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Catalog: {
    product: { // args
      id: string; // ID!
    }
    products: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}