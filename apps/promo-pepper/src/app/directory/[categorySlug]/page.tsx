'use client'

import { ComponentErrorMessage } from '@/components/common'
import { Container } from '@/components/ui'
import { initializeApollo } from '@/lib/apollo'
import routes from '@/lib/routes'
import { gql } from '@/__generated__'
import {
  GetCategoryPageDataQuery,
  GetCategoryPageDataQueryVariables,
} from '@/__generated__/graphql'
import { useQuery } from '@apollo/client'
import { ArrowLeft } from 'icons'
import Link from 'next/link'
import React from 'react'
import Directory from '../Directory'

const client = initializeApollo()

export default function Page({ params }: { params: { categorySlug: string } }) {
  const { data, loading } = useQuery<
    GetCategoryPageDataQuery,
    GetCategoryPageDataQueryVariables
  >(GetCategoryPageData, {
    client,
    variables: {
      filter: {
        slug: {
          eq: params.categorySlug,
        },
      },
    },
  })

  const { glossaryCategory: category } = data || {}

  if (!loading && !category) {
    return <ComponentErrorMessage error="Failed to load category" />
  }

  return (
    <Container>
      <section className="py-12">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-bold font-headingDisplay">
              {category?.title}
            </h1>
            {category?.description ? (
              <p className="text-xl text-gray-700 w-[70%] max-w-3xl">
                {category.description}
              </p>
            ) : null}
          </div>
          <Link
            href={routes.internal.directory.href()}
            className="flex items-center group font-semibold text-lg text-gray-400"
          >
            <ArrowLeft
              className="group-hover:-translate-x-1 mr-1 transition-all"
              strokeWidth={2}
              width={20}
            />{' '}
            Back to categories
          </Link>
        </div>
      </section>

      <Directory
        categoryId={category?.id}
        parentCategoryId={category?.parent?.id || category?.id}
      />
    </Container>
  )
}

const GetCategoryPageData = gql(/* GraphQL */ `
  query GetCategoryPageData($filter: GlossaryCategoryModelFilter) {
    glossaryCategory(filter: $filter) {
      id
      title
      description
      parent {
        id
      }
    }
  }
`)
