import React, { useReducer } from 'react';
import {v4 as uuid} from 'uuid';

import AlertContext from './alertContextY';
import alertReducer from './alertReducerY';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const initialState = [];

    
    const [state, dispatch] = useReducer(alertReducer, initialState);

    //All our actions down below

    //Set alert
    const setAlert = (msg, type, timeout = 5000) => {
        const id = uuid;
        dispatch({
            type: SET_ALERT,
            payload: {msg, type, id}
        });
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
    }

    return (
        <AlertContext.Provider value={{
            alerts: state,
            setAlert
        }}>
            { props.children }
        </AlertContext.Provider>
    )
};

//In order to use this Provider we have to wrap our App.js
//This file will allow any component to access this state and actions, avoiding prop.drilling

export default AlertState;