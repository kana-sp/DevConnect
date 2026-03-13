import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { createMMKV } from 'react-native-mmkv'
import { QueryClient } from '@tanstack/react-query';

const storage = createMMKV({ id: 'middleware' });

export const clientStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key: string) => {
    storage.remove(key);
  },
};

export const clientPersister = createAsyncStoragePersister({ storage: clientStorage })
export const queryClient = new QueryClient()