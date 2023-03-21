/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query CompanyPageGetData($companySlug: String!) {\n    company: glossaryEntry(filter: { slug: { eq: $companySlug } }) {\n      id\n      term\n      definition\n      businessUrl\n      affiliateUrl\n      description {\n        ...CmsStructuredTextGlossaryDescription\n      }\n      primaryImage {\n        id\n        responsiveImage {\n          ...CmsImage\n        }\n      }\n    }\n  }\n": types.CompanyPageGetDataDocument,
    "\n  fragment DirectoryIndexPageQuery on Query {\n    directory: allGlossaryEntries(first: $first, skip: $skip, filter: $filter) {\n      id\n      ...CompanyCardCompany\n    }\n\n    directoryMetadata: _allGlossaryEntriesMeta(filter: $filter) {\n      count\n    }\n  }\n": types.DirectoryIndexPageQueryFragmentDoc,
    "\n  fragment FilterDialogDirectoryGategoriesFragment on GlossaryCategoryRecord {\n    id\n    title\n    description\n    children {\n      id\n      title\n      description\n    }\n  }\n": types.FilterDialogDirectoryGategoriesFragmentFragmentDoc,
    "\n  query DirectoryFiltersData {\n    featuredCategories: allGlossaryCategories(\n      first: 5\n      filter: { parent: { eq: 147376160 } }\n    ) {\n      id\n      slug\n      title\n    }\n\n    topLevelCategories: allGlossaryCategories(\n      filter: { parent: { exists: false } }\n    ) {\n      id\n      slug\n      title\n      children {\n        id\n        slug\n        title\n      }\n      ...FilterDialogDirectoryGategoriesFragment\n    }\n  }\n": types.DirectoryFiltersDataDocument,
    "\n  query GetFilterPreview($filter: GlossaryEntryModelFilter) {\n    _allGlossaryEntriesMeta(filter: $filter) {\n      count\n    }\n  }\n": types.GetFilterPreviewDocument,
    "\n  query DirectoryIndexPageGetData(\n  $first: IntType\n  $skip: IntType\n  $filter: GlossaryEntryModelFilter\n) {\n  ...DirectoryIndexPageQuery\n  }\n": types.DirectoryIndexPageGetDataDocument,
    "\n  fragment CmsImage on ResponsiveImage {\n    srcSet\n    webpSrcSet\n    sizes\n    src\n    width\n    height\n    aspectRatio\n    alt\n    title\n    base64\n  }\n": types.CmsImageFragmentDoc,
    "\n  fragment CmsStructuredTextGlossaryDescription on GlossaryEntryModelDescriptionField {\n    value\n    blocks {\n      id\n      ... on ImageRecord {\n        ...CmsStructuredTextImageRecord\n      }\n    }\n    links {\n      ... on ArticleRecord {\n        id\n        slug\n        title\n      }\n      ... on GlossaryEntryRecord {\n        id\n        slug\n        term\n      }\n    }\n  }\n": types.CmsStructuredTextGlossaryDescriptionFragmentDoc,
    "\n  fragment CmsStructuredTextImageRecord on ImageRecord {\n    id\n    image {\n      id\n      responsiveImage {\n        ...CmsImage\n      }\n    }\n  }\n": types.CmsStructuredTextImageRecordFragmentDoc,
    "\n  fragment CompanyCardCompany on GlossaryEntryRecord {\n    id\n    slug\n    name: term\n    definition\n    primaryImage {\n      id\n      responsiveImage {\n        ...CmsImage\n      }\n    }\n  }\n": types.CompanyCardCompanyFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CompanyPageGetData($companySlug: String!) {\n    company: glossaryEntry(filter: { slug: { eq: $companySlug } }) {\n      id\n      term\n      definition\n      businessUrl\n      affiliateUrl\n      description {\n        ...CmsStructuredTextGlossaryDescription\n      }\n      primaryImage {\n        id\n        responsiveImage {\n          ...CmsImage\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CompanyPageGetData($companySlug: String!) {\n    company: glossaryEntry(filter: { slug: { eq: $companySlug } }) {\n      id\n      term\n      definition\n      businessUrl\n      affiliateUrl\n      description {\n        ...CmsStructuredTextGlossaryDescription\n      }\n      primaryImage {\n        id\n        responsiveImage {\n          ...CmsImage\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DirectoryIndexPageQuery on Query {\n    directory: allGlossaryEntries(first: $first, skip: $skip, filter: $filter) {\n      id\n      ...CompanyCardCompany\n    }\n\n    directoryMetadata: _allGlossaryEntriesMeta(filter: $filter) {\n      count\n    }\n  }\n"): (typeof documents)["\n  fragment DirectoryIndexPageQuery on Query {\n    directory: allGlossaryEntries(first: $first, skip: $skip, filter: $filter) {\n      id\n      ...CompanyCardCompany\n    }\n\n    directoryMetadata: _allGlossaryEntriesMeta(filter: $filter) {\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment FilterDialogDirectoryGategoriesFragment on GlossaryCategoryRecord {\n    id\n    title\n    description\n    children {\n      id\n      title\n      description\n    }\n  }\n"): (typeof documents)["\n  fragment FilterDialogDirectoryGategoriesFragment on GlossaryCategoryRecord {\n    id\n    title\n    description\n    children {\n      id\n      title\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query DirectoryFiltersData {\n    featuredCategories: allGlossaryCategories(\n      first: 5\n      filter: { parent: { eq: 147376160 } }\n    ) {\n      id\n      slug\n      title\n    }\n\n    topLevelCategories: allGlossaryCategories(\n      filter: { parent: { exists: false } }\n    ) {\n      id\n      slug\n      title\n      children {\n        id\n        slug\n        title\n      }\n      ...FilterDialogDirectoryGategoriesFragment\n    }\n  }\n"): (typeof documents)["\n  query DirectoryFiltersData {\n    featuredCategories: allGlossaryCategories(\n      first: 5\n      filter: { parent: { eq: 147376160 } }\n    ) {\n      id\n      slug\n      title\n    }\n\n    topLevelCategories: allGlossaryCategories(\n      filter: { parent: { exists: false } }\n    ) {\n      id\n      slug\n      title\n      children {\n        id\n        slug\n        title\n      }\n      ...FilterDialogDirectoryGategoriesFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFilterPreview($filter: GlossaryEntryModelFilter) {\n    _allGlossaryEntriesMeta(filter: $filter) {\n      count\n    }\n  }\n"): (typeof documents)["\n  query GetFilterPreview($filter: GlossaryEntryModelFilter) {\n    _allGlossaryEntriesMeta(filter: $filter) {\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query DirectoryIndexPageGetData(\n  $first: IntType\n  $skip: IntType\n  $filter: GlossaryEntryModelFilter\n) {\n  ...DirectoryIndexPageQuery\n  }\n"): (typeof documents)["\n  query DirectoryIndexPageGetData(\n  $first: IntType\n  $skip: IntType\n  $filter: GlossaryEntryModelFilter\n) {\n  ...DirectoryIndexPageQuery\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CmsImage on ResponsiveImage {\n    srcSet\n    webpSrcSet\n    sizes\n    src\n    width\n    height\n    aspectRatio\n    alt\n    title\n    base64\n  }\n"): (typeof documents)["\n  fragment CmsImage on ResponsiveImage {\n    srcSet\n    webpSrcSet\n    sizes\n    src\n    width\n    height\n    aspectRatio\n    alt\n    title\n    base64\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CmsStructuredTextGlossaryDescription on GlossaryEntryModelDescriptionField {\n    value\n    blocks {\n      id\n      ... on ImageRecord {\n        ...CmsStructuredTextImageRecord\n      }\n    }\n    links {\n      ... on ArticleRecord {\n        id\n        slug\n        title\n      }\n      ... on GlossaryEntryRecord {\n        id\n        slug\n        term\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CmsStructuredTextGlossaryDescription on GlossaryEntryModelDescriptionField {\n    value\n    blocks {\n      id\n      ... on ImageRecord {\n        ...CmsStructuredTextImageRecord\n      }\n    }\n    links {\n      ... on ArticleRecord {\n        id\n        slug\n        title\n      }\n      ... on GlossaryEntryRecord {\n        id\n        slug\n        term\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CmsStructuredTextImageRecord on ImageRecord {\n    id\n    image {\n      id\n      responsiveImage {\n        ...CmsImage\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CmsStructuredTextImageRecord on ImageRecord {\n    id\n    image {\n      id\n      responsiveImage {\n        ...CmsImage\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CompanyCardCompany on GlossaryEntryRecord {\n    id\n    slug\n    name: term\n    definition\n    primaryImage {\n      id\n      responsiveImage {\n        ...CmsImage\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CompanyCardCompany on GlossaryEntryRecord {\n    id\n    slug\n    name: term\n    definition\n    primaryImage {\n      id\n      responsiveImage {\n        ...CmsImage\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;