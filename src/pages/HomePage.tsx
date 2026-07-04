import { Button, Badge } from '../components/UI.tsx';
import { CourseCard } from '../components/CourseCard.tsx';
import { MOCK_COURSES } from '../constants.ts';
import { ArrowRight, Star, Users, CheckCircle, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function HomePage() {
  const categories = ['Toutes catégories', 'YouTube', 'Bande Dessinée', 'WordPress', 'Animation', 'E-Commerce'];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-3xl -z-10" />

        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-6">Nouvelle École Créative</Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-[#111827] tracking-tight mb-8 leading-[1.1]">
                Apprends des compétences <span className="text-brand-primary">concrètes</span> avec des formations structurées.
              </h1>
              <p className="text-lg md:text-xl text-[#4B5563] mb-10 leading-relaxed px-4">
                Des cours conçus par des experts pour transformer vos passions en métiers. 
                Accédez à des contenus pédagogiques de haute qualité, partout et à votre rythme.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/courses">
                  <Button size="lg" className="w-full sm:w-auto min-w-[200px]">Parcourir les cours</Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px]">Commencer maintenant</Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Categories Marquee */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full overflow-hidden flex whitespace-nowrap mt-4"
          >
            <div className="flex animate-marquee min-w-max items-center gap-12 md:gap-24 opacity-60">
              {/* First set */}
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-brand-primary tracking-widest uppercase">Intelligence Artificielle</span></div>
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-gray-500 tracking-widest uppercase">Marketing Digital</span></div>
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-brand-primary tracking-widest uppercase">Création d'Avatar</span></div>
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-gray-500 tracking-widest uppercase">Développement Web</span></div>
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-brand-primary tracking-widest uppercase">Montage Vidéo</span></div>
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-gray-500 tracking-widest uppercase">Copywriting</span></div>
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-brand-primary tracking-widest uppercase">Design Graphique</span></div>
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-gray-500 tracking-widest uppercase">E-commerce</span></div>
              
              {/* Duplicated set for seamless loop */}
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-brand-primary tracking-widest uppercase">Intelligence Artificielle</span></div>
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-gray-500 tracking-widest uppercase">Marketing Digital</span></div>
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-brand-primary tracking-widest uppercase">Création d'Avatar</span></div>
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-gray-500 tracking-widest uppercase">Développement Web</span></div>
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-brand-primary tracking-widest uppercase">Montage Vidéo</span></div>
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-gray-500 tracking-widest uppercase">Copywriting</span></div>
              <div className="flex items-center gap-3"><span className="font-bold text-xl md:text-2xl text-brand-primary tracking-widest uppercase">Design Graphique</span></div>
              <div className="flex items-center gap-3 pr-12 md:pr-24"><span className="font-bold text-xl md:text-2xl text-gray-500 tracking-widest uppercase">E-commerce</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="bg-bg-soft py-24">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <Badge variant="info" className="mb-4">Formations</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111827]">Nos cours populaires</h2>
            </div>
            <Link to="/courses" className="flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all">
              Tout voir <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex overflow-x-auto pb-8 gap-3 no-scrollbar mb-8">
            {categories.map((cat, i) => (
              <button 
                key={cat} 
                className={`flex-none px-6 py-3 rounded-xl text-sm font-bold transition-all ${i === 0 ? 'bg-brand-primary text-white shadow-primary-glow' : 'bg-white text-[#4B5563] border border-[#E7E7E7] hover:border-brand-primary/30'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_COURSES.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square bg-brand-primary-surface rounded-[40px] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
                  alt="Students learning" 
                  className="w-full h-full object-cover mix-blend-multiply opacity-80"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[32px] shadow-floating max-w-xs animate-float">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-success-soft rounded-full flex items-center justify-center text-success">
                    <CheckCircle size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111827]">Certificat inclus</p>
                    <p className="text-xs text-[#6B7280]">Validez vos compétences</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="h-full w-full bg-success rounded-full" />
                </div>
              </div>
            </div>

            <div>
              <Badge variant="warning" className="mb-6">Pourquoi choisir Liberty Creativity School ?</Badge>
              <h2 className="text-4xl font-bold text-[#111827] mb-8 leading-tight">
                Une pédagogie pensée pour le résultat, pas pour le visionnage.
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Apprentissage Action-Orienté", desc: "Des projets réels à chaque étape pour appliquer ce que vous apprenez immédiatement.", icon: Play },
                  { title: "Experts du Terrain", desc: "Nos formateurs ne sont pas des profs théoriques, ce sont des professionnels en activité.", icon: Users },
                  { title: "Accès à Vie & Communauté", desc: "Achetez une fois, accédez pour toujours. Rejoignez un groupe d'entraide actif.", icon: Star }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex-none w-14 h-14 bg-white border border-[#E7E7E7] rounded-2xl flex items-center justify-center text-brand-primary shadow-sm">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[#111827] mb-2">{item.title}</h4>
                      <p className="text-[#6B7280] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 container-custom">
        <div className="bg-[#111827] rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/20 blur-[120px]" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Prêt à booster ta <span className="text-brand-primary underline decoration-brand-primary underline-offset-4">carrière</span> ?
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Rejoins des milliers d'étudiants et commence ton apprentissage dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">Créer mon compte gratuitement</Button>
              </Link>
              <Link to="/courses">
                <Button variant="ghost" className="text-white hover:bg-white/10 w-full sm:w-auto">Explorer le catalogue</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
