import {
  Post as BeehiivPost,
  PostStatus as BeehiivPostStatus,
} from '../../beehiiv/serialize'
import { Post, PostStatus } from './types'

export const beehiivPostToPost = (post: BeehiivPost): Post => {
  return {
    id: post.id,
    slug: post.slug,
    subtitle: post.subtitle,
    title: post.title,
    authors: post.authors,
    status: beehiivPostStatusToPostStatus(post.status),
    bodyHtml: post.content.premium.web || '',
    createdAt: new Date(post.created),
    publishDate: post.publish_date ? new Date(post.publish_date) : null,
    displayedDate: post.displayed_date ? new Date(post.displayed_date) : null,
    thumbnailUrl: post.thumbnail_url,
  }
}

export const beehiivPostStatusToPostStatus = (
  status: BeehiivPostStatus,
): PostStatus => {
  return status
}
