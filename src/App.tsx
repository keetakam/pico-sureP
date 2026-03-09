import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MapPin, Building2, ShieldCheck, Info, Phone, Mail, Facebook, Globe } from 'lucide-react';
import { Navbar, Hero, FeatureCard } from './components/Landing';
import MapPage from './pages/MapPage';
import StaffPage from './pages/StaffPage';
import AboutPage from './pages/AboutPage';
import ContractPage from './pages/ContractPage';

const HomePage = () => (
  <>
    <Hero />
    
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          title="Map ค้นหาผู้ประกอบการ"
          description="ค้นหาผู้ประกอบธุรกิจสินเชื่อพิโกไฟแนนซ์ที่ใกล้เคียงตำแหน่งของคุณ"
          icon={<MapPin size={28} />}
          color="bg-blue-600"
          delay={0.1}
          to="/map"
        />
        <FeatureCard 
          title="Pico Finance ที่เปิดประกอบการ"
          description="ตรวจสอบรายชื่อผู้ประกอบธุรกิจสินเชื่อพิโกไฟแนนซ์ที่เปิดดำเนินการในปัจจุบัน จำแนกตามจังหวัดและประเภทใบอนุญาต"
          icon={<Building2 size={28} />}
          color="bg-emerald-600"
          delay={0.2}
          href="https://www.1359.go.th/picodoc/pico_public/"
        />
        <FeatureCard 
          title="ข้อมูลสำหรับเจ้าหน้าที่ สศค."
          description="ระบบจัดการข้อมูลและรายงานสถิติ"
          icon={<ShieldCheck size={28} />}
          color="bg-amber-600"
          delay={0.3}
          to="/staff"
        />
      </div>
    </section>
  </>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContractPage />} />
            <Route path="/staff" element={<StaffPage />} />
          </Routes>
        </main>

        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              <div className="sm:col-span-2 lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                    <span className="text-white font-bold">P</span>
                  </div>
                  <span className="text-xl font-bold text-white tracking-tight">PICO-SURE</span>
                </div>
                <p className="text-slate-400 mb-6 max-w-md text-sm sm:text-base">
                  โครงการพัฒนาระบบฐานข้อมูลและแผนที่ดิจิทัลผู้ประกอบธุรกิจสินเชื่อพิโกไฟแนนซ์ 
                  โดยสำนักงานเศรษฐกิจการคลัง กระทรวงการคลัง
                </p>
                <div className="flex gap-4">
                  <a href="https://www.1359.go.th" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary active:bg-primary transition-colors" title="เว็บไซต์ 1359.go.th"><Globe size={20} /></a>
                  <a href="mailto:pico.fidp@fpo.go.th" className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary active:bg-primary transition-colors" title="อีเมล"><Mail size={20} /></a>
                </div>
              </div>
              
              <div className="sm:col-span-1">
                <h4 className="text-white font-bold mb-6">เมนูหลัก</h4>
                <ul className="space-y-4 text-sm sm:text-base">
                  <li><Link to="/" className="hover:text-white transition-colors block py-1">หน้าแรก</Link></li>
                  <li><Link to="/map" className="hover:text-white transition-colors block py-1">ค้นหาบนแผนที่</Link></li>
                  <li><a href="https://www.1359.go.th/picodoc/pico_public/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block py-1">รายชื่อผู้ประกอบการ</a></li>
                  <li><Link to="/staff" className="hover:text-white transition-colors block py-1">สำหรับเจ้าหน้าที่</Link></li>
                </ul>
              </div>
              
              <div className="sm:col-span-1">
                <h4 className="text-white font-bold mb-6">ติดต่อสอบถาม</h4>
                <ul className="space-y-4 text-sm sm:text-base">
                  <li className="flex items-start gap-3">
                    <MapPin size={18} className="text-secondary flex-shrink-0 mt-1" />
                    <span className="leading-relaxed">สำนักงานเศรษฐกิจการคลัง <span className="whitespace-nowrap">ถนนพระรามที่ 6</span> แขวงพญาไท เขตพญาไท กรุงเทพฯ 10400</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={18} className="text-secondary flex-shrink-0" />
                    <span>สายด่วน 1359</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail size={18} className="text-secondary flex-shrink-0" />
                    <span className="break-all">pico.fidp@fpo.go.th</span>
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
    </BrowserRouter>
  );
}
