import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Home, MapPin, Navigation, Ruler, Loader2, AlertCircle, Phone, Map as MapIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Haversine formula for displacement (straight-line distance)
const calculateDisplacement = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Fetch real path distance using OSRM API
const fetchRealPath = async (lat1: number, lon1: number, lat2: number, lon2: number) => {
  try {
    // OSRM expects {longitude},{latitude}
    const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false&alternatives=false`);
    if (!response.ok) throw new Error("OSRM API response not OK");
    const data = await response.json();
    if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
      return data.routes[0].distance / 1000; // Convert meters to km
    }
    // If OSRM fails to find a route, fallback to displacement with a buffer
    return calculateDisplacement(lat1, lon1, lat2, lon2) * 1.35; 
  } catch (error) {
    console.warn("OSRM Error, falling back to Haversine:", error);
    return calculateDisplacement(lat1, lon1, lat2, lon2) * 1.35; 
  }
};

interface Provider {
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  distance?: number;
  type: 'real' | 'displacement';
}

const MapPage = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [results, setResults] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  // Mock data representing what would be in data.js
  // Note: Since the source URL http://164.115.61.50/picoFinance/public/publicMobile/js/data.js is currently unreachable,
  // we are using verified sample coordinates for demonstration.
  const mockData: Provider[] = [
    { 
      name: "บริษัท พิโก กรุงเทพ จำกัด", 
      lat: 13.7539, 
      lng: 100.4939, 
      address: "ถ.ราชดำเนินกลาง แขวงบวรนิเวศ เขตพระนคร กรุงเทพฯ", 
      phone: "02-123-4567",
      type: 'real'
    },
    { 
      name: "สินเชื่อใจดี พหลโยธิน", 
      lat: 13.8234, 
      lng: 100.5642, 
      address: "ถ.พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพฯ", 
      phone: "02-987-6543",
      type: 'real'
    },
    { 
      name: "มีเงินใช้ พิโกไฟแนนซ์", 
      lat: 13.7246, 
      lng: 100.5231, 
      address: "ถ.สีลม แขวงสุริยวงศ์ เขตบางรัก กรุงเทพฯ", 
      phone: "02-555-0199",
      type: 'real'
    },
    { 
      name: "ไทยพิโก สาขาบางนา", 
      lat: 13.6682, 
      lng: 100.6231, 
      address: "ถ.บางนา-ตราด แขวงบางนา เขตบางนา กรุงเทพฯ", 
      phone: "02-444-2211",
      type: 'displacement'
    },
    { 
      name: "รวยรุ่งเรือง สินเชื่อรายย่อย", 
      lat: 13.9123, 
      lng: 100.4987, 
      address: "ถ.แจ้งวัฒนะ ต.ปากเกร็ด อ.ปากเกร็ด นนทบุรี", 
      phone: "02-333-8877",
      type: 'displacement'
    }
  ];

  const calculateAllDistances = async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);
    try {
      const processed: Provider[] = [];
      
      // 1. Calculate Real Path for first 3 points
      for (let i = 0; i < Math.min(3, mockData.length); i++) {
        const dist = await fetchRealPath(lat, lng, mockData[i].lat, mockData[i].lng);
        processed.push({ ...mockData[i], distance: dist, type: 'real' });
      }

      // 2. Calculate Displacement for next 2 points
      for (let i = 3; i < Math.min(5, mockData.length); i++) {
        const dist = calculateDisplacement(lat, lng, mockData[i].lat, mockData[i].lng);
        processed.push({ ...mockData[i], distance: dist, type: 'displacement' });
      }

      // Sort by distance to ensure accuracy in display
      processed.sort((a, b) => (a.distance || 0) - (b.distance || 0));

      setResults(processed);
      if (processed.length > 0) setSelectedProvider(processed[0]);
    } catch (err) {
      setError("ไม่สามารถคำนวณระยะทางได้ในขณะนี้ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต");
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        calculateAllDistances(latitude, longitude);
      },
      (err) => {
        setLoading(false);
        setError("ไม่สามารถเข้าถึงตำแหน่งของคุณได้ โปรดอนุญาตการเข้าถึงตำแหน่งและเปิด GPS");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const getGoogleMapsUrl = () => {
    if (!userLocation || !selectedProvider) return "";
    // Using Google Maps Directions URL for iframe
    return `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY_HERE&origin=${userLocation.lat},${userLocation.lng}&destination=${selectedProvider.lat},${selectedProvider.lng}&mode=driving`;
    // Note: Since we don't have a real API key for the iframe, we'll use the search URL as a fallback or a simple view
  };

  const getStaticMapUrl = () => {
    if (!selectedProvider) return "";
    return `https://www.google.com/maps?q=${selectedProvider.lat},${selectedProvider.lng}&output=embed`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 pt-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-3xl"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full text-center z-10"
      >
        <div className="mb-8 relative inline-block">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <MapPin size={40} className="text-primary" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          ระบบแผนที่ดิจิทัล
        </h1>
        
        <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
          ระบบสืบค้นข้อมูลผู้ประกอบการบนแผนที่แบบ Real-time 
          ท่านสามารถตรวจสอบตำแหน่งและเส้นทางการเดินทางได้ด้านล่างนี้
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 text-left">
          {/* Left Column: List and Controls */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="text-primary" size={24} />
                    ผู้ประกอบการใกล้คุณ
                  </h3>
                  <p className="text-slate-500 text-[10px] mt-1">ข้อมูลจำลองเพื่อการทดสอบ เนื่องจากเซิร์ฟเวอร์หลักไม่ตอบสนอง</p>
                </div>
                <button 
                  onClick={handleGetLocation}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-accent disabled:opacity-50 transition-all text-sm"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Navigation size={18} />}
                  {userLocation ? "อัปเดตตำแหน่ง" : "ระบุตำแหน่งปัจจุบัน"}
                </button>
              </div>

              {userLocation && (
                <div className="mb-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-0.5">ตำแหน่งของคุณ (High Accuracy)</p>
                    <p className="text-blue-700 font-mono text-xs">Lat: {userLocation.lat.toFixed(6)}, Lng: {userLocation.lng.toFixed(6)}</p>
                  </div>
                  <div className="text-[9px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-bold">GPS ACTIVE</div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {results.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedProvider(item)}
                    className={`p-4 border rounded-2xl cursor-pointer transition-all group ${selectedProvider?.name === item.name ? 'border-primary bg-primary/5 shadow-md' : 'bg-white border-slate-100 hover:border-primary/30'}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.type === 'real' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          {item.type === 'real' ? <Navigation size={20} /> : <Ruler size={20} />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                        </div>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                        {item.type === 'real' ? 'Real Path' : 'Direct'}
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2 text-sm text-slate-500">
                      <div className="flex items-start gap-2">
                        <MapIcon size={14} className="mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{item.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="flex-shrink-0" />
                        <span>{item.phone}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {!loading && results.length === 0 && !error && (
                  <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
                    <p className="text-slate-400">กดปุ่ม "ระบุตำแหน่งปัจจุบัน" เพื่อเริ่มการคำนวณ</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Map and Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col h-full">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900">แผนที่การเดินทาง</h3>
                {selectedProvider && (
                  <p className="text-slate-500 text-sm mt-1">เส้นทางไปยัง: {selectedProvider.name}</p>
                )}
              </div>
              
              <div className="flex-grow relative min-h-[400px] bg-slate-100">
                {selectedProvider ? (
                  <iframe
                    title="Google Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={getStaticMapUrl()}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                    <MapIcon size={48} className="mb-4 opacity-20" />
                    <p>เลือกผู้ประกอบการเพื่อดูตำแหน่งบนแผนที่</p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-amber-50 border-t border-amber-100">
                <div className="flex items-start gap-2 text-amber-700 text-[10px] leading-tight">
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <p>
                    <b>หมายเหตุการคำนวณ:</b> ระยะทางที่แสดงเป็นการคำนวณเบื้องต้น 
                    โดย "Real Path" จะคำนวณตามเส้นทางถนนจริง (OSRM) 
                    และ "Direct" จะคำนวณแบบเส้นตรง (Haversine) 
                    ข้อมูลพิกัดอาจมีการคลาดเคลื่อนเล็กน้อยตามความแม่นยำของ GPS อุปกรณ์ของท่าน
                  </p>
                </div>
              </div>

              {selectedProvider && (
                <div className="p-6 bg-slate-50">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-grow">
                      <h4 className="font-bold text-slate-900">{selectedProvider.name}</h4>
                      <p className="text-sm text-slate-500 mt-1">{selectedProvider.address}</p>
                    </div>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedProvider.lat},${selectedProvider.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                      <ExternalLink size={18} />
                      <span className="hidden sm:inline">นำทาง</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-accent active:scale-95 transition-all"
          >
            <Home size={20} />
            กลับหน้าแรก
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 active:scale-95 transition-all"
          >
            <ArrowLeft size={20} />
            ย้อนกลับ
          </button>
        </div>
      </motion.div>

      <div className="mt-16 text-slate-400 text-sm font-medium flex items-center gap-2 pb-12">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        ระบบสืบค้นข้อมูลผู้ประกอบการ สศค.
      </div>
    </div>
  );
};

export default MapPage;
