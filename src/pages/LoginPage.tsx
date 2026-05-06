import { useState } from 'react';
import { Button } from '../components/UI.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext.tsx';
import { motion } from 'motion/react';
import { Eye, EyeOff, Star } from 'lucide-react';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      <div className="lg:w-1/2 p-8 lg:p-24 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-primary-glow">
              <span className="font-bold text-xl">T</span>
            </div>
            <span className="font-bold text-2xl">Template<span className="text-brand-primary">School</span></span>
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-bold text-[#111827] mb-2 leading-tight">Bienvenue !</h1>
            <p className="text-lg text-[#4B5563]">Connectez-vous pour continuer votre progression.</p>
          </div>

          <div className="space-y-6">
             <Button variant="outline" size="lg" className="w-full relative group overflow-hidden border-[#E7E7E7] hover:border-brand-primary">
                <div className="absolute inset-0 bg-brand-primary-surface opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                  <span>Continuer avec Google</span>
                </div>
             </Button>

             <div className="flex items-center gap-4 py-2">
                <div className="h-px bg-[#E7E7E7] flex-grow" />
                <span className="text-[#9CA3AF] text-xs font-bold uppercase tracking-widest">ou avec email</span>
                <div className="h-px bg-[#E7E7E7] flex-grow" />
             </div>

             <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-bold text-[#111827] mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] focus:border-brand-primary outline-none text-sm transition-all bg-bg-soft focus:bg-white"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-[#111827]">Mot de passe</label>
                    <Link to="/forgot-password" size="sm" className="text-xs font-bold text-brand-primary hover:underline">Oublié ?</Link>
                  </div>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] focus:border-brand-primary outline-none text-sm transition-all bg-bg-soft focus:bg-white"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#9CA3AF] hover:text-brand-primary transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <Button size="lg" className="w-full">Se connecter</Button>
             </form>

             <p className="text-center text-sm text-[#6B7280]">
                Pas encore de compte ? <Link to="/register" className="text-brand-primary font-bold hover:underline">Inscrivez-vous</Link>
             </p>
          </div>
          
          <div className="mt-16 pt-8 border-t border-[#F3F4F6]">
            <p className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest leading-relaxed">
               En vous connectant, vous acceptez nos <Link to="/terms" className="text-[#6B7280]">Conditions d'utilisation</Link> et notre <Link to="/privacy" className="text-[#6B7280]">Politique de confidentialité</Link>.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 bg-[#111827] relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop" 
            alt="Dashboard" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/40 to-brand-secondary/40 mix-blend-overlay" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-16 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[32px] max-w-xl"
          >
            <div className="flex gap-1 mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-yellow-400 fill-current" />)}
            </div>
            <p className="text-2xl font-bold text-white mb-8 leading-tight">
              "Cette plateforme a littéralement changé ma façon de voir ma chaîne YouTube. Les modules sont clairs et actionnables immédiatement."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-primary p-0.5 shadow-primary-glow">
                 <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-brand-primary">A</div>
              </div>
              <div>
                <p className="font-bold text-white">Alexandre S.</p>
                <p className="text-sm text-gray-400">Créateur de contenu @AlexTech</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
