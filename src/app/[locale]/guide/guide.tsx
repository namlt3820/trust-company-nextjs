export type Guide = {
  section: string
  items: {
    title: string
    details?: string[]
  }[]
}

export const guideData: Guide[] = [
  {
    section: 'Company',
    items: [
      {
        title: 'Find your company.',
        details: [
          'Go to the "Find Your Company" section on the homepage.',
          'Enter your company name in the input field.',
          'Alternatively, if you are on any page other than the homepage, you can use the input field in the navigation menu at the top of the website.',
        ],
      },
      {
        title: 'Create your company.',
        details: [
          "You don't have to log in to access the feature.",
          "If you don't find the company, feel free to create one through the 'here' button in the same section as above.",
          'You can only perform this action on the homepage.',
          'After submitting the form, we will verify it quickly and add the company to the list.',
        ],
      },
      {
        title: 'Please help us enrich the company list.',
        details: [
          "You don't have to log in to access the feature.",
          'Your contributions are a powerful motivation for others to create genuine and useful reviews.',
        ],
      },
    ],
  },
  {
    section: 'Review',
    items: [
      {
        title: 'Find reviews about a company.',
        details: [
          'Click on the company item from the dropdown list that appears when you type the company name.',
          'You will be redirected to the reviews list of that company.',
          'On your right, there is a sort button. You can sort by time (newest, oldest) or by rating (excellent, good, normal, bad, terrible).',
          'At the bottom, you can navigate between pages of results.',
        ],
      },
      {
        title: 'Find reviews made by you',
        details: [
          'You have to log in to access the feature.',
          'After that, click the My Reviews button in the top navigation bar.',
        ],
      },
      {
        title: 'Review actions',
        details: [
          'You have to log in to access the feature.',
          'To create a review, click the button at the top of the review list.',
          "For other actions, at the top of each review, click the '...' button.",
          'You can edit or delete the review if you made it, and report review made by others.',
          'Fill out the forms if needed.',
        ],
      },
      {
        title: 'Components of a review',
        details: [
          'From left to right, top to bottom',
          'The name of the user who made the review.',
          'Their rating (excellent, good, normal, bad, terrible)',
          'Emojis from other users',
          'Review actions: update or delete if made by you, and report if made by others.',
          'Last updated date.',
          'Branch: geographic location or branch name of the company.',
          'Duration: working time in months.',
          'Title: all the titles the user held while working at that company.',
          'Facilities: the infrastructure or working office conditions of the company.',
          "Team: the quantity, quality, and teamwork ability of the company's staff.",
          "Process: description of the company's work process, including advantages and challenges.",
          'Benefits: description of the welfare benefits at the company.',
          'Detailed review: detailed evaluation of other aspects of the company not mentioned above.',
          'Comment count and link to comment section.',
        ],
      },
    ],
  },
  {
    section: 'Comment',
    items: [
      {
        title: 'Find comments about a review.',
        details: [
          'Click on the comment count section at the bottom of a review.',
          'You will be redirected to the comments list of that review.',
          "On your right, there is a 'Back to reviews' button, which will redirect you back to the list of reviews.",
        ],
      },
      {
        title: 'Find comments made by you.',
        details: [
          'You have to log in to access the feature.',
          'After that, click the My Comments button in the top navigation bar.',
        ],
      },
      {
        title: 'Comment actions',
        details: [
          'You have to log in to access the feature.',
          'To create a comment, click the button at the top of the comment list.',
          "For other actions, at the top of each comment, click the '...' button.",
          'You can edit or delete the comment if you made it, and report comment made by others.',
          'Fill out the forms if needed.',
        ],
      },
    ],
  },
  {
    section: 'Reaction',
    items: [
      {
        title: 'Reaction actions',
        details: [
          'You have to log in to access the feature.',
          'You can view reactions by checking the emoji list at the top of each review or comment.',
          'Reactions made by you will be highlighted in blue, while reactions made by others will be in black.',
          'To make a reaction, click the smile icon to show the full list of emojis and select the one you want.',
          'You can delete a reaction by clicking the emoji again.',
        ],
      },
    ],
  },
  {
    section: 'Report',
    items: [
      {
        title: 'Report actions',
        details: [
          'You have to log in to access the feature.',
          "You can report another person's comment or review by clicking the '...' button at the top of the comment or review.",
          'If the report is justified, we will delete the content within 1-2 days after being notified.',
          'We may delete your review or comment if we feel it violates our standards and negatively influences the decisions of other users.',
          'Please send us feedback if you feel that decision is unjustified.',
        ],
      },
    ],
  },
  {
    section: 'Feedback',
    items: [
      {
        title: 'Feedback actions',
        details: [
          "You don't have to log in to access the feature.",
          'You can send us feedback by clicking the Feedback button in the navigation bar.',
          "Your feedback is always welcome to help make this a better website. Don't hesitate to tell us anything that needs improvement or is lacking.",
        ],
      },
    ],
  },
  {
    section: 'User',
    items: [
      {
        title: 'Log in',
        details: [
          "You don't have to log in if you just want to find or create a company and read reviews about it.",
          'To log in, click the Login button in the navigation bar and fill in your email and password.',
        ],
      },
      {
        title: 'Log out',
        details: ['To log out, click the Logout button in the navigation bar.'],
      },
      {
        title: 'Language',
        details: [
          "You don't have to log in to access the feature.",
          'You can change the language to your liking by clicking the Language button in the navigation bar. Currently, the two supported languages are English and Vietnamese.',
        ],
      },
    ],
  },
]

export const renderGuide = (selected: string) => {
  const guide = guideData.find((guide) => guide.section === selected)

  if (!guide) {
    return (
      <h2 className="text-center text-2xl font-bold">
        Please select an section on the left
      </h2>
    )
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
