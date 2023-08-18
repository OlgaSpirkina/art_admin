import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import {logoutTimer} from '../store/logoutTimer';

const Signin = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const user = useSelector((state)=> state.auth.user)
    const error = useSelector((state)=> state.auth.error)
    const dispatch = useDispatch()
    const handleLogin = async (e) => {
      e.preventDefault();
      dispatch(login({ username, password, persistData: true }))
        .then((res)=> {
            logoutTimer()
            setUsername('')
            setPassword('')
        })
    };
    React.useEffect(() => {
      const storedUserData = localStorage.getItem('localst');
      if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          dispatch(login({ username: userData.username, persistData: false }));
      }
    }, [dispatch]);
    return (
      <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form 
            onSubmit={handleLogin}
            className="space-y-6" 
          >
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="email" 
                  name="email" 
                  type="email" 
                  autoComplete="email" 
                  required 
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bermuda-600 sm:text-sm sm:leading-6" 
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-bermuda-600 hover:text-bermuda-500">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password" 
                  name="password" 
                  autoComplete="current-password" 
                  required 
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bermuda-600 sm:text-sm sm:leading-6" 
                />
              </div>
            </div>
            <div>
              <button 
                type="submit" 
                className="flex w-full justify-center rounded-md bg-bermuda-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-bermuda-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bermuda-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account yet? 
            <a href="/signup" className="font-semibold leading-6 text-bermuda-600 hover:text-bermuda-500"> Create an account</a>
          </p>
        </div>
      </div>
    );
}
export default Signin  