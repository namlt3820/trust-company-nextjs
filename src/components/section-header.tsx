import React, { ReactNode } from 'react'

export type SectionHeaderProps = {
  title: string
  subtitle?: string | ReactNode
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center md:mb-8">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        {title}
      </h2>
      <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        {subtitle}
      </p>
    </div>
  )
}
