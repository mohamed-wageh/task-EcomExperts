import { useState } from 'react';
import { useBundleCalculations } from '../../hooks/useBundleCalculations.js';
import { usePersistence } from '../../hooks/usePersistence.js';
import { formatCurrency, formatMonthly } from '../../utils/formatCurrency.js';
import ReviewLineItem from './ReviewLineItem.jsx';
import './ReviewPanel.css';

const CATEGORY_LABELS = {
  cameras: 'Cameras',
  sensors: 'Sensors',
  accessories: 'Accessories',
  plan: 'Plan',
};

const CATEGORY_ORDER = ['cameras', 'sensors', 'accessories', 'plan'];

export default function ReviewPanel({ onCheckout }) {
  const {
    groupedReviewItems,
    subtotal,
    compareTotal,
    savings,
    financingMonthly,
    monthlyTotal,
    monthlyCompareTotal,
  } = useBundleCalculations();

  const { saveSystem, saveStatus } = usePersistence();

  return (
    <aside className="review-panel" aria-label="Your security system summary">
      <div>
        <p className="review-panel__eyebrow">REVIEW</p>
        <h2 className="review-panel__title">Your security system</h2>
        <p className="review-panel__subtitle">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      {CATEGORY_ORDER.map((category) => {
        const items = groupedReviewItems[category];
        if (!items || items.length === 0) return null;

        return (
          <div className="review-panel__group" key={category}>
            <p className="review-panel__group-label">
              {CATEGORY_LABELS[category]}
            </p>
            {items.map((item) => (
              <ReviewLineItem key={item.key} item={item} />
            ))}
          </div>
        );
      })}

      <div className="review-panel__shipping">
        <div className="review-panel__shipping-icon">
          <img src="/icons/shipping.svg" alt="" aria-hidden="true" />
        </div>
        <span className="review-panel__shipping-label">Fast Shipping</span>
        <div className="review-panel__shipping-pricing">
          <span className="review-panel__shipping-compare">$5.99</span>
          <span className="review-panel__shipping-price">FREE</span>
        </div>
      </div>

      <div className="review-panel__guarantee">
        <div className="review-panel__guarantee-badge">
          <img src="/icons/guarantee.svg" alt="100% satisfaction guarantee" />
        </div>
        <div>
          <p className="review-panel__guarantee-title">30-day hassle-free returns</p>
          <p className="review-panel__guarantee-text">
            If you&apos;re not totally in love with the product, we will refund you 100%.
          </p>
        </div>
      </div>

      <div className="review-panel__totals">
        {financingMonthly > 0 && (
          <span className="review-panel__financing">
            as low as {formatMonthly(financingMonthly)}
          </span>
        )}

        <div className="review-panel__total-row">
          {compareTotal > subtotal && (
            <span className="review-panel__total-compare">
              {formatCurrency(compareTotal)}
            </span>
          )}
          <span className="review-panel__total-price">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {savings > 0 && (
          <p className="review-panel__savings">
            Congrats! You&apos;re saving {formatCurrency(savings)} on your security bundle!
          </p>
        )}
      </div>

      <button
        className="review-panel__checkout"
        onClick={onCheckout}
        type="button"
      >
        Checkout
      </button>

      <button
        className="review-panel__save"
        onClick={saveSystem}
        type="button"
      >
        Save my system for later
      </button>

      {saveStatus === 'saved' && (
        <p className="review-panel__toast" role="status">
          ✓ System saved! Your configuration will be here when you come back.
        </p>
      )}
    </aside>
  );
}
