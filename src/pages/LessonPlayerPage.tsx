import { useParams, Link } from 'react-router-dom';
import { MOCK_COURSES, MOCK_MODULES } from '../constants.ts';
import { Button, Badge } from '../components/UI.tsx';
import { ChevronLeft, ChevronRight, CheckCircle2, Play, Lock, FileText, MessageSquare, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function LessonPlayerPage() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const course = MOCK_COURSES.find(c => c.slug === courseSlug);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!course) return <div>Cours non trouvé</div>;

  const modules = MOCK_MODULES[course.id] || [];
  const activeLesson = modules[0]?.lessons[0]; 

  if (!activeLesson) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-8 text-center">
         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
            <Lock size={32} />
         </div>
         <h1 className="text-2xl font-bold text-[#111827] mb-2">Contenu non disponible</h1>
         <p className="text-[#6B7280] mb-8">Le contenu de cette formation n'est pas encore accessible ou est en cours de mise en ligne.</p>
         <Link to="/dashboard">
            <Button>Retour au tableau de bord</Button>
         </Link>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Mini Header */}
      <header className="h-16 border-b border-[#E7E7E7] flex items-center justify-between px-6 flex-none bg-white z-30">
        <div className="flex items-center gap-4">
           <Link to="/dashboard" className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors">
              <ChevronLeft size={20} />
           </Link>
           <div className="h-4 w-px bg-[#E7E7E7]" />
           <div>
              <h1 className="text-sm font-bold text-[#111827] line-clamp-1">{course.title}</h1>
              <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest">{activeLesson.title}</p>
           </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-2 mr-4">
              <div className="w-32 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                 <div className="h-full w-[35%] bg-brand-primary rounded-full" />
              </div>
              <span className="text-[10px] font-bold text-[#6B7280]">35%</span>
           </div>
           <Button variant="outline" size="sm" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
              <span className="ml-2 hidden sm:inline">Programme</span>
           </Button>
        </div>
      </header>

      <div className="flex flex-grow overflow-hidden relative">
        {/* Main Content Area */}
        <main className="flex-grow flex flex-col overflow-y-auto">
           {/* Video Player */}
           <div className="bg-black aspect-video w-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                 <img src={course.thumbnailUrl} alt="" className="w-full h-full object-cover opacity-40 blur-sm" />
                 <div className="absolute inset-0 bg-brand-primary/20" />
                 <div className="relative z-10 flex flex-col items-center">
                    <Button variant="primary" className="w-20 h-20 rounded-full">
                       <Play size={32} className="fill-current ml-1" />
                    </Button>
                    <p className="text-white font-bold mt-4">Chargement de la vidéo...</p>
                 </div>
              </div>
           </div>

           {/* Lesson Info */}
           <div className="p-8 lg:p-12 max-w-4xl mx-auto w-full">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex gap-2">
                    <Badge variant="primary">Module 1</Badge>
                    <Badge variant="info">Vidéo</Badge>
                 </div>
                 <Button variant="secondary" size="sm" className="gap-2">
                    <CheckCircle2 size={16} />
                    Marquer comme terminé
                 </Button>
              </div>

              <h2 className="text-3xl font-bold text-[#111827] mb-6">{activeLesson.title}</h2>
              
              <div className="prose prose-slate max-w-none text-[#4B5563] mb-12">
                 <p>Dans cette leçon, nous allons explorer les bases fondamentales pour lancer votre projet. Nous verrons comment structurer votre approche et quels sont les premiers réflexes à adopter.</p>
                 <h4 className="font-bold text-[#111827] mt-8 mb-4 uppercase text-xs tracking-widest">Ressources de la leçon</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E7E7E7] hover:border-brand-primary cursor-pointer transition-all group">
                       <div className="w-10 h-10 bg-bg-soft text-[#6B7280] rounded-lg flex items-center justify-center group-hover:bg-brand-primary-surface group-hover:text-brand-primary transition-colors">
                          <FileText size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-[#111827]">Guide_PDF_Module1.pdf</p>
                          <p className="text-xs text-[#6B7280]">2.4 MB • PDF Document</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="pt-12 border-t border-[#F3F4F6] flex items-center justify-between">
                 <button className="flex items-center gap-2 text-[#6B7280] font-bold text-sm hover:text-brand-primary transition-colors">
                    <ChevronLeft size={18} />
                    Leçon précédente
                 </button>
                 <Button className="gap-2">
                    Leçon suivante
                    <ChevronRight size={18} />
                 </Button>
              </div>
           </div>
        </main>

        {/* Sidebar / Curriculum */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 360, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden lg:block border-l border-[#E7E7E7] bg-[#F6F7FB] overflow-y-auto z-20"
            >
              <div className="p-6">
                 <h3 className="font-bold text-[#111827] mb-6">Programme du cours</h3>
                 <div className="space-y-6">
                    {modules.map((module, i) => (
                      <div key={module.id} className="space-y-3">
                         <div className="flex items-center justify-between">
                            <h4 className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Module {i + 1}</h4>
                            <span className="text-[10px] font-bold text-[#6B7280]">{module.lessons.length} leçons</span>
                         </div>
                         <div className="bg-white border border-[#E7E7E7] rounded-xl overflow-hidden shadow-sm">
                            {module.lessons.map((lesson, j) => (
                              <div key={lesson.id} className={`p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors ${j === 0 ? 'bg-brand-primary-surface' : ''}`}>
                                 <div className={`w-6 h-6 rounded-full flex items-center justify-center ${j === 0 ? 'bg-brand-primary text-white' : 'border border-[#E7E7E7] text-[#9CA3AF]'}`}>
                                    {j === 0 ? <Play size={10} className="fill-current ml-0.5" /> : (lesson.isFree ? <Play size={10} /> : <Lock size={10} />)}
                                 </div>
                                 <div className="flex-grow">
                                    <p className={`text-xs font-bold leading-tight ${j === 0 ? 'text-brand-primary' : 'text-[#4B5563]'}`}>{lesson.title}</p>
                                    <p className="text-[10px] text-[#9CA3AF] mt-1">{Math.floor(lesson.durationSeconds / 60)} min</p>
                                 </div>
                                 {j === 0 && <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />}
                              </div>
                            ))}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer Mobile Nav */}
      <div className="lg:hidden h-14 border-t border-[#E7E7E7] bg-white flex items-center justify-around px-2">
         <button className="flex flex-col items-center gap-1 text-[#6B7280]">
            <Play size={18} />
            <span className="text-[10px] font-bold">Vidéo</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-[#6B7280]">
            <FileText size={18} />
            <span className="text-[10px] font-bold">Ressources</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-[#6B7280]">
            <MessageSquare size={18} />
            <span className="text-[10px] font-bold">Notes</span>
         </button>
      </div>
    </div>
  );
}
