import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TrustedBy } from '@/components/sections/TrustedBy';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Statistics } from '@/components/sections/Statistics';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { Portfolio } from '@/components/sections/Portfolio';
import { Industries } from '@/components/sections/Industries';
import { TechStack } from '@/components/sections/TechStack';
import { Testimonials } from '@/components/sections/Testimonials';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { PhotoCarousel } from '@/components/sections/PhotoCarousel';
import { CallToAction } from '@/components/sections/CallToAction';

export const Home = () => {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <WhyChooseUs />
      <Statistics />
      <ProcessTimeline />
      <Portfolio />
      <Industries />
      <TechStack />
      <Testimonials />
      <BlogPreview />
      <PhotoCarousel />
      <CallToAction />
      
      <Footer />
    </main>
  );
};

export default Home;
