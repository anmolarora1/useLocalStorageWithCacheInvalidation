import { useRef, useEffect } from 'react';
import parseJSON from '../utils/parseJSON';

const useSSE = (url: string, callback: (data: any) => void): void => {
  const savedCallback = useRef(callback);

  // useEffect(() => {
  //   savedCallback.current = callback;
  // });

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event): void => {
      savedCallback.current(parseJSON(event.data));
    };

    return (): void => {
      eventSource.close();
    };
  }, [url]);
};

export default useSSE;
