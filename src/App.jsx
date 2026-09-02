import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Process from './components/Process/Process';


function App() {
  return (
    <>
      <Header />

      <main id="inicio">
        <Hero />
        <Services />
        <Process />
      </main>
    </>
  );
}

export default App;