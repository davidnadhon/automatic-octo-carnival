import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Expertise from './components/Expertise'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Expertise />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
