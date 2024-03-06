import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import ContactItem from './components/ContactItem/ContactItem';
import localStorageHandlers from './utils/localStorageHandlers';
import { useEffect, useRef, useState } from 'react';
const App = () => {
  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'number':
        setNumber(event.target.value);
        break;
      case 'filterInput':
        setFilterInput(event.target.value);
    }
  };

  const contactsRef = useRef();
  contactsRef.current = contacts;

  const handleSubmit = event => {
    event.preventDefault();

    if (contacts.some(contact => contact.name.toLocaleLowerCase() === event.target.name.value.toLocaleLowerCase())) {
      alert(event.target.name.value + ' is already in contacts!');
      setName('');
      setNumber('');
      return;
    }

    setContacts(
      [
        ...contacts,
        {
          name: event.target.name.value,
          number: event.target.number.value,
          id: nanoid(),
        }
      ]);
    setName('');
    setNumber('');
  };

  const handleDelete = event => {
    const newContacts = [...contacts];
    newContacts.splice(
      contacts.findIndex(contact => contact.id === event.target.id),
      1
    );
    
    setContacts(newContacts);
  };

  const list =
    filterInput.length > 0
      ? contacts
          .filter(contact =>
            contact.name.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase())
          )
          .map(contact => (
            <ContactItem
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
              deleteHandler={handleDelete}
            />
          ))
      : contacts.map(contact => (
          <ContactItem
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number}
            deleteHandler={handleDelete}
          />
      ));
  
  useEffect(() => {
    const storageState = localStorageHandlers.load(LOCAL_STORAGE_KEY);
    setContacts(storageState === undefined ? [] : storageState);
  }, []);

  useEffect(() => { 
    if (contactsRef.current.length !== contacts.length) {
        localStorageHandlers.save(LOCAL_STORAGE_KEY, contacts);
    }
  }, [contactsRef.current]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm submitHandler={handleSubmit} changeHandler={handleChange} name={name} number={number} />
      <h2>Contacts</h2>
      <Filter changeHandler={handleChange} filterVal={filterInput} />
      <ContactList>{list}</ContactList>
    </>
  );
}

export default App;
