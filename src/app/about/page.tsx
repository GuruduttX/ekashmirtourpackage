"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Plus, Minus, Bus } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';
import HeroSection from '@/components/about/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import DestinationsSection from '@/components/about/DestinationsSection';
import GallerySection from '@/components/about/GallerySection';
import StatsSection from '@/components/about/StatsSection';
import PackagesSection from '@/components/about/PackagesSection';
import FaqSection from '@/components/about/FaqSection';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';


// ==========================================
// 📄 File: app/about/page.jsx (or .tsx)
// ==========================================
export default function AboutUsPage() {
  return (
    <>
     <Navbar /> 
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#00B4D8] selection:text-white pb-0 overflow-x-hidden">
      <main>
        
        <HeroSection />
        <AboutSection />
        <DestinationsSection />
        <GallerySection />
        <StatsSection />
        <PackagesSection />
        <FaqSection />
      </main>
      <Footer />
    </div></>
  );
}