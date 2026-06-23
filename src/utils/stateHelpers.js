export function getQuantityKey(productId, variantId = null) {
  if (variantId && variantId !== '_default') {
    return `${productId}__${variantId}`;
  }
  return productId;
}

export function buildInitialQuantities(steps) {
  const quantities = {};

  for (const step of steps) {
    for (const product of step.products) {
      if (product.variants && product.variants.length > 0) {
        for (const variant of product.variants) {
          const key = getQuantityKey(product.id, variant.id);
          const initial = product.initialQuantities?.[variant.id] || 0;
          quantities[key] = initial;
        }
      } else {
        const key = getQuantityKey(product.id);
        const initial = product.initialQuantities?.['_default'] || 0;
        quantities[key] = initial;
      }
    }
  }

  return quantities;
}

export function buildInitialSelectedVariants(steps) {
  const selected = {};

  for (const step of steps) {
    for (const product of step.products) {
      if (product.variants && product.variants.length > 0) {
        selected[product.id] = product.variants[0].id;
      }
    }
  }

  return selected;
}
