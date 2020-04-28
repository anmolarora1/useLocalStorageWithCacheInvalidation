import { useState } from 'react';
import parseJSON from '../utils/parseJSON';

const getItem = (key: string, fallbackValue: string): object => {
  const value = localStorage.getItem(key) || '';
  return parseJSON(value, fallbackValue);
};

export type itemType = NonNullable<any>;

export type setItemType = (item: itemType) => void;
type removeItemType = () => void;
type useLocalStorageReturnType = [itemType, setItemType, removeItemType];

const useLocalStorage = (key: string, initialValue?: itemType): useLocalStorageReturnType => {
  const [storedItem, updateStoredItem] = useState(() => getItem(key, initialValue));

  const setItem = (item: itemType) => {
    console.log('setting item ', key, item);
    updateStoredItem(item);

    localStorage.setItem(key, JSON.stringify(item));
  };

  const removeItem = () => {
    updateStoredItem(initialValue);

    localStorage.removeItem(key);
  };

  return [storedItem, setItem, removeItem];
};

export default useLocalStorage;
