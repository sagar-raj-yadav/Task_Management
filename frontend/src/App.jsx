import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import TaskBoard from './components/TaskBoard';
import Login from './loginsignup/Login';
import Signup from './loginsignup/Signup';
import './App.css';

const App = () => {

    


    const router = createBrowserRouter([
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/login",
            element: <Login  />,
        },
        {
            path: "/",
            element:  <TaskBoard />  ,
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default App;
