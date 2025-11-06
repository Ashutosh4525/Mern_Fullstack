import axios from 'axios';
import { Formik } from 'formik';
import { useState } from 'react';
// import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [formError,setformError]=useState("");
        const navigate = useNavigate();
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
      <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white items-center">
        <div className="flex flex-col justify-center w-100 h-100 p-4 border border-gray-300 rounded-lg shadow-md bg-gray-300 items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Formik
                initialValues={{ username: '', password: '' }}
                validate={(values) => {
                    const errors = {};
                    if (!values.username) {
                    errors.username = 'Username is Required';
                    }
                    if(!values.password){
                        errors.password='Password is Required'
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));
                axios
                .post("https://dummyjson.com/auth/login",values)
                .then((response)=>{
                    console.log(response); 
                    sessionStorage.setItem("token",response.data.accessToken);
                    navigate("/home");
                })
                .catch((error)=>{
                    console.error(error.response.data.message);
                    setformError(error.response.data.message);
                })
                setSubmitting(false);
                }, 400);
              }}
            >
         {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100">
                User name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                <p className="text-sm text-red-700">{errors.username && touched.username && errors.username}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                 onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                style={{marginBottom:"5px"}}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                 <p className="text-sm text-red-700">{errors.password && touched.password && errors.password}</p>
              </div>
            </div>

           
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" disabled={isSubmitting}
              >
                Sign in
              </button>
            </div>
          </form>
       )}
            </Formik>

        {formError && <p className='text-sm text-red-700'>{formError}</p>}
          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Start a 14 day free trial
            </a>
          </p>
        </div>
        </div>
      </div>
    </>
  )
}
