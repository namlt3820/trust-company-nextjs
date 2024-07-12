/* eslint-disable react/no-unescaped-entities */
'use client'

import { Icons } from '@/components/icons'
import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

export const WebsiteReviews: React.FC = () => {
  return (
    <SectionWrapper>
      <SectionHeader
        title="Featured Reviews"
        subtitle="Discover the best products and services through honest, in-depth
            reviews from our community of experts."
      ></SectionHeader>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">John Doe</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Verified Reviewer
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icons.star className="h-5 w-5 text-yellow-500" />
                <Icons.star className="h-5 w-5 text-yellow-500" />
                <Icons.star className="h-5 w-5 text-yellow-500" />
                <Icons.star className="h-5 w-5 text-yellow-500" />
                <Icons.star className="h-5 w-5 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                "This product exceeded my expectations. The quality is\n
                top-notch and the customer service was excellent."
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Sarah Miller</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Verified Reviewer
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icons.star className="h-5 w-5 text-yellow-500" />
                <Icons.star className="h-5 w-5 text-yellow-500" />
                <Icons.star className="h-5 w-5 text-yellow-500" />
                <Icons.star className="h-5 w-5 text-yellow-500" />
                <Icons.star className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                "I'm so glad I found this product. It's been a game-changer\n
                for my business. Highly recommended!"
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Michael Johnson</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Verified Reviewer
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icons.star className="h-5 w-5 text-yellow-500" />
                <Icons.star className="h-5 w-5 text-yellow-500" />
                <Icons.star className="h-5 w-5 text-yellow-500" />
                <Icons.star className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                <Icons.star className="h-5 w-5 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                "I was hesitant at first, but this product has exceeded my\n
                expectations. Definitely worth the investment."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  )
}
