import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import './input.css';
import reportWebVitals from './reportWebVitals';
/********** Import Layout & Components **********/
import Layout from './components/Layout';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
/********** Import Pages **********/
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Settings from './pages/Settings';
/********** Import Cookie **********/
import Cookies from 'js-cookie';
/********** Redux ***********/
import store from './store/store';
//
// Use case when the app is open in multiple tabs I need to communicate the session expiration between all open tabs
const broadcastChannel = new BroadcastChannel('session-expiration');
// App component
function App() {
  // Redux state management
  const loggedIn = useSelector(state => state.auth.loggedIn);
  // Check if apps is open in multiple tabs and if in the initial tab logout or session end was detected we need to communicate this state to all other tabs
  React.useEffect(()=>{
    broadcastChannel.addEventListener('message', (event) => {
      if (event.data === 'session-expired') {
        Cookies.remove('authToken');
        store.dispatch({ type: 'LOGOUT' });
      }
    });
  }, [broadcastChannel])
  return (
    <>
      {loggedIn && <Logout broadcastChannel={broadcastChannel} />}
      {!loggedIn
        ? 
          <LoginForm 
            broadcastChannel={broadcastChannel}
          />
        :
          <>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard/>}/>
                  <Route path="products" element={<Products/>}/>
                  <Route path="orders" element={<Orders/>}/>
                  <Route path="settings" element={<Settings/>}/>
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>  
              </Routes>
            </BrowserRouter>
          </>
      }
    </>
  )
}
// Check the state when component mounts, if the page were re-freshed but the admin is still authentified I need to maintain the state
const authToken = Cookies.get('authToken');
if (authToken) {
  store.dispatch({ type: 'LOGIN' });
}
// Render App component and pass state managed by Redux trough store to all components 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
//
reportWebVitals();
