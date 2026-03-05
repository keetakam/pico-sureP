import React from 'react';
import { MapPin, Building2, ShieldCheck, Info, Phone, Mail, Facebook, Globe } from 'lucide-react';
import { Navbar, Hero, FeatureCard } from './components/Landing';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <main>
        <Hero />
        
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Map หาผู้ประกอบการ"
              description="ค้นหาผู้ประกอบการพิโกไฟแนนซ์ในพื้นที่ของคุณผ่านระบบแผนที่อัจฉริยะ แสดงตำแหน่งและข้อมูลติดต่อที่ชัดเจน"
              icon={<MapPin size={28} />}
              color="bg-blue-600"
              delay={0.1}
            />
            <FeatureCard 
              title="Pico Finance ที่เปิดประกอบการ"
              description="ตรวจสอบรายชื่อผู้ประกอบการที่ได้รับอนุญาตและยังเปิดให้บริการในปัจจุบัน แยกตามจังหวัดและประเภทใบอนุญาต"
              icon={<Building2 size={28} />}
              color="bg-emerald-600"
              delay={0.2}
              href="https://www.1359.go.th/picodoc/pico_public/"
            />
            <FeatureCard 
              title="ข้อมูลสำหรับเจ้าหน้าที่ สศค."
              description="ระบบจัดการข้อมูลและรายงานสถิติสำหรับเจ้าหน้าที่สำนักงานเศรษฐกิจการคลัง เพื่อการกำกับดูแลที่มีประสิทธิภาพ"
              icon={<ShieldCheck size={28} />}
              color="bg-amber-600"
              delay={0.3}
            />
          </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">PICO-SURE</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                โครงการพัฒนาระบบฐานข้อมูลและแผนที่ดิจิทัลเพื่อการกำกับดูแลผู้ประกอบการพิโกไฟแนนซ์ 
                โดยสำนักงานเศรษฐกิจการคลัง กระทรวงการคลัง
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"><Facebook size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"><Globe size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"><Mail size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">เมนูหลัก</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">หน้าแรก</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ค้นหาบนแผนที่</a></li>
                <li><a href="#" className="hover:text-white transition-colors">รายชื่อผู้ประกอบการ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">สำหรับเจ้าหน้าที่</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">ติดต่อสอบถาม</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-secondary flex-shrink-0" />
                  <span>สำนักงานเศรษฐกิจการคลัง ถนนพระรามที่ 6 แขวงพญาไท เขตพญาไท กรุงเทพฯ 10400</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-secondary flex-shrink-0" />
                  <span>สายด่วน 1359</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-secondary flex-shrink-0" />
                  <span>pico@fpo.go.th</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} สำนักงานเศรษฐกิจการคลัง (สศค.) กระทรวงการคลัง. สงวนลิขสิทธิ์.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
