import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from '../Features/Contact/contactSlice';

export const store = configureStore({
    reducer: {
        contacts: contactsReducer
    }
})