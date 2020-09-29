import React, { useContext, useState } from 'react';
import ContactContext from '../../context/contact/ContactContext'

const ContactForm = () => {
    // In order to use the context, we must use useContext hook
    const contactContext = useContext(ContactContext);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange = (e) => setContact({
        ...contact,
        // With brackets we make it dynamic, and checks if the name is equal to the value and sets it to the state
        [e.target.name]: e.target.value
    });

    const onSubmit = (e) => {
        e.preventDefault();
        //contact argument is the state where the new contact info is being stored
        contactContext.addContact(contact);
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">Add contacts</h2>
            {/* value has to match the name of the state value */}
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />

            <h5>Contact type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange}/> {' '}Personal{' '}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange}/> {' '}Professional{' '}

            <div>
                <input type="submit" value="Add contact" className="btn btn-primary btn-block"/>
            </div>
        </form>
    )
}

export default ContactForm
