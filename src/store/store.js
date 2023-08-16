import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
//
const initialState = {
    loggedIn: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          loggedIn: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          loggedIn: false,
        };
      default:
        return state;
    }
};
const store = configureStore({
    reducer: { auth: authReducer }, // You can have more reducers here
});
export const setLogoutTimer = (expirationTime, broadcastChannel) => {
  setTimeout(() => {
      broadcastChannel.postMessage('session-expired');
      console.log(broadcastChannel)
      Cookies.remove('authToken');
      store.dispatch({ type: 'LOGOUT' });
  }, expirationTime);
};
export default store;
  
