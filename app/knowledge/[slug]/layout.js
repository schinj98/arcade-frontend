// app/knowledge/[slug]/layout.js

import { blogPosts } from '../blogData';

export async function generateMetadata({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.content.slice(0, 150),
  };
}


export default async function BlogLayout({ children }) {
  return (
    <section>
      {children}
    </section>
  );
}
