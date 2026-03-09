import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowLeft, Home, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const StaffPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-3xl"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full z-10"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Lock size={36} className="text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">ระบบเจ้าหน้าที่ สศค.</h1>
              <p className="text-slate-500 text-sm mt-2">กรุณาเข้าสู่ระบบเพื่อจัดการข้อมูล</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">ชื่อผู้ใช้งาน (User)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <User size={20} />
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    placeholder="กรอกชื่อผู้ใช้งาน"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">รหัสผ่าน (Password)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <Lock size={20} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    placeholder="กรอกรหัสผ่าน"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-accent active:scale-[0.98] transition-all mt-2">
                เข้าสู่ระบบ
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-500 text-sm leading-relaxed">
                ระบบจัดการข้อมูลสำหรับเจ้าหน้าที่ สศค.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-slate-600 hover:text-primary font-semibold transition-all"
          >
            <Home size={18} />
            กลับหน้าแรก
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-slate-600 hover:text-primary font-semibold transition-all"
          >
            <ArrowLeft size={18} />
            ย้อนกลับ
          </button>
        </div>
      </motion.div>

      {/* Decorative Image */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute bottom-[-5%] right-[-5%] w-1/2 max-w-lg hidden lg:block pointer-events-none"
      >
        <img 
          src="https://picsum.photos/seed/office/800/800" 
          alt="Office Illustration" 
          className="rounded-full grayscale"
        />
      </motion.div>
    </div>
  );
};

export default StaffPage;
