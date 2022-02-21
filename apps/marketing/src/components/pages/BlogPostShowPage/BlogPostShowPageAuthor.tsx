import { gql } from '@apollo/client'
import { Avatar } from '@components/common'
import { BlogPostShowPageAuthorFragment } from '@generated/BlogPostShowPageAuthorFragment'
import React from 'react'

interface Props {
  author: BlogPostShowPageAuthorFragment
}

const BlogPostShowPageAuthor = ({ author }: Props) => {
  return (
    <address className="flex items-center">
      <div className="flex-shrink-0">
        <span className="sr-only">{author.name}</span>
        {author.image && <Avatar image={author.image} />}
      </div>

      <div className="ml-3">
        <p className="font-bold">{author.name}</p>
      </div>
    </address>
  )
}

BlogPostShowPageAuthor.fragments = {
  author: gql`
    ${Avatar.fragments.image}
    fragment BlogPostShowPageAuthorFragment on AuthorRecord {
      id
      name
      image {
        id
        ...AvatarImageFragment
      }
    }
  `,
}

export default BlogPostShowPageAuthor
