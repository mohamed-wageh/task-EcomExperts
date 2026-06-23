import { useEffect } from 'react';
import { useBundleDispatch } from '../context/BundleContext.jsx';
import { buildInitialQuantities, buildInitialSelectedVariants } from '../utils/stateHelpers.js';

export function useApi() {
  const dispatch = useBundleDispatch();

  useEffect(() => {
    let cancelled = false;

    async function fetchSteps() {
      try {
        const response = await fetch('/api/steps');

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();

        if (cancelled) return;

        const quantities = buildInitialQuantities(data.steps);
        const selectedVariants = buildInitialSelectedVariants(data.steps);

        dispatch({
          type: 'SET_PRODUCTS',
          steps: data.steps,
          quantities,
          selectedVariants,
          fixedItems: data.fixedItems,
        });
      } catch (err) {
        if (cancelled) return;
        dispatch({ type: 'SET_ERROR', error: err.message });
      }
    }

    fetchSteps();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);
}
