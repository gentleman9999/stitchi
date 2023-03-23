import * as yup from 'yup'

export enum PostStatus {
  Draft = 'draft',
  Confirmed = 'confirmed',
  Archived = 'archived',
}

export enum SubscriberStatus {
  Validating = 'validating',
  Invalid = 'invalid',
  Pending = 'pending',
  Active = 'active',
  Inactive = 'inactive',
}

export enum SubscriberSubscriptionTier {
  Free = 'free',
  Premium = 'premium',
}

const postSchema = yup.object().shape({
  id: yup.string().required(),
  subtitle: yup.string().required(),
  title: yup.string().required(),
  authors: yup.array().of(yup.string().required()).required(),
  created: yup.number().required(),
  status: yup.mixed<PostStatus>().oneOf(Object.values(PostStatus)).required(),
  publish_date: yup.number().nullable().defined(),
  displayed_date: yup.number().nullable().defined(),
  split_tested: yup.boolean().required(),
  subject_line: yup.string().required(),
  preview_text: yup.string().required(),
  slug: yup.string().required(),
  thumbnail_url: yup.string().required(),
  web_url: yup.string().required(),
  audience: yup.string().required(),
  platform: yup.string().required(),
  content_tags: yup.array().of(yup.string().required()).required(),
  content: yup
    .object()
    .shape({
      free: yup.object().shape({
        web: yup.string(),
        email: yup.string(),
        rss: yup.string(),
      }),
      premium: yup.object().shape({
        web: yup.string(),
        email: yup.string(),
      }),
    })
    .required(),
})

const postListSchema = yup.object().shape({
  data: yup.array().of(postSchema).required(),
  limit: yup.number().required(),
  page: yup.number().required(),
  total_results: yup.number().required(),
  total_pages: yup.number().required(),
})

const subscriberSchema = yup.object().shape({
  id: yup.string().required(),
  email: yup.string().required(),
  status: yup
    .mixed<SubscriberStatus>()
    .oneOf(Object.values(SubscriberStatus))
    .required(),
  created: yup.number().required(),
  subscription_tier: yup
    .mixed<SubscriberSubscriptionTier>()
    .oneOf(Object.values(SubscriberSubscriptionTier))
    .required(),
  utm_source: yup.string().nullable(),
  utm_medium: yup.string().nullable(),
  utm_channel: yup.string().nullable(),
  utm_campaign: yup.string().nullable(),
  referring_site: yup.string().nullable(),
  referral_code: yup.string().nullable(),
})

export type Post = yup.InferType<typeof postSchema>
export type PostList = yup.InferType<typeof postListSchema>
export type Subscriber = yup.InferType<typeof subscriberSchema>

export const makePost = (data: any): Post => {
  return postSchema.validateSync(data)
}

export const makePostList = (data: any): PostList => {
  return postListSchema.validateSync(data)
}

export const makeSubscriber = (data: any): Subscriber => {
  return subscriberSchema.validateSync(data)
}
