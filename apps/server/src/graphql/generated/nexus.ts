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
  Filter: { // input type
    eq?: string | null; // String
    in?: Array<string | null> | null; // [String]
  }
  MaterialFilterArg: { // input type
    categoryId?: NexusGenInputs['Filter'] | null; // Filter
  }
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
  Category: { // root type
    catalogId: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    name: string; // String!
    parentCategoryId?: string | null; // String
    slug: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Color: { // root type
    colorCategoryId?: string | null; // String
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    hex?: string | null; // String
    id: string; // ID!
    name?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  ColorCategory: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    hex?: string | null; // String
    id: string; // ID!
    name: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Image: { // root type
    height: number; // Int!
    id: string; // ID!
    url: string; // String!
    width: number; // Int!
  }
  Manufacturer: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    name: string; // String!
    slug: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Material: { // root type
    catalogId: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    imageId?: string | null; // String
    isActive: boolean; // Boolean!
    manufacturerId: string; // String!
    name: string; // String!
    primaryVendorId?: string | null; // String
    style: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  MaterialConnection: { // root type
    edges?: Array<NexusGenRootTypes['MaterialEdge'] | null> | null; // [MaterialEdge]
    nodes?: Array<NexusGenRootTypes['Material'] | null> | null; // [Material]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  MaterialEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['Material'] | null; // Material
  }
  MaterialVariant: { // root type
    colorId?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    gtin: string; // String!
    id: string; // ID!
    isActive: boolean; // Boolean!
    materialId: string; // String!
    sizeId?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    vendorId: string; // String!
    vendorPartNumber: string; // String!
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
  Size: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // ID!
    name?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    value: string; // String!
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
    categories: NexusGenRootTypes['Category'][] | null; // [Category!]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    product: NexusGenRootTypes['Material'] | null; // Material
    products: NexusGenRootTypes['MaterialConnection'] | null; // MaterialConnection
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Category: { // field return type
    breadcrumbs: NexusGenRootTypes['Category'][] | null; // [Category!]
    catalogId: string; // String!
    children: NexusGenRootTypes['Category'][] | null; // [Category!]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    name: string; // String!
    parentCategoryId: string | null; // String
    slug: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Color: { // field return type
    category: NexusGenRootTypes['ColorCategory'] | null; // ColorCategory
    colorCategoryId: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    hex: string | null; // String
    id: string; // ID!
    name: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  ColorCategory: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    hex: string | null; // String
    id: string; // ID!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Image: { // field return type
    height: number; // Int!
    id: string; // ID!
    url: string; // String!
    width: number; // Int!
  }
  Manufacturer: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    name: string; // String!
    slug: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Material: { // field return type
    catalog: NexusGenRootTypes['Catalog'] | null; // Catalog
    catalogId: string; // String!
    categories: NexusGenRootTypes['Category'][] | null; // [Category!]
    colors: NexusGenRootTypes['Color'][] | null; // [Color!]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    image: NexusGenRootTypes['Image'] | null; // Image
    imageId: string | null; // String
    isActive: boolean; // Boolean!
    manufacturer: NexusGenRootTypes['Manufacturer'] | null; // Manufacturer
    manufacturerId: string; // String!
    name: string; // String!
    primaryVendorId: string | null; // String
    sizes: NexusGenRootTypes['Size'][] | null; // [Size!]
    style: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    variantCount: number; // Int!
    variants: NexusGenRootTypes['MaterialVariant'][] | null; // [MaterialVariant!]
    vendor: NexusGenRootTypes['Vendor'] | null; // Vendor
  }
  MaterialConnection: { // field return type
    edges: Array<NexusGenRootTypes['MaterialEdge'] | null> | null; // [MaterialEdge]
    nodes: Array<NexusGenRootTypes['Material'] | null> | null; // [Material]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  MaterialEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Material'] | null; // Material
  }
  MaterialVariant: { // field return type
    color: NexusGenRootTypes['Color'] | null; // Color
    colorId: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    gtin: string; // String!
    id: string; // ID!
    images: NexusGenRootTypes['Image'][] | null; // [Image!]
    isActive: boolean; // Boolean!
    material: NexusGenRootTypes['Material'] | null; // Material
    materialId: string; // String!
    sizeId: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    vendor: NexusGenRootTypes['Vendor'] | null; // Vendor
    vendorId: string; // String!
    vendorPartNumber: string; // String!
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
  Size: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // ID!
    name: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    value: string; // String!
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
    categories: 'Category'
    createdAt: 'DateTime'
    id: 'ID'
    product: 'Material'
    products: 'MaterialConnection'
    updatedAt: 'DateTime'
  }
  Category: { // field return type name
    breadcrumbs: 'Category'
    catalogId: 'String'
    children: 'Category'
    createdAt: 'DateTime'
    id: 'ID'
    name: 'String'
    parentCategoryId: 'String'
    slug: 'String'
    updatedAt: 'DateTime'
  }
  Color: { // field return type name
    category: 'ColorCategory'
    colorCategoryId: 'String'
    createdAt: 'DateTime'
    hex: 'String'
    id: 'ID'
    name: 'String'
    updatedAt: 'DateTime'
  }
  ColorCategory: { // field return type name
    createdAt: 'DateTime'
    hex: 'String'
    id: 'ID'
    name: 'String'
    updatedAt: 'DateTime'
  }
  Image: { // field return type name
    height: 'Int'
    id: 'ID'
    url: 'String'
    width: 'Int'
  }
  Manufacturer: { // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    name: 'String'
    slug: 'String'
    updatedAt: 'DateTime'
  }
  Material: { // field return type name
    catalog: 'Catalog'
    catalogId: 'String'
    categories: 'Category'
    colors: 'Color'
    createdAt: 'DateTime'
    id: 'ID'
    image: 'Image'
    imageId: 'String'
    isActive: 'Boolean'
    manufacturer: 'Manufacturer'
    manufacturerId: 'String'
    name: 'String'
    primaryVendorId: 'String'
    sizes: 'Size'
    style: 'String'
    updatedAt: 'DateTime'
    variantCount: 'Int'
    variants: 'MaterialVariant'
    vendor: 'Vendor'
  }
  MaterialConnection: { // field return type name
    edges: 'MaterialEdge'
    nodes: 'Material'
    pageInfo: 'PageInfo'
  }
  MaterialEdge: { // field return type name
    cursor: 'String'
    node: 'Material'
  }
  MaterialVariant: { // field return type name
    color: 'Color'
    colorId: 'String'
    createdAt: 'DateTime'
    gtin: 'String'
    id: 'ID'
    images: 'Image'
    isActive: 'Boolean'
    material: 'Material'
    materialId: 'String'
    sizeId: 'String'
    updatedAt: 'DateTime'
    vendor: 'Vendor'
    vendorId: 'String'
    vendorPartNumber: 'String'
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
  Size: { // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    name: 'String'
    updatedAt: 'DateTime'
    value: 'String'
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
      filter: NexusGenInputs['MaterialFilterArg'] | null; // MaterialFilterArg
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