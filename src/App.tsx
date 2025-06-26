import { useWindowSize } from 'hamo';
import './App.css';
import { IoLogoGithub, IoMail, IoLogoLinkedin } from 'react-icons/io5';
import { useState, useEffect } from 'react';

import CustomCursor from './components/CustomCursor';
import { ReactLenis, useLenis } from 'lenis/react';

function App() {
  const { height } = useWindowSize();
  const lenis = useLenis();
  const [arrowVisible, setArrowVisible] = useState(true);

  useEffect(() => {
    if (lenis) {
      const onScroll = (e: any) => {
        if (e.scroll > 10) {
          setArrowVisible(false);
        } else {
          setArrowVisible(true);
        }
      };
      lenis.on('scroll', onScroll);
      return () => {
        lenis.off('scroll', onScroll);
      };
    }
  }, [lenis]);

  return (
    <>
      <ReactLenis root />

      <div className="noise bg-gradient-to-b from-neutral-900 to-black" />
      <CustomCursor />
      <main className="relative z-1">
        <header className="p-4 prose prose-invert flex flex-col justify-center" style={{ height }}>
          <h1>Sinthu S.</h1>
          <h2>Software Developer and Artist</h2>
          <h3>Ontario, Canada</h3>

          <div className="flex flex-1 flex-col justify-end">
            <div
              className={`text-xl self-start flex flex-col items-center select-none pointer-events-none transition-opacity duration-700 ${arrowVisible ? 'opacity-80' : 'opacity-0'}`}
            >
              <span className="animate-bounce">↓</span>
            </div>
          </div>
        </header>

        <section className="p-4 prose prose-invert flex flex-col justify-center" style={{ height }}>
          <h1>Hello world!</h1>
          <p>
            As a software developer and artist, I thrive on creation, experimentation, and
            continuous learning.
          </p>
          <p>
            My passion lies at the intersection of computer science and fine arts, where I explore
            innovative ways to bridge these disciplines.
          </p>
          <p>
            Through technology and the creative process, I aim to challenge perspectives, spark
            curiosity, and craft experiences that inspire thought and discovery.
          </p>
        </section>

        <nav className="p-4 prose prose-invert grid grid-cols-2 gap-4 md:grid-cols-4 mt-8">
          <a
            href="https://github.com/sin2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row gap-1 items-center"
          >
            <IoLogoGithub />
            sin2
          </a>
          <a
            href="http://www.linkedin.com/in/ssivapat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row gap-1 items-center"
          >
            <IoLogoLinkedin />
            ssivapat
          </a>
          <a href="mailto:contact@sin2.ca" className="flex flex-row gap-1 items-center">
            <IoMail />
            contact@sin2.ca
          </a>
        </nav>
      </main>
    </>
  );
}

export default App;
