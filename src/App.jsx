import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import Services from './components/Services'
import Expertise from './components/Expertise'
import Contact from './components/Contact'
import OsintWidget from './components/OsintWidget'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen text-slate-200 font-sans" style={{ background: '#0f172a' }}>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <Expertise />
        {/* OSINT / Privacy Awareness module – placed between Expertise and Contact */}
        <OsintWidget />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
