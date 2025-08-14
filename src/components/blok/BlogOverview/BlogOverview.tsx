 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import BlogCard from '../../ui/BlogCard';
import Image from 'next/image';

interface ImageBlok {
	filename: string;
	alt?: string;
}

interface FeaturedBlok {
	uuid: string;
	content: any;
	full_slug: string;
	updated_at: string;
}

interface BlogOverviewBlok {
	component: string;
	title?: string;
	image?: ImageBlok;
	image_mobile?: ImageBlok;
	image_focus?: string;
	featured?: FeaturedBlok[];
	[key: string]: any;
}

interface BlogOverviewProps {
	blok: BlogOverviewBlok;
}

const BlogOverview: React.FC<BlogOverviewProps> = ({ blok }) => {
	return (
		<section {...storyblokEditable(blok)}>
			{/* Hero banner */}
			{blok.image && (
				<div className="relative w-full">
					{/* Image mobile */}
					{blok.image_mobile ? (
						<div className="relative w-full h-[300px] md:hidden">
							<Image
								src={blok.image_mobile.filename}
								alt={blok.image_mobile.alt || blok.title || "Blog image"}
								fill
								className={`object-cover z-0 ${
									blok.image_focus
										? `object-${blok.image_focus}`
										: 'object-center'
								}`}
								sizes="100vw"
							/>
						</div>
					) : (
						<div className="relative w-full h-[300px] md:hidden">
							<Image
								src={blok.image.filename}
								alt={blok.image.alt || blok.title || "Blog image"}
								fill
								className={`object-cover z-0 ${
									blok.image_focus
										? `object-${blok.image_focus}`
										: 'object-center'
								}`}
								sizes="100vw"
							/>
						</div>
					)}

					{/* Image desktop */}
					<div className="hidden md:block relative w-full h-[500px]">
						<Image
							src={blok.image.filename}
							alt={blok.image.alt || blok.title || "Blog image"}
							fill
							className={`object-cover z-0 ${
								blok.image_focus ? `object-${blok.image_focus}` : 'object-center'
							}`}
							sizes="100vw"
						/>
					</div>

					<div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-24 text-white z-10 bg-black/30">
						<h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
							{blok.title}
						</h1>
					</div>
				</div>
			)}

			<div className="py-12 px-4 md:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{blok.featured?.map((featuredBlok) => (
						<BlogCard
							key={featuredBlok.uuid}
							blok={{
								...featuredBlok.content,
								full_slug: featuredBlok.full_slug,
								updated_at: featuredBlok.updated_at,
							}}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default BlogOverview;