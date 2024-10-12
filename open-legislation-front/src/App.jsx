// import { useState } from 'react'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import MainPage from './main-page/MainPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage/LandingPage'

const query = ''

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
            <Route>
                <Route path="/" element={<LandingPage />} />
                <Route path="results" element={<MainPage query={query} />} />
            </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
