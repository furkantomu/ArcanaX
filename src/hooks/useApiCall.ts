import {useState, useCallback, useRef, useEffect} from 'react';
import {logger} from '../utils';

interface UseApiCallState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiCallOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  showToast?: boolean;
}

export const useApiCall = <T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiCallOptions = {}
) => {
  const [state, setState] = useState<UseApiCallState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      // Cancel previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const result = await apiFunction(...args);
        
        if (!abortControllerRef.current.signal.aborted) {
          setState({
            data: result,
            loading: false,
            error: null,
          });

          options.onSuccess?.(result);
        }
      } catch (error: any) {
        if (!abortControllerRef.current.signal.aborted) {
          const errorMessage = error.message || 'Beklenmeyen bir hata oluştu';
          
          setState({
            data: null,
            loading: false,
            error: errorMessage,
          });

          logger.error('API call failed', error);
          options.onError?.(error);
        }
      }
    },
    [apiFunction, options]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    execute,
    reset,
    isIdle: !state.loading && !state.data && !state.error,
  };
};