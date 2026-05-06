import { useAuth } from '../lib/AuthContext.tsx';
import { Button, Badge } from '../components/UI.tsx';
import { User, Mail, Shield, Bell, CreditCard, ChevronRight, Lock, Laptop, Smartphone, Check, Download, AlertCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

type SectionType = "personal" | "security" | "notifications" | "payments";

export function ProfilePage() {
  const { user, isLoggedIn } = useAuth();
  const [activeSection, setActiveSection] = useState<SectionType>("personal");

  if (!isLoggedIn) return <Navigate to="/login" />;

  const menuItems: { label: string; icon: any; id: SectionType }[] = [
    { label: "Informations personnelles", icon: User, id: "personal" },
    { label: "Sécurité", icon: Shield, id: "security" },
    { label: "Notifications", icon: Bell, id: "notifications" },
    { label: "Paiements", icon: CreditCard, id: "payments" }
  ];

  return (
    <div className="bg-bg-page min-h-screen pt-12 pb-24">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-[#111827] mb-12">Mon profil</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-[#E7E7E7] text-center">
              <div className="w-24 h-24 bg-brand-primary rounded-[32px] p-1 mx-auto mb-6">
                <div className="w-full h-full rounded-[30px] bg-white flex items-center justify-center text-3xl font-bold text-brand-primary">
                  {user?.name?.[0]}
                </div>
              </div>
              <h2 className="text-xl font-bold text-[#111827] mb-1">{user?.name}</h2>
              <p className="text-sm text-[#6B7280] mb-6">{user?.email}</p>
              <Badge variant="primary">Membre Premium</Badge>
            </div>

            <nav className="bg-white p-4 rounded-[32px] border border-[#E7E7E7] space-y-2">
              {menuItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-sm font-bold transition-all ${activeSection === item.id ? 'bg-brand-primary-surface text-brand-primary' : 'text-[#4B5563] hover:bg-bg-soft'}`}
                >
                  <item.icon size={20} />
                  {item.label}
                  <ChevronRight size={16} className={`ml-auto ${activeSection === item.id ? 'opacity-100' : 'opacity-30'}`} />
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-8">
             <AnimatePresence mode="wait">
               {activeSection === "personal" && (
                 <motion.div 
                   key="personal"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="bg-white p-8 md:p-12 rounded-[40px] border border-[#E7E7E7] shadow-sm"
                 >
                    <h3 className="text-2xl font-bold text-[#111827] mb-8">Informations personnelles</h3>
                    <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-[#111827] mb-2">Nom complet</label>
                            <input type="text" defaultValue={user?.name} className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-[#111827] mb-2">Email</label>
                            <input type="email" defaultValue={user?.email} className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all" />
                          </div>
                       </div>
                       
                       <div>
                          <label className="block text-sm font-bold text-[#111827] mb-2">Bio rapide</label>
                          <textarea 
                            className="w-full h-32 p-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all resize-none"
                            placeholder="Parlez-nous un peu de vous..."
                          />
                       </div>

                       <div className="pt-8 flex justify-end">
                          <Button size="lg" className="min-w-[200px]">Enregistrer les modifications</Button>
                       </div>
                    </form>
                 </motion.div>
               )}

               {activeSection === "security" && (
                 <motion.div 
                   key="security"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="bg-white p-8 md:p-12 rounded-[40px] border border-[#E7E7E7] shadow-sm space-y-12"
                 >
                    <div>
                      <h3 className="text-2xl font-bold text-[#111827] mb-8">Sécurité du compte</h3>
                      <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                         <div className="grid grid-cols-1 gap-6">
                            <div>
                               <label className="block text-sm font-bold text-[#111827] mb-2">Ancien mot de passe</label>
                               <input type="password" placeholder="••••••••" className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div>
                                  <label className="block text-sm font-bold text-[#111827] mb-2">Nouveau mot de passe</label>
                                  <input type="password" placeholder="••••••••" className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all" />
                               </div>
                               <div>
                                  <label className="block text-sm font-bold text-[#111827] mb-2">Confirmer le mot de passe</label>
                                  <input type="password" placeholder="••••••••" className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all" />
                               </div>
                            </div>
                         </div>
                         <Button size="lg" className="w-full md:w-auto">Mettre à jour le mot de passe</Button>
                      </form>
                    </div>

                    <div className="pt-8 border-t border-[#F3F4F6]">
                       <h4 className="text-lg font-bold text-[#111827] mb-6">Appareils connectés</h4>
                       <div className="space-y-4">
                          {[
                            { device: "MacBook Pro - Dakar, SN", icon: Laptop, current: true, time: "Actif maintenant" },
                            { device: "iPhone 13 - Dakar, SN", icon: Smartphone, current: false, time: "Dernière connexion le 04/05/2026" }
                          ].map((session, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-[#F3F4F6] bg-bg-soft/30 hover:bg-bg-soft transition-colors text-left">
                               <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${session.current ? 'bg-brand-primary/10 text-brand-primary' : 'bg-gray-100 text-gray-400'}`}>
                                     <session.icon size={20} />
                                  </div>
                                  <div>
                                     <p className="text-sm font-bold text-[#111827] flex items-center gap-2">
                                       {session.device}
                                       {session.current && <Badge variant="success">Cet appareil</Badge>}
                                     </p>
                                     <p className="text-[10px] text-[#6B7280] font-medium uppercase tracking-wider">{session.time}</p>
                                  </div>
                               </div>
                               {!session.current && <button className="text-xs font-bold text-brand-primary hover:underline">Déconnecter</button>}
                            </div>
                          ))}
                       </div>
                    </div>
                 </motion.div>
               )}

               {activeSection === "notifications" && (
                 <motion.div 
                   key="notifications"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="bg-white p-8 md:p-12 rounded-[40px] border border-[#E7E7E7] shadow-sm"
                 >
                    <h3 className="text-2xl font-bold text-[#111827] mb-8">Préférences de notification</h3>
                    <div className="space-y-6">
                       {[
                         { title: "Nouveaux cours publiés", desc: "Recevoir un email quand un formateur publie une nouvelle formation.", checked: true },
                         { title: "Progression & Rappels", desc: "Soyez notifié de vos étapes franchies et rappels d'étude.", checked: true },
                         { title: "Offres promotionnelles", desc: "Ne manquez pas les réductions et ventes flash.", checked: false },
                         { title: "Mises à jour plateforme", desc: "Actualités sur les nouvelles fonctionnalités et maintenance.", checked: true }
                       ].map((pref, i) => (
                         <div key={i} className="flex items-start justify-between p-6 rounded-2xl border border-[#F3F4F6] bg-bg-soft/30 hover:bg-bg-soft transition-colors">
                            <div className="flex-grow pr-8">
                               <p className="font-bold text-[#111827] mb-1">{pref.title}</p>
                               <p className="text-xs text-[#6B7280] leading-relaxed">{pref.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer mt-1">
                               <input type="checkbox" defaultChecked={pref.checked} className="sr-only peer" />
                               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                            </label>
                         </div>
                       ))}
                    </div>
                    
                    <div className="pt-8 flex justify-end">
                       <Button size="lg">Enregistrer les préférences</Button>
                    </div>
                 </motion.div>
               )}

               {activeSection === "payments" && (
                 <motion.div 
                   key="payments"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="bg-white p-8 md:p-12 rounded-[40px] border border-[#E7E7E7] shadow-sm space-y-12"
                 >
                    <div>
                       <h3 className="text-2xl font-bold text-[#111827] mb-8">Historique des transactions</h3>
                       <div className="overflow-x-auto">
                          <table className="w-full text-left">
                             <thead className="border-b border-[#F3F4F6]">
                                <tr>
                                   <th className="pb-4 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Formation</th>
                                   <th className="pb-4 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Date</th>
                                   <th className="pb-4 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Montant</th>
                                   <th className="pb-4 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Statut</th>
                                   <th className="pb-4 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest text-right">Action</th>
                                </tr>
                             </thead>
                             <tbody>
                                {[
                                  { course: "Formation YouTube Intégrale", date: "04 Mai 2024", amount: "53,99 €", status: "Terminé" },
                                  { course: "Pack WordPress Creator", date: "12 Avr 2024", amount: "45,00 €", status: "Terminé" },
                                  { course: "Masterclass Animation 2D", date: "02 Avr 2024", amount: "0,00 €", status: "Gratuit" }
                                ].map((item, i) => (
                                  <tr key={i} className="border-b border-[#F3F4F6] group hover:bg-bg-soft/50 transition-colors">
                                     <td className="py-5 font-bold text-sm text-[#111827]">{item.course}</td>
                                     <td className="py-5 text-xs text-[#6B7280]">{item.date}</td>
                                     <td className="py-5 text-sm font-bold text-[#111827]">{item.amount}</td>
                                     <td className="py-5 text-xs">
                                        <Badge variant={item.status === "Terminé" ? "success" : (item.status === "Gratuit" ? "primary" : "warning")}>
                                           {item.status}
                                        </Badge>
                                     </td>
                                     <td className="py-5 text-right">
                                        <button className="p-2 text-[#6B7280] hover:text-brand-primary transition-colors">
                                           <Download size={18} />
                                        </button>
                                     </td>
                                  </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </div>

                    <div className="pt-8 border-t border-[#F3F4F6]">
                       <h4 className="text-lg font-bold text-[#111827] mb-6">Moyens de paiement enregistrés</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-6 rounded-2xl border border-brand-primary-soft bg-brand-primary-surface flex justify-between items-start">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-primary border border-brand-primary-soft shadow-sm">
                                   <CreditCard size={20} />
                                </div>
                                <div className="text-left">
                                   <p className="text-sm font-bold text-brand-primary">Visa terminant par 4242</p>
                                   <p className="text-[10px] text-brand-primary/60 font-bold uppercase tracking-widest">Expire le 12/26</p>
                                </div>
                             </div>
                             <button className="text-brand-primary opacity-40 hover:opacity-100 transition-opacity">
                                <AlertCircle size={18} />
                             </button>
                          </div>
                          
                          <button className="p-6 rounded-2xl border border-dashed border-[#CBD0D8] text-[#6B7280] hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary-surface transition-all flex items-center justify-center gap-2 group">
                             <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-xl">+</span>
                             </div>
                             <span className="text-sm font-bold">Ajouter un moyen</span>
                          </button>
                       </div>
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
