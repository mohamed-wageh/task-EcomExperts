import { memo } from 'react';
import { useBundleActions } from '../../context/BundleContext.jsx';
import { useBundleCalculations } from '../../hooks/useBundleCalculations.js';
import ProductCard from '../ProductCard/ProductCard.jsx';

const AccordionStep = memo(function AccordionStep({
  step,
  stepIndex,
  isOpen,
  totalSteps,
}) {
  const { setActiveStep } = useBundleActions();
  const { selectedCountByStep } = useBundleCalculations();

  const selectedCount = selectedCountByStep[step.id] || 0;

  function handleToggle() {
    setActiveStep(isOpen ? -1 : stepIndex);
  }

  function handleNext() {
    if (stepIndex < totalSteps - 1) {
      setActiveStep(stepIndex + 1);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  }

  return (
    <div className="accordion-step" role="region" aria-label={step.title}>
      <p className="accordion-step__label">{step.label}</p>

      <button
        className="accordion-step__header"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        type="button"
      >
        <div className="accordion-step__header-left">
          <span className="accordion-step__icon">
            <img
              src={`/icons/${step.icon}.svg`}
              alt=""
              aria-hidden="true"
            />
          </span>
          <h2 className="accordion-step__title">{step.title}</h2>
        </div>

        <div className="accordion-step__indicator">
          {selectedCount > 0 && (
            <span>{selectedCount} selected</span>
          )}
          <span
            className={`accordion-step__chevron${isOpen ? ' accordion-step__chevron--up' : ''}`}
            aria-hidden="true"
          >
            ▼
          </span>
        </div>
      </button>

      <div
        className={`accordion-step__content${isOpen ? ' accordion-step__content--open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="accordion-step__inner">
          <div className="accordion-step__products">
            {step.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {step.nextLabel && (
            <button
              className="accordion-step__next-btn"
              onClick={handleNext}
              type="button"
            >
              {step.nextLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default AccordionStep;
