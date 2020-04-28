import { useReducer, useEffect } from 'react';
import getData from '../utils/getData';

const defaultState = { data: null, isLoading: false, error: null };

type stateType = { data: unknown; isLoading: boolean; error: unknown };
type actionType = { type: string; data?: unknown; error?: string };

const reducer = (state: stateType, { type, data, error }: actionType): stateType => {
  switch (type) {
    case 'pending':
      return {
        ...state,
        isLoading: true,
      };
    case 'success':
      return {
        ...state,
        data,
        isLoading: false,
      };
    case 'error':
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};

type useFetchType = { url: string; shouldFetch: boolean; requestConfig?: {[key: string]: string} };

const useFetch = ({ url, shouldFetch = true, requestConfig }: useFetchType): stateType => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    if (shouldFetch) {
      (async (): Promise<void> => {
        dispatch({ type: 'pending' });
        const { data, error } = await getData(url, requestConfig);
        if (data) {
          dispatch({ type: 'success', data });
        } else {
          dispatch({ type: 'error', error });
        }
      })();
    }
  }, [shouldFetch, url]);

  return state;
};

export default useFetch;
