import { useEffect, useRef } from 'react';
import './CheckoutModal.css';

export default function CheckoutModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    modalRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="checkout-modal__overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Checkout confirmation"
    >
      <div className="checkout-modal" ref={modalRef} tabIndex={-1}>
        <p className="checkout-modal__icon" aria-hidden="true">🛒</p>
        <h2 className="checkout-modal__title">Almost there!</h2>
        <p className="checkout-modal__text">
          In a real store, this would take you to a secure checkout.
          For this prototype, your system configuration is complete!
        </p>
        <button
          className="checkout-modal__btn"
          onClick={onClose}
          type="button"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
