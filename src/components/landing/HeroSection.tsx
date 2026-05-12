type HeroSectionProps = {
  onExplore: () => void;
  heroRef?: React.RefObject<HTMLElement | null>;
};

const HeroSection = ({ onExplore, heroRef }: HeroSectionProps) => {
  return (
    <section ref={heroRef} className="snap-section relative h-screen overflow-hidden">

      <div className="hero-cube relative h-screen overflow-hidden flex items-center justify-center px-6 bg-soft-gradient">

        {/* BLOBS */}
        <div className="absolute top-[-120px] left-[-80px] w-[420px] h-[420px] rounded-full bg-[rgba(140,122,230,0.22)] blur-3xl animate-drift"></div>
        <div className="absolute bottom-[-140px] right-[-100px] w-[380px] h-[380px] rounded-full bg-[rgba(142,218,229,0.18)] blur-3xl animate-drift"></div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center text-center hero-content">

          <img src="/quilpana-logo.png" className="w-36 md:w-48 mb-8 animate-float" />

          <p className="uppercase tracking-[0.35em] text-sm text-white/70 mb-4">
            Play • Create • Explore
          </p>

          <h1 className="text-7xl md:text-9xl font-black text-white">
            Quilpana
          </h1>

          <p className="mt-8 text-xl text-white/75 max-w-3xl">
            A space where ideas become games, creativity becomes interactive, and learning feels alive.
          </p>

        </div>

        {/* EXPLORE */}
        <div
          onClick={onExplore}
          className="absolute bottom-10 flex flex-col items-center cursor-pointer animate-bounce z-20"
        >
          <img src="/explore-arrow.png" className="w-10 opacity-80" />
          <p className="text-xs tracking-[0.3em] uppercase text-white/70 mt-2">
            Explore
          </p>
        </div>

      </div>

    </section>
  );
};

export default HeroSection;