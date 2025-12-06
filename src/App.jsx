import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Droplet, 
  Scan, 
  TrendingUp, 
  Sun, 
  Menu, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Phone, 
  MapPin, 
  User, 
  ChevronRight,
  Camera,
  Mic,
  Wind,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ShieldCheck,
  Sprout,
  Mail,
  CreditCard,
  Settings,
  LogOut,
  UserCog,
  Save,
  Newspaper
} from 'lucide-react';

// --- Translations & Content ---

const translations = {
  en: {
    nav: { home: "Home", features: "Tech", demo: "AI Scan", pricing: "Plans", dashboard: "Dashboard", contact: "Contact", login: "Login", profile: "My Profile", blog: "Knowledge Hub" },
    hero: { 
      title: "Modern Farming", 
      subtitle: "Empowering Pakistani farmers with military-grade Drone Intelligence and AI to maximize yield and minimize input costs.", 
      cta: "Farm Analysis", 
      secondaryCta: "Achievements",
      badge: "Trusted by 50,000+ Farmers"
    },
    features: { 
      title: "Enterprise-Grade Agriculture", 
      drone: "Spectral Drone Mapping", 
      droneDesc: "Identify stress zones before they are visible to the naked eye using NDVI/NDRE thermal imagery.", 
      ai: "Precision Disease AI", 
      aiDesc: "Instant diagnosis with 98% accuracy using our proprietary computer vision models.", 
      mandi: "Market Intelligence", 
      mandiDesc: "Real-time algorithmic price prediction for Mandis across Punjab & Sindh." 
    },
    dashboard: { 
      welcome: "Farm Command Center", 
      weather: "Micro-Climate", 
      rates: "Market Ticker", 
      alerts: "Critical Insights", 
      myFarm: "Satellite Field View",
      soil: "Soil Moisture",
      spray: "Spray Suitability"
    },
    demo: { title: "AI Diagnostic Engine", uploadPrompt: "Initiate Crop Scan", analyzing: "Processing Neural Network...", result: "Pathogen Detected: Yellow Rust", advice: "Rx: Apply Propiconazole (200ml/acre). Hold Irrigation." },
    contact: { title: "Get in Touch", subtitle: "Our agronomy experts are available 24/7 to assist you.", formTitle: "Send us a Message", send: "Send Message", address: "Office Address", phone: "Helpline", email: "Email Support" },
    profile: { title: "Account Settings", personal: "Personal Information", farm: "Farm Details", subscription: "Subscription Plan", save: "Save Changes" }
  },
  ur: {
    nav: { home: "ہوم", features: "ٹیکنالوجی", demo: "اسکین", pricing: "پلانز", dashboard: "ڈیش بورڈ", contact: "رابطہ", login: "لاگ ان", profile: "پروفائل", blog: "معلومات" },
    hero: { 
      title: "زراعت کا روشن مستقبل، آپ کے ہاتھ میں", 
      subtitle: "ایگری ورس جدید ترین ڈرون اور مصنوعی ذہانت کے ذریعے آپ کی فصل کی پیداوار کو یقینی بناتا ہے۔", 
      cta: "مفت تجزیہ شروع کریں", 
      secondaryCta: "کامیاب کسان",
      badge: "۵۰،۰۰۰+ کسانوں کا اعتماد"
    },
    features: { 
      title: "جدید زرعی ٹیکنالوجی", 
      drone: "اسپیکٹرل ڈرون میپنگ", 
      droneDesc: "ننگی آنکھ سے نظر نہ آنے والے مسائل کو این ڈی وی آئی (NDVI) کے ذریعے دیکھیں۔", 
      ai: "بیماری کی تشخیص", 
      aiDesc: "ہماری مصنوعی ذہانت سے ۹۸٪ درستگی کے ساتھ بیماری کا پتہ لگائیں۔", 
      mandi: "منڈی انٹیلی جنس", 
      mandiDesc: "پنجاب اور سندھ کی منڈیوں کے ریٹس کی پیشن گوئی۔" 
    },
    dashboard: { 
      welcome: "فارم کمانڈ سینٹر", 
      weather: "موسمیاتی تجزیہ", 
      rates: "مارکیٹ ریٹس", 
      alerts: "اہم پیغامات", 
      myFarm: "سیٹلائٹ ویو",
      soil: "زمین کی نمی",
      spray: "اسپرے کے حالات"
    },
    demo: { title: "اے آئی تشخیصی انجن", uploadPrompt: "فصل اسکین کریں", analyzing: "تجزیہ جاری ہے...", result: "بیماری: زرد زنگ (Yellow Rust)", advice: "علاج: پروپیکونازول (۲۰۰ ملی لیٹر/ایکڑ) کا سپرے کریں۔" },
    contact: { title: "رابطہ کریں", subtitle: "ہمارے زرعی ماہرین آپ کی رہنمائی کے لیے ہر وقت موجود ہیں۔", formTitle: "پیغام بھیجیں", send: "پیغام بھیجیں", address: "دفتر کا پتہ", phone: "ہیلپ لائن", email: "ای میل" },
    profile: { title: "اکاؤنٹ کی ترتیبات", personal: "ذاتی معلومات", farm: "فارم کی تفصیلات", subscription: "سبسکرپشن پلان", save: "تبدیلیاں محفوظ کریں" }
  }
};

// --- Mock Data ---

const mandiRates = [
  { crop: "Wheat", city: "Multan", price: "4,150", trend: "+120", status: "up" },
  { crop: "Cotton", city: "R.Y. Khan", price: "9,200", trend: "-50", status: "down" },
  { crop: "Rice", city: "Lahore", price: "4,500", trend: "+0", status: "stable" },
  { crop: "Corn", city: "Sahiwal", price: "2,800", trend: "+15", status: "up" },
];

const alerts = [
  { id: 1, type: "critical", title: "Fungal Outbreak Risk", msg: "High humidity (85%) in Multan increases Rust risk by 40%.", msgUr: "ملتان میں نمی (۸۵٪) کی وجہ سے زنگ کا خطرہ ۴۰٪ بڑھ گیا ہے۔" },
  { id: 2, type: "advisory", title: "Irrigation Window", msg: "Best time to water is tonight between 8 PM - 4 AM.", msgUr: "پانی لگانے کا بہترین وقت آج رات ۸ بجے سے صبح ۴ بجے تک ہے۔" },
];

const blogPosts = [
  { id: 1, title: "Optimizing Wheat Yield in Punjab", titleUr: "پنجاب میں گندم کی پیداوار بڑھانے کے طریقے", date: "Oct 12, 2025", category: "Agronomy", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80" },
  { id: 2, title: "New Drone Regulations 2025", titleUr: "زرعی ڈرونز کے نئے حکومتی قوانین", date: "Oct 10, 2025", category: "Policy", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=600&q=80" },
  { id: 3, title: "Understanding Soil pH Levels", titleUr: "زمین کی پی ایچ لیول کو سمجھنا", date: "Oct 08, 2025", category: "Soil Health", image: "https://images.unsplash.com/photo-1625246333195-58197bd47d26?auto=format&fit=crop&w=600&q=80" },
];

// --- Components ---

const Header = ({ lang, setLang, setView, activeView }) => {
  const t = translations[lang].nav;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-gray-900 py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer group" onClick={() => setView('landing')}>
            <div className="bg-emerald-600 p-2 rounded-lg group-hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className={`ml-3 text-2xl font-bold tracking-tight ${scrolled ? 'text-gray-900' : 'text-white'}`}>Agri<span className="text-emerald-500">Verse</span></span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            {[
              { id: 'landing', label: t.home },
              { id: 'features', label: t.features },
              { id: 'demo', label: t.demo },
              { id: 'pricing', label: t.pricing },
              { id: 'blog', label: t.blog },
              { id: 'contact', label: t.contact }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setView(item.id)} 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeView === item.id 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : scrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-emerald-100 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className={`px-4 py-1.5 rounded-full border text-sm font-semibold transition ${
                scrolled ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50' : 'border-emerald-400/30 text-emerald-100 hover:bg-white/10'
              }`}
            >
              {lang === 'en' ? 'اردو' : 'ENG'}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-emerald-500 transition-all shadow-lg"
              >
                <User className="h-4 w-4" />
                <span>Account</span>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 animate-fade-in-up origin-top-right">
                  <button onClick={() => {setView('dashboard'); setShowProfileMenu(false)}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 flex items-center"><BarChart3 className="h-4 w-4 mr-2"/> {t.dashboard}</button>
                  <button onClick={() => {setView('profile'); setShowProfileMenu(false)}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 flex items-center"><UserCog className="h-4 w-4 mr-2"/> {t.profile}</button>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <button onClick={() => setShowProfileMenu(false)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"><LogOut className="h-4 w-4 mr-2"/> Logout</button>
                </div>
              )}
            </div>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden ${scrolled ? 'text-gray-800' : 'text-white'}`}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl h-screen overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {['landing', 'dashboard', 'profile', 'contact', 'pricing', 'blog'].map((v) => (
              <button key={v} onClick={() => { setView(v); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium capitalize">
                {v}
              </button>
            ))}
            <div className="h-px bg-gray-100 my-2"></div>
            <button onClick={() => { setLang(lang === 'en' ? 'ur' : 'en'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-emerald-600 font-bold">{lang === 'en' ? 'اردو میں دیکھیں' : 'Switch to English'}</button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ lang, setView }) => {
  const t = translations[lang].hero;
  return (
    <div className="relative bg-[#051c14] min-h-[90vh] flex items-center overflow-hidden pt-20">
       {/* Background */}
       <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197bd47d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#051c14] via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <span className="inline-block bg-emerald-900/50 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-6 text-emerald-100 text-xs font-bold tracking-wide uppercase backdrop-blur-md">{t.badge}</span>
            <h1 className={`text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight ${lang === 'ur' ? 'font-serif leading-[1.4]' : ''}`}>{t.title}</h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">{t.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setView('dashboard')} className="bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-emerald-500 transition flex items-center justify-center">{t.cta} <ChevronRight className="ml-2 h-5 w-5"/></button>
              <button onClick={() => setView('contact')} className="bg-white/10 text-white font-semibold py-4 px-8 rounded-xl backdrop-blur-sm hover:bg-white/20 transition">{t.secondaryCta}</button>
            </div>
          </div>
          {/* Dashboard Preview Graphic */}
          <div className="hidden lg:block relative">
             <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-2 shadow-2xl transform rotate-y-12 hover:rotate-0 transition duration-700">
               <img src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80" alt="Dashboard" className="rounded-xl opacity-80" />
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-xl"></div>
               <div className="absolute bottom-6 left-6 right-6">
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="text-gray-400 text-sm font-mono">LIVE SATELLITE FEED</p>
                     <h3 className="text-white text-2xl font-bold">Sector 7: Wheat</h3>
                   </div>
                   <div className="bg-emerald-500 px-3 py-1 rounded text-white font-bold text-sm animate-pulse">Scanning...</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = ({ lang }) => {
  const t = translations[lang].features;
  const FeatureCard = ({ icon: Icon, title, desc, color }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-6 text-white ${color} shadow-md group-hover:scale-110 transition-transform`}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className={`text-xl font-bold text-gray-900 mb-3 ${lang === 'ur' ? 'font-serif' : ''}`}>{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold text-gray-900 ${lang === 'ur' ? 'font-serif' : ''}`}>{t.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon={Scan} title={t.drone} desc={t.droneDesc} color="bg-emerald-600" />
          <FeatureCard icon={Leaf} title={t.ai} desc={t.aiDesc} color="bg-amber-500" />
          <FeatureCard icon={BarChart3} title={t.mandi} desc={t.mandiDesc} color="bg-blue-600" />
        </div>
      </div>
    </div>
  );
};

const Profile = ({ lang }) => {
  const t = translations[lang].profile;
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold text-gray-900 ${lang === 'ur' ? 'font-serif' : ''}`}>{t.title}</h1>
          <p className="text-gray-500">Manage your profile and farm settings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 text-center border-b border-gray-100">
                 <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center text-emerald-600 text-2xl font-bold">BA</div>
                 <h3 className="font-bold text-gray-900">Bashir Ahmed</h3>
                 <p className="text-xs text-gray-500">Member since 2023</p>
              </div>
              <nav className="p-2">
                <button onClick={() => setActiveTab('personal')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center ${activeTab === 'personal' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <User className="h-4 w-4 mr-3" /> {t.personal}
                </button>
                <button onClick={() => setActiveTab('farm')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center ${activeTab === 'farm' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Sprout className="h-4 w-4 mr-3" /> {t.farm}
                </button>
                <button onClick={() => setActiveTab('billing')} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center ${activeTab === 'billing' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <CreditCard className="h-4 w-4 mr-3" /> {t.subscription}
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-span-1 md:col-span-3">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b pb-4 mb-6">{t.personal}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" defaultValue="Bashir Ahmed" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="text" defaultValue="+92 300 1234567" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" defaultValue="bashir.farmer@gmail.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CNIC</label>
                        <input type="text" defaultValue="36302-1234567-1" disabled className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
                        <textarea rows={3} defaultValue="House 45, Street 2, Chak 88, Multan" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'farm' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b pb-4 mb-6">{t.farm}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                         <input type="text" defaultValue="Green Acres Multan" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Total Area (Acres)</label>
                         <input type="number" defaultValue="25" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Primary Crop</label>
                         <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                            <option>Wheat (Gandum)</option>
                            <option>Cotton (Kapas)</option>
                            <option>Rice (Chawal)</option>
                            <option>Mango</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Irrigation Type</label>
                         <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                            <option>Tube Well</option>
                            <option>Canal</option>
                            <option>Drip Irrigation</option>
                         </select>
                      </div>
                      <div className="md:col-span-2 bg-emerald-50 p-4 rounded-lg border border-emerald-100 flex items-start gap-3">
                         <MapPin className="h-5 w-5 text-emerald-600 mt-0.5" />
                         <div>
                            <h4 className="font-bold text-emerald-900 text-sm">Geo-Location</h4>
                            <p className="text-emerald-700 text-xs mt-1">Latitude: 30.1575, Longitude: 71.5249</p>
                            <button className="text-emerald-600 text-xs font-bold underline mt-2">Update Pin on Map</button>
                         </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'billing' && (
                  <div className="space-y-6">
                     <h3 className="text-xl font-bold text-gray-900 border-b pb-4 mb-6">{t.subscription}</h3>
                     <div className="bg-emerald-900 text-white rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                        <div className="relative z-10">
                          <p className="text-emerald-200 text-sm font-bold uppercase tracking-wider">Current Plan</p>
                          <h2 className="text-3xl font-bold mt-2">Agri Pro</h2>
                          <p className="text-emerald-100 mt-1">Rs 1,500 / month</p>
                          <div className="mt-6 flex gap-3">
                             <button className="bg-white text-emerald-900 px-4 py-2 rounded-lg font-bold text-sm">Manage Billing</button>
                             <button className="bg-emerald-800 text-white border border-emerald-700 px-4 py-2 rounded-lg font-bold text-sm">Upgrade Plan</button>
                          </div>
                        </div>
                     </div>
                     <div className="mt-6">
                        <h4 className="font-bold text-gray-900 mb-4">Billing History</h4>
                        <table className="w-full text-sm">
                           <thead>
                              <tr className="text-left text-gray-500 border-b border-gray-100">
                                 <th className="pb-2">Date</th>
                                 <th className="pb-2">Invoice</th>
                                 <th className="pb-2">Amount</th>
                                 <th className="pb-2 text-right">Status</th>
                              </tr>
                           </thead>
                           <tbody className="text-gray-600">
                              <tr className="border-b border-gray-50">
                                 <td className="py-3">Oct 01, 2025</td>
                                 <td className="py-3">INV-2025-001</td>
                                 <td className="py-3">Rs 1,500</td>
                                 <td className="py-3 text-right text-green-600 font-bold">Paid</td>
                              </tr>
                              <tr className="border-b border-gray-50">
                                 <td className="py-3">Sep 01, 2025</td>
                                 <td className="py-3">INV-2025-002</td> 
                                 <td className="py-3">Rs 1,500</td>
                                 <td className="py-3 text-right text-green-600 font-bold">Paid</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-bold flex items-center shadow-md">
                    <Save className="h-4 w-4 mr-2" /> {t.save}
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact = ({ lang }) => {
  const t = translations[lang].contact;
  return (
    <div className="pt-24 pb-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold text-gray-900 mb-4 ${lang === 'ur' ? 'font-serif' : ''}`}>{t.title}</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div>
             <div className="bg-emerald-50 rounded-2xl p-8 mb-8 border border-emerald-100">
               <h3 className="font-bold text-xl text-emerald-900 mb-6">Contact Information</h3>
               <div className="space-y-6">
                 <div className="flex items-start">
                   <div className="bg-white p-3 rounded-lg shadow-sm text-emerald-600"><MapPin className="h-6 w-6"/></div>
                   <div className="ml-4">
                     <p className="text-sm text-emerald-800 font-bold uppercase tracking-wide">{t.address}</p>
                     <p className="text-gray-700">3rd Floor, Arfa Software Technology Park,<br/>Ferozepur Road, Lahore, Pakistan</p>
                   </div>
                 </div>
                 <div className="flex items-start">
                   <div className="bg-white p-3 rounded-lg shadow-sm text-emerald-600"><Phone className="h-6 w-6"/></div>
                   <div className="ml-4">
                     <p className="text-sm text-emerald-800 font-bold uppercase tracking-wide">{t.phone}</p>
                     <p className="text-gray-700">+92 42 111 222 333</p>
                     <p className="text-xs text-gray-500">Mon-Fri, 9am - 5pm</p>
                   </div>
                 </div>
                 <div className="flex items-start">
                   <div className="bg-white p-3 rounded-lg shadow-sm text-emerald-600"><Mail className="h-6 w-6"/></div>
                   <div className="ml-4">
                     <p className="text-sm text-emerald-800 font-bold uppercase tracking-wide">{t.email}</p>
                     <p className="text-gray-700">support@agriverse.pk</p>
                   </div>
                 </div>
               </div>
             </div>
             
             {/* Map Placeholder */}
             <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden relative shadow-inner">
               <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=31.4746,74.3470&zoom=14&size=600x300&sensor=false')] bg-cover bg-center opacity-70"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white px-4 py-2 rounded-full shadow-lg text-emerald-600 font-bold text-sm flex items-center hover:bg-gray-50">
                    <MapPin className="h-4 w-4 mr-2" /> Open in Google Maps
                  </button>
               </div>
             </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
             <h3 className="font-bold text-2xl text-gray-900 mb-6">{t.formTitle}</h3>
             <form className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                   <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                   <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Email / Phone</label>
                 <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                 <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition">
                   <option>General Inquiry</option>
                   <option>Technical Support</option>
                   <option>Partnership</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                 <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"></textarea>
               </div>
               <button type="button" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:-translate-y-1">
                 {t.send}
               </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pricing = ({ lang }) => (
  <div className="pt-24 pb-12 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
        <p className="text-gray-500">Choose the plan that fits your land size and needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Basic */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:border-emerald-300 transition-all">
          <h3 className="text-lg font-bold text-emerald-600 uppercase tracking-wide">Kisan Basic</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-extrabold text-gray-900">Free</span>
            <span className="ml-1 text-gray-500">/ forever</span>
          </div>
          <p className="mt-4 text-gray-500 text-sm">Essential tools for small farmers to get started.</p>
          <ul className="mt-8 space-y-4">
            {['Weather Alerts', 'Mandi Rates', '5 AI Leaf Scans/mo', 'Community Forum'].map((feat, i) => (
              <li key={i} className="flex items-center text-sm text-gray-600"><CheckCircle className="h-5 w-5 text-emerald-500 mr-3"/>{feat}</li>
            ))}
          </ul>
          <button className="mt-8 w-full bg-emerald-50 text-emerald-700 font-bold py-3 rounded-lg hover:bg-emerald-100 transition">Get Started</button>
        </div>

        {/* Pro */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-emerald-500 relative transform md:-translate-y-4">
          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">MOST POPULAR</div>
          <h3 className="text-lg font-bold text-emerald-600 uppercase tracking-wide">Agri Pro</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-extrabold text-gray-900">Rs 1,500</span>
            <span className="ml-1 text-gray-500">/ month</span>
          </div>
          <p className="mt-4 text-gray-500 text-sm">Advanced analytics for maximizing yield.</p>
          <ul className="mt-8 space-y-4">
            {['Everything in Basic', 'Unlimited AI Scans', 'PDF Reports', 'Expert Chat Support', 'Disease History'].map((feat, i) => (
              <li key={i} className="flex items-center text-sm text-gray-900 font-medium"><CheckCircle className="h-5 w-5 text-emerald-500 mr-3"/>{feat}</li>
            ))}
          </ul>
          <button className="mt-8 w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition shadow-lg">Subscribe Now</button>
        </div>

        {/* Enterprise */}
        <div className="bg-gray-900 rounded-2xl shadow-lg p-8 text-white border border-gray-800">
          <h3 className="text-lg font-bold text-emerald-400 uppercase tracking-wide">Enterprise</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-extrabold text-white">Custom</span>
          </div>
          <p className="mt-4 text-gray-400 text-sm">For large landowners and government bodies.</p>
          <ul className="mt-8 space-y-4">
            {['Drone Pilot Dispatch', 'NDVI Spectral Maps', 'Soil Lab Testing', 'API Access', 'Dedicated Account Manager'].map((feat, i) => (
              <li key={i} className="flex items-center text-sm text-gray-300"><CheckCircle className="h-5 w-5 text-emerald-500 mr-3"/>{feat}</li>
            ))}
          </ul>
          <button className="mt-8 w-full bg-white text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-100 transition">Contact Sales</button>
        </div>
      </div>
    </div>
  </div>
);

const Blog = ({ lang }) => (
  <div className="pt-24 pb-12 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-end mb-12">
        <div>
           <h2 className="text-3xl font-bold text-gray-900">Knowledge Hub</h2>
           <p className="text-gray-500 mt-2">Latest news, policy updates, and farming techniques.</p>
        </div>
        <button className="hidden md:flex items-center text-emerald-600 font-bold hover:underline">View All <ArrowUpRight className="h-4 w-4 ml-1"/></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl h-64 mb-4">
               <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-emerald-800 uppercase">{post.category}</div>
            </div>
            <p className="text-xs text-gray-500 mb-2">{post.date}</p>
            <h3 className={`text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition ${lang === 'ur' ? 'font-serif' : ''}`}>
               {lang === 'ur' ? post.titleUr : post.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Dashboard = ({ lang }) => {
  const t = translations[lang].dashboard;
  const isUrdu = lang === 'ur';

  const VoiceButton = () => (
    <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40">
      <button className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-full shadow-2xl shadow-emerald-500/40 text-white hover:scale-110 transition-transform animate-pulse-slow group">
        <Mic className="h-6 w-6" />
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Voice Command</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-20">
      <VoiceButton />
      
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-8 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div>
            <h1 className={`text-3xl font-bold text-gray-900 ${isUrdu ? 'font-serif' : ''}`}>{t.welcome}</h1>
            <p className="text-gray-500 mt-1 flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-emerald-500"/> Chak 88, Multan 
              <span className="mx-2">•</span> 
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">PRO PLAN</span>
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm text-gray-400">Last Sync: Just now</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Col: Weather & Actions (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white/10 w-24 h-24 rounded-full blur-xl"></div>
            <div className="flex justify-between items-start mb-6">
               <h3 className={`font-semibold opacity-90 ${isUrdu ? 'font-serif' : ''}`}>{t.weather}</h3>
               <Sun className="h-8 w-8 text-yellow-300 animate-spin-slow" />
            </div>
            <div className="mb-6">
              <span className="text-5xl font-bold">34°</span>
              <span className="text-blue-100 text-lg ml-2">Sunny</span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
              <div className="bg-white/10 rounded-lg p-2">
                <div className="flex items-center text-xs text-blue-100 mb-1"><Wind className="h-3 w-3 mr-1"/> Wind</div>
                <div className="font-bold">12 km/h NE</div>
              </div>
              <div className="bg-white/10 rounded-lg p-2">
                <div className="flex items-center text-xs text-blue-100 mb-1"><Droplet className="h-3 w-3 mr-1"/> Humidity</div>
                <div className="font-bold">45%</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
             <div className="grid grid-cols-2 gap-3">
               {[
                 {icon: Scan, label: "New Scan", color: "emerald"},
                 {icon: FileText, label: "Reports", color: "blue"},
                 {icon: User, label: "Ask Expert", color: "purple"},
                 {icon: Calendar, label: "Tasks", color: "orange"}
               ].map((action, i) => (
                 <button key={i} className={`flex flex-col items-center justify-center p-4 bg-${action.color}-50 rounded-xl hover:bg-${action.color}-100 transition text-${action.color}-700`}>
                    <action.icon className="h-6 w-6 mb-2"/>
                    <span className="text-xs font-bold">{action.label}</span>
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* Middle Col: Main Map & Data (8 cols) */}
        <div className="md:col-span-8 space-y-6">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[300px] relative group">
             <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded shadow-sm text-sm font-bold text-gray-800">{t.myFarm}</div>
             <div className="w-full h-full bg-emerald-900 relative">
               <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/71.5249,30.1575,15,0/800x400?access_token=pk.simulated')] bg-cover bg-center opacity-60"></div>
               <div className="absolute inset-0 bg-[linear-gradient(transparent_19px,#ffffff10_20px),linear-gradient(90deg,transparent_19px,#ffffff10_20px)] bg-[size:20px_20px]"></div>
               <div className="absolute top-1/3 left-1/4 w-32 h-32 border-2 border-yellow-400 bg-yellow-400/20 rounded-full flex items-center justify-center animate-pulse">
                  <span className="bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded font-mono">STRESS ZONE</span>
               </div>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-800">{t.soil}</h4>
                  <div className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded">Good</div>
                </div>
                <div className="relative pt-4">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-400 via-emerald-500 to-blue-500 w-[65%]"></div>
                  </div>
                  <p className="mt-2 text-center text-2xl font-bold text-gray-900">65% <span className="text-sm font-normal text-gray-500">Moisture</span></p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-bold text-gray-800 mb-4">{t.rates}</h4>
                <div className="space-y-3">
                  {mandiRates.slice(0,3).map((rate, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
                      <div><p className="font-medium text-gray-900">{rate.crop}</p><p className="text-xs text-gray-400">{rate.city}</p></div>
                      <div className="text-right"><p className="font-bold text-gray-900">Rs {rate.price}</p><p className={`text-xs ${rate.status === 'up' ? 'text-green-500' : 'text-red-500'}`}>{rate.trend}</p></div>
                    </div>
                  ))}
                </div>
              </div>
           </div>

           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h4 className="font-bold text-gray-800 mb-4">{t.alerts}</h4>
              <div className="space-y-3">
                 {alerts.map((alert) => (
                   <div key={alert.id} className={`p-4 rounded-xl border-l-4 flex gap-4 ${alert.type === 'critical' ? 'bg-red-50 border-red-500' : 'bg-blue-50 border-blue-500'}`}>
                      <div className={`p-2 rounded-full h-fit ${alert.type === 'critical' ? 'bg-red-100' : 'bg-blue-100'}`}>
                        {alert.type === 'critical' ? <AlertTriangle className={`h-5 w-5 ${alert.type === 'critical' ? 'text-red-600' : 'text-blue-600'}`} /> : <Droplet className="h-5 w-5 text-blue-600"/>}
                      </div>
                      <div>
                        <h5 className={`font-bold text-sm ${alert.type === 'critical' ? 'text-red-800' : 'text-blue-800'}`}>{alert.title}</h5>
                        <p className={`text-sm mt-1 ${isUrdu ? 'font-serif text-base' : 'text-gray-600'}`}>{lang === 'ur' ? alert.msgUr : alert.msg}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function AgriVerseApp() {
  const [lang, setLang] = useState('en');
  const [currentView, setCurrentView] = useState('landing'); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col selection:bg-emerald-200">
      <Header lang={lang} setLang={setLang} setView={setCurrentView} activeView={currentView} />
      
      <main className="flex-grow">
        {currentView === 'landing' && (
          <>
            <Hero lang={lang} setView={setCurrentView} />
            <Features lang={lang} />
            <Blog lang={lang} />
            <Pricing lang={lang} />
          </>
        )}
        
        {currentView === 'features' && <Features lang={lang} />}
        {currentView === 'demo' && <div className="py-24 bg-gray-900 text-center text-white"><h1 className="text-4xl">Demo Loaded</h1><p>Demo features here</p></div>}
        {currentView === 'dashboard' && <Dashboard lang={lang} />}
        {currentView === 'pricing' && <Pricing lang={lang} />}
        {currentView === 'contact' && <Contact lang={lang} />}
        {currentView === 'profile' && <Profile lang={lang} />}
        {currentView === 'blog' && <Blog lang={lang} />}
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
           <div>
              <div className="flex items-center text-white font-bold text-lg mb-4"><Leaf className="h-5 w-5 text-emerald-500 mr-2" /> AgriVerse</div>
              <p>Digitizing Pakistan's Agriculture for a sustainable tomorrow.</p>
           </div>
           <div><h4 className="text-white font-bold mb-4">Platform</h4><ul className="space-y-2"><li>Features</li><li>Pricing</li><li>Dashboard</li></ul></div>
           <div><h4 className="text-white font-bold mb-4">Company</h4><ul className="space-y-2"><li>About Us</li><li>Careers</li><li>Blog</li></ul></div>
           <div><h4 className="text-white font-bold mb-4">Legal</h4><ul className="space-y-2"><li>Privacy Policy</li><li>Terms of Service</li></ul></div>
        </div>
        <div className="text-center text-xs opacity-50">&copy; 2025 AgriVerse Technologies. All rights reserved.</div>
      </footer>
    </div>
  );
}