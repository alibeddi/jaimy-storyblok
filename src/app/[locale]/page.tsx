import { getStoryblokApi } from '@storyblok/react/rsc'
import Header from '@/components/blocks/Header'
import Hero from '@/components/blocks/Hero'
import Steps from '@/components/blocks/Steps'
import { draftMode } from 'next/headers'
import Features from '@/components/blocks/Features'
import { StoryblokStory, StoryblokBlok, PageBlok } from '@/types/storyblok'

export default async function Home() {
  const { data } = await fetchData()
  
  // Extract blocks from the story content
  const storyContent = (data as { story: StoryblokStory }).story?.content as PageBlok
  const blocks = storyContent.body || []
  
  // Find specific blocks
  const headerBlock = blocks.find((block: StoryblokBlok) => block.component === 'header')
  const heroBlock = blocks.find((block: StoryblokBlok) => block.component === 'hero')
  const stepsBlock = blocks.find((block: StoryblokBlok) => block.component === 'steps')
  const featuresBlock = blocks.find((block: StoryblokBlok) => block.component === 'features')

  return (
    <div>
      {headerBlock && <Header blok={headerBlock} />}
      {heroBlock && <Hero blok={heroBlock} />}
      {stepsBlock && <Steps blok={stepsBlock} />}
      {featuresBlock && <Features blok={featuresBlock} />}
    </div>
  )
}

async function fetchData() {
  const { isEnabled } = await draftMode()
  
  const sbParams = {
    version: isEnabled ? 'draft' : 'published' as const,
  }

  const storyblokApi = getStoryblokApi()
  return storyblokApi.get('cdn/stories/home', {
    version: sbParams.version as 'draft' | 'published'
  })
}