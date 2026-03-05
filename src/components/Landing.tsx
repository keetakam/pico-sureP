import React from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
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
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">หน้าแรก</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">เกี่ยวกับโครงการ</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">ติดต่อเรา</a>
            <button className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:bg-accent transition-all">
              เข้าสู่ระบบ
            </button>
          </div>
          
          <div className="md:hidden">
            <button className="p-2 text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#003366_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
              สำนักงานเศรษฐกิจการคลัง
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              ระบบสืบค้นข้อมูล <span className="text-primary">พิโกไฟแนนซ์</span> <br className="hidden md:block" />
              
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
              PICO-SURE ข้อมูลผู้ประกอบการสินเชื่อรายย่อยระดับจังหวัดที่ได้รับอนุญาตจากกระทรวงการคลัง 
              
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-semibold shadow-xl shadow-primary/20 hover:bg-accent hover:-translate-y-1 transition-all duration-300">
                เริ่มต้นใช้งาน
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition-all">
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
}

export const FeatureCard = ({ title, description, icon, color, delay = 0, href }: FeatureCardProps) => {
  const CardContent = (
    <>
      <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-5 group-hover:opacity-10 transition-opacity", color)}></div>
      
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner", color.replace('bg-', 'bg-opacity-10 text-'))}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
      
      <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
        <span>เข้าใช้งานระบบ</span>
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
      className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
    >
      {href ? (
        <a href={href} className="block p-8 h-full" target="_blank" rel="noopener noreferrer">
          {CardContent}
        </a>
      ) : (
        <div className="p-8 h-full">
          {CardContent}
        </div>
      )}
    </motion.div>
  );
};
