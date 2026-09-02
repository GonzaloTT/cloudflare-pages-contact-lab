import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Process from './components/Process/Process';
import Benefits from './components/Benefits/Benefits';
import Contact from './components/Contact/Contact';


function App() {
  return (
    <>
      <Header />

      <main id="inicio">
        <Hero />
        <Services />
        <Process />
        <Benefits />
        <Contact />
      </main>
    </>
  );
}

export default App;