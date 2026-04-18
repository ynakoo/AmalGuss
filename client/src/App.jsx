import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import DailyRateTicker from './components/DailyRateTicker'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import CatalogPage from './pages/CatalogPage'
import ProductDetail from './pages/ProductDetail'
import SmartMatchPage from './pages/SmartMatchPage'
import EstimatePage from './pages/EstimatePage'

function App() {
  return (
    <div className="app">
      <div className="page-bg" />
      <Navbar />
      <DailyRateTicker />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/ai-match" element={<SmartMatchPage />} />
          <Route path="/estimate" element={<EstimatePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
