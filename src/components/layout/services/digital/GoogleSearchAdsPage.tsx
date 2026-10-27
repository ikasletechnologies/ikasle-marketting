import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Ban, BarChart3, Check, ChevronDown, CircleCheck, Coins, FileCheck2, FilePenLine, LayoutPanelTop, Lightbulb, Search, Settings } from 'lucide-react';
import './DigitalStrategyPage.css';
import './GoogleSearchAdsPage.css';

const MANAGE=[
 {icon:Search,title:'Keyword & Intent Research',text:'Find relevant searches and organise priorities.'},
 {icon:Settings,title:'Campaign Setup',text:'Structure campaigns, ad groups and targeting.'},
 {icon:FilePenLine,title:'Ad Copy & Assets',text:'Create clear messages and useful supporting assets.'},
 {icon:Ban,title:'Negative Keywords',text:'Reduce exposure to irrelevant searches.'},
 {icon:BarChart3,title:'Conversion Tracking',text:'Track agreed actions with suitable measurement.'},
 {icon:Coins,title:'Budget & Optimisation',text:'Review spend, bids and performance.'},
];
const DELIVERABLES=['Keyword and negative keyword plan','Location and budget settings','Campaign and ad group structure','Agreed conversion tracking','Search ad copy and assets','Reports and recommendations'];
const PROCESS=[
 {title:'Discover',text:'Understand your goal, audience and search opportunities.'},
 {title:'Build',text:'Create the campaign structure, targeting and ad copy.'},
 {title:'Launch',text:'Go live with tracking in place and quality checks completed.'},
 {title:'Refine',text:'Review performance and make ongoing improvements.'},
];
const FAQS=[
 {q:'Is ad spend included?',a:'Ad spend is separate from management fees and is agreed with you before launch.'},
 {q:'Do I need a dedicated landing page?',a:'Not always, but a focused landing page often improves message match, usability and conversion performance.'},
 {q:'Can you guarantee leads or sales?',a:'No responsible partner can guarantee results. We build, measure and optimise campaigns around agreed goals and transparent performance data.'},
];
const RELATED=[
 {icon:LayoutPanelTop,title:'Landing Pages & CRO',text:'Turn more of your traffic into enquiries and customers.',id:'landing'},
 {icon:BarChart3,title:'Analytics & Conversion Tracking',text:'Measure what matters and make data-driven decisions.',id:'analytics'},
 {icon:Lightbulb,title:'Digital Marketing Strategy',text:'A clear plan to support your wider growth goals.',id:'strategy'},
];

export interface GoogleSearchAdsPageProps{onHomeClick?:()=>void;onServicesClick?:()=>void;onDigitalClick?:()=>void;onContactClick?:()=>void;onRelatedClick?:(id:string)=>void}
export const GoogleSearchAdsPage:React.FC<GoogleSearchAdsPageProps>=({onHomeClick,onServicesClick,onDigitalClick,onContactClick,onRelatedClick})=>{
 const root=useRef<HTMLElement>(null);const[openFaq,setOpenFaq]=useState(0);
 useEffect(()=>{const nodes=root.current?.querySelectorAll<HTMLElement>('[data-reveal]');if(!nodes||!('IntersectionObserver'in window))return;const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-shown');observer.unobserve(entry.target)}}),{threshold:.12});nodes.forEach(node=>observer.observe(node));return()=>observer.disconnect()},[]);
 return <main ref={root} className="strategy-page ads-page">
  <section className="ads-hero"><div className="strategy-shell ads-hero-grid"><div><nav className="strategy-breadcrumb"><button onClick={onHomeClick}>Home</button><span>/</span><button onClick={onServicesClick}>Services</button><span>/</span><button onClick={onDigitalClick}>Digital Marketing</button><span>/</span><span>Google Search Ads</span></nav><p className="strategy-kicker">GOOGLE SEARCH ADS</p><h1>Reach customers<br/><em>at the moment they search.</em></h1><p className="strategy-lead">Focused keywords, clear ad copy and carefully managed campaigns built around your goals.</p><div className="strategy-actions"><button className="strategy-primary" onClick={onContactClick}>Plan My Search Campaign <ArrowRight/></button><button className="strategy-secondary" onClick={()=>document.getElementById('ads-overview')?.scrollIntoView({behavior:'smooth'})}>Explore the Service</button></div></div>
  <div className="ads-visual" aria-hidden="true"><span className="ads-halo"/><div className="search-window"><div className="search-top"><span>best marketing agency near me</span><Search/></div><small>Sponsored</small><b/><i/><i/><i/><div className="ad-cursor"/></div></div></div></section>
  <section id="ads-overview" className="strategy-section ads-overview"><div className="strategy-shell overview-grid" data-reveal><div><p className="strategy-eyebrow">OVERVIEW</p><h2>Put your offering in front<br/>of relevant searches.</h2><p>We connect search intent with suitable ads and landing pages, then review performance to guide improvements.</p></div><aside><BarChart3/><div><h3>Built for your next step</h3>{['Promote a product or service','Reach customers in selected locations','Measure relevant enquiry interactions'].map(x=><p key={x}><CircleCheck/>{x}</p>)}</div></aside></div></section>
  <section className="strategy-section ads-scope"><div className="strategy-shell" data-reveal><p className="strategy-eyebrow">WHAT WE MANAGE</p><h2>What we manage.</h2><div className="scope-grid">{MANAGE.map(({icon:Icon,title,text},i)=><article key={title} style={{'--i':i} as React.CSSProperties}><span><Icon/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
  <section className="strategy-section ads-deliverables"><div className="strategy-shell ads-deliverable-card" data-reveal><div><p className="strategy-eyebrow">DELIVERABLES</p><h2>Clarity from setup to reporting.</h2><div className="deliverable-list">{DELIVERABLES.map(x=><p key={x}><CircleCheck/>{x}</p>)}<small>Advertising spend is separate from service fees. Scope is agreed before launch.</small></div></div><div className="ads-document" aria-hidden="true"><FileCheck2/><span/><span/><span/><i><Check/></i></div></div></section>
  <section className="strategy-section ads-process"><div className="strategy-shell" data-reveal><p className="strategy-eyebrow">OUR PROCESS</p><h2>A clear campaign workflow.</h2><div className="ads-process-track">{PROCESS.map((step,i)=><React.Fragment key={step.title}><article><b>{i+1}</b><div><h3>{step.title}</h3><p>{step.text}</p></div></article>{i<3&&<ArrowRight/>}</React.Fragment>)}</div></div></section>
  <section className="strategy-section strategy-faq ads-faq"><div className="strategy-shell" data-reveal><p className="strategy-eyebrow">FAQ</p><h2>Before we get started.</h2><div className="faq-list">{FAQS.map((faq,i)=><article className={openFaq===i?'is-open':''} key={faq.q}><button onClick={()=>setOpenFaq(openFaq===i?-1:i)}><span>{faq.q}</span><ChevronDown/></button><div className="faq-answer"><p>{faq.a}</p></div></article>)}</div></div></section>
  <section className="strategy-section ads-related"><div className="strategy-shell" data-reveal><p className="strategy-eyebrow">RELATED SERVICES</p><h2>Explore related services.</h2><div className="related-grid">{RELATED.map(({icon:Icon,title,text,id})=><article key={title} onClick={()=>onRelatedClick?.(id)}><Icon/><div><h3>{title}</h3><p>{text}</p><button>View Service <ArrowRight/></button></div></article>)}</div></div></section>
 </main>
};
export default GoogleSearchAdsPage;
