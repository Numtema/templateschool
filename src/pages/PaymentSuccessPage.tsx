import { Button } from '../components/UI.tsx';
import { CheckCircle2, Play, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 md:p-16 rounded-[48px] border border-[#E7E7E7] shadow-floating max-w-2xl w-full text-center"
      >
        <div className="w-24 h-24 bg-success-soft text-success rounded-[32px] flex items-center justify-center mx-auto mb-10">
          <CheckCircle2 size={48} />
        </div>
        
        <h1 className="text-4xl font-bold text-[#111827] mb-6">Paiement réussi !</h1>
        <p className="text-lg text-[#6B7280] mb-12 leading-relaxed">
           Félicitations, vous avez maintenant un accès illimité à votre formation. Un email de confirmation vous a été envoyé.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <Link to="/dashboard">
              <Button size="lg" className="w-full gap-2">
                 Commencer à apprendre
                 <Play size={18} className="fill-current" />
              </Button>
           </Link>
           <Button variant="outline" size="lg" className="w-full gap-2">
              Télécharger la facture
              <Download size={18} />
           </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-[#F3F4F6]">
           <Link to="/courses" className="text-sm font-bold text-brand-primary flex items-center justify-center gap-2 hover:gap-3 transition-all">
              Explorer d'autres formations <ArrowRight size={16} />
           </Link>
        </div>
      </motion.div>
    </div>
  );
}
