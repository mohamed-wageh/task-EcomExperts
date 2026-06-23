import { memo } from 'react';
import { useBundleState, useBundleActions } from '../../context/BundleContext.jsx';
import './QuantityStepper.css';

const QuantityStepper = memo(function QuantityStepper({ quantityKey, compact = false }) {
  const { quantities } = useBundleState();
  const { increment, decrement } = useBundleActions();

  const count = quantities[quantityKey] || 0;
  const isZero = count <= 0;

  return (
    <div
      className={`stepper${compact ? ' stepper--compact' : ''}`}
      role="group"
      aria-label="Quantity selector"
    >
      <button
        className={`stepper__btn${!isZero ? ' stepper__btn--active' : ''}`}
        onClick={() => decrement(quantityKey)}
        disabled={isZero}
        aria-label="Decrease quantity"
        type="button"
      >
        −
      </button>
      <span className="stepper__count" aria-live="polite" aria-atomic="true">
        {count}
      </span>
      <button
        className="stepper__btn stepper__btn--active"
        onClick={() => increment(quantityKey)}
        aria-label="Increase quantity"
        type="button"
      >
        +
      </button>
    </div>
  );
});

export default QuantityStepper;
