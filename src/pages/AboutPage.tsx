import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8">
            <ArrowLeft size={18} />
            <span>กลับหน้าแรก</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">เกี่ยวกับโครงการ</h1>
          <p className="text-slate-600 text-lg mb-8">
            โครงการพัฒนาระบบฐานข้อมูลและแผนที่ดิจิทัลผู้ประกอบธุรกิจสินเชื่อพิโกไฟแนนซ์
            โดยสำนักงานเศรษฐกิจการคลัง กระทรวงการคลัง
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <p className="text-slate-600 leading-relaxed">
              เนื้อหาเกี่ยวกับโครงการ...
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
