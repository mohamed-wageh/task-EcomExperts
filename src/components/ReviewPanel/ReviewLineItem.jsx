import { memo } from 'react';
import { formatCurrency, formatMonthly } from '../../utils/formatCurrency.js';
import QuantityStepper from '../QuantityStepper/QuantityStepper.jsx';

const ReviewLineItem = memo(function ReviewLineItem({ item }) {
  const isPlan = item.priceType === 'monthly';
  const isFree = item.freeLabel || item.price === 0;

  const priceDisplay = isFree
    ? item.freeLabel || 'FREE'
    : isPlan
      ? formatMonthly(item.price)
      : formatCurrency(item.price * item.quantity);

  const compareDisplay = item.comparePrice
    ? (isPlan
      ? formatMonthly(item.comparePrice)
      : formatCurrency(item.comparePrice * item.quantity))
    : null;

  return (
    <div className={`review-line${isPlan ? ' review-line--plan' : ''}`}>
      <img
        className="review-line__thumb"
        src={item.image}
        alt={item.title}
        loading="lazy"
      />

      <div className="review-line__info">
        {isPlan ? (
          <p className="review-line__name">
            <strong>Cam</strong> Unlimited
          </p>
        ) : (
          <p className="review-line__name">
            {item.title}
            {item.variantLabel ? ` (${item.variantLabel})` : ''}
          </p>
        )}
      </div>

      {!isPlan && (
        <QuantityStepper quantityKey={item.key} compact />
      )}

      <div className="review-line__pricing">
        {compareDisplay && (
          <span className="review-line__compare">{compareDisplay}</span>
        )}
        <span className={`review-line__price${isFree ? ' review-line__price--free' : ''}`}>
          {priceDisplay}
        </span>
      </div>
    </div>
  );
});

export default ReviewLineItem;
