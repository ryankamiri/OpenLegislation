import { useState } from 'react'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import MainPage from './main-page/MainPage'
import LandingPage from './LandingPage/LandingPage'
import Results from './ResultPage/Results'
import PieChart from './ResultPage/PieChart'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {

  return (
    <div>
      <Router>
        <div className='flex h-full flex-col'>
          <Header />
          <Routes>
              <Route path="/" exact element={<LandingPage />} />
              <Route path="/home" exact element={<MainPage />} />
              <Route path="/results" exact element={<Results />} />
              <Route path="/piechart" exact element={<PieChart />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  )
}

export default App
