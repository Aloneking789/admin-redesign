import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { auth } from '../pages/auth';
const AddProviderForm: React.FC = ()  => {
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    password: '',
    services : ["67370be8bd63a5acf7a01f84"]
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Handle form submission logic, e.g., send data to an API
  };

  const goBack = () => {
    // Implement the logic to go back, e.g., navigate to a previous page
    console.log('Back button clicked');
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-md rounded-lg bg-white">
      {/* Back Button */}
      <button 
            onClick={() => {}}
            className="btn-secondary"
          >
            Go Back
          </button>

      <form onSubmit={handleSubmit} className="p-4">
        <h2 className="text-2xl font-bold mb-4">Provider Information</h2>

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#00C8C8] text-white font-medium rounded-md shadow-md"
          onClick={()=>{

            const fetch = async ()=>{
                console.log(formData)
                try {
                    const response = await axios.post("https://backend-82hj.onrender.com/api/v1/admin/register/",
                        formData,
                        {
                            headers : {
                                Authorization: auth
                            }   
                        }
                    )
                    alert("Submitted Sucessfully")
                    console.log(response.data)
                } catch (error) {
                    console.log(error)
                    alert(error)
                }
            }
            fetch()
            
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProviderForm;
