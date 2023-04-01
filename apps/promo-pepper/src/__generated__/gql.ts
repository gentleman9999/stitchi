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
    "\n  query CompanyPageGetData($companySlug: String!) {\n    company: glossaryEntry(filter: { slug: { eq: $companySlug } }) {\n      id\n      term\n      definition\n      businessUrl\n      affiliateUrl\n      description {\n        value\n        ...CmsStructuredTextGlossaryDescription\n      }\n      primaryImage {\n        id\n        responsiveImage {\n          ...CmsImage\n        }\n      }\n    }\n  }\n": types.CompanyPageGetDataDocument,
    "\n  fragment CompanyCardCompany on GlossaryEntryRecord {\n    id\n    slug\n    name: term\n    definition\n    primaryImage {\n      id\n      responsiveImage {\n        ...CmsImage\n      }\n    }\n  }\n": types.CompanyCardCompanyFragmentDoc,
    "\n  fragment CompanyCardGridCompany on GlossaryEntryRecord {\n    id\n    ...CompanyCardCompany\n  }\n": types.CompanyCardGridCompanyFragmentDoc,
    "\n  query DirectoryIndexPageGetData(\n    $first: IntType\n    $skip: IntType\n    $filter: GlossaryEntryModelFilter\n  ) {\n    directory: allGlossaryEntries(first: $first, skip: $skip, filter: $filter) {\n      id\n      ...CompanyCardGridCompany\n    }\n\n    directoryMetadata: _allGlossaryEntriesMeta(filter: $filter) {\n      count\n    }\n  }\n": types.DirectoryIndexPageGetDataDocument,
    "\n  fragment FilterDialogDirectoryGategoriesFragment on GlossaryCategoryRecord {\n    id\n    title\n    description\n    children {\n      id\n      title\n      description\n    }\n  }\n": types.FilterDialogDirectoryGategoriesFragmentFragmentDoc,
    "\n  query DirectoryFiltersData {\n    featuredCategories: allGlossaryCategories(\n      first: 5\n      filter: { parent: { eq: 147376160 } }\n    ) {\n      id\n      slug\n      title\n    }\n\n    topLevelCategories: allGlossaryCategories(\n      filter: { parent: { exists: false } }\n    ) {\n      id\n      slug\n      title\n      children {\n        id\n        slug\n        title\n      }\n      ...FilterDialogDirectoryGategoriesFragment\n    }\n  }\n": types.DirectoryFiltersDataDocument,
    "\n  query GetFilterPreview($filter: GlossaryEntryModelFilter) {\n    _allGlossaryEntriesMeta(filter: $filter) {\n      count\n    }\n  }\n": types.GetFilterPreviewDocument,
    "\n  query GetCategoryPageData($filter: GlossaryCategoryModelFilter) {\n    glossaryCategory(filter: $filter) {\n      id\n      title\n      description\n      parent {\n        id\n      }\n    }\n  }\n": types.GetCategoryPageDataDocument,
    "\n  fragment IssueCardIssue on NewsletterIssue {\n    id\n    slug\n    title\n    subtitle\n    thumbnailUrl\n    authorNames\n    createdAt\n    publishedAt\n  }\n": types.IssueCardIssueFragmentDoc,
    "\n    query GetNewsletterIssueData($slug: String!) {\n        newsletter {\n            newsletterIssue(slug: $slug) {\n                id\n                title\n                subtitle\n                thumbnailUrl\n                contentHtml\n            }\n        }\n    }\n": types.GetNewsletterIssueDataDocument,
    "\n    query GetNewsletterIssuesData($first: Int!, $after: String) {\n        newsletter {\n            allNewsletterIssues(first: $first, after: $after) {\n                nodes {\n                    id\n                   ...IssueCardIssue\n                }\n                \n            }\n        }\n    }\n": types.GetNewsletterIssuesDataDocument,
    "\n  fragment GlossaryCategoryFragment on GlossaryCategoryRecord {\n    id\n    slug\n    children {\n      id\n      title\n      slug\n    }\n  }\n": types.GlossaryCategoryFragmentFragmentDoc,
    "\n  query GetHomePageData {\n    newsletter {\n      allNewsletterIssues(first: 4) {\n        nodes {\n          id\n          slug\n          title\n          subtitle\n          thumbnailUrl\n        }\n      }\n    }\n    featuredCategories: glossaryCategory(filter: { id: { eq: \"147376160\" } }) {\n      id\n      ...GlossaryCategoryFragment\n    }\n    supplyChainCategories: glossaryCategory(\n      filter: { id: { eq: \"146755585\" } }\n    ) {\n      id\n      ...GlossaryCategoryFragment\n    }\n    productTypeCategories: glossaryCategory(\n      filter: { id: { eq: \"146755607\" } }\n    ) {\n      id\n      ...GlossaryCategoryFragment\n    }\n  }\n": types.GetHomePageDataDocument,
    "\n  fragment CmsImage on ResponsiveImage {\n    srcSet\n    webpSrcSet\n    sizes\n    src\n    width\n    height\n    aspectRatio\n    alt\n    title\n    base64\n  }\n": types.CmsImageFragmentDoc,
    "\n  fragment CmsStructuredTextGlossaryDescription on GlossaryEntryModelDescriptionField {\n    __typename\n    value\n    blocks {\n      id\n      ... on ImageRecord {\n        ...CmsStructuredTextImageRecord\n      }\n    }\n    links {\n      ... on ArticleRecord {\n        id\n        slug\n        title\n      }\n      ... on GlossaryEntryRecord {\n        id\n        slug\n        term\n      }\n    }\n  }\n": types.CmsStructuredTextGlossaryDescriptionFragmentDoc,
    "\n  fragment CmsStructuredTextImageRecord on ImageRecord {\n    id\n    image {\n      id\n      responsiveImage {\n        ...CmsImage\n      }\n    }\n  }\n": types.CmsStructuredTextImageRecordFragmentDoc,
    "\n  mutation UseNewsletterSubscribe($email: String!) {\n    subscriberCreate(input: { email: $email }) {\n      subscriber {\n        id\n      }\n    }\n  }\n": types.UseNewsletterSubscribeDocument,
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
export function gql(source: "\n  query CompanyPageGetData($companySlug: String!) {\n    company: glossaryEntry(filter: { slug: { eq: $companySlug } }) {\n      id\n      term\n      definition\n      businessUrl\n      affiliateUrl\n      description {\n        value\n        ...CmsStructuredTextGlossaryDescription\n      }\n      primaryImage {\n        id\n        responsiveImage {\n          ...CmsImage\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CompanyPageGetData($companySlug: String!) {\n    company: glossaryEntry(filter: { slug: { eq: $companySlug } }) {\n      id\n      term\n      definition\n      businessUrl\n      affiliateUrl\n      description {\n        value\n        ...CmsStructuredTextGlossaryDescription\n      }\n      primaryImage {\n        id\n        responsiveImage {\n          ...CmsImage\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CompanyCardCompany on GlossaryEntryRecord {\n    id\n    slug\n    name: term\n    definition\n    primaryImage {\n      id\n      responsiveImage {\n        ...CmsImage\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CompanyCardCompany on GlossaryEntryRecord {\n    id\n    slug\n    name: term\n    definition\n    primaryImage {\n      id\n      responsiveImage {\n        ...CmsImage\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CompanyCardGridCompany on GlossaryEntryRecord {\n    id\n    ...CompanyCardCompany\n  }\n"): (typeof documents)["\n  fragment CompanyCardGridCompany on GlossaryEntryRecord {\n    id\n    ...CompanyCardCompany\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query DirectoryIndexPageGetData(\n    $first: IntType\n    $skip: IntType\n    $filter: GlossaryEntryModelFilter\n  ) {\n    directory: allGlossaryEntries(first: $first, skip: $skip, filter: $filter) {\n      id\n      ...CompanyCardGridCompany\n    }\n\n    directoryMetadata: _allGlossaryEntriesMeta(filter: $filter) {\n      count\n    }\n  }\n"): (typeof documents)["\n  query DirectoryIndexPageGetData(\n    $first: IntType\n    $skip: IntType\n    $filter: GlossaryEntryModelFilter\n  ) {\n    directory: allGlossaryEntries(first: $first, skip: $skip, filter: $filter) {\n      id\n      ...CompanyCardGridCompany\n    }\n\n    directoryMetadata: _allGlossaryEntriesMeta(filter: $filter) {\n      count\n    }\n  }\n"];
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
export function gql(source: "\n  query GetCategoryPageData($filter: GlossaryCategoryModelFilter) {\n    glossaryCategory(filter: $filter) {\n      id\n      title\n      description\n      parent {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCategoryPageData($filter: GlossaryCategoryModelFilter) {\n    glossaryCategory(filter: $filter) {\n      id\n      title\n      description\n      parent {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment IssueCardIssue on NewsletterIssue {\n    id\n    slug\n    title\n    subtitle\n    thumbnailUrl\n    authorNames\n    createdAt\n    publishedAt\n  }\n"): (typeof documents)["\n  fragment IssueCardIssue on NewsletterIssue {\n    id\n    slug\n    title\n    subtitle\n    thumbnailUrl\n    authorNames\n    createdAt\n    publishedAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetNewsletterIssueData($slug: String!) {\n        newsletter {\n            newsletterIssue(slug: $slug) {\n                id\n                title\n                subtitle\n                thumbnailUrl\n                contentHtml\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetNewsletterIssueData($slug: String!) {\n        newsletter {\n            newsletterIssue(slug: $slug) {\n                id\n                title\n                subtitle\n                thumbnailUrl\n                contentHtml\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetNewsletterIssuesData($first: Int!, $after: String) {\n        newsletter {\n            allNewsletterIssues(first: $first, after: $after) {\n                nodes {\n                    id\n                   ...IssueCardIssue\n                }\n                \n            }\n        }\n    }\n"): (typeof documents)["\n    query GetNewsletterIssuesData($first: Int!, $after: String) {\n        newsletter {\n            allNewsletterIssues(first: $first, after: $after) {\n                nodes {\n                    id\n                   ...IssueCardIssue\n                }\n                \n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment GlossaryCategoryFragment on GlossaryCategoryRecord {\n    id\n    slug\n    children {\n      id\n      title\n      slug\n    }\n  }\n"): (typeof documents)["\n  fragment GlossaryCategoryFragment on GlossaryCategoryRecord {\n    id\n    slug\n    children {\n      id\n      title\n      slug\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetHomePageData {\n    newsletter {\n      allNewsletterIssues(first: 4) {\n        nodes {\n          id\n          slug\n          title\n          subtitle\n          thumbnailUrl\n        }\n      }\n    }\n    featuredCategories: glossaryCategory(filter: { id: { eq: \"147376160\" } }) {\n      id\n      ...GlossaryCategoryFragment\n    }\n    supplyChainCategories: glossaryCategory(\n      filter: { id: { eq: \"146755585\" } }\n    ) {\n      id\n      ...GlossaryCategoryFragment\n    }\n    productTypeCategories: glossaryCategory(\n      filter: { id: { eq: \"146755607\" } }\n    ) {\n      id\n      ...GlossaryCategoryFragment\n    }\n  }\n"): (typeof documents)["\n  query GetHomePageData {\n    newsletter {\n      allNewsletterIssues(first: 4) {\n        nodes {\n          id\n          slug\n          title\n          subtitle\n          thumbnailUrl\n        }\n      }\n    }\n    featuredCategories: glossaryCategory(filter: { id: { eq: \"147376160\" } }) {\n      id\n      ...GlossaryCategoryFragment\n    }\n    supplyChainCategories: glossaryCategory(\n      filter: { id: { eq: \"146755585\" } }\n    ) {\n      id\n      ...GlossaryCategoryFragment\n    }\n    productTypeCategories: glossaryCategory(\n      filter: { id: { eq: \"146755607\" } }\n    ) {\n      id\n      ...GlossaryCategoryFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CmsImage on ResponsiveImage {\n    srcSet\n    webpSrcSet\n    sizes\n    src\n    width\n    height\n    aspectRatio\n    alt\n    title\n    base64\n  }\n"): (typeof documents)["\n  fragment CmsImage on ResponsiveImage {\n    srcSet\n    webpSrcSet\n    sizes\n    src\n    width\n    height\n    aspectRatio\n    alt\n    title\n    base64\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CmsStructuredTextGlossaryDescription on GlossaryEntryModelDescriptionField {\n    __typename\n    value\n    blocks {\n      id\n      ... on ImageRecord {\n        ...CmsStructuredTextImageRecord\n      }\n    }\n    links {\n      ... on ArticleRecord {\n        id\n        slug\n        title\n      }\n      ... on GlossaryEntryRecord {\n        id\n        slug\n        term\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CmsStructuredTextGlossaryDescription on GlossaryEntryModelDescriptionField {\n    __typename\n    value\n    blocks {\n      id\n      ... on ImageRecord {\n        ...CmsStructuredTextImageRecord\n      }\n    }\n    links {\n      ... on ArticleRecord {\n        id\n        slug\n        title\n      }\n      ... on GlossaryEntryRecord {\n        id\n        slug\n        term\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CmsStructuredTextImageRecord on ImageRecord {\n    id\n    image {\n      id\n      responsiveImage {\n        ...CmsImage\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CmsStructuredTextImageRecord on ImageRecord {\n    id\n    image {\n      id\n      responsiveImage {\n        ...CmsImage\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UseNewsletterSubscribe($email: String!) {\n    subscriberCreate(input: { email: $email }) {\n      subscriber {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UseNewsletterSubscribe($email: String!) {\n    subscriberCreate(input: { email: $email }) {\n      subscriber {\n        id\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;