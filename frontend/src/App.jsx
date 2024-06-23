import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import './App.scss'
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';
import Task from './pages/Tasks';
import { useDispatch } from 'react-redux';
import { authActions } from './data';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if(id) {
      dispatch(authActions.login());
    }
  }, [])

  return (
  <main>
    <Navbar/>
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/task' Component={Task}/>
      <Route path='/register' Component={Register} />
      <Route path='/login' Component={Login} />
    </Routes>
  </main>
)}

export default App
