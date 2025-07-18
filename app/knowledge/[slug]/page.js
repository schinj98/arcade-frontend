// app/knoweledge/[slug]/page.js
import { blogPosts } from '../blogData';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.content.slice(0, 150),
  };
}

export default async function BlogPostPage({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return notFound();

  return <BlogPostClient post={post} />;
}
