import { CreateReview } from '@/app/home/create-review'
import { GetCompaniesCombobox } from '@/app/home/get-companies-combobox'
import { Hero } from '@/app/home/hero'
import { WebsiteReviews } from '@/app/home/website-reviews'
import { WhyChoose } from '@/app/home/why-choose'

export default function Home() {
  return (
    <>
      <GetCompaniesCombobox />
      <Hero />
      <WebsiteReviews />
      <WhyChoose />
      <CreateReview />
    </>
  )
}
