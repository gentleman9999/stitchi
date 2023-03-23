import { fromUnixTime } from 'date-fns'
import {
  Post as BeehiivPost,
  PostStatus as BeehiivPostStatus,
} from '../../beehiiv/serialize'
import { Post, PostStatus } from './types'

export const beehiivPostToPost = (post: BeehiivPost): Post => {
  if (!post.content?.premium?.web) throw new Error('Post content is missing.')

  return {
    id: post.id,
    slug: post.slug,
    subtitle: post.subtitle,
    title: post.title,
    authors: post.authors,
    status: beehiivPostStatusToPostStatus(post.status),
    bodyHtml: post.content.premium.web,
    createdAt: fromUnixTime(post.created),
    publishDate: post.publish_date ? fromUnixTime(post.publish_date) : null,
    displayedDate: post.displayed_date
      ? fromUnixTime(post.displayed_date)
      : null,
    thumbnailUrl: post.thumbnail_url,
  }
}

export const beehiivPostStatusToPostStatus = (
  status: BeehiivPostStatus,
): PostStatus => {
  return status
}
