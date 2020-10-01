import React, { useContext, useState, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext'

const ContactForm = () => {
    // In order to use the context, we must use useContext hook
    const contactContext = useContext(ContactContext);

    //Edit form: we bring the current contact selected (which is the one when clicking edit goes to "current" in the Context)
    const { addContact, updateContact, clearCurrent, current } = contactContext;

    //useEffect mimics the life cycle methods: didMount, willMount, willUnmount
    useEffect(() => {
        //If current (contact in state) is not null (meaning it has a contact) invoke setContact with the current contact in state
        if(current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, current]);

    //Our component STATE
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
        if(current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        clearAll();
    };

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit contact' : 'Add contact'}</h2>
            {/* value has to match the name of the state value */}
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />

            <h5>Contact type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange}/> {' '}Personal{' '}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange}/> {' '}Professional{' '}

            <div>
                <input type="submit" value={current ? 'Update contact' : 'Add contact'} className="btn btn-primary btn-block"/>
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
            </div>}
        </form>
    )
}

export default ContactForm
