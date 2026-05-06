import { useState } from 'react';
import { Button, Badge } from '../components/UI.tsx';
import { 
  ChevronLeft, 
  Upload, 
  Plus, 
  Trash2, 
  Video, 
  FileText, 
  Save,
  Rocket
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export function CreateCoursePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const [modules, setModules] = useState([
    { id: 1, title: 'Introduction', lessons: [{ id: 1, title: 'Bienvenue', type: 'video' }] }
  ]);

  const addModule = () => {
    setModules([...modules, { 
      id: modules.length + 1, 
      title: `Module ${modules.length + 1}`, 
      lessons: [] 
    }]);
  };

  const addLesson = (moduleId: number) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return { 
          ...m, 
          lessons: [...m.lessons, { id: Math.random(), title: 'Nouvelle leçon', type: 'video' }] 
        };
      }
      return m;
    }));
  };

  return (
    <div className="bg-bg-page min-h-screen pt-12 pb-24">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-12">
           <button 
             onClick={() => navigate(-1)}
             className="w-10 h-10 bg-white border border-[#E7E7E7] rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors"
           >
              <ChevronLeft size={20} />
           </button>
           <div>
              <h1 className="text-2xl font-bold text-[#111827]">Créer une nouvelle formation</h1>
              <p className="text-sm text-[#6B7280]">Étape {step} sur 3</p>
           </div>
           <div className="ml-auto hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                 <Save size={16} /> Sauvegarder en brouillon
              </Button>
              <Button size="sm" className="gap-2" onClick={() => navigate('/instructor')}>
                 <Rocket size={16} /> Publier
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* Sidebar Navigation */}
           <div className="lg:col-span-3 space-y-4">
              {[
                { id: 1, label: "Infos générales", desc: "Titre, description..." },
                { id: 2, label: "Programme", desc: "Modules et leçons" },
                { id: 3, label: "Prix & Paramètres", desc: "Tarifs, visibilité" }
              ].map((s) => (
                <button 
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  className={`w-full text-left p-6 rounded-[24px] border-2 transition-all ${step === s.id ? 'border-brand-primary bg-white shadow-card' : 'border-transparent bg-white/50 opacity-60'}`}
                >
                   <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">Étape {s.id}</p>
                   <p className="text-sm font-bold text-[#111827]">{s.label}</p>
                </button>
              ))}
           </div>

           {/* Form Area */}
           <div className="lg:col-span-9">
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 md:p-12 rounded-[40px] border border-[#E7E7E7] shadow-sm"
              >
                 {step === 1 && (
                   <div className="space-y-8">
                      <h3 className="text-xl font-bold text-[#111827]">Informations de base</h3>
                      <div className="space-y-6">
                         <div>
                            <label className="block text-sm font-bold text-[#111827] mb-2">Titre de la formation</label>
                            <input type="text" placeholder="Ex: Masterclass WordPress 2024" className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all" />
                         </div>
                         <div>
                            <label className="block text-sm font-bold text-[#111827] mb-2">Description courte</label>
                            <textarea className="w-full h-32 p-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all resize-none" placeholder="Décrivez votre cours en quelques lignes..." />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                               <label className="block text-sm font-bold text-[#111827] mb-2">Catégorie</label>
                               <select className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all appearance-none cursor-pointer">
                                  <option>Design</option>
                                  <option>Marketing</option>
                                  <option>Code</option>
                                  <option>Vidéo</option>
                               </select>
                            </div>
                            <div>
                               <label className="block text-sm font-bold text-[#111827] mb-2">Niveau</label>
                               <select className="w-full h-14 px-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all appearance-none cursor-pointer">
                                  <option>Débutant</option>
                                  <option>Intermédiaire</option>
                                  <option>Avancé</option>
                               </select>
                            </div>
                         </div>
                         <div>
                            <label className="block text-sm font-bold text-[#111827] mb-2">Miniature (Image)</label>
                            <div className="h-48 border-2 border-dashed border-[#CBD0D8] rounded-2xl flex flex-col items-center justify-center text-[#9CA3AF] cursor-pointer hover:border-brand-primary hover:text-brand-primary transition-all hover:bg-brand-primary-surface">
                               <Upload size={32} className="mb-2" />
                               <span className="text-sm font-bold">Cliquez pour uploader (16:9)</span>
                            </div>
                         </div>
                      </div>
                   </div>
                 )}

                 {step === 2 && (
                   <div className="space-y-8">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-[#111827]">Programme du cours</h3>
                        <Button variant="outline" size="sm" onClick={addModule} className="gap-2">
                           <Plus size={16} /> Ajouter un module
                        </Button>
                      </div>

                      <div className="space-y-6">
                         {modules.map((module) => (
                           <div key={module.id} className="p-6 border border-[#E7E7E7] rounded-3xl bg-bg-soft/30">
                              <div className="flex items-center justify-between mb-6">
                                 <input 
                                   defaultValue={module.title}
                                   className="text-lg font-bold text-[#111827] bg-transparent outline-none border-b border-transparent focus:border-brand-primary w-full mr-4"
                                 />
                                 <button className="text-error opacity-40 hover:opacity-100 transition-opacity">
                                    <Trash2 size={18} />
                                 </button>
                              </div>

                              <div className="space-y-3 mb-6">
                                 {module.lessons.map((lesson) => (
                                   <div key={lesson.id} className="flex items-center gap-4 p-4 bg-white border border-[#E7E7E7] rounded-2xl shadow-sm">
                                      <div className="w-8 h-8 rounded-lg bg-bg-soft flex items-center justify-center text-[#9CA3AF]">
                                         {lesson.type === 'video' ? <Video size={16} /> : <FileText size={16} />}
                                      </div>
                                      <input 
                                        defaultValue={lesson.title}
                                        className="text-sm font-bold text-[#111827] bg-transparent outline-none w-full"
                                      />
                                      <button className="p-2 text-[#9CA3AF] hover:text-error transition-colors">
                                         <Trash2 size={16} />
                                      </button>
                                   </div>
                                 ))}
                              </div>

                              <button 
                                onClick={() => addLesson(module.id)}
                                className="w-full h-12 border-2 border-dashed border-[#CBD0D8] rounded-xl flex items-center justify-center text-xs font-bold text-[#9CA3AF] hover:bg-white hover:text-brand-primary hover:border-brand-primary transition-all"
                              >
                                 + Ajouter une leçon
                              </button>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}

                 {step === 3 && (
                    <div className="space-y-8">
                       <h3 className="text-xl font-bold text-[#111827]">Prix & Paramètres</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                             <label className="block text-sm font-bold text-[#111827] mb-2">Prix de vente (€)</label>
                             <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-[#111827]">€</span>
                                <input type="number" placeholder="49.99" className="w-full h-14 pl-12 pr-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all" />
                             </div>
                          </div>
                          <div>
                             <label className="block text-sm font-bold text-[#111827] mb-2">Prix barré (Optionnel)</label>
                             <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-[#6B7280]">€</span>
                                <input type="number" placeholder="99.99" className="w-full h-14 pl-12 pr-6 rounded-xl border border-[#E7E7E7] bg-bg-soft outline-none focus:border-brand-primary transition-all" />
                             </div>
                          </div>
                       </div>
                    </div>
                 )}

                 <div className="mt-12 pt-8 border-t border-[#F3F4F6] flex justify-between">
                    <Button 
                      variant="ghost" 
                      onClick={() => setStep(Math.max(1, step - 1))}
                      disabled={step === 1}
                    >
                       Précédent
                    </Button>
                    {step < 3 ? (
                      <Button onClick={() => setStep(step + 1)}>Suivant</Button>
                    ) : (
                      <Button onClick={() => navigate('/instructor')}>Publier la formation</Button>
                    )}
                 </div>
              </motion.div>
           </div>
        </div>
      </div>
    </div>
  );
}
