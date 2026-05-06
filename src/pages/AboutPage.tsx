import { Badge, Button } from '../components/UI.tsx';
import { CheckCircle2, Target, Heart, Award } from 'lucide-react';
import { motion } from 'motion/react';

export function AboutPage() {
  return (
    <div className="bg-bg-page pb-24">
      {/* Hero */}
      <section className="bg-[#111827] text-white py-24 text-center relative overflow-hidden">
        <div className="container-custom relative z-10">
          <Badge variant="primary" className="mb-6">Notre Mission</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Démocratiser l'excellence créative</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Template School est plus qu'une plateforme : c'est un écosystème conçu pour transformer vos ambitions en compétences professionnelles concrètes.
          </p>
        </div>
      </section>

      <div className="container-custom -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Transparence", icon: CheckCircle2, text: "Des programmes clairs, sans faux semblants." },
            { title: "Impact", icon: Target, text: "Nous mesurons notre succès par la réussite de nos étudiants." },
            { title: "Passion", icon: Heart, text: "Le moteur de toute création durable." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[32px] border border-[#E7E7E7] shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-brand-primary-surface text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-4">{item.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="py-24 container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">L'histoire de Template School</h2>
            <div className="space-y-6 text-[#4B5563] leading-relaxed">
              <p>Fondée par des créateurs pour des créateurs, Template School est née d'un constat simple : la formation en ligne est souvent trop théorique ou déconnectée de la réalité du terrain.</p>
              <p>Nous avons décidé de construire le pont manquant entre la passion et le métier, en proposant des formations structurées par des experts qui pratiquent leur art au quotidien.</p>
              <div className="pt-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-success text-white rounded-full flex items-center justify-center">
                  <Award size={24} />
                </div>
                <p className="font-bold text-[#111827]">Plus de 10,000 étudiants formés à travers le monde.</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-2 rounded-[40px] border border-[#E7E7E7] overflow-hidden shadow-card">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover rounded-[38px]" 
              alt="Team working" 
            />
          </div>
        </div>
      </section>
    </div>
  );
}
