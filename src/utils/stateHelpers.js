/**
 * Generates a unique key for tracking quantity of a product variant.
 * Products without variants use just the product id.
 * Products with variants use "productId__variantId".
 */
export function getQuantityKey(productId, variantId = null) {
  if (variantId && variantId !== '_default') {
    return `${productId}__${variantId}`;
  }
  return productId;
}

/**
 * Extracts initial quantities from the steps data returned by the API.
 * Walks through every product and its initialQuantities to build the
 * flat quantities map the reducer expects.
 */
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

/**
 * Builds the default selected variant for each product that has variants.
 * Picks the first variant in the list as the default.
 */
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
