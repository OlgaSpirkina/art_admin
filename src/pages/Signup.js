import React from 'react'
import { BsEye } from 'react-icons/bs'
import axios from 'axios'

function Signup(){
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [message, setMessage] = React.useState('')
    async function submitSignUpForm(e) {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:4000/signup', { username, email, password });
        const data = response.data; 
        setMessage(data.message);
        setUsername('');
        setEmail('');
        setPassword('');
      } catch (error) {
        console.error(error);
      }
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
        </div>
        {message && <p className="text-center mt-8">{message}</p>}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form 
            onSubmit={submitSignUpForm}
            className="space-y-6" 
          >
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username" 
                    name="username" 
                    type="username" 
                    autoComplete="username" 
                    required 
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                />
              </div>
            </div>
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email" 
                    name="email" 
                    type="email" 
                    autoComplete="email" 
                    required 
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                />
              </div>
            </div>
            <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2 flex justify-between items-center">
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password" 
                        name="password" 
                        autoComplete="current-password" 
                        required 
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    />
                    <BsEye />
                </div>
            </div>
            <div>
              <button 
                type="submit" 
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

        
    )
}
export default Signup
