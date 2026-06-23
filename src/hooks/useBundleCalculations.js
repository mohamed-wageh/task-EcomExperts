import { useMemo } from 'react';
import { useBundleState } from '../context/BundleContext.jsx';
import { getQuantityKey } from '../utils/stateHelpers.js';

export function useBundleCalculations() {
  const { steps, quantities } = useBundleState();

  const reviewItems = useMemo(() => {
    const items = [];

    for (const step of steps) {
      for (const product of step.products) {
        if (product.variants && product.variants.length > 0) {
          for (const variant of product.variants) {
            const key = getQuantityKey(product.id, variant.id);
            const qty = quantities[key] || 0;
            if (qty > 0) {
              items.push({
                key,
                productId: product.id,
                variantId: variant.id,
                title: product.title,
                variantLabel: variant.label,
                image: variant.image || product.image,
                price: product.price,
                comparePrice: product.comparePrice,
                priceType: product.priceType,
                freeLabel: product.freeLabel || null,
                category: step.category,
                quantity: qty,
              });
            }
          }
        } else {
          const key = getQuantityKey(product.id);
          const qty = quantities[key] || 0;
          if (qty > 0) {
            items.push({
              key,
              productId: product.id,
              variantId: null,
              title: product.title,
              variantLabel: null,
              image: product.image,
              price: product.price,
              comparePrice: product.comparePrice,
              priceType: product.priceType,
              freeLabel: product.freeLabel || null,
              category: step.category,
              quantity: qty,
            });
          }
        }
      }
    }

    return items;
  }, [steps, quantities]);

  const groupedReviewItems = useMemo(() => {
    const groups = {};
    for (const item of reviewItems) {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    }
    return groups;
  }, [reviewItems]);

  const subtotal = useMemo(() => {
    return reviewItems.reduce((sum, item) => {
      if (item.priceType === 'monthly') return sum;
      return sum + item.price * item.quantity;
    }, 0);
  }, [reviewItems]);

  const compareTotal = useMemo(() => {
    return reviewItems.reduce((sum, item) => {
      if (item.priceType === 'monthly') return sum;
      const unitPrice = item.comparePrice || item.price;
      return sum + unitPrice * item.quantity;
    }, 0);
  }, [reviewItems]);

  const savings = useMemo(() => {
    return compareTotal - subtotal;
  }, [compareTotal, subtotal]);

  const monthlyItems = useMemo(() => {
    return reviewItems.filter((item) => item.priceType === 'monthly');
  }, [reviewItems]);

  const monthlyTotal = useMemo(() => {
    return monthlyItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [monthlyItems]);

  const monthlyCompareTotal = useMemo(() => {
    return monthlyItems.reduce((sum, item) => {
      return sum + (item.comparePrice || item.price) * item.quantity;
    }, 0);
  }, [monthlyItems]);

  const selectedCountByStep = useMemo(() => {
    const counts = {};

    for (const step of steps) {
      let count = 0;
      for (const product of step.products) {
        let hasAny = false;

        if (product.variants && product.variants.length > 0) {
          for (const variant of product.variants) {
            const key = getQuantityKey(product.id, variant.id);
            if ((quantities[key] || 0) > 0) {
              hasAny = true;
              break;
            }
          }
        } else {
          const key = getQuantityKey(product.id);
          if ((quantities[key] || 0) > 0) {
            hasAny = true;
          }
        }

        if (hasAny) count++;
      }

      counts[step.id] = count;
    }

    return counts;
  }, [steps, quantities]);

  const financingMonthly = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal / 12;
  }, [subtotal]);

  return {
    reviewItems,
    groupedReviewItems,
    subtotal,
    compareTotal,
    savings,
    monthlyItems,
    monthlyTotal,
    monthlyCompareTotal,
    selectedCountByStep,
    financingMonthly,
  };
}
