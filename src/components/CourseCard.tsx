import React from 'react';
import { Course } from '../types';
import { Badge, Button } from './UI.tsx';
import { Play, Clock, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h${minutes > 0 ? minutes + 'm' : ''}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-[#E2E4E7] overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
    >
      <Link to={`/courses/${course.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={course.thumbnailUrl} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {course.isFree && (
            <div className="absolute top-3 left-3">
              <Badge variant="success">Gratuit</Badge>
            </div>
          )}
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white font-medium">
            {course.category}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">{course.instructorName}</span>
        </div>
        <Link to={`/courses/${course.slug}`}>
          <h3 className="text-lg font-bold text-[#111827] leading-tight mb-2 group-hover:text-brand-primary transition-colors">
            {course.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-3 text-[#6B7280] text-xs mb-4">
          <div className="flex items-center gap-1">
            <Layout size={14} />
            <span>{course.lessonsCount} leçons</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{formatDuration(course.durationSeconds)}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
          <span className="text-xl font-bold text-[#111827]">
            {course.price === 0 ? 'Gratuit' : `${course.price.toFixed(2)}€`}
          </span>
          <Link to={`/courses/${course.slug}`}>
            <Button variant="outline" size="sm" className="group/btn">
              <span className="mr-2">Accéder</span>
              <Play size={14} className="fill-current group-hover/btn:scale-110" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
