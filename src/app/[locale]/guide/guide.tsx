import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

export type Guide = {
  section: string
  items: {
    title: string
    details?: string[]
  }[]
}

type GuideItemProps = {
  selected: string
}

export const GuideItem: React.FC<GuideItemProps> = ({ selected }) => {
  const t = useTranslations('Guide')

  const guideData: Guide[] = useMemo(
    () => [
      {
        section: t('company'),
        items: [
          {
            title: t('find_company'),
            details: [
              t('find_company_1'),
              t('find_company_2'),
              t('find_company_3'),
            ],
          },
          {
            title: t('create_company'),
            details: [
              t('no_login'),
              t('create_company_1'),
              t('create_company_2'),
              t('create_company_3'),
            ],
          },
          {
            title: t('help_enrich'),
            details: [t('no_login'), t('help_enrich_1')],
          },
        ],
      },
      {
        section: t('review'),
        items: [
          {
            title: t('find_review_company'),
            details: [
              t('find_review_company_1'),
              t('find_review_company_2'),
              t('find_review_company_3'),
              t('find_review_company_4'),
            ],
          },
          {
            title: t('find_review_you'),
            details: [t('must_login'), t('find_review_you_1')],
          },
          {
            title: t('review_actions'),
            details: [
              t('must_login'),
              t('review_actions_1'),
              t('review_actions_2'),
              t('review_actions_3'),
              t('review_actions_4'),
            ],
          },
          {
            title: t('review_components'),
            details: [
              t('review_components_1'),
              t('review_components_2'),
              t('review_components_3'),
              t('review_components_4'),
              t('review_components_5'),
              t('review_components_6'),
              t('review_components_7'),
              t('review_components_8'),
              t('review_components_9'),
              t('review_components_10'),
              t('review_components_11'),
              t('review_components_12'),
              t('review_components_13'),
              t('review_components_14'),
              t('review_components_15'),
            ],
          },
        ],
      },
      {
        section: t('comment'),
        items: [
          {
            title: t('find_comment_review'),
            details: [
              t('find_comment_review_1'),
              t('find_comment_review_2'),
              t('find_comment_review_3'),
            ],
          },
          {
            title: t('find_comment_you'),
            details: [t('must_login'), t('find_comment_you_1')],
          },
          {
            title: t('comment_actions'),
            details: [
              t('must_login'),
              t('comment_actions_1'),
              t('comment_actions_2'),
              t('comment_actions_3'),
              t('comment_actions_4'),
            ],
          },
        ],
      },
      {
        section: t('reaction'),
        items: [
          {
            title: t('reaction_actions'),
            details: [
              t('must_login'),
              t('reaction_actions_1'),
              t('reaction_actions_2'),
              t('reaction_actions_3'),
              t('reaction_actions_4'),
            ],
          },
        ],
      },
      {
        section: t('report'),
        items: [
          {
            title: t('report_actions'),
            details: [
              t('must_login'),
              t('report_actions_1'),
              t('report_actions_2'),
              t('report_actions_3'),
              t('report_actions_4'),
            ],
          },
        ],
      },
      {
        section: t('feedback'),
        items: [
          {
            title: t('feedback_actions'),
            details: [
              t('no_login'),
              t('feedback_actions_1'),
              t('feedback_actions_2'),
            ],
          },
        ],
      },
      {
        section: t('user'),
        items: [
          {
            title: t('login'),
            details: [t('login_1'), t('login_2')],
          },
          {
            title: t('logout'),
            details: [t('logout_1')],
          },
          {
            title: t('language'),
            details: [t('no_login'), t('language_1')],
          },
        ],
      },
    ],
    [t]
  )

  const guide = guideData.find((guide) => guide.section === selected)

  if (!guide) {
    return <h2 className="text-center text-2xl font-bold">{t('no_section')}</h2>
  }

  const { section, items } = guide

  return (
    <>
      <h2 className="text-2xl font-bold">{section}</h2>
      <div className="mt-6 space-y-6">
        {items.map((item, index) => (
          <div
            className="grid grid-cols-[30px,1fr] items-start gap-2"
            key={`${selected}_${index}`}
          >
            <div className="text-primary">{`${index + 1}. `}</div>
            <div className="flex flex-col gap-1">
              <h3 className="font-medium">{item.title}</h3>
              {item.details?.map((detail, detailIndex) => (
                <p
                  className="text-muted-foreground"
                  key={`${selected}_${index}_${detailIndex}`}
                >
                  {`${detailIndex + 1}. `}
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
