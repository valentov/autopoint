import React, { useState, useEffect, useMemo } from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  Cpu, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Car, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Lock, 
  Filter, 
  Trash2, 
  X, 
  Menu, 
  Sparkles,
  MapPin,
  MessageSquare,
  Search,
  Database,
  Info,
  Check
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  serviceId: string;
  serviceName: string;
  price: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  clientName: string;
  clientPhone: string;
  carModel: string;
  comment?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface BlockedSlot {
  id: string;
  date: string;
  time: string;
  reason?: string;
}

// ==========================================
// INITIAL CONSTANTS & SERVICES DATA
// ==========================================
const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'oil-change',
    name: 'Замена масла и фильтров',
    description: 'Полная замена моторного масла, масляного, воздушного и салонного фильтров. Комплексный осмотр.',
    price: 2500,
    duration: '45 мин',
    category: 'ТО'
  },
  {
    id: 'computer-diag',
    name: 'Компьютерная диагностика',
    description: 'Считывание ошибок всех электронных блоков управления, проверка датчиков, сканирование узлов.',
    price: 1500,
    duration: '30 мин',
    category: 'Диагностика'
  },
  {
    id: 'brake-pads',
    name: 'Замена тормозных колодок',
    description: 'Замена передних или задних тормозных колодок, очистка и смазка суппортов, проверка дисков.',
    price: 3000,
    duration: '60 мин',
    category: 'Тормозная система'
  },
  {
    id: 'spark-plugs',
    name: 'Замена свечей зажигания',
    description: 'Демонтаж старых свечей, диагностика колодцев, проверка зазоров и установка новых оригинальных свечей.',
    price: 2000,
    duration: '40 мин',
    category: 'Двигатель'
  },
  {
    id: 'suspension-diag',
    name: 'Диагностика подвески',
    description: 'Проверка амортизаторов, рычагов, сайлентблоков, шаровых опор, рулевых наконечников и подшипников.',
    price: 1500,
    duration: '45 мин',
    category: 'Ходовая часть'
  }
];

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00'
];

// Helper to format date to YYYY-MM-DD
const formatDateKey = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// INITIAL MOCK BOOKINGS FOR DEMO PERSISTENCE
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-1',
    bookingCode: 'AP-8921',
    serviceId: 'oil-change',
    serviceName: 'Замена масла и фильтров',
    price: 2500,
    date: formatDateKey(new Date()),
    time: '11:00',
    clientName: 'Александр Смирнов',
    clientPhone: '+7 (999) 123-45-67',
    carModel: 'BMW 320i',
    comment: 'Просьба залить масло 5W-30',
    status: 'confirmed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b-2',
    bookingCode: 'AP-4109',
    serviceId: 'computer-diag',
    serviceName: 'Компьютерная диагностика',
    price: 1500,
    date: formatDateKey(new Date()),
    time: '14:00',
    clientName: 'Елена Васильева',
    clientPhone: '+7 (911) 987-65-43',
    carModel: 'Audi Q5',
    comment: 'Glow plug error on dashboard',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  // Mobile Nav State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // App Navigation Active View: 'main' | 'booking' | 'admin'
  const [activeTab, setActiveTab] = useState<'main' | 'booking' | 'admin'>('main');

  // Supabase Code Modal
  const [showSqlModal, setShowSqlModal] = useState(false);

  // Core Data Persistence with LocalStorage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('autopoint_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>(() => {
    try {
      const saved = localStorage.getItem('autopoint_blocked_slots');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('autopoint_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('autopoint_blocked_slots', JSON.stringify(blockedSlots));
  }, [blockedSlots]);

  // BOOKING WIZARD STATE
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(SERVICES_DATA[0]);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // If Sunday, skip to Monday
    if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDateKey(tomorrow);
  });
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [carModel, setCarModel] = useState('');
  const [clientComment, setClientComment] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // ADMIN STATE
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminAuthError, setAdminAuthError] = useState('');
  const [adminDateFilter, setAdminDateFilter] = useState('');
  const [adminStatusFilter, setAdminStatusFilter] = useState<string>('all');
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  
  // Manual block slot state in admin
  const [manualBlockDate, setManualBlockDate] = useState(formatDateKey(new Date()));
  const [manualBlockTime, setManualBlockTime] = useState(TIME_SLOTS[0]);

  // Handle phone mask & validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('7') || val.startsWith('8')) {
      val = val.substring(1);
    }
    if (val.length > 10) val = val.substring(0, 10);
    
    let formatted = '+7 ';
    if (val.length > 0) formatted += '(' + val.substring(0, 3);
    if (val.length >= 3) formatted += ') ' + val.substring(3, 6);
    if (val.length >= 6) formatted += '-' + val.substring(6, 8);
    if (val.length >= 8) formatted += '-' + val.substring(8, 10);

    setClientPhone(formatted);
    if (val.length < 10) {
      setPhoneError('Введите полный номер телефона (10 цифр)');
    } else {
      setPhoneError('');
    }
  };

  // Pre-select service from catalog
  const handleSelectServiceFromCatalog = (service: ServiceItem) => {
    setSelectedService(service);
    setBookingStep(2);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute Occupied Slots for a given date
  const isSlotOccupied = (dateStr: string, timeStr: string) => {
    // Check existing active bookings
    const isBooked = bookings.some(
      b => b.date === dateStr && b.time === timeStr && b.status !== 'cancelled'
    );
    // Check manual blocked slots
    const isBlocked = blockedSlots.some(
      s => s.date === dateStr && s.time === timeStr
    );
    return isBooked || isBlocked;
  };

  // Create Booking Action
  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService || !selectedDate || !selectedTime) {
      alert('Пожалуйста, выберите услугу, дату и время.');
      return;
    }

    const cleanPhoneDigits = clientPhone.replace(/\D/g, '');
    if (cleanPhoneDigits.length < 11) {
      setPhoneError('Номер телефона заполнен не полностью');
      return;
    }

    // Server-side Double-booking Check Validation
    if (isSlotOccupied(selectedDate, selectedTime)) {
      alert('К сожалению, это время только что было занято другим клиентом. Пожалуйста, выберите другой интервал.');
      return;
    }

    const code = 'AP-' + Math.floor(1000 + Math.random() * 9000);

    const newBooking: Booking = {
      id: 'b-' + Date.now(),
      bookingCode: code,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: selectedService.price,
      date: selectedDate,
      time: selectedTime,
      clientName: clientName.trim(),
      clientPhone,
      carModel: carModel.trim(),
      comment: clientComment.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);
    setBookingStep(5);
  };

  // Admin Auth Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === 'admin123') {
      setIsAdminAuthenticated(true);
      setAdminAuthError('');
    } else {
      setAdminAuthError('Неверный пароль администратора! (Попробуйте admin123)');
    }
  };

  // Admin Actions
  const handleUpdateBookingStatus = (id: string, newStatus: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleToggleBlockSlot = () => {
    const existingIndex = blockedSlots.findIndex(
      s => s.date === manualBlockDate && s.time === manualBlockTime
    );
    if (existingIndex >= 0) {
      setBlockedSlots(prev => prev.filter((_, idx) => idx !== existingIndex));
    } else {
      setBlockedSlots(prev => [
        ...prev, 
        { id: 'blk-' + Date.now(), date: manualBlockDate, time: manualBlockTime, reason: 'Заблокировано админом' }
      ]);
    }
  };

  // Filtered Bookings for Admin
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchDate = adminDateFilter ? b.date === adminDateFilter : true;
      const matchStatus = adminStatusFilter !== 'all' ? b.status === adminStatusFilter : true;
      const matchSearch = adminSearchQuery
        ? b.clientName.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
          b.clientPhone.includes(adminSearchQuery) ||
          b.carModel.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
          b.bookingCode.toLowerCase().includes(adminSearchQuery.toLowerCase())
        : true;
      return matchDate && matchStatus && matchSearch;
    });
  }, [bookings, adminDateFilter, adminStatusFilter, adminSearchQuery]);

  // Reset Booking Form
  const resetBookingForm = () => {
    setBookingStep(1);
    setSelectedTime('');
    setClientName('');
    setClientPhone('');
    setCarModel('');
    setClientComment('');
    setConfirmedBooking(null);
  };

  return (
    <div className="min-h-screen bg-[#111315] text-gray-100 font-sans selection:bg-[#FF7628] selection:text-white flex flex-col">
      
      {/* NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#1B1E21]/90 backdrop-blur-md border-b border-gray-800/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('main')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#FF7628] to-amber-500 flex items-center justify-center shadow-lg shadow-[#FF7628]/20 group-hover:scale-105 transition-transform duration-300">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider text-white flex items-center">
                AUTO<span className="text-[#FF7628]">POINT</span>
              </span>
              <span className="text-[10px] tracking-widest text-gray-400 uppercase font-semibold block -mt-1">
                Автосервис &amp; ТО
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('main')} 
              className={`hover:text-[#FF7628] transition-colors ${activeTab === 'main' ? 'text-[#FF7628] font-bold' : 'text-gray-300'}`}
            >
              Главная
            </button>
            <a 
              href="#services" 
              onClick={() => setActiveTab('main')}
              className="text-gray-300 hover:text-[#FF7628] transition-colors"
            >
              Услуги
            </a>
            <button 
              onClick={() => { setActiveTab('booking'); resetBookingForm(); }} 
              className={`hover:text-[#FF7628] transition-colors ${activeTab === 'booking' ? 'text-[#FF7628] font-bold' : 'text-gray-300'}`}
            >
              Онлайн-запись
            </button>
            <a 
              href="#contacts" 
              onClick={() => setActiveTab('main')}
              className="text-gray-300 hover:text-[#FF7628] transition-colors"
            >
              Контакты
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setShowSqlModal(true)}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 flex items-center gap-1.5 transition"
              title="Открыть готовый SQL код Supabase"
            >
              <Database className="w-3.5 h-3.5 text-[#FF7628]" />
              <span>Supabase Backend</span>
            </button>

            <button 
              onClick={() => setActiveTab('admin')}
              className={`p-2.5 rounded-xl border transition ${activeTab === 'admin' ? 'bg-[#FF7628]/10 border-[#FF7628] text-[#FF7628]' : 'bg-[#111315] border-gray-800 text-gray-400 hover:text-white'}`}
              title="Панель администратора"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button 
              onClick={() => { setActiveTab('booking'); resetBookingForm(); }}
              className="px-5 py-2.5 bg-[#FF7628] hover:bg-[#e0631b] text-white font-semibold text-sm rounded-xl shadow-lg shadow-[#FF7628]/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Записаться
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('admin')}
              className="p-2 rounded-lg bg-gray-800 text-gray-300"
            >
              <Lock className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-800 text-gray-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1B1E21] border-b border-gray-800 px-4 py-4 space-y-3">
            <button 
              onClick={() => { setActiveTab('main'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-300 hover:text-[#FF7628]"
            >
              Главная
            </button>
            <a 
              href="#services" 
              onClick={() => { setActiveTab('main'); setMobileMenuOpen(false); }}
              className="block py-2 text-gray-300 hover:text-[#FF7628]"
            >
              Услуги
            </a>
            <button 
              onClick={() => { setActiveTab('booking'); resetBookingForm(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-300 hover:text-[#FF7628]"
            >
              Онлайн-запись
            </button>
            <a 
              href="#contacts" 
              onClick={() => { setActiveTab('main'); setMobileMenuOpen(false); }}
              className="block py-2 text-gray-300 hover:text-[#FF7628]"
            >
              Контакты
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button 
                onClick={() => { setActiveTab('booking'); resetBookingForm(); setMobileMenuOpen(false); }}
                className="w-full py-3 bg-[#FF7628] text-white font-semibold rounded-xl text-center"
              >
                Записаться онлайн
              </button>
              <button 
                onClick={() => { setShowSqlModal(true); setMobileMenuOpen(false); }}
                className="w-full py-2 bg-gray-800 text-gray-300 font-medium rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Database className="w-4 h-4 text-[#FF7628]" />
                Код Supabase SQL
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN BODY CONTENT */}
      <main className="flex-1">

        {/* ================= VIEW 1: MAIN HOMEPAGE ================= */}
        {activeTab === 'main' && (
          <div>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-[#1B1E21] via-[#111315] to-[#111315]">
              {/* Background Ambient Glow */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF7628]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column Text */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF7628]/10 border border-[#FF7628]/30 text-[#FF7628] text-xs font-semibold">
                      <Sparkles className="w-4 h-4" />
                      <span>Современный автосервис полного цикла</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                      Ваш автомобиль в <br className="hidden sm:inline"/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#FF7628]">
                        надёжных руках
                      </span>
                    </h1>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                      Профессиональное техническое обслуживание и ремонт автомобилей с гарантией качества. Запишитесь онлайн за 1 минуту без очереди и ожидания.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                      <button 
                        onClick={() => { setActiveTab('booking'); resetBookingForm(); }}
                        className="w-full sm:w-auto px-8 py-4 bg-[#FF7628] hover:bg-[#e0631b] text-white font-bold text-base rounded-xl shadow-xl shadow-[#FF7628]/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                      >
                        <span>Записаться онлайн</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      <a 
                        href="#services"
                        className="w-full sm:w-auto px-8 py-4 bg-[#1B1E21] hover:bg-gray-800 text-gray-200 font-semibold text-base rounded-xl border border-gray-700/80 transition flex items-center justify-center"
                      >
                        Услуги и цены
                      </a>
                    </div>

                    {/* Quick Stats */}
                    <div className="pt-8 grid grid-cols-3 gap-4 border-t border-gray-800/80">
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-white">10+ лет</div>
                        <div className="text-xs text-gray-400 mt-0.5">Опыта работы</div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-[#FF7628]">15 000+</div>
                        <div className="text-xs text-gray-400 mt-0.5">Обслуженных авто</div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
                        <div className="text-xs text-gray-400 mt-0.5">Гарантия на работы</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Graphic/Hero Card */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-gray-800 bg-[#1B1E21] shadow-2xl group">
                      <img 
                        src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80" 
                        alt="AUTOPOINT Service Center" 
                        className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-[#111315]/40 to-transparent" />

                      {/* Floating Badge */}
                      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#1B1E21]/90 backdrop-blur-md border border-gray-700/60 shadow-xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#FF7628]/20 flex items-center justify-center text-[#FF7628] shrink-0">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Быстрая онлайн-запись</div>
                          <div className="text-xs text-gray-400">Свободные слоты доступны прямо сейчас</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* ADVANTAGES SECTION */}
            <section className="py-20 bg-[#111315]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    Почему доверяют <span className="text-[#FF7628]">AUTOPOINT</span>
                  </h2>
                  <p className="text-gray-400 mt-3 text-base">
                    Мы объединили премиальный уровень сервиса, честные цены и современные технологии.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  <div className="p-6 rounded-2xl bg-[#1B1E21] border border-gray-800 hover:border-[#FF7628]/50 transition duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#FF7628]/10 text-[#FF7628] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <User className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Опытные мастера</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Сертифицированные специалисты с регулярным повышением квалификации и стажем более 8 лет.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#1B1E21] border border-gray-800 hover:border-[#FF7628]/50 transition duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#FF7628]/10 text-[#FF7628] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Cpu className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Современное оборудование</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Диагностические сканеры и дилерские стенды последнего поколения для любых марок авто.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#1B1E21] border border-gray-800 hover:border-[#FF7628]/50 transition duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#FF7628]/10 text-[#FF7628] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Прозрачные цены</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Согласовываем стоимость всех работ и деталей до начала ремонта. Никаких скрытых платежей.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#1B1E21] border border-gray-800 hover:border-[#FF7628]/50 transition duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#FF7628]/10 text-[#FF7628] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Calendar className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Удобная онлайн-запись</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Мгновенный выбор удобного дня и времени 24/7 прямо с вашего смартфона или компьютера.
                    </p>
                  </div>

                </div>
              </div>
            </section>

            {/* SERVICES CATALOG SECTION */}
            <section id="services" className="py-20 bg-[#1B1E21]/50 border-t border-b border-gray-800/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Услуги и цены</h2>
                    <p className="text-gray-400 mt-2 text-base">Популярные направления технического обслуживания</p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('booking'); resetBookingForm(); }}
                    className="mt-4 md:mt-0 text-[#FF7628] hover:text-white text-sm font-semibold flex items-center gap-1 transition"
                  >
                    <span>Перейти ко всей записи</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICES_DATA.map((service) => (
                    <div 
                      key={service.id}
                      className="bg-[#1B1E21] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-[#FF7628]/60 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-800 text-gray-300">
                            {service.category}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {service.duration}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white group-hover:text-[#FF7628] transition-colors mb-2">
                          {service.name}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                          {service.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-gray-400 block">Стоимость</span>
                          <span className="text-2xl font-black text-white">
                            от {service.price.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>

                        <button 
                          onClick={() => handleSelectServiceFromCatalog(service)}
                          className="px-4 py-2.5 bg-[#FF7628] hover:bg-[#e0631b] text-white text-sm font-semibold rounded-xl shadow-md transition"
                        >
                          Выбрать услугу
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Promo Custom Card */}
                  <div className="bg-gradient-to-br from-[#FF7628]/20 to-[#1B1E21] border border-[#FF7628]/40 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#FF7628] text-white">
                        Индивидуально
                      </span>
                      <h3 className="text-xl font-bold text-white mt-4 mb-2">
                        Сложный ремонт или нестандартная задача?
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Вы можете выбрать любую базовую услугу при записи и оставить подробный комментарий для мастера.
                      </p>
                    </div>
                    <button 
                      onClick={() => { setActiveTab('booking'); resetBookingForm(); }}
                      className="mt-6 w-full py-3 bg-white text-[#111315] hover:bg-gray-100 font-bold text-sm rounded-xl transition shadow"
                    >
                      Оформить онлайн-заявку
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* CONTACTS & LOCATION */}
            <section id="contacts" className="py-20 bg-[#111315]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-5 space-y-6">
                    <h2 className="text-3xl font-extrabold text-white">Ждем вас в сервисе</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Приезжайте на плановое ТО или диагностику. Мы работаем без выходных для удобства наших клиентов.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1B1E21] border border-gray-800">
                        <MapPin className="w-6 h-6 text-[#FF7628] shrink-0 mt-1" />
                        <div>
                          <div className="text-sm font-bold text-white">Адрес автосервиса</div>
                          <div className="text-sm text-gray-400">г. Москва, ул. Автомобильная, д. 15, стр. 2</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1B1E21] border border-gray-800">
                        <Phone className="w-6 h-6 text-[#FF7628] shrink-0 mt-1" />
                        <div>
                          <div className="text-sm font-bold text-white">Телефон для связи</div>
                          <div className="text-sm text-gray-400">+7 (495) 800-70-70</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1B1E21] border border-gray-800">
                        <Clock className="w-6 h-6 text-[#FF7628] shrink-0 mt-1" />
                        <div>
                          <div className="text-sm font-bold text-white">График работы</div>
                          <div className="text-sm text-gray-400">Пн — Сб: 09:00 — 19:00 | Вс: Выходной</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Visual Map Representation */}
                  <div className="lg:col-span-7 bg-[#1B1E21] border border-gray-800 rounded-3xl p-8 text-center relative overflow-hidden min-h-[320px] flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#111315] via-[#1B1E21] to-[#FF7628]/10" />
                    <div className="relative z-10 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-[#FF7628]/20 text-[#FF7628] flex items-center justify-center mx-auto shadow-lg shadow-[#FF7628]/20">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Удобный подъезд и парковка</h3>
                      <p className="text-gray-400 text-sm max-w-md mx-auto">
                        Находимся в 5 минутах от ТТК. Собственная охраняемая парковка для клиентов.
                      </p>
                      <button 
                        onClick={() => { setActiveTab('booking'); resetBookingForm(); }}
                        className="px-6 py-3 bg-[#FF7628] text-white font-semibold rounded-xl text-sm transition hover:bg-[#e0631b]"
                      >
                        Записаться прямо сейчас
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= VIEW 2: ONLINE BOOKING WIZARD ================= */}
        {activeTab === 'booking' && (
          <section className="py-10 md:py-16 bg-[#111315]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Wizard Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Онлайн-запись на сервис</h1>
                <p className="text-gray-400 text-sm mt-2">Выберите услугу, дату и свободное время всего за несколько кликов</p>
              </div>

              {/* Step Progress Bar */}
              {bookingStep <= 4 && (
                <div className="mb-10 bg-[#1B1E21] p-4 rounded-2xl border border-gray-800">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {[
                      { step: 1, label: 'Услуга' },
                      { step: 2, label: 'Дата' },
                      { step: 3, label: 'Время' },
                      { step: 4, label: 'Данные' }
                    ].map(item => (
                      <div 
                        key={item.step}
                        onClick={() => item.step < bookingStep && setBookingStep(item.step)}
                        className={`cursor-pointer transition-all ${bookingStep === item.step ? 'text-[#FF7628]' : bookingStep > item.step ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold text-xs mb-1 transition-all ${bookingStep === item.step ? 'bg-[#FF7628] text-white shadow-lg shadow-[#FF7628]/30' : bookingStep > item.step ? 'bg-gray-800 text-white' : 'bg-gray-800/50 text-gray-500'}`}>
                          {bookingStep > item.step ? <Check className="w-4 h-4" /> : item.step}
                        </div>
                        <span className="text-xs font-semibold block">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 1: SERVICE SELECTION */}
              {bookingStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF7628]" />
                    Шаг 1. Выберите необходимую услугу
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SERVICES_DATA.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${selectedService?.id === service.id ? 'bg-[#1B1E21] border-[#FF7628] shadow-lg shadow-[#FF7628]/10' : 'bg-[#1B1E21]/60 border-gray-800 hover:border-gray-700'}`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-white text-base">{service.name}</h3>
                            {selectedService?.id === service.id && (
                              <CheckCircle2 className="w-5 h-5 text-[#FF7628] shrink-0" />
                            )}
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed mb-4">{service.description}</p>
                        </div>

                        <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-800/60">
                          <span className="text-gray-400 text-xs">{service.duration}</span>
                          <span className="font-black text-white text-base">от {service.price.toLocaleString('ru-RU')} ₽</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setBookingStep(2)}
                      disabled={!selectedService}
                      className="px-8 py-3.5 bg-[#FF7628] hover:bg-[#e0631b] disabled:opacity-50 text-white font-bold rounded-xl flex items-center gap-2 transition"
                    >
                      <span>Далее: Выбор даты</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: DATE SELECTION */}
              {bookingStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF7628]" />
                    Шаг 2. Выберите дату визита
                  </h2>

                  <div className="bg-[#1B1E21] border border-gray-800 p-6 rounded-2xl space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Дата записи (Понедельник — Суббота)</label>
                      <input 
                        type="date"
                        min={formatDateKey(new Date())}
                        value={selectedDate}
                        onChange={(e) => {
                          const dateObj = new Date(e.target.value);
                          if (dateObj.getDay() === 0) {
                            alert('Воскресенье — выходной день автосервиса. Пожалуйста, выберите рабочий день.');
                            return;
                          }
                          setSelectedDate(e.target.value);
                          setSelectedTime(''); // Reset time when date changes
                        }}
                        className="w-full bg-[#111315] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF7628] text-base"
                      />
                    </div>

                    {/* Quick Date Select Shortcuts */}
                    <div>
                      <span className="text-xs text-gray-400 block mb-3 font-semibold">Быстрый выбор:</span>
                      <div className="flex flex-wrap gap-3">
                        {[0, 1, 2, 3, 4, 5].map((offset) => {
                          const d = new Date();
                          d.setDate(d.getDate() + offset);
                          // Skip Sundays
                          if (d.getDay() === 0) return null;
                          const dateStr = formatDateKey(d);
                          const isSelected = selectedDate === dateStr;
                          const dayName = offset === 0 ? 'Сегодня' : offset === 1 ? 'Завтра' : d.toLocaleDateString('ru-RU', { weekday: 'short' });
                          
                          return (
                            <button
                              key={dateStr}
                              type="button"
                              onClick={() => { setSelectedDate(dateStr); setSelectedTime(''); }}
                              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center transition ${isSelected ? 'bg-[#FF7628] border-[#FF7628] text-white shadow-md' : 'bg-[#111315] border-gray-800 text-gray-300 hover:border-gray-700'}`}
                            >
                              <span className="capitalize">{dayName}</span>
                              <span className="text-[11px] opacity-80">{d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setBookingStep(1)}
                      className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl flex items-center gap-2 transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>Назад</span>
                    </button>
                    <button
                      onClick={() => setBookingStep(3)}
                      disabled={!selectedDate}
                      className="px-8 py-3 bg-[#FF7628] hover:bg-[#e0631b] disabled:opacity-50 text-white font-bold rounded-xl flex items-center gap-2 transition"
                    >
                      <span>Далее: Выбор времени</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: TIME SLOT SELECTION */}
              {bookingStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#FF7628]" />
                      Шаг 3. Выберите время на {new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">Рабочие часы: 09:00 — 19:00. Серым выделены уже занятые слоты.</p>
                  </div>

                  <div className="bg-[#1B1E21] border border-gray-800 p-6 rounded-2xl">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {TIME_SLOTS.map((time) => {
                        const occupied = isSlotOccupied(selectedDate, time);
                        const isSelected = selectedTime === time;

                        return (
                          <button
                            key={time}
                            disabled={occupied}
                            onClick={() => setSelectedTime(time)}
                            className={`py-3.5 px-3 rounded-xl border text-sm font-bold flex flex-col items-center justify-center gap-1 transition duration-200 ${occupied ? 'bg-gray-800/40 border-gray-800/50 text-gray-600 cursor-not-allowed line-through' : isSelected ? 'bg-[#FF7628] border-[#FF7628] text-white shadow-lg shadow-[#FF7628]/30 scale-105' : 'bg-[#111315] border-gray-700 text-gray-200 hover:border-[#FF7628]'}`}
                          >
                            <Clock className="w-4 h-4 opacity-70" />
                            <span>{time}</span>
                            <span className="text-[10px] font-normal">
                              {occupied ? 'Занято' : 'Свободно'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setBookingStep(2)}
                      className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl flex items-center gap-2 transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>Назад</span>
                    </button>
                    <button
                      onClick={() => setBookingStep(4)}
                      disabled={!selectedTime}
                      className="px-8 py-3 bg-[#FF7628] hover:bg-[#e0631b] disabled:opacity-50 text-white font-bold rounded-xl flex items-center gap-2 transition"
                    >
                      <span>Далее: Контактные данные</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: CLIENT DETAILS FORM */}
              {bookingStep === 4 && (
                <form onSubmit={handleCompleteBooking} className="space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF7628]" />
                    Шаг 4. Введите контактные данные
                  </h2>

                  <div className="bg-[#1B1E21] border border-gray-800 p-6 rounded-2xl space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Ваше ФИО <span className="text-[#FF7628]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-500" />
                        <input 
                          type="text"
                          required
                          placeholder="Иванов Иван Иванович"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full bg-[#111315] border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-[#FF7628] text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Номер телефона <span className="text-[#FF7628]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-500" />
                        <input 
                          type="tel"
                          required
                          placeholder="+7 (999) 000-00-00"
                          value={clientPhone}
                          onChange={handlePhoneChange}
                          className={`w-full bg-[#111315] border ${phoneError ? 'border-red-500' : 'border-gray-700'} rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-[#FF7628] text-sm`}
                        />
                      </div>
                      {phoneError && <p className="text-red-400 text-xs mt-1">{phoneError}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Марка и модель автомобиля <span className="text-[#FF7628]">*</span>
                      </label>
                      <div className="relative">
                        <Car className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-500" />
                        <input 
                          type="text"
                          required
                          placeholder="например, Toyota Camry 2.5 / BMW X5"
                          value={carModel}
                          onChange={(e) => setCarModel(e.target.value)}
                          className="w-full bg-[#111315] border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-[#FF7628] text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Комментарий к записи (необязательно)
                      </label>
                      <textarea 
                        rows={3}
                        placeholder="Опишите симптомы поломки или дополнительные пожелания..."
                        value={clientComment}
                        onChange={(e) => setClientComment(e.target.value)}
                        className="w-full bg-[#111315] border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF7628] text-sm resize-none"
                      />
                    </div>
                  </div>

                  {/* Summary Box Before Submitting */}
                  <div className="p-4 rounded-xl bg-[#FF7628]/10 border border-[#FF7628]/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400">Итог: {selectedService?.name}</div>
                      <div className="text-sm font-bold text-white">{selectedDate} в {selectedTime}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">К оплате в сервисе</div>
                      <div className="text-lg font-black text-[#FF7628]">от {selectedService?.price.toLocaleString('ru-RU')} ₽</div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setBookingStep(3)}
                      className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl flex items-center gap-2 transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>Назад</span>
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#FF7628] hover:bg-[#e0631b] text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-[#FF7628]/30 transition"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Подтвердить запись</span>
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 5: SUCCESS RECEIPT */}
              {bookingStep === 5 && confirmedBooking && (
                <div className="bg-[#1B1E21] border border-gray-800 rounded-3xl p-8 max-w-lg mx-auto text-center space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="w-20 h-20 rounded-full bg-[#FF7628]/20 text-[#FF7628] flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FF7628]/20 text-[#FF7628]">
                      Запись успешно оформлена!
                    </span>
                    <h2 className="text-2xl font-black text-white mt-3">Ждем вас в AUTOPOINT</h2>
                    <p className="text-xs text-gray-400 mt-1">Код бронирования: <strong className="text-white">{confirmedBooking.bookingCode}</strong></p>
                  </div>

                  <div className="bg-[#111315] p-5 rounded-2xl border border-gray-800 text-left space-y-3 text-sm">
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <span className="text-gray-400">Клиент:</span>
                      <span className="font-bold text-white">{confirmedBooking.clientName}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <span className="text-gray-400">Телефон:</span>
                      <span className="font-bold text-white">{confirmedBooking.clientPhone}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <span className="text-gray-400">Автомобиль:</span>
                      <span className="font-bold text-white">{confirmedBooking.carModel}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <span className="text-gray-400">Услуга:</span>
                      <span className="font-bold text-[#FF7628]">{confirmedBooking.serviceName}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <span className="text-gray-400">Дата и время:</span>
                      <span className="font-bold text-white">{confirmedBooking.date} в {confirmedBooking.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Стоимость:</span>
                      <span className="font-bold text-white">от {confirmedBooking.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-400 leading-relaxed">
                    Наш администратор может связаться с вами для уточнения деталей. При необходимости отмены позвоните нам по телефону.
                  </div>

                  <div className="pt-2 flex flex-col gap-3">
                    <button
                      onClick={() => { setActiveTab('main'); resetBookingForm(); }}
                      className="w-full py-3.5 bg-[#FF7628] hover:bg-[#e0631b] text-white font-bold rounded-xl transition shadow"
                    >
                      Вернуться на главную
                    </button>
                  </div>
                </div>
              )}

            </div>
          </section>
        )}

        {/* ================= VIEW 3: ADMIN PANEL ================= */}
        {activeTab === 'admin' && (
          <section className="py-10 bg-[#111315]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {!isAdminAuthenticated ? (
                /* Admin Login Card */
                <div className="max-w-md mx-auto bg-[#1B1E21] border border-gray-800 p-8 rounded-3xl shadow-2xl text-center space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FF7628]/20 text-[#FF7628] flex items-center justify-center mx-auto">
                    <Lock className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Вход в панель администратора</h2>
                    <p className="text-gray-400 text-xs mt-1">Пароль по умолчанию для демо: <strong className="text-white">admin123</strong></p>
                  </div>

                  <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Пароль доступа</label>
                      <input 
                        type="password"
                        required
                        value={adminPasswordInput}
                        onChange={(e) => setAdminPasswordInput(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#111315] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF7628]"
                      />
                    </div>
                    {adminAuthError && <p className="text-red-400 text-xs">{adminAuthError}</p>}
                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-[#FF7628] hover:bg-[#e0631b] text-white font-bold rounded-xl shadow-lg shadow-[#FF7628]/20 transition"
                    >
                      Войти в систему
                    </button>
                  </form>
                </div>
              ) : (
                /* Admin Dashboard Main Interface */
                <div className="space-y-8">
                  
                  {/* Top Bar Stats */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1B1E21] p-6 rounded-2xl border border-gray-800">
                    <div>
                      <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
                        <span>Панель Управления AUTOPOINT</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">Live</span>
                      </h1>
                      <p className="text-gray-400 text-xs mt-1">Управление записями клиентов и расписанием мастеров</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsAdminAuthenticated(false)}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 font-semibold rounded-xl transition"
                      >
                        Выйти
                      </button>
                    </div>
                  </div>

                  {/* Dashboard Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#1B1E21] border border-gray-800 p-5 rounded-2xl">
                      <span className="text-gray-400 text-xs block">Всего записей</span>
                      <span className="text-3xl font-black text-white mt-1 block">{bookings.length}</span>
                    </div>

                    <div className="bg-[#1B1E21] border border-gray-800 p-5 rounded-2xl">
                      <span className="text-gray-400 text-xs block">Записей на сегодня</span>
                      <span className="text-3xl font-black text-[#FF7628] mt-1 block">
                        {bookings.filter(b => b.date === formatDateKey(new Date()) && b.status !== 'cancelled').length}
                      </span>
                    </div>

                    <div className="bg-[#1B1E21] border border-gray-800 p-5 rounded-2xl">
                      <span className="text-gray-400 text-xs block">Ориентировочная выручка</span>
                      <span className="text-3xl font-black text-white mt-1 block">
                        {bookings
                          .filter(b => b.status !== 'cancelled')
                          .reduce((sum, b) => sum + b.price, 0)
                          .toLocaleString('ru-RU')} ₽
                      </span>
                    </div>

                    <div className="bg-[#1B1E21] border border-gray-800 p-5 rounded-2xl">
                      <span className="text-gray-400 text-xs block">Заблокированные слоты</span>
                      <span className="text-3xl font-black text-amber-400 mt-1 block">{blockedSlots.length}</span>
                    </div>
                  </div>

                  {/* Block Slot Control Module */}
                  <div className="bg-[#1B1E21] border border-gray-800 p-6 rounded-2xl space-y-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Lock className="w-5 h-5 text-[#FF7628]" />
                      <span>Ручное управление блокировкой слотов</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Дата</label>
                        <input 
                          type="date"
                          value={manualBlockDate}
                          onChange={(e) => setManualBlockDate(e.target.value)}
                          className="w-full bg-[#111315] border border-gray-700 rounded-xl px-3 py-2 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Время</label>
                        <select
                          value={manualBlockTime}
                          onChange={(e) => setManualBlockTime(e.target.value)}
                          className="w-full bg-[#111315] border border-gray-700 rounded-xl px-3 py-2 text-white text-sm"
                        >
                          {TIME_SLOTS.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <button
                          onClick={handleToggleBlockSlot}
                          className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl text-sm transition flex items-center justify-center gap-2 border border-gray-700"
                        >
                          {blockedSlots.some(s => s.date === manualBlockDate && s.time === manualBlockTime) 
                            ? 'Разблокировать слот' 
                            : 'Заблокировать слот'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bookings Table Filters & List */}
                  <div className="bg-[#1B1E21] border border-gray-800 rounded-2xl overflow-hidden">
                    
                    {/* Filters Header */}
                    <div className="p-6 border-b border-gray-800 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Filter className="w-5 h-5 text-[#FF7628]" />
                        <span>Журнал записей клиентов</span>
                      </h2>

                      <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                        <div className="relative flex-1 sm:w-64">
                          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                          <input 
                            type="text"
                            placeholder="Поиск по имени/телефону/авто..."
                            value={adminSearchQuery}
                            onChange={(e) => setAdminSearchQuery(e.target.value)}
                            className="w-full bg-[#111315] border border-gray-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
                          />
                        </div>

                        <input 
                          type="date"
                          value={adminDateFilter}
                          onChange={(e) => setAdminDateFilter(e.target.value)}
                          className="bg-[#111315] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                        />

                        <select
                          value={adminStatusFilter}
                          onChange={(e) => setAdminStatusFilter(e.target.value)}
                          className="bg-[#111315] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="all">Все статусы</option>
                          <option value="pending">Ожидает</option>
                          <option value="confirmed">Подтвержден</option>
                          <option value="completed">Завершен</option>
                          <option value="cancelled">Отменен</option>
                        </select>
                      </div>
                    </div>

                    {/* Bookings Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-300">
                        <thead className="bg-[#111315] text-xs uppercase text-gray-400 border-b border-gray-800">
                          <tr>
                            <th className="px-6 py-4">Код / Дата</th>
                            <th className="px-6 py-4">Клиент</th>
                            <th className="px-6 py-4">Автомобиль</th>
                            <th className="px-6 py-4">Услуга</th>
                            <th className="px-6 py-4">Статус</th>
                            <th className="px-6 py-4 text-right">Действия</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {filteredBookings.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">
                                Записей по выбранным фильтрам не найдено.
                              </td>
                            </tr>
                          ) : (
                            filteredBookings.map((b) => (
                              <tr key={b.id} className="hover:bg-gray-800/40 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="font-bold text-white text-xs">{b.bookingCode}</div>
                                  <div className="text-xs text-[#FF7628] font-semibold">{b.date} в {b.time}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="font-medium text-white">{b.clientName}</div>
                                  <div className="text-xs text-gray-400">{b.clientPhone}</div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-200">
                                  {b.carModel}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-xs font-semibold text-white">{b.serviceName}</div>
                                  <div className="text-xs text-gray-400">{b.price.toLocaleString('ru-RU')} ₽</div>
                                  {b.comment && (
                                    <div className="text-[11px] text-gray-400 italic mt-1 max-w-xs truncate" title={b.comment}>
                                      "{b.comment}"
                                    </div>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${b.status === 'confirmed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : b.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : b.status === 'cancelled' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                                    {b.status === 'confirmed' && 'Подтвержден'}
                                    {b.status === 'completed' && 'Завершен'}
                                    {b.status === 'cancelled' && 'Отменен'}
                                    {b.status === 'pending' && 'Ожидает'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                  <div className="flex items-center justify-end gap-2">
                                    {b.status !== 'completed' && (
                                      <button
                                        onClick={() => handleUpdateBookingStatus(b.id, 'completed')}
                                        className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 text-xs font-semibold rounded-lg transition"
                                        title="Завершить"
                                      >
                                        Завершить
                                      </button>
                                    )}
                                    {b.status !== 'cancelled' && (
                                      <button
                                        onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')}
                                        className="px-2.5 py-1 bg-red-600/20 hover:bg-red-600 text-red-300 text-xs font-semibold rounded-lg transition"
                                        title="Отменить бронь"
                                      >
                                        Отменить
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>
              )}

            </div>
          </section>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-[#1B1E21] border-t border-gray-800 text-gray-400 text-xs py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">AUTOPOINT © {new Date().getFullYear()}</span>
            <span>— Профессиональный автосервис</span>
          </div>

          <div className="flex items-center gap-6 text-gray-400">
            <button onClick={() => setShowSqlModal(true)} className="hover:text-[#FF7628] transition flex items-center gap-1">
              <Database className="w-3.5 h-3.5" />
              <span>Supabase Integration</span>
            </button>
            <button onClick={() => setActiveTab('admin')} className="hover:text-white transition">
              Админ-панель
            </button>
          </div>
        </div>
      </footer>

      {/* SUPABASE CODE INTEGRATION MODAL */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1B1E21] border border-gray-800 rounded-3xl max-w-3xl w-full p-6 space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setShowSqlModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF7628]/20 text-[#FF7628] flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Интеграция Supabase Backend</h3>
                <p className="text-xs text-gray-400">Готовая база данных и защита от двойного бронирования (Race Conditions)</p>
              </div>
            </div>

            <div className="bg-[#111315] p-4 rounded-xl border border-gray-800 font-mono text-xs text-gray-300 space-y-3 overflow-x-auto max-h-96">
              <p className="text-[#FF7628] font-semibold">// 1. Выполните данный SQL в редакторе SQL в Supabase Dashboard:</p>
              <pre className="text-gray-300">{`-- Создание таблицы бронирований
create table public.bookings (
  id uuid default gen_random_uuid() primary key,
  booking_code text not null unique,
  service_id text not null,
  service_name text not null,
  price numeric not null,
  date date not null,
  time text not null,
  client_name text not null,
  client_phone text not null,
  car_model text not null,
  comment text,
  status text default 'confirmed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Индекс для предотвращения дубликатов на уровне базы данных
create unique index unique_active_booking 
on public.bookings (date, time) 
where status != 'cancelled';

-- Заблокированные администратором слоты
create table public.blocked_slots (
  id uuid default gen_random_uuid() primary key,
  date date not null,
  time text not null,
  reason text
);`}</pre>
            </div>

            <div className="text-xs text-gray-400 leading-relaxed">
              Текущий клиент с лёгкостью переключается на live Supabase с помощью встроенной функции RPC/PostgreSQL уникальных индексов.
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                onClick={() => setShowSqlModal(false)}
                className="px-6 py-2.5 bg-[#FF7628] text-white font-bold rounded-xl text-xs"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
