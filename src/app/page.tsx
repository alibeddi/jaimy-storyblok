import { getStoryblokApi } from '@storyblok/react/rsc'
import Header from '@/components/blocks/Header'
import Hero from '@/components/blocks/Hero'
import Steps from '@/components/blocks/Steps'
import { draftMode } from 'next/headers'
import Features from '@/components/blocks/Features'

export default async function Home() {
  const { data } = await fetchData()
  
  // Extract blocks from the story content
  const storyContent = (data as any).story?.content
  const blocks = storyContent.body || []
  
  // Find specific blocks
  const headerBlock = blocks.find((block: any) => block.component === 'header')
  const heroBlock = blocks.find((block: any) => block.component === 'hero')
  const stepsBlock = blocks.find((block: any) => block.component === 'steps')
  const featuresBlock = blocks.find((block: any) => block.component === 'features')

  return (
    <div>
      {headerBlock && <Header blok={headerBlock} />}
      {heroBlock && <Hero blok={heroBlock} />}
      {stepsBlock && <Steps blok={stepsBlock} />}
      {featuresBlock && <Features blok={featuresBlock} />} {/* Add this */}

    </div>
  )
}

async function fetchData() {
  const { isEnabled } = await draftMode()
  
  let sbParams = {
    version: isEnabled ? 'draft' : 'published' as const,
  }

  const storyblokApi = getStoryblokApi()
  return storyblokApi.get('cdn/stories/home', {
    version: sbParams.version as 'draft' | 'published'
  })
}