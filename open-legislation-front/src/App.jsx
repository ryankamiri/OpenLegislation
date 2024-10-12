// import { useState } from 'react'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import MainPage from './main-page/MainPage'
import LandingPage from './LandingPage/LandingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/results" element={<MainPage />} />
          </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
