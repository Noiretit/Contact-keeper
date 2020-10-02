import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //All our actions down below

    //Load user
    const loadUser = () => {
        console.log('load user')
    }

    //Register user
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            //No need to add the pull URL bc we have proxy in client's package.json
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data //response is the token, which is sent to backend\routes\users.js
            })
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg //backend\routes\user.js line 36
            })
        }
    }
    //Login user
    const login = () => {
        console.log('login user')
    }

    //Logout
    const logout = () => {
        console.log('logout')
    }

    //Clear errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            { props.children }
        </AuthContext.Provider>
    )
};

//In order to use this Provider we have to wrap our App.js
//This file will allow any component to access this state and actions, avoiding prop.drilling

export default AuthState;