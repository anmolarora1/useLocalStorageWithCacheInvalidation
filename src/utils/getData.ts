type getDataReturnType = {
  data: unknown;
  error?: any;
};

export type KeyValue<T, U> = {
  key: T;
  value: U;
};

type genericObject = {
  [key: string]: string;
};


const getData = async (url: string, config: genericObject = {}): Promise<getDataReturnType> => {
  try {
    const response = await fetch(url, config as RequestInit);
    const data = await response.json();
    return { data };
  } catch (error) {
    return { data: null, error };
  }
};

export default getData;
