import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import WorkSection    from './components/WorkSection'
import Education      from './components/Education'
import Experience     from './components/Experience'
import Skills         from './components/Skills'
import ProcessSection from './components/ProcessSection'
import References     from './components/References'
import TimeTracker    from './components/TimeTracker'
import Footer         from './components/Footer'

export default function App() {
  return (
    <div style={{ background: '#f5efe7', color: '#544f47' }}>
      <Navbar />
      <main>
        <Hero />
        <WorkSection />
        <Education />
        <Experience />
        <Skills />
        <ProcessSection />
        <References />
        <TimeTracker />
        <Footer />
      </main>
    </div>
  )
}
