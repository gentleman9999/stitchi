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
  AllNewsletterIssuesFilter: { // input type
    first: number; // Int!
    skip?: number | null; // Int
  }
  QuoteGeneratePrintLocationInput: { // input type
    colorCount: number; // Int!
  }
  SubscriberCreateInput: { // input type
    email: string; // String!
  }
}

export interface NexusGenEnums {
  GlobalRole: "CUSTOMER" | "SUPERADMIN"
  MembershipRole: "OWNER"
  NewsletterIssueStatus: "ARCHIVED" | "CONFIRMED" | "DRAFT"
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
  Membership: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    organizationId: string; // String!
    role?: NexusGenEnums['MembershipRole'] | null; // MembershipRole
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userId: string; // String!
  }
  Mutation: {};
  Newsletter: {};
  NewsletterIssue: { // root type
    authorNames: Array<string | null>; // [String]!
    contentHtml: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    displayAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // ID!
    publishedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    slug: string; // String!
    status: NexusGenEnums['NewsletterIssueStatus']; // NewsletterIssueStatus!
    subtitle: string; // String!
    thumbnailUrl?: string | null; // String
    title: string; // String!
  }
  NewsletterIssueConnection: { // root type
    edges?: Array<NexusGenRootTypes['NewsletterIssueEdge'] | null> | null; // [NewsletterIssueEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  NewsletterIssueEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['NewsletterIssue'] | null; // NewsletterIssue
  }
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
  }
  PrintLocation: { // root type
    colorCount: number; // Int!
    totalCostInCents?: number | null; // Int
  }
  Product: { // root type
    id: string; // ID!
  }
  Query: {};
  Quote: { // root type
    id: string; // ID!
    printLocationCount: number; // Int!
    printLocations: NexusGenRootTypes['PrintLocation'][]; // [PrintLocation!]!
    productTotalCostCents: number; // Int!
    productUnitCostCents: number; // Int!
  }
  Subscriber: { // root type
    email: string; // String!
    id: string; // String!
  }
  SubscriberCreatePayload: { // root type
    subscriber?: NexusGenRootTypes['Subscriber'] | null; // Subscriber
  }
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
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
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
    subscriberCreate: NexusGenRootTypes['SubscriberCreatePayload'] | null; // SubscriberCreatePayload
    userBoostrap: NexusGenRootTypes['User'] | null; // User
  }
  Newsletter: { // field return type
    allNewsletterIssues: NexusGenRootTypes['NewsletterIssueConnection'] | null; // NewsletterIssueConnection
    newsletterIssue: NexusGenRootTypes['NewsletterIssue']; // NewsletterIssue!
  }
  NewsletterIssue: { // field return type
    authorNames: Array<string | null>; // [String]!
    contentHtml: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    displayAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // ID!
    publishedAt: NexusGenScalars['DateTime'] | null; // DateTime
    slug: string; // String!
    status: NexusGenEnums['NewsletterIssueStatus']; // NewsletterIssueStatus!
    subtitle: string; // String!
    thumbnailUrl: string | null; // String
    title: string; // String!
  }
  NewsletterIssueConnection: { // field return type
    edges: Array<NexusGenRootTypes['NewsletterIssueEdge'] | null> | null; // [NewsletterIssueEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  NewsletterIssueEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['NewsletterIssue'] | null; // NewsletterIssue
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
  }
  PrintLocation: { // field return type
    colorCount: number; // Int!
    totalCostInCents: number | null; // Int
  }
  Product: { // field return type
    id: string; // ID!
    priceCents: number; // Int!
  }
  Query: { // field return type
    newsletter: NexusGenRootTypes['Newsletter'] | null; // Newsletter
    quoteGenerate: NexusGenRootTypes['Quote'] | null; // Quote
    viewer: NexusGenRootTypes['Membership'] | null; // Membership
  }
  Quote: { // field return type
    id: string; // ID!
    printLocationCount: number; // Int!
    printLocations: NexusGenRootTypes['PrintLocation'][]; // [PrintLocation!]!
    productTotalCostCents: number; // Int!
    productUnitCostCents: number; // Int!
  }
  Subscriber: { // field return type
    email: string; // String!
    id: string; // String!
  }
  SubscriberCreatePayload: { // field return type
    subscriber: NexusGenRootTypes['Subscriber'] | null; // Subscriber
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
}

export interface NexusGenFieldTypeNames {
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
    subscriberCreate: 'SubscriberCreatePayload'
    userBoostrap: 'User'
  }
  Newsletter: { // field return type name
    allNewsletterIssues: 'NewsletterIssueConnection'
    newsletterIssue: 'NewsletterIssue'
  }
  NewsletterIssue: { // field return type name
    authorNames: 'String'
    contentHtml: 'String'
    createdAt: 'DateTime'
    displayAt: 'DateTime'
    id: 'ID'
    publishedAt: 'DateTime'
    slug: 'String'
    status: 'NewsletterIssueStatus'
    subtitle: 'String'
    thumbnailUrl: 'String'
    title: 'String'
  }
  NewsletterIssueConnection: { // field return type name
    edges: 'NewsletterIssueEdge'
    pageInfo: 'PageInfo'
  }
  NewsletterIssueEdge: { // field return type name
    cursor: 'String'
    node: 'NewsletterIssue'
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
  }
  PrintLocation: { // field return type name
    colorCount: 'Int'
    totalCostInCents: 'Int'
  }
  Product: { // field return type name
    id: 'ID'
    priceCents: 'Int'
  }
  Query: { // field return type name
    newsletter: 'Newsletter'
    quoteGenerate: 'Quote'
    viewer: 'Membership'
  }
  Quote: { // field return type name
    id: 'ID'
    printLocationCount: 'Int'
    printLocations: 'PrintLocation'
    productTotalCostCents: 'Int'
    productUnitCostCents: 'Int'
  }
  Subscriber: { // field return type name
    email: 'String'
    id: 'String'
  }
  SubscriberCreatePayload: { // field return type name
    subscriber: 'Subscriber'
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
}

export interface NexusGenArgTypes {
  Mutation: {
    subscriberCreate: { // args
      input: NexusGenInputs['SubscriberCreateInput']; // SubscriberCreateInput!
    }
  }
  Newsletter: {
    allNewsletterIssues: { // args
      after?: string | null; // String
      first: number; // Int!
    }
    newsletterIssue: { // args
      slug: string; // String!
    }
  }
  Query: {
    quoteGenerate: { // args
      catalogProductVariantId: number; // Int!
      includeFulfillment?: boolean | null; // Boolean
      printLocations: NexusGenInputs['QuoteGeneratePrintLocationInput'][]; // [QuoteGeneratePrintLocationInput!]!
      quantity: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

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