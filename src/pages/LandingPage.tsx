import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion"; 
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/*{import brainMascot from "../assets/brain-mascot.png"; // placeholder
import QuilpanaLogo from "../assets/quilpana-logo.png"; // placeholder}*/
import LandingSection from "../components/landing/LandingSection";
import HeroSection from "../components/landing/HeroSection";
import Sidebar from "../components/landing/Sidebar";
import SynapseChat from "../components/chat/SynapseChat";
import Footer from "../components/Footer";  
  
const LandingPage: React.FC = () => {
  const [experienceStarted, setExperienceStarted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const firstSectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {

    const container = scrollContainerRef.current;
    const hero = heroRef.current;
    const firstSection = firstSectionRef.current;

    if (!container || !hero || !firstSection) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        scroller: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(hero, {
      yPercent: -22,
      rotationX: -18,
      scale: 0.92,
      transformOrigin: "center top",
      ease: "none",
    }, 0)
      .fromTo(
        firstSection,
        { yPercent: 30, opacity: 0.3, scale: 0.96 },
        { yPercent: 0, opacity: 1, scale: 1, ease: "none" },
        0
      );

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
   <div
  ref={scrollContainerRef}
  className={`
   snap-container
    h-screen
    overflow-x-hidden
    scroll-smooth
    font-sans
    text-gray-900
    bg-[var(--bg-main)]
    ${experienceStarted
      ? "overflow-y-scroll"
      : "overflow-hidden"}
    `}
>

      {/* HERO */}
      <HeroSection 
        heroRef={heroRef}
        onExplore={() => {
          setExperienceStarted(true);
          firstSectionRef.current?.scrollIntoView({
           behavior: "smooth",
          });
      }} />

{/* FLOATING SIDEBAR AND SYNAPSE CHAT */}

{experienceStarted &&(
  <Sidebar />
    )}

{experienceStarted &&(
  <SynapseChat />
    )}

{/* SECTIONS */}

<div ref={firstSectionRef} className="snap-section relative z-0">

<motion.div

  initial={{
    y: 120,
    opacity: 0,
  }}

  whileInView={{
    y: 0,
    opacity: 1,
  }}

  transition={{
    duration: 0.9,
    ease: "easeOut",
  }}

  viewport={{
    once: false,
    amount: 0.2,
  }}

  className="
    relative
    z-20
    bg-[var(--bg-main)]
    rounded-t-[4rem]
    shadow-[0_-30px_80px_rgba(0,0,0,0.12)]
  "
>
  <LandingSection
  dark
  title="What is Quilpana?"
  text="Quilpana is a space for interactive creativity. A place where games, ideas, experiments, learning, and imagination blend together into experiences people can explore."
  image="/placeholder1.png"
/>
</motion.div>
</div>

    <LandingSection
      title="Built Around Possibility"
      text="We believe creativity should feel alive. Not locked behind complexity, expensive tools, or technical barriers. Quilpana exists to make experimentation playful and accessible."
      image="/placeholder2.png"
      reverse
    />

    <LandingSection
      dark
      title="Play Mode"
      text="Discover games, challenges, experiments, and interactive worlds created by people exploring ideas in their own unique ways."
      image="/placeholder3.png"
      buttonText="Explore Games"
    />

    <LandingSection
      title="Creator Studio"
      text="Build your own experiences using templates, systems, AI tools, and creative workflows designed to help ideas become playable realities."
      image="/placeholder4.png"
      reverse
      buttonText="Start Creating"
    />

    <LandingSection
    dark
      title="More Than A Platform"
      text="Quilpana is not just about publishing games. It is about curiosity, experimentation, storytelling, systems, design, learning, and discovering what people can create when given space."
      image="/placeholder5.png"
    />

    <LandingSection
      title="Meet Synapse"
      text="Synapse is your companion through Quilpana. A playful AI guide designed to help you explore, learn, create, and discover new possibilities across the platform."
      image="/placeholder6.png"
      reverse
    />

    <LandingSection
    dark
      title="Still Evolving"
      text="Local AI tools, multiplayer systems, community challenges, creator economies, interactive learning experiences, and experimental worlds are only the beginning."
      image="/placeholder7.png"
    />

    <LandingSection
      title="Explore Beyond Quilpana"
      text="Follow the journey, discover side projects, share feedback, and watch Quilpana evolve from an idea into an expanding universe of creativity."
      image="/placeholder8.png"
      reverse
      buttonText="Explore More"
    />

    <Footer />
</div>
  );
};

export default LandingPage;
