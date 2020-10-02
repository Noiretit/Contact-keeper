import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken'
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

    //Load user
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth'); //route to check the token

            dispatch({
                type: USER_LOADED,
                payload: res.data //actual user data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
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
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg //backend\routes\user.js line 36
            })
        }
    }
    //Login user
    const login = async formData => {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
    
        try {
          const res = await axios.post('/api/auth', formData, config);
    
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
          });
    
          loadUser();
        } catch (err) {
          dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
          });
        }
      };

    //Logout
    const logout = () => dispatch({ type: LOGOUT });

    //Clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

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