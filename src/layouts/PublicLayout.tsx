import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../components/UI.tsx';
import { useAuth } from '../lib/AuthContext.tsx';
import { Youtube, Menu, X, User, LogOut, Layout, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function PublicLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, logout, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Cours', path: '/courses' },
    { name: 'À propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'top-4 bg-white/90 backdrop-blur-md shadow-lg h-16 max-w-[1180px] mx-auto rounded-[32px] border border-[#E7E7E7] w-[calc(100%-2rem)]' : 'top-0 bg-transparent h-20 w-full'}`}>
        <div className="container-custom h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-[#E7E7E7] flex items-center justify-center shrink-0">
               <img src="/Creativityliberty.png" alt="Liberty Creativity School Logo" className="w-full h-full object-contain p-1" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">Liberty Creativity School</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-sm font-semibold text-[#4B5563] hover:text-brand-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[#F3F4F6] text-[#4B5563] transition-colors">
              <Youtube size={20} />
            </a>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-2 md:gap-4">
                 <Link to={user?.role === 'instructor' ? "/instructor" : "/dashboard"}>
                    <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                       <Layout size={16} />
                       {user?.role === 'instructor' ? 'Espace Pro' : 'Mes cours'}
                    </Button>
                 </Link>
                 <div className="w-10 h-10 rounded-full bg-brand-primary p-0.5 shadow-sm group relative cursor-pointer">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-xs uppercase">
                       {user?.name?.[0]}
                    </div>
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-[#E7E7E7] rounded-2xl shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-[60]">
                       <div className="px-3 py-2 mb-2 border-b border-[#F3F4F6]">
                          <p className="text-xs font-bold text-[#111827]">{user?.name}</p>
                          <p className="text-[10px] text-[#6B7280] font-medium truncate">{user?.email}</p>
                       </div>
                       <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-[#F3F4F6] rounded-xl text-sm font-bold text-[#111827]">
                          <User size={16} /> Mon profil
                       </Link>
                       <button 
                         onClick={() => {
                           const newRole = user?.role === 'instructor' ? 'student' : 'instructor';
                           login(newRole);
                           navigate(newRole === 'instructor' ? '/instructor' : '/dashboard');
                         }}
                         className="flex items-center gap-3 p-3 hover:bg-brand-primary-surface rounded-xl text-sm font-bold text-brand-primary w-full text-left"
                       >
                          <Zap size={16} /> Mode {user?.role === 'instructor' ? 'Étudiant' : 'Formateur'}
                       </button>
                       <button onClick={logout} className="flex items-center gap-3 p-3 hover:bg-error-soft rounded-xl text-sm font-bold text-error w-full text-left">
                          <LogOut size={16} /> Déconnexion
                       </button>
                    </div>
                 </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm">Connexion</Button>
                </Link>
                <Link to="/courses">
                  <Button size="sm">Commencer</Button>
                </Link>
              </>
            )}
            
            <button 
              className="md:hidden p-2 text-[#111827]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="text-2xl font-bold text-[#111827]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-[#E7E7E7]" />
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="lg" className="w-full">Se connecter</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-[#E7E7E7] pt-16 pb-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-[#E7E7E7] flex items-center justify-center shrink-0">
                   <img src="/Creativityliberty.png" alt="Liberty Creativity School Logo" className="w-full h-full object-contain p-1" />
                </div>
                <span className="font-bold text-xl">Liberty Creativity School</span>
              </Link>
              <p className="text-[#4B5563] text-sm leading-relaxed max-w-sm mb-6">
                La plateforme de formation premium pour les créateurs qui veulent acquérir de réelles compétences et transformer leur passion en métier.
              </p>
              <Button variant="primary" size="sm" className="!rounded-full">Nous contacter sur WhatsApp</Button>
            </div>
            
            <div>
              <h4 className="font-bold text-[#111827] mb-6 uppercase text-xs tracking-widest">Liens utiles</h4>
              <ul className="flex flex-col gap-4">
                <li><Link to="/about" className="text-[#6B7280] text-sm hover:text-brand-primary transition-colors">À propos</Link></li>
                <li><Link to="/courses" className="text-[#6B7280] text-sm hover:text-brand-primary transition-colors">Nos cours</Link></li>
                <li><Link to="/legals/terms" className="text-[#6B7280] text-sm hover:text-brand-primary transition-colors">Conditions d'utilisation</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#111827] mb-6 uppercase text-xs tracking-widest">Réseaux</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="text-[#6B7280] text-sm hover:text-brand-primary transition-colors">YouTube</a></li>
                <li><a href="#" className="text-[#6B7280] text-sm hover:text-brand-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="text-[#6B7280] text-sm hover:text-brand-primary transition-colors">Twitter (X)</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#F3F4F6] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#9CA3AF] text-xs">© 2024 Liberty Creativity School. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-[#9CA3AF] text-xs hover:text-brand-primary">Confidentialité</Link>
              <Link to="/cookies" className="text-[#9CA3AF] text-xs hover:text-brand-primary">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
