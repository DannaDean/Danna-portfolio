import { motion, AnimatePresence } from "framer-motion";
import { Cross } from "akar-icons";

const Popup = ({onClose, children}) => {
    return (
        <AnimatePresence>
          <motion.div
            className="popup-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="popup-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <button className="popup-close" onClick={onClose}>
                <Cross strokeWidth={2} size={36} />
              </button>
              {children}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      );
    };
export default Popup;