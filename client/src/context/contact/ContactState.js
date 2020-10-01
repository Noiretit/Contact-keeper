import React, { useReducer } from 'react';
//Random ID generators
import {v4 as uuid} from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Jill Johnson',
                email: 'jill@gmail.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Lourdes Riojana',
                email: 'lourdes@gmail.com',
                phone: '222-222-2222',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Jean Baptiste',
                email: 'jb@gmail.com',
                phone: '333-333-3333',
                type: 'professional'
            }
        ],
        //This piece of state is for the edit, so once we edit a contact it will be added to this piece.
        current: null,
        //It will be an array of filtered contacts
        filtered: null
    };

    //State allows us to access anything in our state
    //Dispatch allows us to dispatch objects to the reducer
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //All our actions down below

    //Add contact
    const addContact = contact => {
        // uuid.v4() is a way to generate a random ID with uuid library
        contact.id = uuid;
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    //Delete contact
    const deleteContact = id  => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

    //Set current contact
    const setCurrent = contact  => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    //Clear current contact
    const clearCurrent = ()  => {
        dispatch({ type: CLEAR_CURRENT });
    };

    //Update contact
    const updateContact = contact  => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };

    //Filter contacts
    const filterContacts = text  => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

    //Clear filter
    const clearFilter = ()  => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}>
            { props.children }
        </ContactContext.Provider>
    )
};

//In order to use this Provider we have to wrap our App.js
//This file will allow any component to access this state and actions, avoiding prop.drilling

export default ContactState;