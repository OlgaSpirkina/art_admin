import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, BrowserRouter, Routes, createRoutesFromElements, Route, RouterProvider, Navigate} from 'react-router-dom';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import './input.css';
import reportWebVitals from './reportWebVitals';
/********** Import Layout & Components **********/
import Layout from './Layouts/Layout';
/********** Import Pages **********/
import Signup from './pages/Signup'
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Settings from './pages/Settings';
/********** Redux ***********/
import { store } from './store'
import { login, logout } from './store/authSlice';
//
const storedUserData = localStorage.getItem('localst');
if (storedUserData) {
  const userData = JSON.parse(storedUserData);
  store.dispatch(login({ persistData: false }))
}
// Use case when the app is open in multiple tabs I need to communicate the session expiration between all open tabs
const broadcastChannel = new BroadcastChannel('session-expiration');
function App() {
  // Redux state management
  const user = useSelector((state)=> state.auth.user)
  // Check if apps is open in multiple tabs and if in the initial tab logout or session end was detected we need to communicate this state to all other tabs
  React.useEffect(()=>{
    broadcastChannel.addEventListener('message', (event) => {
      if (event.data === 'session-expired') {
        store.dispatch(logout())
      }
    });
  }, [broadcastChannel])
  return (
    <>
      {!user
        ? 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Signin/>}/> 
              <Route path="signup" element={<Signup/>}/> 
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
        :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Dashboard/>}/>
              <Route path="products" element={<Products/>}/>
              <Route path="orders" element={<Orders/>}/>
              <Route path="settings" element={<Settings/>}/>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>  
          </Routes>
        </BrowserRouter>
      }
    </>
  )
}
//Create Browser Router as an object
/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signup"
        element: <SignupForm />
      }
    ]
  }
])
*/
// Create browser router 
/*
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Dashboard />} />
      <Route path="products" element={<Products/>}/>
      <Route path="orders" element={<Orders/>}/>
      <Route path="settings" element={<Settings/>}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route> 
  )
)
*/

// App component
/*
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
*/
// Check the state when component mounts, if the page were re-freshed but the admin is still authentified I need to maintain the state



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
