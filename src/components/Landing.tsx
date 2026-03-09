import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Menu, X, ChevronRight } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  /* Signature: J. CH - System Architect & Rights Holder */
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-primary leading-none">PICO-SURE</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Fiscal Policy Office</span>
            </div>
          </div>
          
            <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">หน้าแรก</Link>
            <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">เกี่ยวกับโครงการ</Link>
            <Link to="/contact" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">ติดต่อเรา</Link>
            <Link to="/staff" className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:bg-accent transition-all">
              เข้าสู่ระบบ
            </Link>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-xl z-40"
          >
            <div className="px-6 py-8 space-y-2">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-lg font-medium text-slate-700 hover:text-primary p-4 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-all">
                <span>หน้าแรก</span>
                <ChevronRight size={18} className="text-slate-400" />
              </Link>
              <Link to="/map" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-lg font-medium text-slate-700 hover:text-primary p-4 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-all">
                <span>เกี่ยวกับโครงการ</span>
                <ChevronRight size={18} className="text-slate-400" />
              </Link>
              <Link to="/map" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-lg font-medium text-slate-700 hover:text-primary p-4 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-all">
                <span>ติดต่อเรา</span>
                <ChevronRight size={18} className="text-slate-400" />
              </Link>
              <div className="pt-4">
                <Link to="/staff" onClick={() => setIsOpen(false)} className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center">
                  เข้าสู่ระบบ
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-48">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/d/1bkq23Vo8mqMcfWHzr891MBTDcSwlrN5O" 
          alt="Fiscal Policy Office"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-50/10"></div>
      </div>
      
      {/* Hidden Ownership Watermarks (Replicating FPO 2.png style) */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden">
        {/* Top right corner */}
        <div className="absolute top-4 right-4">
          <span className="text-[3px] text-white/3 font-mono">J. CH</span>
        </div>
        {/* On the building area (approximate) */}
        <div className="absolute top-[45%] left-[58%] rotate-[-5deg]">
          <span className="text-[4px] text-black/5 font-mono bg-black/2 px-0.5 rounded">J. CH</span>
        </div>
        {/* On the pillar area (approximate) */}
        <div className="absolute bottom-[25%] left-[15%] opacity-10">
          <span className="text-[5px] text-slate-900/20 font-mono">J. CH</span>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-white uppercase bg-primary/20 rounded-full border border-white/20 backdrop-blur-sm">
              สำนักงานเศรษฐกิจการคลัง
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              ระบบสืบค้นข้อมูล <span className="text-secondary">พิโกไฟแนนซ์</span>
            </h1>
            <p className="max-w-4xl mx-auto text-base sm:text-lg text-slate-200 mb-10 leading-relaxed px-4">
              PICO-SURE ข้อมูลผู้ประกอบการสินเชื่อรายย่อยระดับจังหวัดที่ได้รับอนุญาตจากกระทรวงการคลัง
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
              <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-semibold shadow-xl shadow-primary/20 hover:bg-accent active:scale-95 transition-all duration-300">
                เริ่มต้นใช้งาน
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/90 backdrop-blur-sm text-slate-700 border border-slate-200 rounded-2xl font-semibold hover:bg-white active:scale-95 transition-all">
                คู่มือการใช้งาน
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
  href?: string;
  to?: string;
}

export const FeatureCard = ({ title, description, icon, color, delay = 0, href, to }: FeatureCardProps) => {
  const CardContent = (
    <>
      <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-5 group-hover:opacity-10 transition-opacity", color)}></div>
      
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner", color.replace('bg-', 'bg-opacity-10 text-'))}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
      
      <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
        <span>เข้าใช้งาน</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl active:scale-[0.98] md:hover:-translate-y-2 transition-all duration-500 overflow-hidden"
    >
      {href ? (
        <a href={href} className="block p-8 h-full" target="_blank" rel="noopener noreferrer">
          {CardContent}
        </a>
      ) : to ? (
        <Link to={to} className="block p-8 h-full">
          {CardContent}
        </Link>
      ) : (
        <div className="p-8 h-full">
          {CardContent}
        </div>
      )}
    </motion.div>
  );
};
