import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="portfolio-container">
      <Header />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
