import { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Send, Mail, Code2, Database, Layers, ChevronDown, ArrowRight, Zap, Clock, DollarSign, ExternalLink } from 'lucide-react';
import CosmicBackground from './components/CosmicBackground';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);
  const [isTeamVisible, setIsTeamVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);
  const [isTechVisible, setIsTechVisible] = useState(false);

  const teamRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;

      const sections = ['home', 'team', 'projects', 'services', 'tech', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === teamRef.current) setIsTeamVisible(entry.isIntersecting);
          if (entry.target === servicesRef.current) setIsServicesVisible(entry.isIntersecting);
          if (entry.target === projectsRef.current) setIsProjectsVisible(entry.isIntersecting);
          if (entry.target === techRef.current) setIsTechVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    if (teamRef.current) observer.observe(teamRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (techRef.current) observer.observe(techRef.current);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <CosmicBackground />
      
      <div className="relative z-10">
        <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center font-bold text-lg">
                  V
                </div>
                <div className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">VoiD</span>
                  <span className="text-gray-400">team</span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-8">
                {['home', 'team', 'projects', 'services', 'tech', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize transition-colors ${
                      activeSection === item ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
                    }`}
                  >
                    {item === 'home' ? 'Главная' : 
                     item === 'team' ? 'Команда' :
                     item === 'projects' ? 'Проекты' :
                     item === 'services' ? 'Услуги' :
                     item === 'tech' ? 'Технологии' : 'Контакты'}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-300 hover:text-purple-400 transition-colors"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4 space-y-2 animate-fadeIn">
                {['home', 'team', 'projects', 'services', 'tech', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`block w-full text-left capitalize py-3 px-4 rounded-lg transition-colors ${
                      activeSection === item
                        ? 'text-white bg-purple-600/20 border border-purple-500/50'
                        : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
                    }`}
                  >
                    {item === 'home' ? 'Главная' : 
                     item === 'team' ? 'Команда' :
                     item === 'projects' ? 'Проекты' :
                     item === 'services' ? 'Услуги' :
                     item === 'tech' ? 'Технологии' : 'Контакты'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="mb-8 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-purple-300 text-sm font-medium tracking-wide">Доступны для новых проектов</span>
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 animate-fadeIn leading-tight" style={{ animationDelay: '0.2s' }}>
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                VoiD</span><span className="text-white">team
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4 animate-fadeIn font-light" style={{ animationDelay: '0.4s' }}>
              Создаём <span className="text-purple-400 font-semibold">цифровые продукты</span>
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-12 animate-fadeIn max-w-2xl mx-auto px-4" style={{ animationDelay: '0.5s' }}>
              Full-stack и мобильная разработка от идеи до запуска. 2+ года опыта. Удалённая работа с возможностью офисных встреч.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn px-4" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={() => scrollToSection('contact')}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
              >
                Начать проект
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 border-2 border-purple-500/50 rounded-xl font-semibold hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
              >
                Наши проекты
              </button>
            </div>

            <button
              onClick={() => scrollToSection('team')}
              className="hidden sm:block absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section id="team" className="min-h-screen flex items-center py-20 px-4 sm:px-6" ref={teamRef}>
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-20 text-center">
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Наша команда</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Frontend Developer - Александр */}
              <div
                className={`group relative transition-all duration-700 ${
                  isTeamVisible
                    ? 'opacity-100 translate-x-0'
                    : scrollDirection === 'down'
                      ? 'opacity-0 -translate-x-20'
                      : 'opacity-0 translate-x-20'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 h-full">
                  <div className="flex items-start gap-4 sm:gap-6 mb-6">
                    <img 
                      src="/alexander.jpg" 
                      alt="Александр" 
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 border-purple-500/50 shadow-lg shadow-purple-500/50 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold mb-1">Александр</h3>
                      <p className="text-purple-400 font-medium text-sm sm:text-base mb-2">Frontend Developer</p>
                      <p className="text-gray-400 text-xs sm:text-sm">2+ года опыта</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                    Создаю современные интерфейсы с фокусом на производительность и UX. 
                    Могу делать анимации и интерактивные элементы. Перфекционист в деталях.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs sm:text-sm text-purple-300">React</span>
                    <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs sm:text-sm text-purple-300">TypeScript</span>
                    <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs sm:text-sm text-purple-300">Tailwind</span>
                    <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs sm:text-sm text-purple-300">Vue.js</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://github.com/MASHINKA34" target="_blank" rel="noopener noreferrer" className="p-2 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 hover:text-purple-300 transition-all">
                      <Github size={20} />
                    </a>
                    <a href="https://t.me/mashinka34r" target="_blank" rel="noopener noreferrer" className="p-2 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 hover:text-purple-300 transition-all">
                      <Send size={20} />
                    </a>
                    <a href="mailto:mashinka34jr@gmail.com" className="p-2 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 hover:text-purple-300 transition-all">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Backend Developer - Павел */}
              <div
                className={`group relative transition-all duration-700 delay-200 ${
                  isTeamVisible
                    ? 'opacity-100 translate-x-0'
                    : scrollDirection === 'down'
                      ? 'opacity-0 translate-x-20'
                      : 'opacity-0 -translate-x-20'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-violet-500/30 hover:border-violet-400/50 transition-all duration-300 h-full">
                  <div className="flex items-start gap-4 sm:gap-6 mb-6">
                    <img 
                      src="/pavel.jpg" 
                      alt="Павел" 
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 border-violet-500/50 shadow-lg shadow-violet-500/50 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold mb-1">Павел</h3>
                      <p className="text-violet-400 font-medium text-sm sm:text-base mb-2">Backend Developer</p>
                      <p className="text-gray-400 text-xs sm:text-sm">2+ года опыта</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                    Строю надёжные серверные архитектуры. Фанат оптимизации и безопасности.
                    Работаю с высоконагруженными системами и сложной бизнес-логикой.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-lg text-xs sm:text-sm text-violet-300">Rust</span>
                    <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-lg text-xs sm:text-sm text-violet-300">Python</span>
                    <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-lg text-xs sm:text-sm text-violet-300">PostgreSQL</span>
                    <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-lg text-xs sm:text-sm text-violet-300">Docker</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://github.com/Enuro" target="_blank" rel="noopener noreferrer" className="p-2 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 hover:text-violet-300 transition-all">
                      <Github size={20} />
                    </a>
                    <a href="https://t.me/EnuroV" target="_blank" rel="noopener noreferrer" className="p-2 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 hover:text-violet-300 transition-all">
                      <Send size={20} />
                    </a>
                    <a href="mailto:alpha9a@mail.ru" className="p-2 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 hover:text-violet-300 transition-all">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile Developer - Данил */}
              <div
                className={`group relative transition-all duration-700 delay-400 ${
                  isTeamVisible
                    ? 'opacity-100 translate-x-0'
                    : scrollDirection === 'down'
                      ? 'opacity-0 translate-x-20'
                      : 'opacity-0 -translate-x-20'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 h-full">
                  <div className="flex items-start gap-4 sm:gap-6 mb-6">
                    <img
                      src="/danil.jpg"
                      alt="Данил"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/50 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold mb-1">Данил</h3>
                      <p className="text-cyan-400 font-medium text-sm sm:text-base mb-2">Mobile Developer</p>
                      <p className="text-gray-400 text-xs sm:text-sm">1+ год опыта</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                    Разрабатываю кроссплатформенные мобильные приложения. Люблю чистую архитектуру и плавный UI.
                    Умею делать нативные анимации и работать с нативными API телефона.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-xs sm:text-sm text-cyan-300">React Native</span>
                    <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-xs sm:text-sm text-cyan-300">Flutter</span>
                    <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-xs sm:text-sm text-cyan-300">TypeScript</span>
                    <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-xs sm:text-sm text-cyan-300">Expo</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://github.com/ZTDan1" target="_blank" rel="noopener noreferrer" className="p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-300 transition-all">
                      <Github size={20} />
                    </a>
                    <a href="https://t.me/ZullTazar" target="_blank" rel="noopener noreferrer" className="p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-300 transition-all">
                      <Send size={20} />
                    </a>
                    <a href="mailto:sulfurazorx@gmail.com" className="p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-300 transition-all">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className={`text-center transition-all duration-700 delay-400 ${isTeamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-6 sm:px-8 py-6 bg-gradient-to-r from-purple-900/30 to-violet-900/30 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">Full-Stack</div>
                  <div className="text-gray-400 text-sm sm:text-base">Решения под ключ</div>
                </div>
                <div className="w-12 h-px sm:w-px sm:h-12 bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">Mobile</div>
                  <div className="text-gray-400 text-sm sm:text-base">iOS & Android</div>
                </div>
                <div className="w-12 h-px sm:w-px sm:h-12 bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">2+ года</div>
                  <div className="text-gray-400 text-sm sm:text-base">Коммерческого опыта</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="min-h-screen flex items-center py-20 px-4 sm:px-6" ref={projectsRef}>
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-20 text-center">
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Наши проекты</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Project 1 - E-commerce */}
              <div className={`group relative transition-all duration-700 ${isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Интернет-магазин электроники</h3>
                    <ExternalLink size={20} className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-gray-400 mb-4 text-sm">Full-stack проект</p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Полнофункциональный магазин с корзиной, фильтрацией товаров, админ-панелью и интеграцией платёжных систем. 
                    Быстрая загрузка, адаптивный дизайн, SEO-оптимизация.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">React</span>
                    <span className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">TypeScript</span>
                    <span className="px-2 py-1 bg-violet-500/20 rounded text-xs text-violet-300">Rust</span>
                    <span className="px-2 py-1 bg-violet-500/20 rounded text-xs text-violet-300">PostgreSQL</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={16} /> 3 недели</span>
                  </div>
                </div>
              </div>

              {/* Project 2 - SaaS Platform */}
              <div className={`group relative transition-all duration-700 delay-150 ${isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-violet-500/30 hover:border-violet-400 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">CRM система для автосервиса</h3>
                    <ExternalLink size={20} className="text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-gray-400 mb-4 text-sm">Backend-heavy проект</p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Система управления заказами, клиентами и складом. Автоматические уведомления, аналитика, 
                    экспорт отчётов. Обработка 500+ заказов в месяц.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-violet-500/20 rounded text-xs text-violet-300">Python</span>
                    <span className="px-2 py-1 bg-violet-500/20 rounded text-xs text-violet-300">FastAPI</span>
                    <span className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">Vue.js</span>
                    <span className="px-2 py-1 bg-violet-500/20 rounded text-xs text-violet-300">Redis</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={16} /> 4 недели</span>
                  </div>
                </div>
              </div>

              {/* Project 3 - Landing */}
              <div className={`group relative transition-all duration-700 delay-300 ${isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/0 to-fuchsia-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-fuchsia-500/30 hover:border-fuchsia-400 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Лендинг для IT-продукта</h3>
                    <ExternalLink size={20} className="text-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-gray-400 mb-4 text-sm">Frontend проект</p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Яркий продающий лендинг с интерактивными элементами и плавными анимациями. 
                    Конверсия в заявку 12%. Полностью адаптивный дизайн для всех устройств.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-fuchsia-500/20 rounded text-xs text-fuchsia-300">React</span>
                    <span className="px-2 py-1 bg-fuchsia-500/20 rounded text-xs text-fuchsia-300">Framer Motion</span>
                    <span className="px-2 py-1 bg-fuchsia-500/20 rounded text-xs text-fuchsia-300">Tailwind</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={16} /> 1 неделя</span>
                  </div>
                </div>
              </div>

              {/* Project 4 - API */}
              <div className={`group relative transition-all duration-700 delay-450 ${isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-violet-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">API для мобильного приложения</h3>
                    <ExternalLink size={20} className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-gray-400 mb-4 text-sm">Backend проект</p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    RESTful API с аутентификацией, WebSocket'ами для real-time уведомлений,
                    кэшированием и оптимизацией запросов. Обслуживает 1000+ активных пользователей.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-violet-500/20 rounded text-xs text-violet-300">Rust</span>
                    <span className="px-2 py-1 bg-violet-500/20 rounded text-xs text-violet-300">Actix-web</span>
                    <span className="px-2 py-1 bg-violet-500/20 rounded text-xs text-violet-300">PostgreSQL</span>
                    <span className="px-2 py-1 bg-violet-500/20 rounded text-xs text-violet-300">Redis</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={16} /> 3 недели</span>
                  </div>
                </div>
              </div>

              {/* Project 5 - Fitness App (Данил) */}
              <div className={`group relative transition-all duration-700 delay-600 ${isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Фитнес-трекер</h3>
                    <ExternalLink size={20} className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-gray-400 mb-4 text-sm">Mobile проект</p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Кроссплатформенное приложение для отслеживания тренировок и питания.
                    Графики прогресса, уведомления, интеграция с Apple Health и Google Fit. 4.8★ в сторах.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">React Native</span>
                    <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">Expo</span>
                    <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">TypeScript</span>
                    <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">Zustand</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={16} /> 4 недели</span>
                  </div>
                </div>
              </div>

              {/* Project 6 - Delivery App (Данил) */}
              <div className={`group relative transition-all duration-700 delay-700 ${isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Приложение доставки еды</h3>
                    <ExternalLink size={20} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-gray-400 mb-4 text-sm">Mobile проект</p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Полноценное приложение для заказа еды с картой, real-time отслеживанием курьера,
                    push-уведомлениями и системой отзывов. 2000+ активных пользователей.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">Flutter</span>
                    <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">Dart</span>
                    <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">Firebase</span>
                    <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">Google Maps</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={16} /> 5 недель</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="min-h-screen flex items-center py-20 px-4 sm:px-6" ref={servicesRef}>
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Услуги и цены</span>
            </h2>
            <p className="text-center text-gray-400 mb-20 text-lg">Прозрачное ценообразование. Сроки от 1 недели до месяца.</p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
              <div className={`group relative transition-all duration-700 ${isServicesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:transform hover:scale-105 h-full">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
                    <Code2 size={28} className="text-purple-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Лендинг / Простой сайт</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-white">от 15.000₽</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                    Одностраничный сайт с современным дизайном, формой обратной связи и адаптивной вёрсткой.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock size={16} />
                    <span>1-2 недели</span>
                  </div>
                </div>
              </div>

              <div className={`group relative transition-all duration-700 delay-150 ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-violet-500/30 hover:border-violet-400 transition-all duration-300 hover:transform hover:scale-105 h-full">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-violet-500/50 transition-all">
                    <Database size={28} className="text-violet-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Корпоративный сайт</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-white">от 100.000₽</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                    Многостраничный сайт с CMS, админ-панелью, блогом и интеграциями со сторонними сервисами.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock size={16} />
                    <span>2-3 недели</span>
                  </div>
                </div>
              </div>

              <div className={`group relative transition-all duration-700 delay-300 sm:col-span-2 md:col-span-1 ${isServicesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/0 to-fuchsia-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-fuchsia-500/30 hover:border-fuchsia-400 transition-all duration-300 hover:transform hover:scale-105 h-full">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-fuchsia-500/50 transition-all">
                    <Layers size={28} className="text-fuchsia-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Интернет-магазин / CRM</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-white">от 130.000₽</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                    Full-stack решение с базой данных, админкой, платёжными системами и полной автоматизацией бизнес-процессов.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock size={16} />
                    <span>3-4 недели</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`text-center transition-all duration-700 delay-400 ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-6 sm:px-8 py-6 bg-gradient-to-r from-purple-900/30 to-violet-900/30 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Zap size={32} className="text-purple-400" />
                  <div className="text-left">
                    <div className="text-xl font-bold text-white">Бесплатная консультация</div>
                    <div className="text-gray-400 text-sm">Обсудим ваш проект и подберём решение</div>
                  </div>
                </div>
                <div className="w-12 h-px sm:w-px sm:h-12 bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />
                <div className="flex items-center gap-3">
                  <DollarSign size={32} className="text-violet-400" />
                  <div className="text-left">
                    <div className="text-xl font-bold text-white">Гибкая оплата</div>
                    <div className="text-gray-400 text-sm">50% аванс, 50% после сдачи</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK SECTION */}
        <section id="tech" className="min-h-screen flex items-center py-20 px-4 sm:px-6" ref={techRef}>
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-20 text-center">
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Технологии</span>
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Frontend */}
              <div className={`transition-all duration-700 ${isTechVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-purple-500/30 h-full">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Frontend</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>React / Next.js</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Vue.js / Nuxt.js</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>TypeScript</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Tailwind CSS / SCSS</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Vite / Webpack</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Framer Motion</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Redux / Zustand</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend */}
              <div className={`transition-all duration-700 delay-150 ${isTechVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-violet-500/30 h-full">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Backend</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                      <span>Rust / Actix-web</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                      <span>Python / FastAPI</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                      <span>Node.js / Express</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                      <span>PostgreSQL / MySQL</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                      <span>MongoDB</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                      <span>Redis</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                      <span>REST API / GraphQL</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DevOps & Tools */}
              <div className={`transition-all duration-700 delay-300 ${isTechVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-fuchsia-500/30 h-full">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">DevOps & Инструменты</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-fuchsia-400 rounded-full"></div>
                      <span>Docker / Docker Compose</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-fuchsia-400 rounded-full"></div>
                      <span>Git / GitHub</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-fuchsia-400 rounded-full"></div>
                      <span>Nginx</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-fuchsia-400 rounded-full"></div>
                      <span>Vercel / Netlify</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-fuchsia-400 rounded-full"></div>
                      <span>Linux / VPS</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-fuchsia-400 rounded-full"></div>
                      <span>CI/CD</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-fuchsia-400 rounded-full"></div>
                      <span>Figma / Design Systems</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile */}
              <div className={`transition-all duration-700 delay-450 ${isTechVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-cyan-500/30 h-full">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Mobile</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>React Native</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Flutter / Dart</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Expo</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Firebase</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Push Notifications</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>App Store / Google Play</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Zustand / Redux</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="min-h-screen flex items-center py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Свяжитесь с нами</span>
            </h2>
            <p className="text-center text-gray-400 mb-16 text-lg">Готовы обсудить ваш проект. Ответим в течение 24 часов.</p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Александр Contact Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src="/alexander.jpg" 
                      alt="Александр" 
                      className="w-16 h-16 rounded-xl object-cover border-2 border-purple-500/50 shadow-lg shadow-purple-500/50"
                    />
                    <div>
                      <h3 className="text-xl font-bold">Александр</h3>
                      <p className="text-purple-400 text-sm">Frontend Developer</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a href="https://github.com/MASHINKA34" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-all group">
                      <Github size={20} className="text-purple-400" />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">@MASHINKA34</span>
                    </a>
                    <a href="https://t.me/mashinka34r" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-all group">
                      <Send size={20} className="text-purple-400" />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">@mashinka34r</span>
                    </a>
                    <a href="mailto:mashinka34jr@gmail.com" className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-all group">
                      <Mail size={20} className="text-purple-400" />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors break-all">mashinka34jr@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Павел Contact Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-violet-500/30 hover:border-violet-400/50 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src="/pavel.jpg" 
                      alt="Павел" 
                      className="w-16 h-16 rounded-xl object-cover border-2 border-violet-500/50 shadow-lg shadow-violet-500/50"
                    />
                    <div>
                      <h3 className="text-xl font-bold">Павел</h3>
                      <p className="text-violet-400 text-sm">Backend Developer</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a href="https://github.com/Enuro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 transition-all group">
                      <Github size={20} className="text-violet-400" />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">@Enuro</span>
                    </a>
                    <a href="https://t.me/EnuroV" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 transition-all group">
                      <Send size={20} className="text-violet-400" />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">@EnuroV</span>
                    </a>
                    <a href="mailto:alpha9a@mail.ru" className="flex items-center gap-3 p-3 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 transition-all group">
                      <Mail size={20} className="text-violet-400" />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">alpha9a@mail.ru</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Данил Contact Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src="/danil.jpg"
                      alt="Данил"
                      className="w-16 h-16 rounded-xl object-cover border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/50 flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-xl font-bold">Данил</h3>
                      <p className="text-cyan-400 text-sm">Mobile Developer</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a href="https://github.com/ZTDan1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-all group">
                      <Github size={20} className="text-cyan-400" />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">@ZTDan1</span>
                    </a>
                    <a href="https://t.me/ZullTazar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-all group">
                      <Send size={20} className="text-cyan-400" />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">@ZullTazar</span>
                    </a>
                    <a href="mailto:sulfurazorx@gmail.com" className="flex items-center gap-3 p-3 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-all group">
                      <Mail size={20} className="text-cyan-400" />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors break-all">sulfurazorx@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-6 text-lg">Работаем удалённо. Офисные встречи обсуждаются индивидуально.</p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-900/30 to-violet-900/30 border border-purple-500/30 rounded-xl">
                <Zap size={20} className="text-purple-400" />
                <span className="text-gray-300">Открыты для международных проектов</span>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-purple-500/20 py-8 sm:py-12 px-4 sm:px-6 mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center font-bold text-lg">
                  V
                </div>
                <div className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">VoiD</span>
                  <span className="text-gray-400">team</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm sm:text-base text-center md:text-left">
                © 2025 VoiDteam. Создаём будущее вместе.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;