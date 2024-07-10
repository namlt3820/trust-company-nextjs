import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

export type SectionWrapperProps = {
  children: ReactNode
  backgroundColor?: string
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  backgroundColor,
}) => (
  <section
    className={cn(
      'w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-20 lg:py-24',
      backgroundColor
    )}
  >
    <div className="container px-5 md:px-20">{children}</div>
  </section>
)
