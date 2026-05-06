import { MOCK_COURSES } from '../constants.ts';
import { Button, Badge } from '../components/UI.tsx';
import { Play, BookOpen, Trophy, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function StudentDashboardPage() {
  const enrolledCourses = [
    { ...MOCK_COURSES[0], progress: 35, lastLesson: 'Identité de Chaîne' },
    { ...MOCK_COURSES[1], progress: 12, lastLesson: 'Installation de WordPress' }
  ];

  return (
    <div className="bg-bg-page min-h-screen pt-12 pb-24">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-2">Bonjour, Étudiant 👋</h1>
            <p className="text-[#6B7280]">C'est un bon jour pour apprendre quelque chose de nouveau.</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white p-4 rounded-2xl border border-[#E7E7E7] flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary-soft text-brand-primary rounded-xl flex items-center justify-center">
                   <Clock size={20} />
                </div>
                <div>
                   <p className="text-[10px] uppercase font-bold text-[#9CA3AF]">Temps d'étude</p>
                   <p className="font-bold text-[#111827]">12h 45m</p>
                </div>
             </div>
             <div className="bg-white p-4 rounded-2xl border border-[#E7E7E7] flex items-center gap-3">
                <div className="w-10 h-10 bg-success-soft text-success rounded-xl flex items-center justify-center">
                   <Trophy size={20} />
                </div>
                <div>
                   <p className="text-[10px] uppercase font-bold text-[#9CA3AF]">Certificats</p>
                   <p className="font-bold text-[#111827]">2 obtenus</p>
                </div>
             </div>
          </div>
        </div>

        {/* Continue Learning */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#111827]">Continuer l'apprentissage</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {enrolledCourses.map((course, i) => (
               <motion.div 
                 key={course.id}
                 initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="bg-white rounded-[28px] border border-[#E7E7E7] p-6 shadow-sm hover:shadow-card transition-all group"
               >
                 <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-48 aspect-video rounded-2xl overflow-hidden flex-none">
                       <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                       <div>
                          <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1">{course.category}</p>
                          <h3 className="font-bold text-[#111827] mb-2 line-clamp-1">{course.title}</h3>
                          <p className="text-xs text-[#6B7280] mb-4">Prochaine leçon : <span className="text-[#111827] font-semibold">{course.lastLesson}</span></p>
                       </div>
                       
                       <div className="space-y-4">
                          <div className="space-y-2">
                             <div className="flex justify-between text-[10px] font-bold uppercase text-[#9CA3AF]">
                                <span>Progression</span>
                                <span className="text-brand-primary">{course.progress}%</span>
                             </div>
                             <div className="h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${course.progress}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-full bg-brand-primary rounded-full" 
                                />
                             </div>
                          </div>
                          <Link to={`/courses/${course.slug}/learn`}>
                            <Button size="sm" className="w-full sm:w-auto">Reprendre</Button>
                          </Link>
                       </div>
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </section>

        {/* Categories / Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-[#111827] mb-6">Explorer par thématiques</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                 {['Design', 'Marketing', 'Code', 'Vidéo', 'AI', 'Business'].map(topic => (
                   <div key={topic} className="bg-white p-6 rounded-2xl border border-[#E7E7E7] text-center hover:border-brand-primary hover:bg-brand-primary-surface cursor-pointer transition-all group">
                      <div className="w-12 h-12 bg-bg-soft rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-colors">
                         <BookOpen size={20} className="text-[#6B7280] group-hover:text-brand-primary" />
                      </div>
                      <p className="font-bold text-sm text-[#111827]">{topic}</p>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="bg-[#111827] rounded-[32px] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                 <Badge variant="warning" className="mb-4">Offre Prime</Badge>
                 <h3 className="text-2xl font-bold mb-4">Passez au niveau supérieur</h3>
                 <p className="text-gray-400 text-sm mb-8 leading-relaxed">Accédez à l'intégralité de notre catalogue pour un abonnement mensuel sans engagement.</p>
                 <Button className="w-full bg-brand-accent hover:bg-orange-600 border-none">En savoir plus</Button>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-accent/20 blur-3xl" />
           </div>
        </div>
      </div>
    </div>
  );
}
