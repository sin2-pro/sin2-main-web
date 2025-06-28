import { useWindowSize } from 'hamo';
import './App.css';
import { IoLogoGithub, IoMail, IoLogoLinkedin, IoArrowDown } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import CustomCursor from './components/CustomCursor';
import AnimatedLink from './components/AnimatedLink';
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
      <main className="flex flex-col relative z-1">
        <header className="p-4 flex flex-col justify-center" style={{ height }}>
          <div className="prose prose-invert">
            <p>
              <h1>Sinthu S.</h1>
            </p>
            <p>
              <b className="text-accent text-lg">
                CTO @{' '}
                <AnimatedLink
                  href="https://www.gamerlinkapp.com/"
                  target="_blank"
                  rel="noopener"
                  className="text-accent"
                >
                  GamerLink Inc.
                </AnimatedLink>
              </b>
              <br />
              <b>Software Developer and Artist</b>
              <br />
              Ontario, Canada
            </p>
          </div>

          <div
            className={twMerge(
              'fixed bottom-4 left-4 text-3xl text-accent select-none pointer-events-none transition-opacity duration-700',
              arrowVisible ? 'opacity-100' : 'opacity-0'
            )}
          >
            <IoArrowDown className="animate-bounce" />
          </div>
        </header>

        <section className="p-4 prose prose-invert flex flex-col justify-center" style={{ height }}>
          <h1>Hello world!</h1>
          <p>
            I'm a software developer and artist who enjoys building, exploring, and learning across
            disciplines.
          </p>
          <p>
            I focus on combining <span className="text-accent">tech and visual design</span> in ways
            that feel fresh and intentional, creating tools, visuals, and ideas that make people
            look twice or think a little differently.
          </p>
        </section>

        <nav className="p-4 grid grid-cols-2 gap-4 md:grid-cols-4 mt-8">
          <AnimatedLink
            href="https://github.com/sin2"
            target="_blank"
            rel="noopener"
            icon={<IoLogoGithub />}
          >
            sin2
          </AnimatedLink>
          <AnimatedLink
            href="http://www.linkedin.com/in/ssivapat"
            target="_blank"
            rel="noopener"
            icon={<IoLogoLinkedin />}
          >
            ssivapat
          </AnimatedLink>
          <AnimatedLink href="mailto:contact@sin2.ca" icon={<IoMail />}>
            contact@sin2.ca
          </AnimatedLink>
        </nav>
      </main>
    </>
  );
}

export default App;
