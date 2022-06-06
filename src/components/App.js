import React from 'react';
import Section from './Section/Section';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import ContactsSearch from './ContactsFilter/ContactsSearch';
import s from './Contacts/Contacts.module.css';

export default class Phonebook extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  onAddContact = contact => {
    const isContactExist = this.state.contacts.filter(
      con => con.name === contact.name,
    );
    if (isContactExist.length === 0) {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    } else {
      alert(`${contact.name} is already in contacts.`);
    }
  };

  onSearch = e => {
    this.setState({ filter: e.currentTarget.value.toLowerCase() });
  };

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    let total = contacts.length;
    const filteredContactsArr = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter),
    );

    return (
      <>
        <Section title="Phonebook">
          <Form onAddContact={this.onAddContact} />
        </Section>
        <Section title="Contacts">
          {total > 0 ? (
            <>
              <ContactsSearch value={filter} onChange={this.onSearch} />
              <Contacts
                contactsArr={filteredContactsArr}
                onDeleteContact={this.onDeleteContact}
              />
            </>
          ) : (
            <div className={s.wrapper}>
              <p className={s.text}>No contacts yet</p>
            </div>
          )}
        </Section>
      </>
    );
  }
}
