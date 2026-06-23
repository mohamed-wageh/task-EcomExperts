import { useCallback, useState } from 'react';
import { useBundleState, useBundleDispatch } from '../context/BundleContext.jsx';

const STORAGE_KEY = 'wyze-bundle-saved';

export function usePersistence() {
  const { quantities, selectedVariants } = useBundleState();
  const dispatch = useBundleDispatch();
  const [saveStatus, setSaveStatus] = useState(null);

  const saveSystem = useCallback(() => {
    try {
      const payload = {
        quantities,
        selectedVariants,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setSaveStatus('saved');

      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error('Failed to save system:', err);
      setSaveStatus('error');
    }
  }, [quantities, selectedVariants]);

  const restoreSystem = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;

      const parsed = JSON.parse(raw);

      if (!parsed.quantities || typeof parsed.quantities !== 'object') {
        return false;
      }

      dispatch({
        type: 'RESTORE_STATE',
        quantities: parsed.quantities,
        selectedVariants: parsed.selectedVariants || {},
      });

      return true;
    } catch (err) {
      console.error('Failed to restore system:', err);
      return false;
    }
  }, [dispatch]);

  const hasSavedSystem = useCallback(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      return false;
    }
  }, []);

  const clearSavedSystem = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear saved system:', err);
    }
  }, []);

  return {
    saveSystem,
    restoreSystem,
    hasSavedSystem,
    clearSavedSystem,
    saveStatus,
  };
}
