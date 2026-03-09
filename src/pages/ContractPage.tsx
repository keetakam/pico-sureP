import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContractPage = () => {
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

          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">ติดต่อเรา</h1>
          <p className="text-slate-600 text-lg mb-8">สำนักงานเศรษฐกิจการคลัง กระทรวงการคลัง</p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
            <div className="flex items-start gap-4">
              <MapPin size={22} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-slate-800">ที่อยู่</p>
                <p className="text-slate-600">สำนักงานเศรษฐกิจการคลัง ถนนพระรามที่ 6 แขวงพญาไท เขตพญาไท กรุงเทพฯ 10400</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={22} className="text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-slate-800">โทรศัพท์</p>
                <p className="text-slate-600">สายด่วน 1359</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail size={22} className="text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-slate-800">อีเมล</p>
                <p className="text-slate-600">pico.fidp@fpo.go.th</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContractPage;
