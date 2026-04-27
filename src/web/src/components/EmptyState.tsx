import React from 'react';
import { ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <motion.div 
      className="empty-state-enhanced"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="empty-icon-wrapper">
        <ClipboardList size={48} className="empty-icon" />
      </div>
      <p>{message}</p>
    </motion.div>
  );
};

export default EmptyState;
