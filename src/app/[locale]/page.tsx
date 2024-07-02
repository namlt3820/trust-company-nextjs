import { Feedback } from '@/app/[locale]/home/feedback'
import { GetCompaniesCombobox } from '@/app/[locale]/home/get-companies-combobox'
import { Hero } from '@/app/[locale]/home/hero'
import { WebsiteReviews } from '@/app/[locale]/home/website-reviews'
import { WhyChoose } from '@/app/[locale]/home/why-choose'

export default function Home() {
  return (
    <>
      <GetCompaniesCombobox />
      <Hero />
      <WebsiteReviews />
      <WhyChoose />
      <Feedback />
    </>
  )
}
