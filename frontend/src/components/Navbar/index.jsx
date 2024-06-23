import React from 'react'
import SiteLogo from '../../assets/logo/site-logo.webp'
import './styles.scss'
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../data';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    toast.success("You have been Logout");
    sessionStorage.clear("id");
    dispatch(authActions.logout());
    navigate("/register");
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white ">
        <div className="container-fluid px-5">
        <a className="navbar-brand" href="#">
            <img src={SiteLogo} className='mh-100' style={{width: "120px", height: "120px"}} />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap">
            <li className="nav-item mx-2">
                <a className="nav-link " aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item mx-2">
                <a className="nav-link " href="/task">Task</a>
            </li>
            {!isLoggedIn
            ?<li className="nav-item mx-3">
                <a className='nav-item' href="/register">
                    <button className='btn btn-app'>Register</button>
                </a>
            </li>
            :<li className="nav-item logout-item mx-2" onClick={logout}>
                <a className='nav-link text-danger'>Logout</a>
            </li>
            }
        </ul>
        </div>
        </div>
      </nav>
  </header>
  )
}

export default Navbar