const parseJSON = (stringifiedJSON: string, fallbackValue?: unknown) => {
  try {
    return JSON.parse(stringifiedJSON) || fallbackValue;
  } catch (e) {
    return fallbackValue;
  }
};

export default parseJSON;
