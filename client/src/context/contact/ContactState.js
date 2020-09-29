import React, { useReducer } from 'react';
//Random ID generators
import uuid from 'uuid';
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
        ]
    };

    //State allows us to access anything in our state
    //Dispatch allows us to dispatch objects to the reducer
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //All our actions down below

    //Add contact

    //Delete contact

    //Set current contact

    //Clear current contact

    //Update contact

    //Filter contacts

    //Clear filter


    return (
        <ContactContext.Provider value={{
            contacts: state.contacts
        }}>
            { props.children }
        </ContactContext.Provider>
    )
};

//In order to use this Provider we have to wrap our App.js
//This file will allow any component to access this state and actions, avoiding prop.drilling

export default ContactState;