import React, { useReducer } from 'react';
import axios from 'axios';
//Random ID generators
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACTS,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        //This piece of state is for the edit, so once we edit a contact it will be added to this piece.
        current: null,
        //It will be an array of filtered contacts
        filtered: null,
        error: null
    };

    //State allows us to access anything in our state
    //Dispatch allows us to dispatch objects to the reducer
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //Get contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts',);
            dispatch({ 
                type: GET_CONTACTS, 
                payload: res.data });
        } catch (err) {
            dispatch({ 
                type: CONTACT_ERROR, 
                payload: err.response.msg })
        }
    }

    //Add contact
    const addContact = async contact => {
        //Header bc we are sending data so we need that content type application json 
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ 
                type: ADD_CONTACT, 
                payload: res.data });
        } catch (err) {
            dispatch({ 
                type: CONTACT_ERROR, 
                payload: err.response.msg })
        }
    };

    //Delete contact
    const deleteContact = async id  => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });
        } catch (err) {
            dispatch({ 
                type: CONTACT_ERROR, 
                payload: err.response.msg })
        }
    };

    //Clear contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

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
            error: state.error,
            addContact,
            deleteContact,
            clearContacts,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts
        }}>
            { props.children }
        </ContactContext.Provider>
    )
};

//In order to use this Provider we have to wrap our App.js
//This file will allow any component to access this state and actions, avoiding prop.drilling

export default ContactState;