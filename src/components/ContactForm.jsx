import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';
import { addContact, addFilteredContact, resetFilteredContact, deleteContact } from "Features/Contact/contactSlice";

function ContactForm() {
  const contactState = useSelector(state => state.contacts[0].contacts);
  const filteredContactState = useSelector(state => state.contacts[0].filteredContacts);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    contact: {
      name: '',
      number: '',
    },
    filter: {
      filter: '',
      number: '',
    }
  });

  const handleChange = e => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [e.target.name]: e.target.value
      }
    });
  }

  const handleFilteredContact = (e) => {

  const filterValue = e.target.value.toLowerCase();

  if (!filterValue) {
    dispatch(resetFilteredContact()); 
  } else {
    const filteredContactNames = contactState
      .filter(
        (contact) =>
          contact.name && contact.name.toLowerCase().includes(filterValue)
      )
      .map((contact) => ({
        name: contact.name,
        number: contact.number,
        id: contact.id
      }));

    dispatch(addFilteredContact(filteredContactNames));
  }
};


  const handleSubmit = (e, target) => {
    e.preventDefault();

    if (target === 'contact') {
      const existingContact = contactState.find(contact => contact.name.toLowerCase() === state.contact.name.toLowerCase());

      if (existingContact) {
        alert('Este contacto ya existe.');
      } else {
        dispatch(addContact(state.contact));
        setState({
          ...state,
          contact: {
            name: '',
            number: ''
          }
        });
      }
    }
  }

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  useEffect(() => {
    console.log(filteredContactState);
  }, [filteredContactState]);

  return (
    <div>
      <form onSubmit={e => handleSubmit(e, 'contact')}>
        <h2>Name</h2>
        <input name='name' type="text" placeholder="name" value={state.contact.name} onChange={handleChange} required/>
        <h2>Number</h2>
        <input name='number' type="number" placeholder="number" value={state.contact.number} onChange={handleChange} required/>
        <br />
        <br />
        <button>Submit</button>
      </form>

      <div>
        <h2>Contacts</h2>
        {contactState.length === 0 ? (
          <p>Aún no hay contactos</p>
        ) : (
          <ul>
            {contactState.map(contact => (
              <li key={uuid()}>
                {contact.name}: {contact.number} 
              </li>
            ))}
          </ul>
        )}
      </div>
    
      <form onSubmit={e => handleSubmit(e, 'filteredContact')}>
        <h2>Find contacts by name</h2>
        <input name='filter' type="text" placeholder="Filtrar contactos por nombre" value={state.filter.name} onChange={handleFilteredContact}  />
        <ul>
          {filteredContactState.map(contact => (
            <li key={uuid()}>
              {contact.name}: {contact.number} 
              <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  )
}

export default ContactForm;
