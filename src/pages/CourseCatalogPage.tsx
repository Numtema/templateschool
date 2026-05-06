import { CourseCard } from '../components/CourseCard.tsx';
import { MOCK_COURSES } from '../constants.ts';
import { Badge, Button } from '../components/UI.tsx';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';

const CATEGORIES = ['Toutes', 'YouTube', 'Dessin', 'WordPress', 'Animation', 'Business'];

export function CourseCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Toutes');

  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'Toutes' || course.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="bg-bg-page pt-12 pb-24 min-h-screen">
      <div className="container-custom">
        <div className="mb-12">
          <Badge variant="info" className="mb-4">Catalogue</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">Explorez nos formations</h1>
          <p className="text-[#6B7280] text-lg max-w-2xl">
            Trouvez la formation idéale pour développer vos compétences créatives et professionnelles. 
            Apprenez avec les meilleurs experts de leur domaine.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
           <div className="relative flex-grow group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-brand-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Rechercher une formation, un outil..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-6 rounded-2xl border border-[#E7E7E7] bg-white focus:border-brand-primary outline-none transition-all focus:shadow-card"
              />
           </div>
           <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              <button className="flex items-center gap-2 h-14 px-6 rounded-2xl bg-white border border-[#E7E7E7] text-sm font-bold text-[#4B5563] whitespace-nowrap hover:border-brand-primary transition-all">
                <Filter size={18} />
                 Prix
              </button>
              <button className="flex items-center gap-2 h-14 px-6 rounded-2xl bg-white border border-[#E7E7E7] text-sm font-bold text-[#4B5563] whitespace-nowrap hover:border-brand-primary transition-all">
                <SlidersHorizontal size={18} />
                Niveau
              </button>
           </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-12">
           {CATEGORIES.map((cat) => (
             <button 
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-6 py-3 rounded-xl text-sm font-bold transition-all border ${activeCategory === cat ? 'bg-[#111827] text-white border-[#111827] shadow-lg' : 'bg-white text-[#4B5563] border-[#E7E7E7] hover:border-brand-primary/30'}`}
             >
               {cat}
             </button>
           ))}
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-[40px] border border-dashed border-[#E7E7E7]">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <Search size={32} />
             </div>
             <h3 className="text-xl font-bold text-[#111827] mb-2">Aucun cours trouvé</h3>
             <p className="text-[#6B7280] mb-8">Essayez de modifier votre recherche ou de changer de catégorie.</p>
             <Button variant="outline" onClick={() => { setSearchQuery(''); setActiveCategory('Toutes'); }}>
                Réinitialiser
             </Button>
          </div>
        )}
      </div>
    </div>
  );
}
