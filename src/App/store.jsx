import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import reduxPersistConfig from './reduxPersistConfig';
import contactsReducer from '../Features/Contact/contactSlice';

const persistedReducer = persistReducer(reduxPersistConfig, contactsReducer);

export const store = configureStore({
    reducer: {
        contacts: persistedReducer
    }
})

export const persistor = persistStore(store);