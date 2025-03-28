import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <input className="w-full p-2 rounded border" type="email" placeholder="Email" />
        <input className="w-full p-2 rounded border" type="password" placeholder="Password" />
        <button className="w-full p-2 bg-indigo-600 text-white rounded">Sign In</button>
      </form>
    </div>
  );
};

export default Login;