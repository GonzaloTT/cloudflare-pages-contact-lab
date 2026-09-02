import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';


function App() {
  return (
    <>
      <Header />

      <main id="inicio">
        <Hero />
        <Services />
      </main>
    </>
  );
}

export default App;