/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User
    admins: Admin
    media: Media
    companies: Company
    reviews: Review
    comments: Comment
    reactions: Reaction
    feedbacks: Feedback
    reports: Report
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  globals: {}
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string
  name: string
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "admins".
 */
export interface Admin {
  id: string
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string
  updatedAt: string
  createdAt: string
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "companies".
 */
export interface Company {
  id: string
  name: string
  address: string
  media: string | Media
  numberOfEmployees:
    | 'below_100'
    | 'between_100_and_500'
    | 'between_500_and_1000'
    | 'above_1000'
  companyType: 'outsource' | 'product' | 'both'
  website?: string | null
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reviews".
 */
export interface Review {
  id: string
  rate: 'excellent' | 'good' | 'normal' | 'bad' | 'terrible'
  relevantInformation?: {
    branch?: string | null
    duration?: number | null
    title?: string | null
  }
  basicReview?: {
    facilities?: string | null
    team?: string | null
    process?: string | null
    benefits?: string | null
  }
  detailedReview: {
    [k: string]: unknown
  }[]
  user: string | User
  company: string | Company
  summary?: string | null
  populatedUser?: {
    id?: string | null
    name?: string | null
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "comments".
 */
export interface Comment {
  id: string
  content: string
  user: string | User
  review: string | Review
  summary?: string | null
  populatedUser?: {
    id?: string | null
    name?: string | null
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reactions".
 */
export interface Reaction {
  id: string
  type: 'thumbs_up' | 'thumbs_down' | 'red_heart' | 'skull'
  target:
    | {
        relationTo: 'comments'
        value: string | Comment
      }
    | {
        relationTo: 'reviews'
        value: string | Review
      }
  user: string | User
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "feedbacks".
 */
export interface Feedback {
  id: string
  title: string
  isFinised?: boolean | null
  feedback: string
  response?: string | null
  user: string | User
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reports".
 */
export interface Report {
  id: string
  type?:
    | (
        | 'defamation'
        | 'law_violation'
        | 'misinformation'
        | 'scam'
        | 'spam'
        | 'violence'
      )
    | null
  otherType?: string | null
  target:
    | {
        relationTo: 'comments'
        value: string | Comment
      }
    | {
        relationTo: 'reviews'
        value: string | Review
      }
  user: string | User
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string
  user:
    | {
        relationTo: 'users'
        value: string | User
      }
    | {
        relationTo: 'admins'
        value: string | Admin
      }
  key?: string | null
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string
  name?: string | null
  batch?: number | null
  updatedAt: string
  createdAt: string
}
