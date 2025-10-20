import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Github, Linkedin, Mail, Send, Code2, Database, 
  Terminal, Layers, Zap, Shield, ChevronDown, ArrowRight  
} from 'lucide-react';

import CosmicBackground from './components/CosmicBackground';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isTeamVisible, setIsTeamVisible] = useState(false);
  const [isTechVisible, setIsTechVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);

      setScrolled(currentScrollY > 50);

      const sections = ['home', 'team', 'services', 'tech', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect();
        setIsServicesVisible(rect.top < window.innerHeight * 0.75 && rect.bottom > 0);
      }

      if (teamRef.current) {
        const rect = teamRef.current.getBoundingClientRect();
        setIsTeamVisible(rect.top < window.innerHeight * 0.75 && rect.bottom > 0);
      }

      if (techRef.current) {
        const rect = techRef.current.getBoundingClientRect();
        setIsTechVisible(rect.top < window.innerHeight * 0.75 && rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <CosmicBackground />

      <div className="relative z-10">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl shadow-lg shadow-purple-500/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/50">
                V
              </div>
              <div className="text-xl sm:text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">VoiD</span>
                <span className="text-gray-400">team</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              {['home', 'team', 'services', 'tech', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 relative overflow-hidden group ${
                    activeSection === item
                      ? 'text-white bg-purple-600/20 border border-purple-500/50'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                  {activeSection !== item && (
                    <span className="absolute inset-0 bg-purple-600/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </button>
              ))}
            </div>

            <button
              className="md:hidden text-white hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 animate-fadeIn">
              {['home', 'team', 'services', 'tech', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left capitalize py-3 px-4 rounded-lg transition-colors ${
                    activeSection === item
                      ? 'text-white bg-purple-600/20 border border-purple-500/50'
                      : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

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
            Команда профессионалов, объединяющая frontend и backend разработку для создания полноценных решений
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
              onClick={() => scrollToSection('services')}
              className="px-8 py-4 border-2 border-purple-500/50 rounded-xl font-semibold hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
            >
              Наши услуги
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

      <section id="team" className="min-h-screen flex items-center py-20 px-4 sm:px-6" ref={teamRef}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-20 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Наша команда</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
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
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg shadow-purple-500/50 flex-shrink-0">
                    F
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">Frontend Developer</h3>
                    <p className="text-purple-400 font-medium text-sm sm:text-base">Визуальная магия и UX</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                  Создаю потрясающие пользовательские интерфейсы с вниманием к деталям.
                  Специализируюсь на React, TypeScript и современных фреймворках для создания
                  отзывчивых и интерактивных веб-приложений.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs sm:text-sm text-purple-300">React</span>
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs sm:text-sm text-purple-300">TypeScript</span>
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs sm:text-sm text-purple-300">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs sm:text-sm text-purple-300">Next.js</span>
                </div>
                <div className="flex gap-3">
                  <a href="#" className="p-2 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 hover:text-purple-300 transition-all">
                    <Github size={20} />
                  </a>
                  <a href="#" className="p-2 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 hover:text-purple-300 transition-all">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="p-2 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 hover:text-purple-300 transition-all">
                    <Send size={20} />
                  </a>
                </div>
              </div>
            </div>

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
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg shadow-violet-500/50 flex-shrink-0">
                    B
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">Backend Developer</h3>
                    <p className="text-violet-400 font-medium text-sm sm:text-base">Архитектура и логика</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                  Разрабатываю надёжные серверные решения и API.
                  Эксперт в построении масштабируемых систем, работе с базами данных
                  и оптимизации производительности приложений.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-lg text-xs sm:text-sm text-violet-300">Node.js</span>
                  <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-lg text-xs sm:text-sm text-violet-300">PostgreSQL</span>
                  <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-lg text-xs sm:text-sm text-violet-300">Docker</span>
                  <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-lg text-xs sm:text-sm text-violet-300">REST API</span>
                </div>
                <div className="flex gap-3">
                  <a href="#" className="p-2 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 hover:text-violet-300 transition-all">
                    <Github size={20} />
                  </a>
                  <a href="#" className="p-2 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 hover:text-violet-300 transition-all">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="p-2 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 hover:text-violet-300 transition-all">
                    <Send size={20} />
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
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">100%</div>
                <div className="text-gray-400 text-sm sm:text-base">Качество кода</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="min-h-screen flex items-center py-20 px-4 sm:px-6" ref={servicesRef}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-20 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Что мы делаем</span>
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className={`group relative transition-all duration-700 ${isServicesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:transform hover:scale-105 h-full">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
                  <Code2 size={28} className="text-purple-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Frontend Разработка</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Создание современных, адаптивных интерфейсов с акцентом на производительность и пользовательский опыт.
                </p>
              </div>
            </div>

            <div className={`group relative transition-all duration-700 delay-150 ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-violet-500/30 hover:border-violet-400 transition-all duration-300 hover:transform hover:scale-105 h-full">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-violet-500/50 transition-all">
                  <Database size={28} className="text-violet-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Backend Разработка</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Проектирование масштабируемых серверных архитектур, API и баз данных для ваших проектов.
                </p>
              </div>
            </div>

            <div className={`group relative transition-all duration-700 delay-300 sm:col-span-2 md:col-span-1 ${isServicesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/0 to-fuchsia-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-fuchsia-500/30 hover:border-fuchsia-400 transition-all duration-300 hover:transform hover:scale-105 h-full">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-fuchsia-500/50 transition-all">
                  <Layers size={28} className="text-fuchsia-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Full-Stack Проекты</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Комплексная разработка приложений от идеи до деплоя с полным циклом разработки.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tech" className="min-h-screen flex items-center py-20 px-4 sm:px-6" ref={techRef}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-20 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Технологии</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <Terminal size={24} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold">Frontend</h3>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'React & Next.js', level: 95 },
                  { name: 'TypeScript', level: 90 },
                  { name: 'Tailwind CSS', level: 95 },
                  { name: 'Three.js & GSAP', level: 80 },
                ].map((tech, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium text-sm sm:text-base">{tech.name}</span>
                      <span className="text-purple-400 font-bold text-sm sm:text-base">{tech.level}%</span>
                    </div>
                    <div className="h-2 sm:h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-purple-500/50"
                        style={{
                          width: isTechVisible ? `${tech.level}%` : '0%',
                          transitionDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-lg flex items-center justify-center">
                  <Database size={24} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold">Backend</h3>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Node.js & Express', level: 90 },
                  { name: 'PostgreSQL & MongoDB', level: 85 },
                  { name: 'Docker & CI/CD', level: 80 },
                  { name: 'REST & GraphQL', level: 90 },
                ].map((tech, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium text-sm sm:text-base">{tech.name}</span>
                      <span className="text-violet-400 font-bold text-sm sm:text-base">{tech.level}%</span>
                    </div>
                    <div className="h-2 sm:h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-600 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-violet-500/50"
                        style={{
                          width: isTechVisible ? `${tech.level}%` : '0%',
                          transitionDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Shield, label: 'Безопасность' },
              { icon: Zap, label: 'Производительность' },
              { icon: Layers, label: 'Масштабируемость' },
              { icon: Code2, label: 'Чистый код' },
            ].map((item, index) => (
              <div key={index} className="group text-center p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <item.icon size={20} className="text-purple-400 sm:w-6 sm:h-6" />
                </div>
                <p className="text-gray-300 font-medium text-xs sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Связаться с нами</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-purple-500/50">
                    F
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Frontend Dev</h3>
                    <p className="text-purple-400 text-sm">Визуальная магия</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-all group">
                    <Github size={20} className="text-purple-400" />
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">@frontend_dev</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-all group">
                    <Linkedin size={20} className="text-purple-400" />
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">Frontend Developer</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-all group">
                    <Send size={20} className="text-purple-400" />
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">@frontend_dev</span>
                  </a>
                  <a href="mailto:frontend@voidteam.dev" className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-all group">
                    <Mail size={20} className="text-purple-400" />
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">frontend@voidteam.dev</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-violet-500/30 hover:border-violet-400/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-violet-500/50">
                    B
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Backend Dev</h3>
                    <p className="text-violet-400 text-sm">Архитектура</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 p-3 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 transition-all group">
                    <Github size={20} className="text-violet-400" />
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">@backend_dev</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 transition-all group">
                    <Linkedin size={20} className="text-violet-400" />
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">Backend Developer</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 transition-all group">
                    <Send size={20} className="text-violet-400" />
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">@backend_dev</span>
                  </a>
                  <a href="mailto:backend@voidteam.dev" className="flex items-center gap-3 p-3 bg-violet-500/10 rounded-lg hover:bg-violet-500/20 transition-all group">
                    <Mail size={20} className="text-violet-400" />
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">backend@voidteam.dev</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Или напишите нам на общую почту</p>
            <a
              href="mailto:hello@voidteam.dev"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <Mail size={20} />
              hello@voidteam.dev
            </a>
          </div>
        </div>
      </section>

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
