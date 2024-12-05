import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import {authActions} from "../redux/auth";
import { useDispatch } from 'react-redux';
import axios from 'axios'; 

const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...Values,
      [name]: value,
    });
  };

  const submit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.password === "" 
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post("http://localhost:3000/api/user/sign-in",
          Values
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);


        navigate("/Profile"); 
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Log In</p>
        <div>
            <label htmlFor="username" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
          <label htmlFor="password" className="text-zinc-400">
            Password
          </label>
          <input
            type="password"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="password"
            name="password"
            required
            value={Values.password}
            onChange={change}
          />
        </div>
        <div className="mt-6">
          <button className="w-full bg-blue-700 text-black py-2 rounded"
          onClick={submit}
          >
            Log In
          </button>
        </div>
        <div className="mt-4 text-zinc-400 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;