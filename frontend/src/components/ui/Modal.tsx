import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111111] border border-white/[0.08] rounded-[24px] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-[#494456]/30">
                  <h2 className="text-xl font-semibold text-[#e5e2e1]">{title}</h2>
                  <button
                    onClick={onClose}
                    className="text-[#948ea2] hover:text-[#e5e2e1] transition-colors"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              )}
              <div className="p-6">{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
