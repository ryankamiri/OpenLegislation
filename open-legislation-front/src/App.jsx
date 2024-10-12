import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import MainPage from './main-page/MainPage'

const query = ''

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="results" element={<MainPage query={query} />} />
          </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
