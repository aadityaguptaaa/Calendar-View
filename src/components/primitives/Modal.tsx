import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg p-4 z-10 shadow-lg max-w-lg w-full">
        {title && <h2 id="modal-title" className="text-lg font-semibold mb-2">{title}</h2>}
        <div>{children}</div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-3 py-1 bg-gray-200 rounded-md">Close</button>
        </div>
      </div>
    </div>
  );
};
