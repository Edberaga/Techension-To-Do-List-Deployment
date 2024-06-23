import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
  <section className="Home">
    <div className="container">
      <h1>See all your Tasks <br/> in One Place.</h1>
      <p>
      We are the ultimate solution for managing tasks efficiently  <br/>
      Looking to stay organized? We got you covered.
      </p>
      <Link to='/task'>
        <button className="btn btn-gradient-app">Get Started </button>
      </Link>
    </div>
  </section>
  )
}

export default Home