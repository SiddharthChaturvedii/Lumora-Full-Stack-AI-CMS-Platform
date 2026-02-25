"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  features,
  platformTabs,
  socialProofStats,
  testimonials,
} from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/hero-section";
import ElectricBorder from "@/components/ui/electric-border";
import GhostCursor from "@/components/ui/ghost-cursor";
import TiltedCard from "@/components/ui/tilted-card";
import Magnet from "@/components/ui/magnet";


const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState(0);
  const [magnetActive, setMagnetActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Data arrays
  const navigationItems = [
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Strict black background */}
      <div className="fixed inset-0 bg-black -z-50"></div>

      {/* New Desktop Scroll-Trigger Hero Section & Mobile Hero Overlay */}
      <HeroSection />

      {/* Features Grid */}
      <section
        id="features"
        className="relative z-10 pt-20 pb-8 sm:pb-12 px-4 sm:px-6 bg-black scroll-mt-20 overflow-hidden"
      >
        {/* Ghost cursor background effect */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <GhostCursor
            color="#c60c0c"
            brightness={2}
            edgeIntensity={0}
            trailLength={15}
            inertia={0.6}
            grainIntensity={0.03}
            bloomStrength={0.08}
            bloomRadius={0.8}
            bloomThreshold={0.025}
            fadeDelayMs={1000}
            fadeDurationMs={1500}
            maxDevicePixelRatio={0.35}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'auto' }}
            zIndex={0}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 sm:mb-3 uppercase tracking-tighter">
              <span className="text-white">Everything you need</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto px-4 uppercase tracking-widest text-sm">
              From AI-powered writing assistance to advanced analytics,
              we&apos;ve built the complete toolkit for modern creators.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {features.map((feature, index) => (
              <Link href={feature.link} key={index} className="block">
                <TiltedCard
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  className="h-full"
                >
                  <Card className="transition-colors duration-300 hover:bg-[#111] bg-[#0a0a0a] border-[#222] hover:border-[#cc0000] h-full shadow-none rounded-lg">
                    <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-[#cc0000] rounded-none flex items-center justify-center mb-3 sm:mb-4"
                      >
                        <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <CardTitle className="text-base sm:text-lg mb-2 sm:mb-3 text-white uppercase tracking-tighter">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base text-gray-400 mt-auto">
                        {feature.desc}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </TiltedCard>
              </Link>
            ))}
          </div>
        </div>

      </section>

      {/* Sticky scroll overlay container — both sections in one wrapper */}
      <div className="relative z-10">
        {/* "How it works" — sticky, fills viewport */}
        <section
          className="px-4 sm:px-6 bg-black flex items-center"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            minHeight: '100vh',
            overflow: 'hidden',
          }}
        >
          {/* Ghost cursor background effect */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
            <GhostCursor
              color="#c60c0c"
              brightness={2}
              edgeIntensity={0}
              trailLength={15}
              inertia={0.6}
              grainIntensity={0.03}
              bloomStrength={0.08}
              bloomRadius={0.8}
              bloomThreshold={0.025}
              fadeDelayMs={1000}
              fadeDurationMs={1500}
              maxDevicePixelRatio={0.35}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'auto' }}
              zIndex={0}
            />
          </div>
          <div className="max-w-7xl mx-auto relative z-10 w-full py-16 sm:py-24">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 uppercase tracking-tighter">
                <span className="text-white">How it works</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto uppercase tracking-widest text-sm">
                Three powerful modules working together to supercharge your
                content creation.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <div className="space-y-4">
                  {platformTabs.map((tab, index) => (
                    <Button
                      key={index}
                      variant={activeTab === index ? "outline" : "ghost"}
                      onClick={() => setActiveTab(index)}
                      className={`w-full justify-start h-auto p-6 rounded-none border-l-4 ${activeTab === index ? 'border-l-[#cc0000] bg-[#111]' : 'border-l-transparent'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-none flex items-center justify-center ${activeTab === index
                            ? "bg-[#cc0000]"
                            : "bg-[#222]"
                            }`}
                        >
                          <tab.icon className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-lg uppercase tracking-tight">{tab.title}</h3>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="lg:w-2/3">
                <Card className="bg-[#0a0a0a] border-[#222] rounded-none">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">
                      {platformTabs[activeTab].title}
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-400">
                      {platformTabs[activeTab].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {platformTabs[activeTab].features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* "Loved by creators worldwide" — slides up OVER the sticky section */}
        <section
          className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#050505]"
          style={{ zIndex: 2 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-12 sm:mb-16 uppercase tracking-tighter">
              <span className="text-white">
                Loved by creators worldwide
              </span>
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
              {socialProofStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#cc0000] rounded-none flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2 text-white">
                    {stat.metric}
                  </div>
                  <div className="text-[#666] uppercase tracking-widest text-xs font-bold sm:text-sm mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 bg-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 uppercase tracking-tighter">
              <span className="text-white">What creators say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group h-full">
                <ElectricBorder
                  color="#cc0000"
                  speed={2}
                  chaos={0.15}
                  style={{ borderRadius: 0 }}
                  className="h-full transition-all duration-300 group-hover:-translate-y-2"
                >
                  <Card className="transition-all duration-300 group-hover:bg-[#111] group-hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] bg-[#0a0a0a] border-[#222] rounded-none shadow-none relative z-10 h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#cc0000] text-[#cc0000]"
                          />
                        ))}
                      </div>
                      <p className="mb-6 leading-relaxed text-gray-300 font-mono text-sm flex-grow">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="relative w-12 h-12">
                          <Image
                            src={`https://images.unsplash.com/photo-${testimonial.imageId}?w=100&h=100&fit=crop&crop=face`}
                            alt={testimonial.name}
                            fill
                            className="rounded-none border-2 border-[#cc0000] object-cover grayscale"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <div className="font-bold tracking-tight uppercase text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {testimonial.role}
                          </div>
                          <Badge className="mt-1 bg-[#222] text-white group-hover:bg-[#cc0000] transition-colors rounded-none border-none">
                            {testimonial.company}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ElectricBorder>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 bg-[#050505] border-t border-[#222]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 sm:mb-8 uppercase tracking-tighter">
            <span className="text-white">Ready to create?</span>
          </h2>
          <p className="text-xl text-gray-500 mb-8 sm:mb-12 max-w-2xl mx-auto font-mono text-sm leading-relaxed">
            Join thousands of creators who are already building their audience
            and growing their business with our AI-powered platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Magnet padding={80} disabled={false} magnetStrength={8} onActiveChange={setMagnetActive}>
              <Link href="/dashboard">
                <Button
                  size="xl"
                  variant="primary"
                  className="rounded-none text-white w-full uppercase tracking-widest font-black"
                >
                  Start Your Journey
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </Magnet>
            <div
              style={{
                transform: magnetActive ? 'translateX(40px)' : 'translateX(0)',
                transition: magnetActive ? 'transform 0.3s ease-out' : 'transform 0.5s ease-in-out',
              }}
            >
              <Link href="/feed">
                <Button
                  variant="outline"
                  size="xl"
                  className="rounded-none w-full uppercase tracking-widest font-black"
                >
                  Explore the Feed
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            Made with ❤️ by{" "}
            <span className="text-foreground font-semibold">Siddharth Chaturvedi</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
