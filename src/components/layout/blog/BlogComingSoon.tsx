import React from 'react';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import './BlogComingSoon.css';

interface BlogComingSoonProps { onContactClick: () => void; }

export const BlogComingSoon: React.FC<BlogComingSoonProps> = ({ onContactClick }) => (
  <main className="blog-coming-soon">
    <div className="blog-orb blog-orb-one" aria-hidden="true" />
    <div className="blog-orb blog-orb-two" aria-hidden="true" />
    <section className="blog-coming-content" aria-labelledby="blog-coming-title">
      <div className="blog-coming-icon" aria-hidden="true"><BookOpen size={28} strokeWidth={1.8} /></div>
      <p className="blog-coming-eyebrow"><Sparkles size={15} /> Fresh ideas are taking shape</p>
      <h1 id="blog-coming-title">Our blog is<br /><span>coming soon.</span></h1>
      <p className="blog-coming-copy">We’re preparing practical insights on digital marketing, brand growth, SEO, and social media—made to help ambitious businesses move forward.</p>
      <div className="blog-coming-rule" aria-hidden="true"><span /></div>
      <p className="blog-coming-note">Have a question while you wait?</p>
      <button type="button" className="blog-coming-cta" onClick={onContactClick}>Let’s talk <ArrowRight size={18} /></button>
    </section>
  </main>
);

export default BlogComingSoon;
