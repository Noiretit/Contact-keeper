import React, { useContext, Fragment } from 'react'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/ContactContext'

const Contacts = () => {
    //Initialize our context to access all the methods and states from ContactContext:
    const contactContext = useContext(ContactContext);

    //Access only our hardcoded contacts in the context
    const { contacts, filtered } = contactContext;

    if(contacts.length === 0) {
        return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            {filtered !== null 
                ? filtered.map(contact => (
                    <ContactItem key={contact.id} contact={contact} />
                ))
                : contacts.map(contact => (
                    <ContactItem key={contact.id} contact={contact} />
                ))}
        </Fragment>
    )
}

export default Contacts
