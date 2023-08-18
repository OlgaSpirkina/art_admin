import React from 'react'


function Signup(){
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const submitSignUpForm = e => {
        e.preventDefault()
        
    }
    return (
        <div>
            <form 
                onSubmit={submitSignUpForm}
                className="mx-auto border-2 p-9 md:p-12 w-72 md:w-96 border-cyan-400 mt-36 h-84"
            >
                <h3 className="pb-6 text-2xl text-center text-white">Sign Up</h3>
                <label 
                    htmlFor="username"
                    className="block mb-1 text-xl text-cyan-400"
                >
                    Username
                </label>
                <input 
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-8 p-1 mb-6 focus:outline-none" 
                    id="username"
                    type="text"
                    value={username}
                />
                <label 
                    htmlFor="email"
                    className="block mb-1 text-xl text-cyan-400"
                >
                    Email
                </label>
                <input 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-8 p-1 mb-6 focus:outline-none" 
                    id="email"
                    type="email"
                    value={email}
                />
                <label 
                    htmlFor="password"
                    className="block mb-1 text-xl text-cyan-400"
                >
                    Password
                </label>
                <input 
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-8 p-1 mb-6 focus:outline-none" 
                    id="password"
                    type="password"
                    value={password}
                />
                <div>
              <button 
                type="submit" 
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
            </form>
        </div>
    )
}
export default Signup
