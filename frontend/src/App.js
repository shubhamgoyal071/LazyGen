import "@/App.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { Upload, Settings, Zap, ArrowRight, Check } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PANDA_LOGO = "https://customer-assets.emergentagent.com/job_22990b85-c24e-49bf-a598-fc26b361df44/artifacts/jkf5exp1_WhatsApp%20Image%202026-03-24%20at%209.09.53%20PM.jpeg";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const pandaFloat = {
  animate: {
    y: [-10, 10, -10],
    scale: [1, 1.03, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Hero Section
const HeroSection = () => {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section data-testid="hero-section" className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-20 lg:py-0">
      <motion.div 
        className="lg:w-1/2 text-left"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.p 
          variants={fadeInUp}
          className="text-sm md:text-base tracking-widest uppercase mb-6 text-[#888]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          job hunting is so last season
        </motion.p>
        
        <motion.h1 
          variants={fadeInUp}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] mb-8"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          You rest.
          <br />
          <span className="text-[#888]">We apply.</span>
        </motion.h1>
        
        <motion.p 
          variants={fadeInUp}
          className="text-lg md:text-xl text-[#666] max-w-lg mb-10"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Upload your resume. Set your vibe. Go touch grass while we spam recruiters for you.
        </motion.p>
        
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
          <button 
            data-testid="hero-cta-btn"
            onClick={scrollToWaitlist}
            className="btn-invert px-8 py-4 rounded-full text-lg font-semibold cta-pulse"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Join the Waitlist
          </button>
          <p className="text-sm text-[#888] self-center" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            stop grinding. start delegating.
          </p>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="lg:w-1/2 flex justify-center lg:justify-end mt-16 lg:mt-0"
        variants={pandaFloat}
        animate="animate"
      >
        <img 
          data-testid="hero-panda-logo"
          src={PANDA_LOGO} 
          alt="LazyGen Panda" 
          className="w-72 md:w-96 lg:w-[500px] object-contain"
        />
      </motion.div>
    </section>
  );
};

// Panda Story Section
const PandaStorySection = () => {
  return (
    <section data-testid="story-section" className="py-32 px-6 md:px-12 lg:px-24 bg-[#FAFAFA]">
      <motion.div 
        className="max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.p 
          variants={fadeInUp}
          className="text-sm tracking-widest uppercase mb-8 text-[#888]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          the lore
        </motion.p>
        
        <motion.h2 
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-8"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          While you sleep...
        </motion.h2>
        
        <motion.div 
          variants={fadeInUp}
          className="flex items-center gap-6 mb-8"
        >
          <motion.img 
            src={PANDA_LOGO} 
            alt="Sleeping Panda" 
            className="w-24 h-24 object-contain"
            animate={{ 
              rotate: [0, -5, 0, 5, 0],
              transition: { duration: 3, repeat: Infinity }
            }}
          />
          <p className="text-xl md:text-2xl text-[#666]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            LazyGen is out here applying to 50+ jobs for you. no cap.
          </p>
        </motion.div>
        
        <motion.p 
          variants={fadeInUp}
          className="text-lg text-[#888] border-l-4 border-[#0A0A0A] pl-6"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          "why manually apply when a panda can do it better?" — ancient wisdom, probably
        </motion.p>
      </motion.div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    { icon: Upload, title: "Upload your resume", desc: "drop that PDF like it's hot" },
    { icon: Settings, title: "Set your filters", desc: "remote only? $200k min? we got you" },
    { icon: Zap, title: "We auto-apply everywhere", desc: "mass application speedrun any%" }
  ];

  return (
    <section data-testid="how-it-works-section" className="py-32 px-6 md:px-12 lg:px-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.p 
          variants={fadeInUp}
          className="text-sm tracking-widest uppercase mb-8 text-[#888]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          how it works
        </motion.p>
        
        <motion.h2 
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-16"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          3 steps. that's it.
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="step-card p-8 border border-[#222] rounded-2xl"
              data-testid={`step-card-${index + 1}`}
            >
              <div className="w-16 h-16 bg-[#0A0A0A] rounded-full flex items-center justify-center mb-6">
                <step.icon className="w-8 h-8 text-[#FAFAFA]" />
              </div>
              <p className="text-6xl font-black text-[#E5E5E5] mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                0{index + 1}
              </p>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {step.title}
              </h3>
              <p className="text-[#888]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.p 
          variants={fadeInUp}
          className="text-center text-lg text-[#888] mt-16"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          no forms. no repetition. no burnout.
        </motion.p>
      </motion.div>
    </section>
  );
};

// Pain Points Section
const PainPointsSection = () => {
  const pains = [
    "Applied to 150 jobs. Heard back from 3.",
    "Typing the same info again. And again.",
    "LinkedIn became a full-time job",
    "Cover letters? In this economy?"
  ];

  return (
    <section data-testid="pain-section" className="py-32 px-6 md:px-12 lg:px-24 bg-[#FAFAFA]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.p 
          variants={fadeInUp}
          className="text-sm tracking-widest uppercase mb-8 text-[#888]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          the struggle is real
        </motion.p>
        
        <motion.h2 
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-16"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Sound familiar?
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {pains.map((pain, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="pain-card p-8 bg-white border border-[#222] rounded-xl"
              data-testid={`pain-card-${index + 1}`}
            >
              <p className="text-xl md:text-2xl font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                "{pain}"
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          variants={fadeInUp}
          className="mt-16 text-center"
        >
          <p className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Outfit', sans-serif" }}>
            We replaced that.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Value Section
const ValueSection = () => {
  const values = [
    "Applies automatically while you nap",
    "Works with LinkedIn (for now)",
    "Saves hours daily — use them wisely",
    "More reach = more interviews = more options"
  ];

  return (
    <section data-testid="value-section" className="py-32 px-6 md:px-12 lg:px-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.p 
          variants={fadeInUp}
          className="text-sm tracking-widest uppercase mb-8 text-[#888]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          why lazygen hits different
        </motion.p>
        
        <motion.h2 
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-16"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Effort is overrated.
          <br />
          <span className="text-[#888]">Results aren't.</span>
        </motion.h2>
        
        <div className="space-y-6 max-w-2xl">
          {values.map((value, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="value-item flex items-center gap-4"
              data-testid={`value-item-${index + 1}`}
            >
              <div className="w-8 h-8 bg-[#0A0A0A] rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-[#FAFAFA]" />
              </div>
              <p className="text-lg md:text-xl" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Waitlist Section
const WaitlistSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast.error("bruh, fill in both fields");
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post(`${API}/waitlist`, { name, email });
      if (response.data.success) {
        setSubmitted(true);
        toast.success("you're in! welcome to the lazy side");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("you already signed up, chill");
      } else {
        toast.error("something broke. try again?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="waitlist"
      data-testid="waitlist-section" 
      className="py-32 px-6 md:px-12 lg:px-24 bg-[#0A0A0A] text-[#FAFAFA]"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-2xl"
      >
        <motion.p 
          variants={fadeInUp}
          className="text-sm tracking-widest uppercase mb-8 text-[#888]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          join the waitlist
        </motion.p>
        
        <motion.h2 
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-8"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Be early. Be lazy.
          <br />
          Be ahead.
        </motion.h2>

        {!submitted ? (
          <motion.form 
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div>
              <input
                data-testid="waitlist-name-input"
                type="text"
                placeholder="your name (or nickname, we don't judge)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-inverted"
                disabled={loading}
              />
            </div>
            
            <div>
              <input
                data-testid="waitlist-email-input"
                type="email"
                placeholder="email (for good news only)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-inverted"
                disabled={loading}
              />
            </div>
            
            <button 
              data-testid="waitlist-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 bg-[#FAFAFA] text-[#0A0A0A] rounded-full text-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#888] transition-colors duration-300 disabled:opacity-50"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {loading ? "sending..." : "Get Early Access"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-[#FAFAFA] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-[#0A0A0A]" />
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              you're on the list!
            </h3>
            <p className="text-[#888]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              we'll hit you up when it's time to be lazy professionally.
            </p>
          </motion.div>
        )}
        
        <motion.p 
          variants={fadeInUp}
          className="text-sm text-[#666] mt-8"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          no spam. just vibes and early access.
        </motion.p>
      </motion.div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer data-testid="footer-section" className="py-12 px-6 md:px-12 lg:px-24 border-t border-[#222]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img src={PANDA_LOGO} alt="LazyGen" className="w-10 h-10 object-contain" />
          <span className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>LazyGen</span>
        </div>
        
        <p className="text-sm text-[#888]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          built for lazy geniuses
        </p>
        
        <p className="text-sm text-[#888]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          2025 LazyGen. all rights reserved (barely).
        </p>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="App relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Toast notifications */}
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: '#0A0A0A',
            color: '#FAFAFA',
            fontFamily: "'JetBrains Mono', monospace",
            border: '1px solid #222'
          }
        }}
      />
      
      {/* Page content */}
      <HeroSection />
      <PandaStorySection />
      <HowItWorksSection />
      <PainPointsSection />
      <ValueSection />
      <WaitlistSection />
      <Footer />
    </div>
  );
}

export default App;
