import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = type === 'success'
    ? 'bg-gradient-to-r from-green-400 to-green-500'
    : 'bg-gradient-to-r from-red-400 to-red-500';

  const Icon = type === 'success' ? FaCheckCircle : FaExclamationCircle;

  return (
    <div className="fixed top-24 right-4 z-50 slide-up">
      <div className={`${styles} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[320px]`}>
        <Icon className="text-2xl" />
        <span className="flex-1 font-medium">{message}</span>
        <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-all">
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Toast;