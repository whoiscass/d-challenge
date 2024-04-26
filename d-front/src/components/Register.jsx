import { useState } from "react";
import {  useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
    const [inputValues, setInputValues] = useState({
        name: '',
        email: '',
        role: 'lector',
        password: ''
      });
    
      const handleInputChange = (e) => {
        setInputValues({
          ...inputValues,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body:  JSON.stringify(inputValues)
        })
        navigate('/login')
      }
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6" action="#">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Register
            </h3>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your Name
              </label>
              <input
                type='text'
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required=""
                value={inputValues.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required=""
                value={inputValues.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your Role
              </label>
              <select id='role' name="role" defaultValue={'lector'} value={inputValues.role} onChange={handleInputChange}>
                <option value="lector">Lector</option>
                <option value="admin">Admin</option>
                <option value="creador">Creador</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required=""
                value={inputValues.password} onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already registered?{" "}
              <a
                href="/login"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Login to your account
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Register;
  