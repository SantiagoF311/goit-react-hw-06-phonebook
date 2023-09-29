import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

const initialState = [
  {
    contacts: [],
    filteredContacts: [],
  },
];

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      const newContact = {
        name: action.payload.name,
        number: action.payload.number,
        id: uuid(), 
      };
      state[0].contacts.push(newContact);
    },
    addFilteredContact: (state, action) => {
      state[0].filteredContacts = action.payload; 
    },
    resetFilteredContact: (state) => {
      state[0].filteredContacts = [];
    },
    deleteContact: (state, action) => {
    const contactIdToDelete = action.payload;
    console.log('Deleting contact with ID:', contactIdToDelete);
    state[0].contacts = state[0].contacts.filter(contact => contact.id !== contactIdToDelete);
    state[0].filteredContacts = state[0].filteredContacts.filter(contact => contact.id !== contactIdToDelete);
},
  },
});

export const { addContact, addFilteredContact, resetFilteredContact, deleteContact } =
  contactSlice.actions;
export default contactSlice.reducer;
