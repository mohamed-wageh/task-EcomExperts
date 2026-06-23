import { createContext, useContext, useReducer, useCallback } from 'react';

const BundleContext = createContext(null);
const BundleDispatchContext = createContext(null);

const initialState = {
  steps: [],
  quantities: {},
  selectedVariants: {},
  activeStep: 0,
  loading: true,
  error: null,
};

function bundleReducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS': {
      return {
        ...state,
        steps: action.steps,
        quantities: { ...state.quantities, ...action.quantities },
        selectedVariants: { ...state.selectedVariants, ...action.selectedVariants },
        loading: false,
        error: null,
      };
    }

    case 'SET_ERROR': {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case 'SET_QUANTITY': {
      const newQty = Math.max(0, action.quantity);
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [action.key]: newQty,
        },
      };
    }

    case 'INCREMENT': {
      const current = state.quantities[action.key] || 0;
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [action.key]: current + 1,
        },
      };
    }

    case 'DECREMENT': {
      const current = state.quantities[action.key] || 0;
      if (current <= 0) return state;
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [action.key]: current - 1,
        },
      };
    }

    case 'SELECT_VARIANT': {
      return {
        ...state,
        selectedVariants: {
          ...state.selectedVariants,
          [action.productId]: action.variantId,
        },
      };
    }

    case 'SET_ACTIVE_STEP': {
      return {
        ...state,
        activeStep: action.step,
      };
    }

    case 'RESTORE_STATE': {
      return {
        ...state,
        quantities: action.quantities,
        selectedVariants: action.selectedVariants,
      };
    }

    default:
      return state;
  }
}

export function BundleProvider({ children }) {
  const [state, dispatch] = useReducer(bundleReducer, initialState);

  return (
    <BundleContext.Provider value={state}>
      <BundleDispatchContext.Provider value={dispatch}>
        {children}
      </BundleDispatchContext.Provider>
    </BundleContext.Provider>
  );
}

export function useBundleState() {
  const context = useContext(BundleContext);
  if (context === null) {
    throw new Error('useBundleState must be used within a BundleProvider');
  }
  return context;
}

export function useBundleDispatch() {
  const context = useContext(BundleDispatchContext);
  if (context === null) {
    throw new Error('useBundleDispatch must be used within a BundleProvider');
  }
  return context;
}

export function useBundleActions() {
  const dispatch = useBundleDispatch();

  const increment = useCallback((key) => {
    dispatch({ type: 'INCREMENT', key });
  }, [dispatch]);

  const decrement = useCallback((key) => {
    dispatch({ type: 'DECREMENT', key });
  }, [dispatch]);

  const setQuantity = useCallback((key, quantity) => {
    dispatch({ type: 'SET_QUANTITY', key, quantity });
  }, [dispatch]);

  const selectVariant = useCallback((productId, variantId) => {
    dispatch({ type: 'SELECT_VARIANT', productId, variantId });
  }, [dispatch]);

  const setActiveStep = useCallback((step) => {
    dispatch({ type: 'SET_ACTIVE_STEP', step });
  }, [dispatch]);

  return { increment, decrement, setQuantity, selectVariant, setActiveStep };
}
