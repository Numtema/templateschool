import { useParams, Link } from 'react-router-dom';
import { MOCK_COURSES, MOCK_MODULES } from '../constants.ts';
import { Badge, Button } from '../components/UI.tsx';
import { Check, Play, Clock, Layout, Share2, Phone, ChevronRight, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function CourseDetailPage() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const course = MOCK_COURSES.find(c => c.slug === courseSlug);
  const [activeTab, setActiveTab] = useState<'overview' | 'modules'>('overview');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400);
    const setIsScrolled = (val: boolean) => setIsSticky(val);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!course) return <div className="py-24 text-center">Cours non trouvé</div>;

  const modules = MOCK_MODULES[course.id] || [];

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h${minutes > 0 ? minutes + 'm' : ''}`;
  };

  return (
    <div className="bg-bg-page pb-24">
      {/* Course Hero */}
      <section className="bg-[#111827] text-white pt-16 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
          <img src={course.thumbnailUrl} alt="" className="w-full h-full object-cover blur-2xl scale-125" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="primary">{course.category}</Badge>
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-400 border-l border-gray-700 pl-3">
                  <span>Mis à jour le 12 Mai 2024</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                {course.subtitle}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-brand-primary p-0.5">
                    <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center font-bold text-xs">OL</div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Formateur</p>
                    <p className="text-sm font-bold">{course.instructorName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Layout size={18} className="text-brand-primary" />
                  <span className="text-sm font-medium">{course.lessonsCount} leçons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-brand-primary" />
                  <span className="text-sm font-medium">{formatDuration(course.durationSeconds)} de contenu</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/checkout" className="flex-grow sm:flex-grow-0">
                  <Button size="lg" className="w-full min-w-[240px]">Commencer la formation</Button>
                </Link>
                <Link to="#curriculum" className="flex-grow sm:flex-grow-0">
                  <Button variant="secondary" className="bg-transparent text-white border-white/20 hover:bg-white/10 w-full min-w-[200px]">Voir le programme</Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-5">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="rounded-[32px] overflow-hidden shadow-floating border-8 border-white/5 bg-gray-800 aspect-video relative group cursor-pointer"
               >
                 <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center shadow-primary-glow group-hover:scale-110 transition-transform">
                       <Play size={32} className="fill-white text-white ml-1" />
                    </div>
                 </div>
                 <div className="absolute bottom-6 left-0 right-0 text-center text-sm font-bold text-white/80">Regarder l'aperçu gratuit</div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs / Content Section */}
      <div className="container-custom mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8">
            <div className="flex border-b border-[#E7E7E7] mb-12 sticky top-16 bg-bg-page/80 backdrop-blur-md z-20">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`py-6 px-4 text-sm font-bold transition-all relative ${activeTab === 'overview' ? 'text-brand-primary' : 'text-[#6B7280]'}`}
              >
                Aperçu
                {activeTab === 'overview' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-t-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('modules')}
                className={`py-6 px-4 text-sm font-bold transition-all relative ${activeTab === 'modules' ? 'text-brand-primary' : 'text-[#6B7280]'}`}
              >
                Modules
                {activeTab === 'modules' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-t-full" />}
              </button>
            </div>

            {activeTab === 'overview' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-16"
              >
                <section>
                  <h3 className="text-2xl font-bold mb-6">Ce que vous allez apprendre</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Maîtriser l'algorithme YouTube de A à Z",
                      "Produire des vidéos haute qualité avec peu de budget",
                      "Construire une identité visuelle unique et marquante",
                      "Optimiser vos miniatures pour booster le clic",
                      "La méthode complète pour monétiser sans les pubs Youtube",
                      "Lire et comprendre vos analytics comme un pro"
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 p-4 bg-white border border-[#E7E7E7] rounded-xl">
                        <div className="flex-none p-1 bg-success-soft rounded-full text-success h-fit">
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="text-sm font-medium text-[#4B5563]">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-6">Description de la formation</h3>
                  <div className="prose prose-slate max-w-none text-[#4B5563] leading-relaxed space-y-6">
                    <p>{course.description}</p>
                    <p>Cette formation est le fruit de plusieurs années d'expérience dans l'écosystème numérique. Nous avons condensé le meilleur de nos connaissances pour vous proposer un parcours progressif, logique et surtout orienté vers les résultats concrets.</p>
                    <p>Que vous partiez de zéro ou que vous ayez déjà une chaîne YouTube, vous découvrirez des méthodes applicables immédiatement pour passer au niveau supérieur.</p>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'modules' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id="curriculum"
                className="space-y-6"
              >
                {modules.map((module, i) => (
                  <div key={module.id} className="bg-white border border-[#E7E7E7] rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-brand-secondary-soft text-brand-secondary rounded-xl flex items-center justify-center font-bold">
                           {i + 1}
                         </div>
                         <div>
                            <h4 className="font-bold text-[#111827]">{module.title}</h4>
                            <p className="text-xs text-[#6B7280]">{module.lessons.length} leçons • {formatDuration(module.lessons.reduce((acc, curr) => acc + curr.durationSeconds, 0))}</p>
                         </div>
                      </div>
                    </div>
                    <div className="border-t border-[#F3F4F6]">
                      {module.lessons.map(lesson => (
                        <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-brand-primary-surface transition-colors cursor-pointer group">
                           <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full border border-[#E7E7E7] flex items-center justify-center text-[#9CA3AF] group-hover:border-brand-primary group-hover:text-brand-primary transition-colors">
                                 {lesson.isFree ? <Play size={14} className="fill-current" /> : <Lock size={14} />}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-[#111827] group-hover:text-brand-primary transition-colors">{lesson.title}</p>
                                <p className="text-xs text-[#6B7280]">{Math.floor(lesson.durationSeconds / 60)} minutes</p>
                              </div>
                           </div>
                           {lesson.isFree ? (
                             <Badge variant="success">Gratuit</Badge>
                           ) : (
                             <Badge variant="info">Premium</Badge>
                           )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
             <div className="sticky top-28 space-y-6">
                <div className="bg-white rounded-[32px] border border-[#E7E7E7] p-8 shadow-card overflow-hidden relative">
                   <div className="relative z-10">
                      <div className="flex items-end gap-2 mb-8">
                        <span className="text-4xl font-bold text-[#111827]">{course.price.toFixed(2)}€</span>
                        <span className="text-[#6B7280] line-through mb-1">120,00€</span>
                      </div>

                      <div className="space-y-4 mb-8">
                         <div className="flex items-center gap-3 text-sm text-[#4B5563]">
                           <Check size={18} className="text-success" />
                           <span>Accès immédiat et à vie</span>
                         </div>
                         <div className="flex items-center gap-3 text-sm text-[#4B5563]">
                           <Check size={18} className="text-success" />
                           <span>Certificat de réussite inclus</span>
                         </div>
                         <div className="flex items-center gap-3 text-sm text-[#4B5563]">
                           <Check size={18} className="text-success" />
                           <span>Supports et PDF téléchargeables</span>
                         </div>
                      </div>

                      <div className="flex flex-col gap-3">
                         <Link to="/checkout" className="w-full">
                           <Button size="lg" className="w-full">Acheter le cours</Button>
                         </Link>
                         <Button variant="secondary" size="lg" className="w-full">Essayer gratuitement</Button>
                      </div>

                      <p className="text-center text-[10px] text-[#9CA3AF] mt-6 uppercase font-bold tracking-widest">Paiement sécurisé • CB ou Mobile Money</p>
                   </div>
                </div>

                <div className="bg-[#EEE9FF] rounded-2xl p-6 border border-brand-secondary-soft flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-secondary shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-secondary text-sm">Besoin d'aide ?</h5>
                    <p className="text-xs text-[#4B5563]">Contacte-nous sur WhatsApp</p>
                  </div>
                  <ChevronRight size={18} className="ml-auto text-brand-secondary" />
                </div>

                <div className="flex items-center justify-center gap-3 py-4 text-[#6B7280] font-bold text-sm cursor-pointer hover:text-brand-primary transition-colors">
                  <Share2 size={18} />
                  Partager ce cours
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
