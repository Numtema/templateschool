import { useAuth } from '../lib/AuthContext.tsx';
import { Button, Badge } from '../components/UI.tsx';
import { 
  Users, 
  BarChart3, 
  Plus, 
  Play, 
  Settings, 
  MoreVertical, 
  DollarSign, 
  TrendingUp,
  BookOpen,
  Eye,
  X,
  ArrowUpRight,
  ChevronRight,
  CreditCard,
  Building
} from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { MOCK_COURSES } from '../constants.ts';

export function InstructorDashboardPage() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [courses, setCourses] = useState(() => 
    MOCK_COURSES.slice(0, 3).map(c => ({
      ...c,
      students: Math.floor(Math.random() * 500) + 100,
      revenue: (Math.random() * 5000 + 1000).toFixed(2),
      rating: (Math.random() * 0.5 + 4.5).toFixed(1),
      views: Math.floor(Math.random() * 5000) + 2000
    }))
  );

  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);

  if (!isLoggedIn || user?.role !== 'instructor') {
    return <Navigate to="/dashboard" />;
  }

  const stats = [
    { label: 'Revenu Total', value: '4,290.00 €', icon: DollarSign, trend: '+12%', color: 'success' },
    { label: 'Étudiants Actifs', value: '1,204', icon: Users, trend: '+5.4%', color: 'primary' },
    { label: 'Note Moyenne', value: '4.8', icon: TrendingUp, trend: '+0.2', color: 'warning' },
    { label: 'Vues (30j)', value: '12.4k', icon: Eye, trend: '+22%', color: 'info' }
  ];

  const handleShowStats = (course: any) => {
    setSelectedCourse(course);
    setShowStats(true);
  };

  const handleDuplicate = (course: any) => {
    const newCourse = {
      ...course,
      id: Math.random(),
      title: `${course.title} (Copie)`,
      students: 0,
      revenue: "0.00"
    };
    setCourses([newCourse, ...courses]);
  };

  const handleDelete = (id: number | string) => {
    if (confirm('Voulez-vous vraiment supprimer cette formation ?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <div className="bg-bg-page min-h-screen pt-12 pb-24">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-2">Espace Formateur ⚡️</h1>
            <p className="text-[#6B7280]">Gérez vos formations et suivez vos performances en direct.</p>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" className="gap-2" onClick={() => setShowSettings(true)}>
                <Settings size={20} />
                Réglages
             </Button>
             <Link to="/instructor/courses/new">
                <Button className="gap-2 shadow-primary-glow">
                   <Plus size={20} />
                   Nouvelle formation
                </Button>
             </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[32px] border border-[#E7E7E7] shadow-sm relative overflow-hidden group"
            >
              <div className={`w-12 h-12 bg-${stat.color}-soft text-${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-end justify-between">
                 <div>
                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-[#111827]">{stat.value}</p>
                 </div>
                 <Badge variant="success" className="text-[10px]">{stat.trend}</Badge>
              </div>
              <div className={`absolute top-0 right-0 w-1 h-full bg-${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
          ))}
        </div>

        {/* Courses Management */}
        <div className="bg-white rounded-[40px] border border-[#E7E7E7] shadow-sm">
           <div className="p-8 border-b border-[#F3F4F6] flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#111827]">Vos Formations</h2>
              <button className="text-sm font-bold text-brand-primary hover:underline">Voir tout le catalogue</button>
           </div>
           
           <div className="overflow-x-auto lg:overflow-visible">
              <table className="w-full text-left">
                 <thead className="bg-bg-soft/30">
                    <tr>
                       <th className="px-8 py-5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Formation</th>
                       <th className="px-8 py-5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Étudiants</th>
                       <th className="px-8 py-5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Revenu</th>
                       <th className="px-8 py-5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Statut</th>
                       <th className="px-8 py-5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-[#F3F4F6]">
                    {courses.map((course) => (
                      <tr key={course.id} className="group hover:bg-bg-soft/20 transition-colors">
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                               <div className="w-16 h-10 rounded-lg overflow-hidden flex-none border border-[#E7E7E7]">
                                  <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                               </div>
                               <div>
                                  <p className="text-sm font-bold text-[#111827] line-clamp-1">{course.title}</p>
                                  <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest">{course.category}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                               <Users size={14} className="text-[#9CA3AF]" />
                               <span className="text-sm font-bold text-[#4B5563]">{course.students}</span>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-sm font-bold text-[#111827]">{course.revenue} €</td>
                         <td className="px-8 py-6">
                            <Badge variant="success">Publié</Badge>
                         </td>
                         <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                               <button 
                                 onClick={() => handleShowStats(course)}
                                 className="p-2 text-[#6B7280] hover:bg-brand-primary-surface hover:text-brand-primary rounded-lg transition-all" 
                                 title="Statistiques"
                               >
                                  <BarChart3 size={18} />
                               </button>
                               <button 
                                 onClick={() => navigate(`/instructor/courses/new`)}
                                 className="p-2 text-[#6B7280] hover:bg-bg-soft rounded-lg transition-all" 
                                 title="Éditer"
                               >
                                  <Settings size={18} />
                               </button>
                               
                               <div className="relative">
                                  <button 
                                    onClick={() => setOpenMenuId(openMenuId === course.id ? null : course.id)}
                                    className={`p-2 rounded-lg transition-all ${openMenuId === course.id ? 'bg-brand-primary text-white shadow-primary-glow' : 'text-[#6B7280] hover:bg-bg-soft'}`}
                                  >
                                     <MoreVertical size={18} />
                                  </button>
                                  
                                  <AnimatePresence>
                                    {openMenuId === course.id && (
                                      <>
                                        <div 
                                          className="fixed inset-0 z-10" 
                                          onClick={() => setOpenMenuId(null)}
                                        />
                                        <motion.div 
                                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                          animate={{ opacity: 1, y: 0, scale: 1 }}
                                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                          className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E7E7E7] rounded-2xl shadow-xl z-20 p-2 text-left"
                                        >
                                           <Link 
                                             to={`/courses/${course.slug}`}
                                             className="w-full flex items-center gap-3 p-3 hover:bg-bg-soft rounded-xl text-sm font-bold text-[#111827] transition-colors"
                                           >
                                              <Play size={16} /> Aperçu public
                                           </Link>
                                           <button 
                                             onClick={() => {
                                               handleDuplicate(course);
                                               setOpenMenuId(null);
                                             }}
                                             className="w-full flex items-center gap-3 p-3 hover:bg-bg-soft rounded-xl text-sm font-bold text-[#111827] transition-colors"
                                           >
                                              <Plus size={16} /> Dupliquer
                                           </button>
                                           <div className="h-px bg-[#F3F4F6] my-2" />
                                           <button 
                                             onClick={() => {
                                               handleDelete(course.id);
                                               setOpenMenuId(null);
                                             }}
                                             className="w-full flex items-center gap-3 p-3 hover:bg-error-soft rounded-xl text-sm font-bold text-error transition-colors"
                                           >
                                              <X size={16} /> Supprimer
                                           </button>
                                        </motion.div>
                                      </>
                                    )}
                                  </AnimatePresence>
                               </div>
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-[#111827] rounded-[40px] p-10 text-white relative overflow-hidden group">
               <div className="relative z-10">
                  <Badge variant="warning" className="mb-6">Conseil du jour</Badge>
                  <h3 className="text-2xl font-bold mb-4">Optimisez votre SEO</h3>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed">Les formations avec des titres clairs et des mots-clés spécifiques convertissent 35% mieux en moyenne.</p>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-[#111827]">Lire le guide</Button>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="bg-brand-primary p-10 rounded-[40px] text-white shadow-primary-glow">
               <h3 className="text-2xl font-bold mb-4">Support Instructeur</h3>
               <p className="text-white/80 text-sm mb-8 leading-relaxed">Besoin d'aide pour vos montages ou la structure de votre cours ? Notre équipe dédiée vous accompagne.</p>
               <Button className="bg-white text-brand-primary hover:bg-gray-100 border-none">Contacter un coach</Button>
            </div>
        </div>
      </div>

      {/* Stats Modal */}
      <AnimatePresence>
        {showStats && selectedCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStats(false)}
              className="absolute inset-0 bg-[#111827]/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
               <div className="md:w-80 bg-bg-soft p-8 border-r border-[#E7E7E7] overflow-y-auto">
                  <button onClick={() => setShowStats(false)} className="absolute top-6 right-6 md:hidden p-2 text-[#6B7280]"><X size={24} /></button>
                  <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-[#E7E7E7]">
                     <img src={selectedCourse.thumbnailUrl} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111827] mb-2">{selectedCourse.title}</h3>
                  <p className="text-sm text-[#6B7280] mb-8">{selectedCourse.category}</p>
                  
                  <div className="space-y-4">
                     <div className="p-4 rounded-xl bg-white border border-[#F3F4F6]">
                        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">Étudiants Totaux</p>
                        <p className="text-xl font-bold text-[#111827]">{selectedCourse.students}</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white border border-[#F3F4F6]">
                        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">Revenu Généré</p>
                        <p className="text-xl font-bold text-success">{selectedCourse.revenue} €</p>
                     </div>
                  </div>
               </div>

               <div className="flex-grow p-8 md:p-12 overflow-y-auto">
                  <div className="flex items-center justify-between mb-12">
                     <h4 className="text-2xl font-bold text-[#111827]">Analyse détaillée</h4>
                     <button onClick={() => setShowStats(false)} className="hidden md:block p-2 text-[#6B7280] hover:bg-bg-soft rounded-lg transition-all"><X size={24} /></button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                     <div className="space-y-6">
                        <h5 className="text-sm font-bold text-[#111827] uppercase tracking-widest">Source du trafic</h5>
                        <div className="space-y-4">
                           {[
                             { label: 'Recherche Directe', value: '45%', color: 'bg-brand-primary' },
                             { label: 'Réseaux Sociaux', value: '30%', color: 'bg-brand-accent' },
                             { label: 'Email Marketing', value: '15%', color: 'bg-success' },
                             { label: 'Autres', value: '10%', color: 'bg-gray-300' }
                           ].map((item, i) => (
                             <div key={i} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                   <span className="text-[#6B7280]">{item.label}</span>
                                   <span className="text-[#111827]">{item.value}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                   <div className={`h-full ${item.color}`} style={{ width: item.value }} />
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                     <div className="bg-bg-soft rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-primary mb-4 rotate-3">
                           <TrendingUp size={32} />
                        </div>
                        <p className="text-sm font-bold text-[#111827] mb-2">Taux de complétion</p>
                        <p className="text-4xl font-bold text-brand-primary">68%</p>
                        <p className="text-[10px] text-[#6B7280] font-bold uppercase mt-4 tracking-tighter">+12% vs le mois dernier</p>
                     </div>
                  </div>

                  <div className="pt-8 border-t border-[#F3F4F6]">
                     <Button variant="primary" className="w-full gap-2">
                        Télécharger le rapport complet (PDF)
                        <ArrowUpRight size={18} />
                     </Button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-[#111827]/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl relative overflow-hidden"
            >
               <div className="p-8 md:p-12">
                  <div className="flex items-center justify-between mb-12">
                     <h3 className="text-2xl font-bold text-[#111827]">Paramètres de compte Pro</h3>
                     <button onClick={() => setShowSettings(false)} className="p-2 text-[#6B7280] hover:bg-bg-soft rounded-lg transition-all"><X size={24} /></button>
                  </div>

                  <div className="space-y-6">
                     <button className="w-full flex items-center gap-4 p-6 rounded-2xl border border-[#F3F4F6] hover:border-brand-primary hover:bg-brand-primary-surface transition-all group text-left">
                        <div className="w-12 h-12 bg-bg-soft rounded-xl flex items-center justify-center text-[#6B7280] group-hover:bg-white group-hover:text-brand-primary transition-colors">
                           <CreditCard size={24} />
                        </div>
                        <div className="flex-grow">
                           <p className="font-bold text-[#111827]">Mode de versement</p>
                           <p className="text-xs text-[#6B7280]">Votre virement mensuel par défaut (Stripe)</p>
                        </div>
                        <ChevronRight size={20} className="text-[#9CA3AF]" />
                     </button>

                     <button className="w-full flex items-center gap-4 p-6 rounded-2xl border border-[#F3F4F6] hover:border-brand-primary hover:bg-brand-primary-surface transition-all group text-left">
                        <div className="w-12 h-12 bg-bg-soft rounded-xl flex items-center justify-center text-[#6B7280] group-hover:bg-white group-hover:text-brand-primary transition-colors">
                           <Building size={24} />
                        </div>
                        <div className="flex-grow">
                           <p className="font-bold text-[#111827]">Identité Fiscale</p>
                           <p className="text-xs text-[#6B7280]">Gestion des factures et numéro de TVA</p>
                        </div>
                        <ChevronRight size={20} className="text-[#9CA3AF]" />
                     </button>

                     <div className="p-8 bg-brand-primary-surface rounded-[32px] border border-brand-primary-soft">
                        <h4 className="font-bold text-brand-primary mb-2">Statut de vérification</h4>
                        <p className="text-xs text-[#6B7280] mb-6 leading-relaxed">Votre compte est actuellement vérifié et certifié. Vous pouvez vendre des formations dans le monde entier.</p>
                        <Badge variant="success">Vérifié le 12/12/2023</Badge>
                     </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                     <Button size="lg" onClick={() => setShowSettings(false)}>Fermer</Button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
