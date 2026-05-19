import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TextScroll from "@/components/TextScroll";
import Banner from "@/components/Banner";
import PromoGallery from "@/components/PromoGallery";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import SplashScreen from "@/components/SplashScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sangat Motor Centre | Premium Car Care & Performance in Bihar",
  description:
    "Driven by expertise, powered by trust. Experience top-tier auto servicing, advanced computerized diagnostics, premium car detailing, and genuine OEM parts.",
  keywords: [
    "Sangat Motor Centre",
    "Car service Bihar",
    "Porsche service center",
    "Car detailing ceramic coating",
    "Auto repair Bihar",
    "OEM spare parts",
  ],
  openGraph: {
    title: "Sangat Motor Centre | Premium Car Care & Performance",
    description: "Premium vehicle diagnostics, maintenance, wash, detailing and OEM spare parts.",
    url: "https://sangatmotorcentre.com",
    siteName: "Sangat Motor Centre",
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <SplashScreen />
      <SmoothScroll>
        <div className="min-h-screen bg-[#f4f4f3] text-zinc-900 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
        {/* Navigation Header */}
        <Navbar />

        {/* Main Content Layout */}
        <main className="flex-grow">
          {/* Hero Section with Interactive 3D Car & Logo Ticker */}
          <Hero />

          {/* About Us (Who We Are / What We Do) */}
          <About />

          {/* Scroll-synced Text Reveal Section */}
          <TextScroll
            text={`WE ARE PASSIONATE ABOUT CARS AND COMMITTED TO DELIVERING UNMATCHED SERVICE QUALITY.\nFROM REGULAR SERVICING TO COMPLETE CAR CARE, WE ENSURE YOUR RIDE STAYS SMOOTH, SAFE, AND RELIABLE.\nBECAUSE YOUR TRUST DRIVES US FORWARD.`}
            unit="Words"
            sectionHeightVh={220}
          />

          {/* Value Proposition Benefits Banner */}
          <Banner />

          {/* Visual Showcase promo (Brakes, QR, experience statement) */}
          <PromoGallery />

          {/* Interactive Services Grid */}
          <Services />

          {/* Horizontal Gallery slider of real work */}
          <Gallery />

          {/* Client Testimonials slider */}
          <Testimonials />

          {/* Frequently Asked Questions */}
          <Faq />
        </main>

        {/* Complete Brand Footer */}
        <Footer />
      </div>
      </SmoothScroll>
    </>
  );
}
