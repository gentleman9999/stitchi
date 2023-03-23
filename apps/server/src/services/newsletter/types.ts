export enum PostStatus {
  Draft = 'draft',
  Confirmed = 'confirmed',
  Archived = 'archived',
}

export interface Post {
  id: string
  subtitle: string
  title: string
  authors: string[]
  createdAt: Date
  status: PostStatus
  publishDate: Date | null
  displayedDate: Date | null
  slug: string
  thumbnailUrl: string
  bodyHtml: string
}

export interface PostList {
  posts: Post[]
  totalCount: number
  pageCount: number
  limit: number
  page: number
}
