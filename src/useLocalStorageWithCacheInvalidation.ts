import { useState, useEffect } from 'react';

import { useSSE, useFetch, useLocalStorage } from './hooks';

export type configType = {
  key: string;
  dataURL: string;
  streamURL: string;
  initialValue: unknown;
  cacheInvalidatorFunction: (data: any) => boolean;
  shouldFetchOnStart?: boolean;
  requestConfig?: {[key: string]: string};
};

const useLocalStorageWithCacheInvalidation = (config: configType): {storedItem: any; isLoading: boolean} => {
  const {
    key, dataURL, streamURL, initialValue, cacheInvalidatorFunction: shouldInvalidateCache, shouldFetchOnStart = true, requestConfig,
  } = config;

  const [storedItem, setItem] = useLocalStorage(key, initialValue);

  const [shouldFetch, updateShouldFetch] = useState(shouldFetchOnStart);
  const { data, isLoading } = useFetch({
    url: dataURL,
    shouldFetch,
    requestConfig,
  });

  useEffect(() => {
    if (data) {
      setItem(data);
      updateShouldFetch(false);
    }
  }, [data]);

  useSSE(streamURL, (fetchedData) => {
    if (shouldInvalidateCache(fetchedData)) {
      updateShouldFetch(true);
    }
  });

  return { storedItem, isLoading };
};

export default useLocalStorageWithCacheInvalidation;
