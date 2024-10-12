import { useState } from 'react'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import MainPage from './main-page/MainPage'
import LandingPage from './LandingPage/LandingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div>
      <Router>
        <div className='flex h-full flex-col'>
          <Header />
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/results" element={<MainPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  )
}

export default App
