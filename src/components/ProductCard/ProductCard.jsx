import { memo, useMemo } from 'react';
import { useBundleState } from '../../context/BundleContext.jsx';
import { getQuantityKey } from '../../utils/stateHelpers.js';
import { formatCurrency, formatMonthly } from '../../utils/formatCurrency.js';
import QuantityStepper from '../QuantityStepper/QuantityStepper.jsx';
import VariantSelector from './VariantSelector.jsx';
import './ProductCard.css';

const ProductCard = memo(function ProductCard({ product }) {
  const { quantities, selectedVariants } = useBundleState();

  const hasVariants = product.variants && product.variants.length > 0;
  const selectedVariantId = hasVariants ? selectedVariants[product.id] : null;

  const currentKey = hasVariants
    ? getQuantityKey(product.id, selectedVariantId)
    : getQuantityKey(product.id);

  const isSelected = useMemo(() => {
    if (hasVariants) {
      return product.variants.some((v) => {
        const key = getQuantityKey(product.id, v.id);
        return (quantities[key] || 0) > 0;
      });
    }
    return (quantities[currentKey] || 0) > 0;
  }, [hasVariants, product, quantities, currentKey]);

  const displayPrice = product.priceType === 'monthly'
    ? formatMonthly(product.price)
    : formatCurrency(product.price);

  const displayComparePrice = product.comparePrice
    ? (product.priceType === 'monthly'
      ? formatMonthly(product.comparePrice)
      : formatCurrency(product.comparePrice))
    : null;

  return (
    <article
      className={`product-card${isSelected ? ' product-card--selected' : ''}`}
      aria-label={product.title}
    >
      {product.badge && (
        <span className="product-card__badge">{product.badge}</span>
      )}

      <div className="product-card__image-wrap">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <div className="product-card__info">
        <h3 className="product-card__title">{product.title}</h3>
        {product.description && (
          <p className="product-card__description">{product.description}</p>
        )}
        {product.learnMoreUrl && (
          <a
            className="product-card__learn-more"
            href={product.learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        )}
      </div>

      {hasVariants && (
        <VariantSelector
          variants={product.variants}
          selectedVariantId={selectedVariantId}
          productId={product.id}
        />
      )}

      <div className="product-card__footer">
        <QuantityStepper quantityKey={currentKey} />
        <div className="product-card__pricing">
          {displayComparePrice && (
            <span className="product-card__compare-price">
              {displayComparePrice}
            </span>
          )}
          <span
            className={`product-card__price${product.priceType === 'monthly' ? ' product-card__price--monthly' : ''}`}
          >
            {product.priceType === 'monthly'
              ? formatCurrency(product.price)
              : displayPrice}
          </span>
          {product.priceType === 'monthly' && (
            <span className="product-card__price-suffix">/mo</span>
          )}
        </div>
      </div>
    </article>
  );
});

export default ProductCard;
