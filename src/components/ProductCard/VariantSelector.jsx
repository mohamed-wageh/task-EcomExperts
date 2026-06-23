import { memo } from 'react';
import { useBundleActions } from '../../context/BundleContext.jsx';

const VariantSelector = memo(function VariantSelector({
  variants,
  selectedVariantId,
  productId,
}) {
  const { selectVariant } = useBundleActions();

  if (!variants || variants.length === 0) return null;

  return (
    <div className="variant-selector" role="radiogroup" aria-label="Color options">
      {variants.map((variant) => {
        const isActive = variant.id === selectedVariantId;
        return (
          <button
            key={variant.id}
            type="button"
            className={`variant-chip${isActive ? ' variant-chip--active' : ''}`}
            onClick={() => selectVariant(productId, variant.id)}
            role="radio"
            aria-checked={isActive}
            aria-label={variant.label}
          >
            <span
              className="variant-chip__swatch"
              style={{ backgroundColor: variant.color }}
            />
            {variant.label}
          </button>
        );
      })}
    </div>
  );
});

export default VariantSelector;
