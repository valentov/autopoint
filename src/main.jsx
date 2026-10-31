import React, { useState, useEffect, useMemo } from 'react';
import { Wrench, ShieldCheck, Cpu, Calendar, Clock, User, Phone, Car, CheckCircle2, ChevronRight, ChevronLeft, Lock, Filter, Trash2, X, Menu, Sparkles, MapPin, MessageSquare, Search, Database, Info, Check } from 'lucide-react';

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
  date: string;
  time: string;
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
  { id: 'oil-change', name: 'Замена масла и фильтров', description: 'Полная замена моторного масла, масляного, воздушного и салонного фильтров.', price: 2500, duration: '45 мин', category: 'ТО' },
  { id: 'computer-diag', name: 'Компьютерная диагностика', description: 'Считывание ошибок всех электронных блоков управления, проверка датчиков, сканирование узлов.', price: 1500, duration: '30 мин', category: 'Диагностика' },
  { id: 'brake-pads', name: 'Замена тормозных колодок', description: 'Замена передних или задних тормозных колодок, очистка и смазка суппортов, проверка дисков.', price: 3000, duration: '60 мин', category: 'Тормозная система' },
  { id: 'spark-plugs', name: 'Замена свечей зажигания', description: 'Демонтаж старых свечей, диагностика колодцев, проверка зазоров и установка новых оригинальных свечей.', price: 2000, duration: '40 мин', category: 'Двигатель' },
  { id: 'suspension-diag', name: 'Диагностика подвески', description: 'Проверка амортизаторов, рычагов, сайлентблоков, шаровых опор, рулевых наконечников и подшипников.', price: 1500, duration: '45 мин', category: 'Ходовая часть' }
];

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

const formatToDateKey = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-1',
    bookingCode: 'AP-8921',
    serviceId: 'oil-change',
    serviceName: 'Замена масла и фильтров',
    price: 2500,
    date: formatToDateKey(new Date()),
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
    date: formatToDateKey(new Date(Date.now() + 86400000)),
    time: '14:00',
    clientName: 'Елена Васильева',
    clientPhone: '+7 (911) 987-65-43',
    carModel: 'Audi Q5',
    comment: 'Горит plug error on dashboard',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'main' | 'booking' | 'admin'>('main');
  
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
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(formatToDateKey(new Date()));
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [carModel, setCarModel] = useState('');
  const [clientComment, setClientComment] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // ADMIN STATE
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminAuthError, setAdminAuthError] = useState(false);
  const [adminDateFilter, setAdminDateFilter] = useState('');
  const [adminStatusFilter, setAdminStatusFilter] = useState<'all' | string>('all');
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [manualBlockDate, setManualBlockDate] = useState(formatToDateKey(new Date()));
  const [manualBlockTime, setManualBlockTime] = useState(TIME_SLOTS[0]);

  // Handle phone mask & validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('8')) val = val.substring(1);
    if (val.length > 10) val = val.substring(0, 10);
    let formatted = '+7';
    if (val.length > 0) formatted += ` (${val.substring(0, 3)}`;
    if (val.length >= 4) formatted += `) ${val.substring(3, 6)}`;
    if (val.length >= 7) formatted += `-${val.substring(6, 8)}`;
    if (val.length >= 9) formatted += `-${val.substring(8, 10)}`;
    setClientPhone(formatted);
  };

  const handleSelectServiceFromCatalog = (service: ServiceItem) => {
    setSelectedService(service);
    setBookingStep(2);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isSlotBooked = (date: string, time: string) => {
    const isBooked = bookings.some(b => b.date === date && b.time === time && b.status !== 'cancelled');
    const isBlocked = blockedSlots.some(s => s.date === date && s.time === time);
    return isBooked || isBlocked;
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) return;

    const newBooking: Booking = {
      id: 'b-' + Date.now(),
      bookingCode: 'AP-' + Math.floor(1000 + Math.random() * 9000),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: selectedService.price,
      date: selectedDate,
      time: selectedTime,
      clientName: clientName.trim(),
      clientPhone: clientPhone,
      carModel: carModel.trim(),
      comment: clientComment.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);
    setBookingStep(3);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === 'admin123') {
      setIsAdminAuthenticated(true);
      setAdminAuthError(false);
    } else {
      setAdminAuthError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-[#FF7628] selection:text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('main')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7628] to-orange-600 flex items-center justify-center shadow-lg shadow-[#FF7628]/30">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider text-white">AUTO<span className="text-[#FF7628]">POINT</span></span>
              <p className="text-xs text-slate-400 font-medium">Премиальный автосервис & ТО</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-medium">
            <button onClick={() => setActiveTab('main')} className={`transition-colors ${activeTab === 'main' ? 'text-[#FF7628] font-bold' : 'text-slate-300 hover:text-[#FF7628]'}`}>Главная</button>
            <button onClick={() => { setActiveTab('booking'); setBookingStep(1); }} className={`transition-colors ${activeTab === 'booking' ? 'text-[#FF7628] font-bold' : 'text-slate-300 hover:text-[#FF7628]'}`}>Онлайн-запись</button>
            <button onClick={() => setActiveTab('admin')} className={`transition-colors ${activeTab === 'admin' ? 'text-[#FF7628] font-bold' : 'text-slate-300 hover:text-[#FF7628]'}`}>Админка</button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+79991234567" className="flex items-center gap-2 text-sm font-bold text-slate-200 hover:text-[#FF7628]">
              <Phone className="w-4 h-4 text-[#FF7628]" />
              +7 (999) 123-45-67
            </a>
            <button onClick={() => { setActiveTab('booking'); setBookingStep(1); }} className="bg-[#FF7628] hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-[#FF7628]/20">
              Записаться
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-200">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'main' && (
          <div className="space-y-16">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7628]/10 border border-[#FF7628]/30 text-[#FF7628] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Профессиональный уход за вашим авто
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white">
                  Надежный ремонт и <span className="text-[#FF7628]">точный сервис</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg">
                  Современное оборудование, сертифицированные мастера и гарантия на все виды работ. Запишитесь онлайн за 1 минуту!
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button onClick={() => { setActiveTab('booking'); setBookingStep(1); }} className="bg-[#FF7628] hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-xl shadow-[#FF7628]/30 text-base flex items-center gap-2">
                    Записаться на сервис <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white">Популярные услуги</h2>
                  <p className="text-slate-400 text-sm mt-1">Выберите нужную услугу для быстрого расчета и записи</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES_DATA.map(service => (
                  <div key={service.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-[#FF7628]/50 transition-all">
                    <div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-[#FF7628]">{service.category}</span>
                      <h3 className="text-xl font-bold mt-3 text-white">{service.name}</h3>
                      <p className="text-slate-400 text-sm mt-2">{service.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-500 block">Стоимость</span>
                        <span className="text-lg font-bold text-white">{service.price} ₽</span>
                      </div>
                      <button onClick={() => handleSelectServiceFromCatalog(service)} className="bg-slate-800 hover:bg-[#FF7628] text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
                        Выбрать
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'booking' && (
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl">
            <h2 className="text-2xl font-black mb-6 text-white text-center">Онлайн-запись в автосервис</h2>
            {bookingStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-300">1. Выберите услугу</h3>
                <div className="space-y-3">
                  {SERVICES_DATA.map(s => (
                    <div key={s.id} onClick={() => setSelectedService(s)} className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${selectedService?.id === s.id ? 'border-[#FF7628] bg-[#FF7628]/10' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}`}>
                      <div>
                        <h4 className="font-bold text-white">{s.name}</h4>
                        <p className="text-xs text-slate-400">{s.duration} • {s.category}</p>
                      </div>
                      <span className="font-bold text-[#FF7628]">{s.price} ₽</span>
                    </div>
                  ))}
                </div>
                <button disabled={!selectedService} onClick={() => setBookingStep(2)} className="w-full mt-6 bg-[#FF7628] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl">
                  Далее
                </button>
              </div>
            )}

            {bookingStep === 2 && (
              <form onSubmit={handleCompleteBooking} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-300">2. Дата, время и ваши данные</h3>
                  <button type="button" onClick={() => setBookingStep(1)} className="text-xs text-[#FF7628] underline">Назад к услугам</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Дата визита</label>
                    <input type="date" value={selectedDate} min={formatToDateKey(new Date())} onChange={e => setSelectedDate(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" required />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Время</label>
                    <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" required>
                      <option value="">Выберите время</option>
                      {TIME_SLOTS.map(t => (
                        <option key={t} value={t} disabled={isSlotBooked(selectedDate, t)}>
                          {t} {isSlotBooked(selectedDate, t) ? '(Занято)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <input type="text" placeholder="Ваше имя" value={clientName} onChange={e => setClientName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" required />
                  <input type="tel" placeholder="Телефон (+7 ...)" value={clientPhone} onChange={handlePhoneChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" required />
                  <input type="text" placeholder="Марка и модель авто (например: Kia Rio)" value={carModel} onChange={e => setCarModel(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" required />
                </div>
                <button type="submit" className="w-full bg-[#FF7628] hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all">
                  Подтвердить запись
                </button>
              </form>
            )}

            {bookingStep === 3 && confirmedBooking && (
              <div className="text-center space-y-6 py-6">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Запись успешно оформлена!</h3>
                <p className="text-slate-400 text-sm">Код бронирования: <strong className="text-[#FF7628]">{confirmedBooking.bookingCode}</strong></p>
                <button onClick={() => { setActiveTab('main'); setBookingStep(1); setSelectedService(null); }} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3 rounded-xl">
                  На главную
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
            {!isAdminAuthenticated ? (
              <form onSubmit={handleAdminLogin} className="max-w-md mx-auto space-y-6 py-12">
                <div className="text-center space-y-2">
                  <Lock className="w-12 h-12 text-[#FF7628] mx-auto" />
                  <h2 className="text-2xl font-black text-white">Панель администратора</h2>
                </div>
                <input type="password" placeholder="Пароль администратора (admin123)" value={adminPasswordInput} onChange={e => setAdminPasswordInput(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-center" required />
                {adminAuthError && <p className="text-red-500 text-xs text-center">Неверный пароль!</p>}
                <button type="submit" className="w-full bg-[#FF7628] text-white font-bold py-3.5 rounded-xl">Войти</button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-bold text-white">Список записей автосервиса</h2>
                  <button onClick={() => setIsAdminAuthenticated(false)} className="text-xs text-red-400 hover:underline">Выйти</button>
                </div>
                <div className="space-y-3">
                  {bookings.map(b => (
                    <div key={b.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#FF7628]">{b.bookingCode}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">{b.serviceName}</span>
                        </div>
                        <p className="text-sm font-semibold text-white mt-1">{b.clientName} • {b.clientPhone} • {b.carModel}</p>
                        <p className="text-xs text-slate-400 mt-1">Дата: {b.date} в {b.time}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{b.price} ₽</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
