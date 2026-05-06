import { Button, Badge } from '../components/UI.tsx';
import { MOCK_COURSES } from '../constants.ts';
import { Shield, Smartphone, CreditCard, Lock, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const course = MOCK_COURSES[0]; // Example

  return (
    <div className="min-h-screen bg-bg-page pt-12 pb-24">
      <div className="container-custom">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6B7280] font-bold text-sm mb-8 hover:text-brand-primary transition-colors"
        >
          <ChevronLeft size={18} />
          Retour
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Payment */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
               <section>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                    <h2 className="text-2xl font-bold text-[#111827]">Validation du compte</h2>
                 </div>
                 <div className="bg-white border border-[#E7E7E7] rounded-2xl p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-success-soft text-success rounded-full flex items-center justify-center">
                         <CheckCircle2 size={24} />
                       </div>
                       <div>
                         <p className="text-sm font-bold text-[#111827]">Connecté en tant que</p>
                         <p className="text-xs text-[#6B7280]">student@example.com</p>
                       </div>
                    </div>
                    <Link to="/login" className="text-xs font-bold text-brand-primary hover:underline underline-offset-4">Changer de compte</Link>
                 </div>
               </section>

               <section>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm">2</div>
                    <h2 className="text-2xl font-bold text-[#111827]">Moyen de paiement</h2>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="p-6 bg-white border-2 border-brand-primary rounded-2xl text-left relative group">
                       <div className="absolute top-4 right-4">
                          <CheckCircle2 size={20} className="text-brand-primary" />
                       </div>
                       <Smartphone className="text-brand-primary mb-4" size={32} />
                       <h4 className="font-bold text-[#111827] mb-1">Mobile Money</h4>
                       <p className="text-xs text-[#6B7280]">Paiement rapide via votre opérateur</p>
                    </button>
                    <button className="p-6 bg-white border border-[#E7E7E7] rounded-2xl text-left hover:border-brand-primary/30 transition-all group">
                       <CreditCard className="text-[#9CA3AF] group-hover:text-brand-primary mb-4 transition-colors" size={32} />
                       <h4 className="font-bold text-[#111827] mb-1 text-gray-400">Carte Bancaire</h4>
                       <p className="text-xs text-[#6B7280]">Visa, Mastercard, etc.</p>
                    </button>
                 </div>
                 
                 <div className="mt-8 p-6 bg-brand-primary-surface border border-brand-primary-soft rounded-2xl">
                    <h4 className="font-bold text-brand-primary mb-4 flex items-center gap-2">
                       <Smartphone size={18} />
                       Informations de paiement
                    </h4>
                    <div className="space-y-4">
                       <div>
                         <label className="block text-xs font-bold text-brand-primary/80 mb-2 uppercase tracking-widest">Numéro de téléphone</label>
                         <input 
                           type="text" 
                           placeholder="+221 77 000 00 00"
                           className="w-full h-12 px-4 rounded-xl border border-brand-primary-soft bg-white focus:border-brand-primary outline-none text-sm"
                         />
                       </div>
                       <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg">
                          <Lock size={14} className="text-brand-primary" />
                          <p className="text-[10px] text-brand-primary font-medium italic">Vos données sont cryptées et sécurisées par notre partenaire.</p>
                       </div>
                    </div>
                 </div>
               </section>

               <div className="pt-8 flex flex-col items-center gap-4">
                  <Button 
                    size="lg" 
                    className="w-full h-16 text-lg"
                    onClick={() => navigate('/payment-success')}
                  >
                    Payer {course.price.toFixed(2)}€ maintenant
                  </Button>
                  <div className="flex items-center gap-6 opacity-40">
                     <Shield size={24} />
                     <Lock size={24} />
                     <CreditCard size={24} />
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E7E7E7] rounded-[32px] p-8 sticky top-28 shadow-sm">
               <h3 className="text-xl font-bold text-[#111827] mb-6">Récapitulatif de la commande</h3>
               
               <div className="flex gap-4 mb-8">
                  <div className="w-24 h-16 rounded-xl overflow-hidden flex-none">
                     <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <Badge variant="primary" className="mb-1">{course.category}</Badge>
                     <h4 className="font-bold text-sm text-[#111827] line-clamp-2">{course.title}</h4>
                  </div>
               </div>

               <div className="space-y-4 pt-6 border-t border-[#F3F4F6]">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-[#6B7280]">Prix du cours</span>
                     <span className="text-[#111827] font-bold">120,00€</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-[#6B7280]">Réduction</span>
                     <span className="text-success font-bold">-66,01€</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-[#F3F4F6]">
                     <span className="text-lg font-bold text-[#111827]">Total</span>
                     <span className="text-2xl font-bold text-brand-primary">{course.price.toFixed(2)}€</span>
                  </div>
               </div>

               <div className="mt-8 p-4 rounded-2xl bg-bg-soft border border-[#E7E7E7]">
                  <h5 className="font-bold text-xs text-[#111827] mb-2 uppercase tracking-widest">Code promo</h5>
                  <div className="flex gap-2">
                     <input 
                       type="text" 
                       placeholder="CODE10"
                       className="flex-grow h-10 px-4 rounded-xl border border-[#E7E7E7] bg-white outline-none text-xs"
                     />
                     <Button variant="dark" size="sm" className="h-10 px-4 rounded-xl">Appliquer</Button>
                  </div>
               </div>
               
               <div className="mt-8">
                  <p className="text-xs text-[#6B7280] text-center leading-relaxed">
                    Satisfait ou remboursé sous 14 jours si vous n'avez pas visionné plus de 10% de la formation.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
