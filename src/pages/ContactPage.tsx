import { Badge, Button } from '../components/UI.tsx';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export function ContactPage() {
  return (
    <div className="bg-bg-page pb-24">
      <section className="pt-24 pb-12">
        <div className="container-custom">
          <div className="max-w-3xl">
            <Badge variant="warning" className="mb-6">Contactez-nous</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-8">Une question ? Nous sommes là pour <span className="text-brand-primary">vous aider</span>.</h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              Que vous soyez déjà étudiant ou que vous hésitiez à sauter le pas, notre équipe est disponible pour répondre à toutes vos interrogations.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 md:p-12 rounded-[40px] border border-[#E7E7E7] shadow-sm"
            >
              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#111827] mb-2">Prénom</label>
                    <input type="text" className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#111827] mb-2">Nom</label>
                    <input type="text" className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#111827] mb-2">Email</label>
                  <input type="email" className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#111827] mb-2">Objet</label>
                  <select className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all appearance-none cursor-pointer">
                    <option>Question sur une formation</option>
                    <option>Problème technique</option>
                    <option>Demande de partenariat</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#111827] mb-2">Message</label>
                  <textarea className="w-full h-40 p-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all resize-none" placeholder="Comment pouvons-nous vous aider ?" />
                </div>
                <Button size="lg" className="w-full gap-2">
                  Envoyer le message
                  <Send size={18} />
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5">
            <div className="space-y-6">
              <div className="bg-brand-primary p-8 md:p-12 rounded-[40px] text-white shadow-primary-glow">
                <h3 className="text-2xl font-bold mb-8">Canaux directs</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-none">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Email</p>
                      <p className="font-bold">support@templateschool.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-none">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Téléphone / WhatsApp</p>
                      <p className="font-bold">+33 6 00 00 00 00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-none">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Bureaux</p>
                      <p className="font-bold">Dakar, Sénégal / Paris, France</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#EEE9FF] p-8 rounded-[40px] border border-brand-secondary-soft group cursor-pointer hover:bg-brand-secondary-soft transition-all">
                <div className="flex items-center justify-between mb-6">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-secondary">
                      <MessageSquare size={24} />
                   </div>
                   <Badge variant="primary">24h/7j</Badge>
                </div>
                <h4 className="text-xl font-bold text-brand-secondary mb-2">Chat Live</h4>
                <p className="text-sm text-[#4B5563]">Nos agents sont disponibles via WhatsApp pour un support instantané.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
