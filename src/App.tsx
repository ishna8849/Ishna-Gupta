/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, PenTool, Loader2, Star, TrendingUp, AlertCircle, Sparkles, Coffee, Coins, Flower2, Flower, Activity, Leaf, Sprout } from 'lucide-react';
import { analyzePlot } from './services/geminiService';
import { PlotAnalysis } from './types';

export default function App() {
  const [plot, setPlot] = useState('');
  const [analysis, setAnalysis] = useState<PlotAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const HealthMeter = ({ score }: { score: number }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <div className="metadata-label flex items-center gap-2">
          <Activity className="w-3 h-3" />
          Story Health Meter
        </div>
        <div className="text-2xl font-display text-coffee">{score}%</div>
      </div>
      <div className="h-2 w-full bg-latte/30 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-sepia"
        />
      </div>
    </div>
  );

  const FloralBorder = () => (
    <>
      <motion.div
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="corner-flower corner-top-left"
      >
        <Flower className="w-full h-full" />
      </motion.div>
      <motion.div
        animate={{ rotate: [90, 95, 90, 85, 90] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="corner-flower corner-top-right"
      >
        <Flower className="w-full h-full" />
      </motion.div>
      <motion.div
        animate={{ rotate: [-90, -85, -90, -95, -90] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="corner-flower corner-bottom-left"
      >
        <Flower className="w-full h-full" />
      </motion.div>
      <motion.div
        animate={{ rotate: [180, 185, 180, 175, 180] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="corner-flower corner-bottom-right"
      >
        <Flower className="w-full h-full" />
      </motion.div>
    </>
  );

  const FloralLine = () => (
    <div className="floral-divider overflow-hidden">
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="floral-line origin-left" 
      />
      <motion.div
        animate={{ 
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Flower2 className="floral-icon" />
      </motion.div>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="floral-line origin-right" 
      />
    </div>
  );

  const FloatingFlower = ({ 
    delay = 0, 
    x = "0%", 
    duration = 15, 
    size = "w-4 h-4", 
    drift = 50, 
    rotation = 360,
    opacity = 0.2,
    icon: Icon = Flower2,
    yOffset = "110vh" 
  }: { 
    delay?: number; 
    x?: string; 
    duration?: number;
    size?: string;
    drift?: number;
    rotation?: number;
    opacity?: number;
    icon?: any;
    yOffset?: string;
  }) => (
    <motion.div
      initial={{ y: yOffset, opacity: 0, x, scale: 0.5 }}
      animate={{ 
        y: "-20vh", 
        opacity: [0, opacity, opacity, 0],
        rotate: rotation,
        scale: [0.5, 1, 1, 0.8],
        x: [
          `calc(${x} + 0px)`, 
          `calc(${x} + ${drift}px)`, 
          `calc(${x} - ${drift}px)`, 
          `calc(${x} + ${drift / 2}px)`,
          `calc(${x} + 0px)`
        ]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay, 
        ease: "linear" 
      }}
      className={`fixed pointer-events-none text-coffee/20 ${size}`}
      style={{ zIndex: -1 }}
    >
      <Icon className="w-full h-full" />
    </motion.div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plot.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzePlot(plot);
      setAnalysis(result);
    } catch (err) {
      setError('The ink has run dry... Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const RatingBadge = ({ label, value, icon: Icon }: { label: string; value: number; icon: any }) => (
    <div className="flex flex-col items-center p-6 border border-latte relative">
      <div className="metadata-label mb-4">{label}</div>
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-coffee/40" />
        <span className="text-4xl font-display font-light">{value}</span>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen py-20 px-6 flex justify-center selection:bg-coffee/10 selection:text-ink overflow-x-hidden">
      {/* Background Floating Elements */}
      <FloatingFlower x="5vw" delay={0} duration={25} size="w-3 h-3" drift={40} opacity={0.08} icon={Leaf} />
      <FloatingFlower x="15vw" delay={4} duration={18} size="w-4 h-4" drift={30} opacity={0.1} />
      <FloatingFlower x="28vw" delay={7} duration={12} size="w-5 h-5" drift={60} opacity={0.15} rotation={-450} icon={Sprout} />
      <FloatingFlower x="35vw" delay={2} duration={22} size="w-2 h-2" drift={20} opacity={0.05} />
      <FloatingFlower x="42vw" delay={10} duration={20} size="w-4 h-4" drift={40} opacity={0.12} icon={Flower} />
      <FloatingFlower x="52vw" delay={1} duration={28} size="w-3 h-3" drift={35} opacity={0.07} icon={Leaf} rotation={180} />
      <FloatingFlower x="60vw" delay={5} duration={14} size="w-6 h-6" drift={80} opacity={0.08} rotation={280} icon={Sprout} />
      <FloatingFlower x="68vw" delay={15} duration={24} size="w-4 h-4" drift={45} opacity={0.1} icon={Flower} />
      <FloatingFlower x="78vw" delay={8} duration={16} size="w-3 h-3" drift={25} opacity={0.18} />
      <FloatingFlower x="82vw" delay={3} duration={19} size="w-5 h-5" drift={55} opacity={0.09} icon={Leaf} />
      <FloatingFlower x="88vw" delay={12} duration={22} size="w-4 h-4" drift={50} opacity={0.1} icon={Flower} />
      <FloatingFlower x="92vw" delay={6} duration={26} size="w-3 h-3" drift={30} opacity={0.06} icon={Sprout} />
      <FloatingFlower x="97vw" delay={0} duration={20} size="w-2 h-2" drift={15} opacity={0.2} />

      {/* Decorative coffee stains */}
      <div className="coffee-stain top-[-50px] left-[-50px]" />
      <div className="coffee-stain bottom-[-100px] right-[-100px] opacity-5" />

      <div className="max-w-3xl w-full space-y-20 relative">
        
        {/* Header */}
        <header className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="metadata-label flex items-center justify-center gap-2"
          >
            <Coffee className="w-3 h-3" />
            Morning Brew Scribbles • No. {Math.floor(Math.random() * 9000) + 1000}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light italic tracking-tight flex items-center justify-center gap-4"
          >
            Plot Oracle
          </motion.h1>
          <FloralLine />
        </header>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 border border-red-200 bg-red-50 text-red-900/60 font-sans text-[10px] uppercase tracking-widest flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-3 h-3" />
                {error}
              </div>
              <button 
                onClick={() => setError(null)}
                className="hover:text-red-900 transition-colors"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="manuscript-card rounded-sm overflow-visible ornate-border"
        >
          <FloralBorder />
          <form onSubmit={handleSubmit} className="space-y-12 pl-6">
            <div className="relative">
              <div className="metadata-label mb-2">Morning Reflection: Book Plot</div>
              <textarea
                value={plot}
                onChange={(e) => setPlot(e.target.value)}
                placeholder="Pour your plot here like fresh espresso..."
                className="vintage-input min-h-[160px] resize-none custom-scrollbar"
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isLoading || !plot.trim()}
                className="ink-button"
              >
                {isLoading ? (
                  <span className="flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin text-white/50" />
                    Brewing...
                  </span>
                ) : (
                  "Brew Analysis"
                )}
              </button>
              
              {analysis && (
                <button 
                  type="button"
                  onClick={() => {
                    setPlot('');
                    setAnalysis(null);
                  }}
                  className="metadata-label hover:text-coffee transition-colors"
                >
                  Turn Page
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-16 py-12 border-t border-latte"
            >
              {/* Report Header */}
              <div className="flex justify-between items-end border-b border-latte pb-4">
                <div className="metadata-label">Diary Entry Analysis</div>
                <div className="metadata-label">Mood: Caffeinated</div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-latte border border-latte">
                <div className="bg-paper relative overflow-visible">
                  <RatingBadge 
                    label="Originality Score" 
                    value={analysis.originalityRating} 
                    icon={Sparkles} 
                  />
                </div>
                <div className="bg-paper relative overflow-visible">
                  <RatingBadge 
                    label="Interest Index" 
                    value={analysis.interestRate} 
                    icon={TrendingUp} 
                  />
                </div>
              </div>

              <HealthMeter score={analysis.storyHealth} />

              <FloralLine />

              {/* Narratives */}
              <div className="space-y-16">
                <section className="space-y-6">
                  <div className="metadata-label">The Oracle's Appraisal</div>
                  <p className="text-2xl font-light leading-relaxed text-ink/90 first-letter:text-5xl first-letter:font-script first-letter:mr-3 first-letter:text-coffee">
                    {analysis.attractiveness}
                  </p>
                </section>

                <section className="space-y-6">
                  <div className="metadata-label">Originality Breakdown</div>
                  <div className="p-8 border border-latte bg-white/30 space-y-6">
                    <div>
                      <h4 className="font-display text-sm tracking-widest mb-2 opacity-60">Core Uniqueness</h4>
                      <p className="text-lg italic">{analysis.conceptUniqueness}</p>
                    </div>
                    <div className="divider opacity-10 !my-4" />
                    <div>
                      <h4 className="font-display text-sm tracking-widest mb-3 opacity-60">Detected Tropes</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.tropes.map((trope, i) => (
                          <span key={i} className="px-3 py-1 border border-latte text-[10px] uppercase tracking-widest bg-paper text-sepia">
                            {trope}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <div className="grid md:grid-cols-2 gap-12">
                  <section className="p-8 border border-latte rounded-sm relative">
                    <Flower className="absolute -top-2 -left-2 w-4 h-4 text-latte bg-paper" />
                    <div className="metadata-label mb-4">Market Pulse</div>
                    <p className="italic text-lg text-sepia-light">
                      {analysis.popularityPotential}
                    </p>
                  </section>

                  <section className="p-8 border border-latte rounded-sm relative">
                    <Flower className="absolute -top-2 -right-2 w-4 h-4 text-latte bg-paper" />
                    <div className="metadata-label mb-4 flex items-center gap-2">
                       <Coins className="w-3 h-3" />
                       Economic Feasibility
                    </div>
                    <p className="text-sm text-ink/80 leading-relaxed font-sans border-l border-latte pl-4">
                      {analysis.economicSuitability}
                    </p>
                  </section>
                </div>

                <div className="space-y-4">
                  <div className="metadata-label">Narrative Stains (Holes)</div>
                  <ul className="space-y-4 font-sans text-sm">
                    {analysis.plotHoles.length > 0 ? (
                      analysis.plotHoles.map((hole, i) => (
                        <li key={i} className="flex gap-4 text-ink/70 items-start">
                          <Flower2 className="w-3 h-3 text-coffee/30 mt-1" />
                          {hole}
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-green-800/60 italic">Crystal clear brew. No leaks.</li>
                    )}
                  </ul>
                </div>

                <FloralLine />

                <section className="space-y-6 pt-0">
                  <div className="metadata-label">Long-Form Reflections</div>
                  <div className="columns-1 md:columns-2 gap-12 space-y-6 text-ink/80 leading-relaxed text-sm">
                    {analysis.detailedAnalysis.split('\n').filter(p => p.trim()).map((para, i) => (
                      <p key={i} className="mb-6">{para}</p>
                    ))}
                  </div>
                </section>
              </div>

              {/* Final Seal */}
              <footer className="text-center pt-20">
                <div className="inline-block p-10 border border-latte rounded-full opacity-30 select-none relative">
                   <Flower className="absolute inset-x-0 -top-4 mx-auto w-6 h-6 text-coffee" />
                   <Coffee className="absolute inset-0 m-auto w-8 h-8 text-coffee opacity-20" />
                   <div className="w-20 h-20 border-2 border-coffee rounded-full flex items-center justify-center">
                    <div className="font-display text-xs">BREW</div>
                  </div>
                </div>
                <div className="metadata-label mt-4">Closed by the Morning Brew Oracle</div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}


