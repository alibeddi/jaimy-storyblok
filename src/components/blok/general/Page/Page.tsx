 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import Head from 'next/head';

interface SEOBlok {
	title?: string;
	description?: string;
}

interface ImageBlok {
	filename: string;
	alt?: string;
}

interface NestedBlok {
	_uid: string;
	component: string;
	[key: string]: any;
}

interface PageBlok {
	component: string;
	_uid: string;
	seo?: SEOBlok;
	title?: string;
	description?: string;
	og_title?: string;
	og_description?: string;
	og_image?: ImageBlok;
	twitter_title?: string;
	twitter_description?: string;
	twitter_image?: ImageBlok;
	robots?: string;
	partner_page?: boolean;
	hero?: NestedBlok[];
	content?: NestedBlok[];
	global?: string | NestedBlok;
	[key: string]: any;
}

interface PageProps {
	blok: PageBlok;
}

const Page: React.FC<PageProps> = ({ blok }) => {
	// SEO data
	const title = blok.seo?.title || blok.title || 'Page';
	const description = blok.seo?.description || blok.description || '';
	const ogTitle = blok.og_title || title;
	const ogDescription = blok.og_description || description;
	const ogImage = blok.og_image?.filename || '';
	const twitterTitle = blok.twitter_title || ogTitle;
	const twitterDescription = blok.twitter_description || ogDescription;
	const twitterImage = blok.twitter_image?.filename || ogImage;

	// Handle robots meta tag
	const robotsContent =
		blok.robots === 'noindex,nofollow'
			? 'noindex, nofollow'
			: blok.robots === 'index,nofollow'
			? 'index, nofollow'
			: 'index, follow';

	return (
		<>
			<Head>
				<title>{title}</title>
				{description && <meta name="description" content={description} />}

				<meta property="og:title" content={ogTitle} />
				{ogDescription && (
					<meta property="og:description" content={ogDescription} />
				)}
				{ogImage && <meta property="og:image" content={ogImage} />}
				<meta property="og:type" content="website" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={twitterTitle} />
				{twitterDescription && (
					<meta name="twitter:description" content={twitterDescription} />
				)}
				{twitterImage && <meta name="twitter:image" content={twitterImage} />}

				{blok.robots && blok.robots !== 'default' && (
					<meta name="robots" content={robotsContent} />
				)}
			</Head>

			<main
				className={`page-content ${blok.partner_page ? 'partner-page' : ''}`}
				{...storyblokEditable(blok)}
			>
				{blok.hero && blok.hero.length > 0 && (
					<div className="hero-section">
						{blok.hero.map((nestedBlok) => (
							<StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
						))}
					</div>
				)}

				<div className="content-container">
					{blok.content?.map((nestedBlok) => (
						<StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
					))}
				</div>

				{blok.global && (
					<div className="global-components">
						{typeof blok.global === 'object' ? (
							<StoryblokComponent blok={blok.global} />
						) : (
							<div>Global component reference: {blok.global}</div>
						)}
					</div>
				)}
			</main>
		</>
	);
};

export default Page;