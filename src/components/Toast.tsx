import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, [message, onClose]);

  const toastContent = (
    <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg">
      {message}
    </div>
  );

  return ReactDOM.createPortal(toastContent, document.body); 
};

export default Toast;
