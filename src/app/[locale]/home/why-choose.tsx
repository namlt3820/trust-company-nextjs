'use client'

import { SectionWrapper } from '@/components/section-wrapper'
import React from 'react'

export const WhyChoose: React.FC = () => {
  return (
    <SectionWrapper backgroundColor="bg-white">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
            Company Highlights
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Why Choose Review Co.?
          </h2>
          <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We're dedicated to providing honest, unbiased reviews to help you
            make informed decisions. Our team of experts thoroughly tests and
            evaluates products and services to ensure you get the best.
          </p>
          <ul className="grid gap-2 py-4">
            <li>
              <CheckIcon className="mr-2 inline-block h-4 w-4" />
              Trusted by thousands of consumers
            </li>
            <li>
              <CheckIcon className="mr-2 inline-block h-4 w-4" />
              Rigorous testing and evaluation process
            </li>
            <li>
              <CheckIcon className="mr-2 inline-block h-4 w-4" />
              Comprehensive, in-depth reviews
            </li>
          </ul>
        </div>
        <img
          src="/placeholder.svg"
          alt="Highlights"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
        />
      </div>
    </SectionWrapper>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
