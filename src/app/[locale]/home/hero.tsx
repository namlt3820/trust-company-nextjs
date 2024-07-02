'use client'

import { SectionWrapper } from '@/components/section-wrapper'
import Link from 'next/link'
import React from 'react'

export const Hero: React.FC = () => {
  return (
    <SectionWrapper backgroundColor="bg-white">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Trusted Reviews, Reliable Insights
            </h1>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
              Discover the best products and services through honest, in-depth
              reviews from our community of experts.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              prefetch={false}
            >
              Submit a Review
            </Link>
          </div>
        </div>
        <img
          src="/placeholder.svg"
          alt="Hero"
          className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
        />
      </div>
    </SectionWrapper>
  )
}
